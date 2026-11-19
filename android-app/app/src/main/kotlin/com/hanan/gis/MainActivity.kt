package com.hanan.gis

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.ProgressBar
import androidx.activity.OnBackPressedCallback
import androidx.activity.SystemBarStyle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.MobileAds
import com.google.android.ump.ConsentInformation
import com.google.android.ump.ConsentRequestParameters
import com.google.android.ump.UserMessagingPlatform
import java.util.concurrent.atomic.AtomicBoolean

class MainActivity : AppCompatActivity() {

    companion object {
        private const val HOME_URL = "https://hanan.fun"
        private const val BANNER_AD_UNIT_ID = "ca-app-pub-8161307018337815/3740458435"
    }

    private lateinit var webContainer: FrameLayout
    private lateinit var swipeRefresh: SwipeRefreshLayout
    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar
    private lateinit var offlineView: LinearLayout
    private lateinit var adContainer: FrameLayout

    private var adView: AdView? = null
    private lateinit var consentInformation: ConsentInformation
    private val isMobileAdsInitializeCalled = AtomicBoolean(false)
    private var hasLoadError = false

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge(
            statusBarStyle = SystemBarStyle.light(Color.TRANSPARENT, Color.TRANSPARENT),
            navigationBarStyle = SystemBarStyle.light(Color.TRANSPARENT, Color.TRANSPARENT)
        )
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webContainer = findViewById(R.id.webContainer)
        swipeRefresh = findViewById(R.id.swipeRefresh)
        webView = findViewById(R.id.webView)
        progressBar = findViewById(R.id.progressBar)
        offlineView = findViewById(R.id.offlineView)
        adContainer = findViewById(R.id.adContainer)
        val retryButton: Button = findViewById(R.id.retryButton)

        applyEdgeToEdgeInsets()
        configureWebView()

        swipeRefresh.setOnRefreshListener {
            hasLoadError = false
            offlineView.visibility = View.GONE
            webView.reload()
        }

        retryButton.setOnClickListener {
            hasLoadError = false
            offlineView.visibility = View.GONE
            webView.visibility = View.VISIBLE
            if (webView.url.isNullOrBlank()) {
                webView.loadUrl(HOME_URL)
            } else {
                webView.reload()
            }
            requestConsentAndLoadBanner()
        }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
        } else {
            webView.loadUrl(HOME_URL)
        }

        requestConsentAndLoadBanner()
    }

    private fun applyEdgeToEdgeInsets() {
        val rootContainer: LinearLayout = findViewById(R.id.rootContainer)
        ViewCompat.setOnApplyWindowInsetsListener(rootContainer) { _, windowInsets ->
            val insets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout()
            )
            webContainer.updatePadding(
                left = insets.left,
                top = insets.top,
                right = insets.right
            )
            adContainer.updatePadding(
                left = insets.left,
                right = insets.right,
                bottom = insets.bottom
            )
            WindowInsetsCompat.CONSUMED
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebView() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            useWideViewPort = true
            loadWithOverviewMode = true
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            mediaPlaybackRequiresUserGesture = true
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                if (newProgress in 1..99) {
                    progressBar.visibility = View.VISIBLE
                    progressBar.progress = newProgress
                } else {
                    progressBar.visibility = View.GONE
                    swipeRefresh.isRefreshing = false
                }
            }
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                val uri = request?.url ?: return false
                val scheme = uri.scheme?.lowercase()
                val host = uri.host?.lowercase()

                if ((scheme == "https" || scheme == "http") &&
                    (host == "hanan.fun" || host == "www.hanan.fun" || host?.endsWith(".hanan.fun") == true)
                ) {
                    return false
                }

                return try {
                    startActivity(Intent(Intent.ACTION_VIEW, uri))
                    true
                } catch (_: Exception) {
                    false
                }
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                swipeRefresh.isRefreshing = false
                if (!hasLoadError) {
                    offlineView.visibility = View.GONE
                    webView.visibility = View.VISIBLE
                }
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                if (request?.isForMainFrame == true) {
                    hasLoadError = true
                    swipeRefresh.isRefreshing = false
                    progressBar.visibility = View.GONE
                    webView.visibility = View.INVISIBLE
                    offlineView.visibility = View.VISIBLE
                }
            }
        }
    }

    private fun requestConsentAndLoadBanner() {
        val params = ConsentRequestParameters.Builder().build()
        consentInformation = UserMessagingPlatform.getConsentInformation(this)
        consentInformation.requestConsentInfoUpdate(
            this,
            params,
            {
                UserMessagingPlatform.loadAndShowConsentFormIfRequired(this) { _ ->
                    if (consentInformation.canRequestAds()) {
                        initializeMobileAdsAndLoadBanner()
                    }
                }
            },
            { _ ->
                if (consentInformation.canRequestAds()) {
                    initializeMobileAdsAndLoadBanner()
                }
            }
        )

        if (consentInformation.canRequestAds()) {
            initializeMobileAdsAndLoadBanner()
        }
    }

    private fun initializeMobileAdsAndLoadBanner() {
        if (isMobileAdsInitializeCalled.getAndSet(true)) {
            return
        }

        MobileAds.initialize(this) {
            runOnUiThread {
                loadAdaptiveBanner()
            }
        }
    }

    private fun loadAdaptiveBanner() {
        if (isFinishing || isDestroyed) return

        val bannerAdView = AdView(this).apply {
            adUnitId = BANNER_AD_UNIT_ID
            setAdSize(calculateAdaptiveAdSize())
        }

        adContainer.removeAllViews()
        adContainer.addView(bannerAdView)
        adView = bannerAdView
        bannerAdView.loadAd(AdRequest.Builder().build())
    }

    private fun calculateAdaptiveAdSize(): AdSize {
        val displayMetrics = resources.displayMetrics
        val adWidthPixels = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            windowManager.currentWindowMetrics.bounds.width()
        } else {
            displayMetrics.widthPixels
        }
        val density = displayMetrics.density.coerceAtLeast(1f)
        val adWidthDp = (adWidthPixels / density).toInt().coerceAtLeast(320)
        return AdSize.getLargeAnchoredAdaptiveBannerAdSize(this, adWidthDp)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
        adView?.resume()
    }

    override fun onPause() {
        adView?.pause()
        webView.onPause()
        super.onPause()
    }

    override fun onDestroy() {
        adView?.destroy()
        adView = null
        webView.destroy()
        super.onDestroy()
    }
}
