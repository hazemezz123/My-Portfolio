"use client";

import { m, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const [showRealImage, setShowRealImage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Transition from pixel art to real photo after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);

      // After transition starts, show real image
      setTimeout(() => {
        setShowRealImage(true);
      }, 500);

      // After full transition, set transitioning to false
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2000);
    }, 5000); // Wait 5 seconds before starting transition

    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = () => {
    // Toggle between real image and pixel art
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowRealImage((prev) => !prev);
        setIsTransitioning(false);
      }, 1000);
    }

    setClickEffect(true);
    setTimeout(() => {
      setClickEffect(false);
    }, 300);
  };

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-36 pb-16 sm:pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center dotted-bg"
    >
      <div className="scanline"></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="retro-container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="retro-header inline-block mb-2 px-3 sm:px-4 py-1 sm:py-2"
              >
                <h2 className="text-sm sm:text-lg font-bold text-white">
                  Hello, World! I&apos;m
                </h2>
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4"
              >
                <span className="text-retro-purple">Hazem</span>
                <span className="text-retro-gray"> Ezz</span>
              </m.h1>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 h-10 sm:h-12"
              >
                <TypeAnimation
                  sequence={[
                    "Full Stack Developer",
                    2000,
                    "HITU AI Student",
                    2000,
                    "Scalable Web Solutions",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-retro-blue"
                  repeat={Infinity}
                />
              </m.div>

              <div className="marquee-container">
                <div className="marquee-content">
                  WELCOME TO MY RETRO-STYLED PORTFOLIO WEBSITE ★ ESTABLISHED
                  2024 ★ BUILT WITH NEXT.JS, TAILWIND AND FRAMER MOTION
                </div>
              </div>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-retro-gray text-sm sm:text-base mb-6 sm:mb-8 max-w-lg border-l-4 border-retro-green pl-4"
              >
                I build responsive, scalable web applications with React,
                Next.js, Tailwind CSS, and Laravel. I focus on clean UX,
                reliable integrations, and experiences that feel great to use.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <Link href="#contact">
                  <button className="retro-button font-bold text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                    Get in Touch
                  </button>
                </Link>
                <Link href="#projects">
                  <button className="retro-button font-bold text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                    View Projects
                  </button>
                </Link>
              </m.div>
            </div>

            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="retro-container p-2 relative overflow-hidden">
                <m.div
                  className={`pixel-art-container relative cursor-pointer ${
                    clickEffect ? "scale-95" : ""
                  } ${isTransitioning ? "glitch-effect" : ""}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  onClick={handleImageClick}
                >
                  <div
                    className={`pixel-frame absolute -inset-1 bg-retro-purple ${
                      clickEffect ? "animate-ping-once" : "animate-pulse-slow"
                    }`}
                  ></div>

                  <AnimatePresence mode="wait">
                    {showRealImage ? (
                      <m.div
                        key="real-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                      >
                        <Image
                          src="/images/Hazem.jpg"
                          alt="Hazem Ezz"
                          width={400}
                          height={400}
                          className="relative z-10 real-photo object-cover"
                          style={{
                            width: "auto",
                            height: "400px",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      </m.div>
                    ) : (
                      <m.div
                        key="pixel-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                      >
                        <Image
                          src="/images/PixelArtImg.png"
                          alt="Hazem Ezz Pixel Art"
                          width={400}
                          height={400}
                          className="relative z-10 image-pixelated"
                          style={{
                            width: "auto",
                            height: "400px",
                            imageRendering: "pixelated",
                            objectFit: "contain",
                          }}
                        />
                      </m.div>
                    )}
                  </AnimatePresence>

                  <div className="retro-glitch-effect"></div>

                  {/* Click instruction label - smaller on mobile */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-40">
                    <div className="retro-container bg-retro-gray px-1 py-0.5 scale-75 sm:scale-90">
                      <span className="font-mono text-retro-beige text-[8px] sm:text-[10px] whitespace-nowrap">
                        CLICK TO CHANGE
                      </span>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {(isImageHovered || clickEffect) && (
                      <m.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-10 sm:-top-14 left-1/2 transform -translate-x-1/2 z-40"
                      >
                        <div className="retro-container bg-retro-purple px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm whitespace-nowrap scale-75 sm:scale-100">
                          <span className="font-mono text-white">
                            {showRealImage ? "REALITY MODE!" : "PIXEL MODE!"}
                          </span>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              </div>
            </m.div>
          </div>
        </div>
      </div>

      <div className="absolute right-10 bottom-10 hidden sm:block">
        <div className="retro-container px-2 py-1">
          <span className="text-retro-blue font-mono text-sm blink">▮</span>
        </div>
      </div>
    </section>
  );
}
