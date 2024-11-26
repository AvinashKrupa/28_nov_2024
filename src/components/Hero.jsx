import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Hero = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const controls = useAnimation();
  const contentControls = useAnimation();

  // Transform values for parallax effect
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    // Preload video
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Video autoplay failed:", error);
        });
      }
    }
  }, []);

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      await Promise.all([
        controls.start({
          y: [0, window.innerHeight],
          scale: [1, 2],
          transition: { duration: 1.5, ease: "easeInOut" }
        }),
        contentControls.start({
          opacity: 0,
          transition: { duration: 0.75, ease: "easeOut" }
        })
      ]);
      
      navigate('/signup');
    }
  };

  const titleVariants = {
    initial: { 
      y: 0,
      scale: 1
    },
    animate: {
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5
      }
    },
    exit: {
      y: window.innerHeight,
      scale: 2,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.75,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-dark-100 overflow-hidden">
      {/* Background Video */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/80 via-dark-100/60 to-dark-100/80" />
      </motion.div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 container mx-auto px-6 pt-32"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-light text-white mb-4"
          >
            Welcome To
          </motion.h2>
          <motion.h1 
            variants={titleVariants}
            initial="initial"
            animate={controls}
            className="text-8xl md:text-9xl font-bold text-white cursor-default"
          >
            SacredSecret
          </motion.h1>
        </div>

        <motion.div 
          variants={contentVariants}
          initial="initial"
          animate={contentControls}
          className="grid md:grid-cols-12 gap-12 items-center max-w-8xl mx-auto"
        >
          {/* Main Content - Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-7 text-left"
          >
            <div className="space-y-6">
              <p className="text-xl md:text-4xl leading-relaxed text-white font-semibold">
                "SacredSecret empowers individuals with rights over their assets, both in digital and physical form. The name allows users to select their nominee according to their wishes and choose who will inherit or access their assets. "Sacred" refers to the sanctity of their will, which is kept a Secret, shared only with the chosen individual, and independent of defined societal/system norms."
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="mt-12 px-12 py-6 text-2xl font-semibold rounded-2xl bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 hover:opacity-90 transition-opacity"
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Video Thumbnail - Right Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-5 relative"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80"
                alt="Digital Security"
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-dark-100/20 to-dark-100/60" />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-accent-100/90 flex items-center justify-center backdrop-blur-sm border-2 border-light-100/20"
              >
                <Play className="w-12 h-12 text-dark-100 ml-1" />
              </motion.button>
            </div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-2xl font-semibold text-center mt-6 text-white"
            >
              Let's Hear What Is SacredSecret
            </motion.h3>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;