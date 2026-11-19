plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

val appVersionCodeProp = (project.findProperty("appVersionCode") as String?)?.toIntOrNull() ?: 2
val appVersionNameProp = (project.findProperty("appVersionName") as String?) ?: "2.0"

val keystorePathEnv = System.getenv("ANDROID_KEYSTORE_PATH")
val keystoreFileObj = if (!keystorePathEnv.isNullOrBlank()) file(keystorePathEnv) else file("release.keystore")
val hasKeystore = keystoreFileObj.exists()

android {
    namespace = "com.hanan.gis"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.hanan.gis"
        minSdk = 24
        targetSdk = 36
        versionCode = appVersionCodeProp
        versionName = appVersionNameProp
    }

    signingConfigs {
        if (hasKeystore) {
            create("release") {
                storeFile = keystoreFileObj
                storePassword = System.getenv("ANDROID_KEYSTORE_PASSWORD")?.ifBlank { "android" } ?: "android"
                keyAlias = System.getenv("ANDROID_KEY_ALIAS")?.ifBlank { "androidkey" } ?: "androidkey"
                keyPassword = System.getenv("ANDROID_KEY_PASSWORD")?.ifBlank { "android" } ?: "android"
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            if (hasKeystore) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
        debug {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.16.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.activity:activity-ktx:1.10.1")
    implementation("androidx.swiperefreshlayout:swiperefreshlayout:1.1.0")
    implementation("com.google.android.gms:play-services-ads:25.5.0")
}
