import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Maximize, Minimize } from 'lucide-react';

const VideoPlayer = ({ videoUrl, thumbnailUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Video playback failed:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setIsFullscreen(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full rounded-xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnailUrl}
        playsInline
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"
          >
            <div className="absolute top-4 right-4 space-x-2">
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              {isFullscreen && (
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="p-4 rounded-full bg-accent-100/90 text-dark-100 hover:bg-accent-100 transition-colors backdrop-blur-sm"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
              </motion.button>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-lg font-semibold">{title}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
