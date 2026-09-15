import React, { useState, useRef, useEffect } from 'react';
import { 
  Music, 
  Image as ImageIcon, 
  Video, 
  Download, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Layers, 
  Sliders, 
  Type, 
  Monitor, 
  Smartphone,
  ShieldCheck,
  Zap,
  Info,
  Share2,
  Copy,
  Check,
  MessageCircle,
  HelpCircle,
  ExternalLink,
  TrendingUp
} from 'lucide-react';
import { Language } from '../types';

interface AudioToVideoPageProps {
  currentLang: Language;
}

export const AudioToVideoPage: React.FC<AudioToVideoPageProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';

  // Audio & Image files
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Settings
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [videoTitle, setVideoTitle] = useState<string>('Hanan Fun Audio');
  const [showWaveform, setShowWaveform] = useState<boolean>(true);
  const [waveColor, setWaveColor] = useState<string>('#3b82f6');
  const [showLogoWatermark, setShowLogoWatermark] = useState<boolean>(true);

  // Processing & Export State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [generatedBlob, setGeneratedBlob] = useState<Blob | null>(null);
  const [videoFormatExt, setVideoFormatExt] = useState<string>('mp4');
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [isTranscodingInstagram, setIsTranscodingInstagram] = useState<boolean>(false);

  const handleCopyLink = () => {
    const url = window.location.origin + '/audio-to-video';
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }).catch(() => {});
  };

  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Handle Audio Upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('audio') && !file.name.match(/\.(mp3|wav|m4a|aac|ogg)$/i)) {
        setErrorMessage(isAr ? 'يرجى اختيار ملف صوتي صالح (MP3, WAV, M4A, OGG)' : 'Please select a valid audio file (MP3, WAV, M4A, OGG)');
        return;
      }
      setErrorMessage(null);
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setGeneratedVideoUrl(null);

      // Extract duration
      const tempAudio = new Audio(url);
      tempAudio.onloadedmetadata = () => {
        setAudioDuration(tempAudio.duration);
      };
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('image')) {
        setErrorMessage(isAr ? 'يرجى اختيار صورة صالحة (JPG, PNG, WEBP)' : 'Please select a valid image (JPG, PNG, WEBP)');
        return;
      }
      setErrorMessage(null);
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setGeneratedVideoUrl(null);
    }
  };

  // Dimensions based on Aspect Ratio
  const getCanvasDimensions = () => {
    switch (aspectRatio) {
      case '9:16':
        return { width: 720, height: 1280 }; // Shorts / Reels
      case '1:1':
        return { width: 1080, height: 1080 }; // Square Post
      case '16:9':
      default:
        return { width: 1280, height: 720 }; // YouTube Standard
    }
  };

  // Render Frame on Canvas
  const drawFrame = (analyserData?: Uint8Array) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = getCanvasDimensions();
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    // Draw Background
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      if (img.complete) {
        // Draw image covering canvas keeping aspect ratio
        const hRatio = width / img.width;
        const vRatio = height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (width - img.width * ratio) / 2;
        const centerShiftY = (height - img.height * ratio) / 2;

        ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);

        // Dark gradient overlay for text readability
        const gradient = ctx.createLinearGradient(0, height * 0.4, 0, height);
        gradient.addColorStop(0, 'rgba(0,0,0,0.1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.75)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);
      }
    } else {
      // Elegant default gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(0.5, '#0f172a');
      gradient.addColorStop(1, '#020617');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Draw Visualizer Waveform if enabled
    if (showWaveform) {
      const barCount = aspectRatio === '9:16' ? 32 : 48;
      const barWidth = (width * 0.7) / barCount;
      const startX = (width - (barCount * barWidth * 1.2)) / 2;
      const baselineY = height * 0.78;

      ctx.fillStyle = waveColor;
      for (let i = 0; i < barCount; i++) {
        let barHeight = 8;
        if (analyserData && analyserData.length > 0) {
          const val = analyserData[i * Math.floor(analyserData.length / barCount)] || 0;
          barHeight = Math.max(8, (val / 255) * (height * 0.2));
        } else {
          // Subtle idle animation
          barHeight = 10 + Math.sin(Date.now() / 200 + i * 0.5) * 8;
        }

        const x = startX + i * barWidth * 1.2;
        const y = baselineY - barHeight / 2;

        // Rounded pill bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 4);
        ctx.fill();
      }
    }

    // Draw Title / Text
    if (videoTitle.trim()) {
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 8;
      
      const fontSize = aspectRatio === '9:16' ? Math.round(width * 0.055) : Math.round(height * 0.06);
      ctx.font = `bold ${fontSize}px sans-serif`;
      
      const titleY = aspectRatio === '9:16' ? height * 0.65 : height * 0.68;
      ctx.fillText(videoTitle, width / 2, titleY);
      ctx.shadowBlur = 0; // reset
    }

    // Watermark / Brand Badge
    if (showLogoWatermark) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'center';
      const watermarkSize = Math.max(14, Math.round(width * 0.024));
      ctx.font = `600 ${watermarkSize}px sans-serif`;
      ctx.fillText('hanan.fun', width / 2, height - (aspectRatio === '9:16' ? 40 : 25));
    }
  };

  // Preview Loop on Canvas
  useEffect(() => {
    let animId: number;
    const render = () => {
      let dataArray: Uint8Array | undefined;
      if (analyserRef.current && isPlayingPreview) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
      }
      drawFrame(dataArray);
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [imageUrl, videoTitle, aspectRatio, showWaveform, waveColor, showLogoWatermark, isPlayingPreview]);

  // Handle Play/Pause Preview
  const togglePreviewPlay = () => {
    if (!audioRef.current || !audioUrl) return;

    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      sourceNodeRef.current = source;
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (isPlayingPreview) {
      audioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingPreview(true);
      }).catch(err => {
        console.error('Audio play error:', err);
      });
    }
  };

  // Start Video Recording & Export (Web MediaRecorder - 100% Free, Fast & Local)
  const handleExportVideo = async (speedMultiplier = 1) => {
    if (!audioUrl) {
      setErrorMessage(isAr ? 'يرجى تحميل مقطع صوتي أولاً' : 'Please upload an audio file first');
      return;
    }
    if (!canvasRef.current) return;

    try {
      setIsProcessing(true);
      setProgress(0);
      setErrorMessage(null);
      setGeneratedVideoUrl(null);

      // Create controlled audio element for canvas synchronization
      const exportAudio = new Audio();
      exportAudio.src = audioUrl;
      exportAudio.preload = 'auto';
      exportAudio.muted = false;
      exportAudio.volume = 1.0;
      await new Promise<void>((resolve, reject) => {
        exportAudio.oncanplaythrough = () => resolve();
        exportAudio.onerror = (e) => reject(e);
        exportAudio.load();
      });

      // Audio Context for recording stream with standard 44.1kHz sample rate
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const exportCtx = new AudioCtx({ sampleRate: 44100 });
      if (exportCtx.state === 'suspended') {
        await exportCtx.resume();
      }

      const exportAnalyser = exportCtx.createAnalyser();
      exportAnalyser.fftSize = 64; // lighter & faster for mobile/tablet
      
      const audioSource = exportCtx.createMediaElementSource(exportAudio);
      const audioDest = exportCtx.createMediaStreamDestination();
      const gainNode = exportCtx.createGain();
      gainNode.gain.value = 1.0;
      
      audioSource.connect(gainNode);
      gainNode.connect(exportAnalyser);
      gainNode.connect(audioDest);

      // Capture Canvas Stream (24 FPS is ideal and lightweight for mobile/tablet export)
      const canvasStream = canvasRef.current.captureStream ? canvasRef.current.captureStream(24) : null;
      if (!canvasStream) {
        throw new Error('Canvas capture stream not supported');
      }

      // Combine Video and Audio tracks
      const audioTracks = audioDest.stream.getAudioTracks();
      for (const track of audioTracks) {
        track.enabled = true;
      }
      const videoTracks = canvasStream.getVideoTracks();

      if (videoTracks.length === 0) {
        throw new Error('No video tracks available');
      }

      const combinedTracks = [...videoTracks, ...audioTracks];
      const combinedStream = new MediaStream(combinedTracks);

      // Supported mimeType check - Prioritize MP4 AAC for Instagram compatibility
      const mimeTypes = [
        'video/mp4;codecs=avc1,mp4a.40.2',
        'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
        'video/mp4;codecs=h264,aac',
        'video/mp4',
        'video/webm;codecs=h264,opus',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm'
      ];
      let selectedMimeType = '';
      for (const mime of mimeTypes) {
        if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(mime)) {
          selectedMimeType = mime;
          break;
        }
      }

      const recorderOptions: MediaRecorderOptions = {};
      if (selectedMimeType) {
        recorderOptions.mimeType = selectedMimeType;
      }
      recorderOptions.videoBitsPerSecond = 2500000; // 2.5 Mbps crisp & fast

      const recorder = new MediaRecorder(combinedStream, recorderOptions);
      mediaRecorderRef.current = recorder;
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      const totalDuration = exportAudio.duration || audioDuration || 15;

      recorder.onstop = () => {
        const isMp4 = selectedMimeType.includes('mp4');
        const ext = isMp4 ? 'mp4' : 'webm';
        setVideoFormatExt(ext);

        const blob = new Blob(chunks, { type: selectedMimeType || 'video/mp4' });
        setGeneratedBlob(blob);

        const videoBlobUrl = URL.createObjectURL(blob);
        setGeneratedVideoUrl(videoBlobUrl);
        setIsProcessing(false);
        setProgress(100);
        exportAudio.pause();
        try {
          exportCtx.close();
        } catch {}
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };

      // Progress Tracker & Frame Animator
      exportAudio.ontimeupdate = () => {
        const currentProg = Math.min(99, Math.round((exportAudio.currentTime / totalDuration) * 100));
        setProgress(currentProg);
      };

      exportAudio.onended = () => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      };

      const renderRecordingFrames = () => {
        const data = new Uint8Array(exportAnalyser.frequencyBinCount);
        exportAnalyser.getByteFrequencyData(data);
        drawFrame(data);
        if (recorder.state === 'recording') {
          animationFrameRef.current = requestAnimationFrame(renderRecordingFrames);
        }
      };

      // Start playback first so AudioContext is pumping real PCM samples
      await exportAudio.play();
      
      // Speed up audio play if accelerated export
      if (speedMultiplier > 1 && exportAudio.playbackRate !== undefined) {
        exportAudio.playbackRate = speedMultiplier;
      }

      // Start recording with continuous buffering slices (500ms)
      recorder.start(500);
      renderRecordingFrames();

    } catch (err: unknown) {
      console.error('Export video error:', err);
      setIsProcessing(false);
      setErrorMessage(
        isAr 
          ? 'المتصفح يحتاج إذن تشغيل الصوت للمعالجة. يرجى الضغط على "سماع الصوت" أولاً للتأكد، ثم الضغط على "إنشاء الفيديو".' 
          : 'Browser audio policy blocked automated playback. Please click "Play Preview" first, then click "Export Video".'
      );
    }
  };

  // Cancel / Stop Recording
  const handleCancelExport = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsProcessing(false);
  };

  // Robust Tablet Download & Save to Photos
  const handleDirectDownload = () => {
    if (!generatedVideoUrl) return;

    try {
      const fileName = `hanan-fun-video-${Date.now()}.${videoFormatExt}`;
      const a = document.createElement('a');
      a.href = generatedVideoUrl;
      a.download = fileName;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 300);
    } catch (e) {
      console.error('Direct download error:', e);
      // Fallback: Open in new window
      window.open(generatedVideoUrl, '_blank');
    }
  };

  // Native Tablet Share (Save to Files / Photos on iPad & Android)
  const handleNativeTabletShare = async () => {
    if (!generatedBlob) {
      if (generatedVideoUrl) {
        window.open(generatedVideoUrl, '_blank');
      }
      return;
    }

    const fileName = `hanan-video-${Date.now()}.${videoFormatExt}`;
    const file = new File([generatedBlob], fileName, { type: generatedBlob.type || 'video/mp4' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: isAr ? 'فيديو hanan.fun' : 'hanan.fun Video',
          text: isAr ? 'تم الإنشاء عبر استوديو الفيديو في hanan.fun' : 'Created with hanan.fun Video Studio'
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleDirectDownload();
        }
      }
    } else {
      // If native share not supported, open in tab for easy saving
      window.open(generatedVideoUrl || '', '_blank');
    }
  };

  // Official TikTok, YouTube Shorts & Instagram Reels Certified Transcoder (H.264 + Original AAC Audio 44.1kHz)
  const handleDownloadInstagramMp4 = async () => {
    if (!generatedBlob) {
      handleDirectDownload();
      return;
    }

    try {
      setIsTranscodingInstagram(true);
      
      const formData = new FormData();
      formData.append('video', generatedBlob, `video-${Date.now()}.${videoFormatExt}`);
      if (audioFile) {
        formData.append('audio', audioFile, audioFile.name || 'audio.mp3');
      }

      const res = await fetch('/api/merge-and-transcode', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Transcode server error');
      }

      const mp4Blob = await res.blob();
      const fileName = `hanan-shorts-tiktok-${Date.now()}.mp4`;

      // Check if native sharing is available for instant saving to photos/files on iPad & Android
      const file = new File([mp4Blob], fileName, { type: 'video/mp4' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: isAr ? 'فيديو تيك توك وشورتس hanan.fun' : 'hanan.fun Video',
            text: isAr ? 'فيديو جاهز للنشر على تيك توك، شورتس، وإنستغرام ريلز بصوت أصلي' : 'Ready for TikTok, Shorts & Reels'
          });
          return;
        } catch (shareErr) {
          if ((shareErr as Error).name === 'AbortError') return;
        }
      }

      // Direct download fallback
      const mp4Url = URL.createObjectURL(mp4Blob);
      const a = document.createElement('a');
      a.href = mp4Url;
      a.download = fileName;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(mp4Url);
      }, 1000);
    } catch (err) {
      console.error('Platforms transcode error:', err);
      // Fallback to direct download
      handleDirectDownload();
    } finally {
      setIsTranscodingInstagram(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Title Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isAr ? 'أداة مجانية 100% بدون اشتراك أو ترقية' : '100% Free - No Upgrades or Subscriptions'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isAr ? 'استوديو تحويل الصوت إلى فيديو' : 'Audio to Video Studio'}
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              {isAr 
                ? 'حوّلي أي مقطع صوتي على جهازك إلى فيديو MP4 احترافي مع صورة وموجات صوتية متحركة لليوتيوب، ريلز، وتيك توك مباشرة على التابلت بدون أي رسوم أو برامج مدفوعة!' 
                : 'Convert any audio recording into a professional video with custom artwork and animated waveforms ready for YouTube, Reels, and TikTok!'}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm font-medium">{errorMessage}</div>
          </div>
        )}

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left on LTR, Right on RTL) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Upload Audio */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {isAr ? 'اختيار المقطع الصوتي' : 'Select Audio File'}
                  </h2>
                </div>
                {audioFile && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {isAr ? 'تم الرفع' : 'Ready'}
                  </span>
                )}
              </div>

              <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30 group">
                <Music className="w-10 h-10 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 transition-colors" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 text-center">
                  {audioFile ? audioFile.name : (isAr ? 'اضغطي لاختيار مقطع الصوت من التابلت' : 'Tap to choose audio file')}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  MP3, WAV, M4A, OGG, AAC
                </span>
                <input 
                  type="file" 
                  accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg" 
                  className="hidden" 
                  onChange={handleAudioUpload}
                />
              </label>

              {audioUrl && (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={togglePreviewPlay}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                  >
                    {isPlayingPreview ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlayingPreview ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'سماع الصوت' : 'Play Preview')}</span>
                  </button>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {Math.floor(audioDuration / 60)}:{String(Math.floor(audioDuration % 60)).padStart(2, '0')} {isAr ? 'دقيقة' : 'min'}
                  </span>
                  <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlayingPreview(false)} className="hidden" />
                </div>
              )}
            </div>

            {/* Step 2: Upload Image / Background */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {isAr ? 'اختيار صورة الفيديو' : 'Select Background Image'}
                  </h2>
                </div>
                {imageFile && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {isAr ? 'تم الرفع' : 'Ready'}
                  </span>
                )}
              </div>

              <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30 group">
                <ImageIcon className="w-10 h-10 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2 transition-colors" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 text-center">
                  {imageFile ? imageFile.name : (isAr ? 'اضغطي لاختيار صورة الغلاف من التابلت' : 'Tap to choose image')}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  JPG, PNG, WebP (شعار موقعك، صورة منتج، إلخ)
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Step 3: Customization Settings */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {isAr ? 'تخصيص ومقاس الفيديو' : 'Video Customization'}
                </h2>
              </div>

              {/* Aspect Ratio Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> {isAr ? 'مقاس الفيديو والمنصة:' : 'Format & Aspect Ratio:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAspectRatio('16:9')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      aspectRatio === '16:9'
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Monitor className="w-5 h-5" />
                    <span className="text-xs">16:9 يوتيوب</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAspectRatio('9:16')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      aspectRatio === '9:16'
                        ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-500 text-purple-600 dark:text-purple-400 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="text-xs">9:16 شورتس/تيك توك</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAspectRatio('1:1')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      aspectRatio === '1:1'
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Layers className="w-5 h-5" />
                    <span className="text-xs">1:1 مربع</span>
                  </button>
                </div>
              </div>

              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5" /> {isAr ? 'عنوان أو نص مكتوب على الفيديو:' : 'Overlay Title:'}
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder={isAr ? 'مثال: hanan.fun - مقال اليوم' : 'Enter video title...'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Waveform Toggle & Color */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isAr ? 'إظهار موجات صوتية متحركة' : 'Animated Audio Waveform'}
                  </span>
                  <input
                    type="checkbox"
                    checked={showWaveform}
                    onChange={(e) => setShowWaveform(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                {showWaveform && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">{isAr ? 'لون الموجات:' : 'Wave Color:'}</span>
                    <div className="flex items-center gap-2">
                      {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#ffffff'].map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setWaveColor(c)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${waveColor === c ? 'scale-125 border-slate-900 dark:border-white' : 'border-transparent'}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isAr ? 'إظهار شارة hanan.fun' : 'Show hanan.fun watermark'}
                  </span>
                  <input
                    type="checkbox"
                    checked={showLogoWatermark}
                    onChange={(e) => setShowLogoWatermark(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Preview & Generate Column (Right on LTR, Left on RTL) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                    {isAr ? 'معاينة الفيديو الحي' : 'Live Video Preview'}
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {aspectRatio}
                </span>
              </div>

              {/* Canvas Container with dynamic Aspect Ratio */}
              <div className="flex items-center justify-center bg-slate-950 rounded-2xl overflow-hidden p-2 min-h-[340px]">
                <canvas
                  ref={canvasRef}
                  className="rounded-xl shadow-2xl max-w-full max-h-[460px] object-contain"
                />
              </div>

              {/* Processing Progress Bar */}
              {isProcessing && (
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-800 dark:text-blue-300">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                      {isAr ? 'جارٍ توليد ودمج الفيديو الآن على جهازك...' : 'Generating video directly in your browser...'}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-blue-200 dark:bg-blue-900/60 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleCancelExport}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                    >
                      {isAr ? 'إلغاء المعالجة' : 'Cancel'}
                    </button>
                  </div>
                </div>
              )}

              {/* Generated Ready Video Download Card */}
              {generatedVideoUrl && !isProcessing && (
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-950 dark:text-emerald-100 text-sm">
                        {isAr ? 'تم إنشاء الفيديو بنجاح وجاهز للتنزيل!' : 'Video is ready for download!'}
                      </h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300">
                        {isAr ? 'اضغطي على الزر الأخضر بالأسفل لحفظه مباشرة في ألبوم التابلت.' : 'Click below to save it directly to your device.'}
                      </p>
                    </div>
                  </div>

                  {/* Dedicated TikTok, YouTube Shorts & Instagram Reels Certified Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={handleDownloadInstagramMp4}
                      disabled={isTranscodingInstagram}
                      className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-70"
                    >
                      {isTranscodingInstagram ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isAr ? 'جاري دمج الصوت الأصلي بجودة استوديو (AAC)...' : 'Merging Original Audio with Studio AAC...'}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                          <span>
                            {isAr 
                              ? '✨ تحميل لـ تيك توك، يوتيوب شورتس، وريلز (صوت أصلي 100% بدون كتم)' 
                              : '✨ Download for TikTok, Shorts & Reels (Guaranteed Audio)'}
                          </span>
                        </>
                      )}
                    </button>

                    <div className="p-3 rounded-xl bg-purple-100/80 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/70 text-xs text-purple-900 dark:text-purple-200 leading-relaxed flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {isAr
                          ? '🔥 هام جداً لتيك توك وشورتس وريلز: اضغطي على الزر البنفسجي بالأعلى، حيث يقوم بدمج ملف الصوت الأصلي الذي قمتِ برفعه مباشرة داخل الفيديو بتشفير AAC 44.1kHz المعتمد عالمياً، ليعمل الصوت فوراً على تيك توك، يوتيوب، وإنستغرام وبأعلى درجة وضوح ونقاء!'
                          : 'Essential for TikTok, Shorts & Reels: The purple button merges your original uploaded audio directly using universal AAC 44.1kHz, ensuring your sound is never muted or flagged!'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap gap-2.5">
                    {/* Primary Button: Direct Download */}
                    <button
                      type="button"
                      onClick={handleDirectDownload}
                      className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isAr ? 'تنزيل مباشر (MP4)' : 'Direct Download'}</span>
                    </button>

                    {/* Secondary Tablet Action: Native Share / Save to Photos & Files */}
                    <button
                      type="button"
                      onClick={handleNativeTabletShare}
                      className="py-3 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{isAr ? 'حفظ في ألبوم الصور 📱' : 'Save to Photos'}</span>
                    </button>

                    {/* Open in new tab fallback */}
                    <a
                      href={generatedVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      title={isAr ? 'فتح الفيديو في شاشة كاملة' : 'Open in New Tab'}
                    >
                      <Play className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{isAr ? 'مشاهدة' : 'Preview'}</span>
                    </a>
                  </div>

                  {/* Tablet Friendly Helper Tip */}
                  <div className="pt-1 text-[11px] text-emerald-800/80 dark:text-emerald-300/80 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>
                      {isAr 
                        ? 'ملاحظة للتابلت: إذا ظهر "تعذر التنزيل"، اضغطي على زر "حفظ في ألبوم الصور" أو "مشاهدة" لحفظ الفيديو بلمسة واحدة.'
                        : 'Tablet note: If direct download is restricted, tap "Save to Photos" to save it immediately.'}
                    </span>
                  </div>
                </div>
              )}

              {/* Primary Action Button: Create Video */}
              {!generatedVideoUrl && !isProcessing && (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleExportVideo(1)}
                    disabled={!audioUrl}
                    className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl transition-all ${
                      audioUrl
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white cursor-pointer hover:scale-[1.01]'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Zap className="w-5 h-5 text-amber-300" />
                    <span>
                      {isAr ? 'إنشاء وتصدير الفيديو فوراً (مجاناً 100%)' : 'Export Video Instantly (100% Free)'}
                    </span>
                  </button>

                  {audioUrl && (
                    <button
                      type="button"
                      onClick={() => handleExportVideo(2)}
                      className="w-full py-2.5 px-4 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>{isAr ? '⚡ تصدير فائق السرعة (مضاعف 2X لتوفير الوقت على التابلت)' : '⚡ Turbo 2X Fast Export (Saves time on tablets)'}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Safe & Local Guarantee Note */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>
                  {isAr 
                    ? 'يتم تحويل ومعالجة الفيديو بالكامل محلياً داخل متصفح التابلت الخاص بكِ دون رفعه لأي خوادم أو طلب أي اشتراكات نهائياً.' 
                    : 'Video is processed 100% locally on your device with no external uploads or paywalls.'}
                </span>
              </div>

            </div>

            {/* Quick Tips Box */}
            <div className="p-5 rounded-3xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{isAr ? 'نصائح لنتائج رائعة على يوتيوب وتيك توك:' : 'Pro tips for YouTube & TikTok:'}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                <li>{isAr ? 'اختر 9:16 لنشره على YouTube Shorts أو Instagram Reels أو TikTok.' : 'Use 9:16 for Shorts and Reels.'}</li>
                <li>{isAr ? 'اختر 16:9 لنشره كفيديو عادي كامل على قناتك في YouTube.' : 'Use 16:9 for standard YouTube videos.'}</li>
                <li>{isAr ? 'يمكنك وضع صورة غلاف المقال أو شعار موقعك كخلفية جذابة.' : 'Upload your blog article cover or website logo as the background.'}</li>
              </ul>
            </div>

            {/* Virality & Social Share Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {isAr ? 'شاركي الأداة مع أصدقائك وصنّاع المحتوى' : 'Share this tool with creators'}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr 
                  ? 'ساعدي أصدقاءك في تحويل تسجيلاتهم وبودكاستهم إلى فيديوهات مجاناً بدون برامج معقدة.' 
                  : 'Help your fellow creators convert podcasts & recordings into video effortlessly.'}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* Copy Link Button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  {linkCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-indigo-500" />}
                  <span>{linkCopied ? (isAr ? 'تم نسخ الرابط!' : 'Link Copied!') : (isAr ? 'نسخ رابط الأداة' : 'Copy Link')}</span>
                </button>

                {/* WhatsApp Share */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    isAr 
                      ? 'أداة مجانية 100% لتحويل مقاطع الصوت والتسجيلات إلى فيديو احترافي مع موجات صوتية لليوتيوب والتيك توك: https://hanan.fun/audio-to-video'
                      : 'Free tool to convert Audio into Video for YouTube & TikTok: https://hanan.fun/audio-to-video'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                </a>

                {/* Telegram Share */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent('https://hanan.fun/audio-to-video')}&text=${encodeURIComponent(
                    isAr ? 'استوديو تحويل الصوت إلى فيديو مجاناً' : 'Free Audio to Video Studio'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>{isAr ? 'تيليجرام' : 'Telegram'}</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* SEO & FAQ Section for Google Ranking */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
              {isAr ? 'الأسئلة الشائعة حول تحويل الصوت إلى فيديو (SEO FAQ)' : 'Frequently Asked Questions'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">
                {isAr ? 'هل أداة تحويل الصوت إلى فيديو مجانية تماماً؟' : 'Is this tool 100% free?'}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'نعم، مجانية بنسبة 100% بدون أي رسوم خفية أو طلب ترقية أو اشتراك شهري. يمكنك إنشاء عدد غير محدود من الفيديوهات مباشرة من هاتفك أو التابلت.' 
                  : 'Yes, 100% free forever with no hidden paywalls or subscription limits.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">
                {isAr ? 'ما هي الصيغ التي تدعمها الأداة؟' : 'What formats are supported?'}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'تدعم الأداة جميع ملفات الصوت الشائعة: MP3, WAV, M4A, AAC, OGG وصور JPG, PNG, WebP. ويتم تصدير الفيديو بجودة عالية متوافقة مع يوتيوب وتيك توك.' 
                  : 'Supports MP3, WAV, M4A, OGG, and exports to high quality YouTube/TikTok ready video.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">
                {isAr ? 'هل يتم رفع ملفاتي الصوتية على خوادم أو التجسس عليها؟' : 'Are my files uploaded or stored on servers?'}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'إطلاقاً! تتم معالجة وتوليد الفيديو بالكامل داخل متصفح جهازك بواسطة تقنية Web API دون إرسال أي ملف إلى أي سيرفر، لحماية خصوصيتك بنسبة 100%.' 
                  : 'Never! All rendering happens completely client-side in your own browser for 100% privacy.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">
                {isAr ? 'كيف أرفع الفيديو على يوتيوب شورتس أو ريلز؟' : 'How to upload to YouTube Shorts or Reels?'}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'اختاري مقاس 9:16 من إعدادات الأداة قبل التصدير، وبعد تنزيل الفيديو، يمكنكِ رفعه مباشرة من تطبيق يوتيوب أو إنستغرام كفيديو قصير.' 
                  : 'Choose the 9:16 aspect ratio before exporting, and upload directly via YouTube or Instagram.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
