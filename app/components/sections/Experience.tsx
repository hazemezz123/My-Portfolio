"use client";

import { m } from "framer-motion";
import { useState, useEffect } from "react";

const experiences = [
  {
    year: "2024 - Present",
    title: "Full-Stack Developer (MERN)",
    company: "Freelancer",
    description:
      "Building high-performance web applications using React.js, Node.js, Express, and MongoDB. Implementing UI/UX animations with Framer Motion and optimizing website performance.",
  },
  {
    year: "2023 - 2024",
    title: "Frontend Developer",
    company: "Freelancer",
    description:
      "Worked on various web projects, focusing on responsive design, React Router, and API integration. Developed e-commerce features and improved accessibility using Tailwind CSS.",
  },
  {
    year: "2022 - 2023",
    title: "Learning Web Development",
    company: "Self-Learning",
    description:
      "Started learning HTML, CSS, and JavaScript. Built small projects to practice frontend development, including landing pages and interactive UI components.",
  },
];

export default function Experience() {
  const [scrollY, setScrollY] = useState(0);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("/Hazem-cv.pdf");

  useEffect(() => {
    // Fetch resume URL
    const fetchResume = async () => {
      try {
        const response = await fetch("/api/config/resume");
        if (response.ok) {
          const data = await response.json();
          if (data.url) setResumeUrl(data.url);
        }
      } catch (error) {
        console.error("Failed to fetch resume URL:", error);
      }
    };

    fetchResume();

    // Handle scroll for parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Check if mobile on initial load and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initialize mobile check
    checkMobile();

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkMobile);

    // Clean up event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
            <span className="text-white">EXPERIENCE</span>
          </h2>
          <div className="w-24 h-1 bg-retro-green mx-auto"></div>
        </m.div>

        <div className="relative overflow-hidden">
          <div className="scanline" style={{ opacity: 0.3 }}></div>
          <div
            className={`absolute left-1/2 top-0 bottom-0 w-1 bg-retro-gray ${
              isMobile ? "hidden md:block" : ""
            }`}
            style={{
              transform: "translateX(-50%)",
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 10px, var(--retro-blue) 10px, var(--retro-blue) 20px)",
            }}
          ></div>

          {/* Mobile timeline line (vertical centered) */}
          {isMobile && (
            <div
              className="absolute left-8 top-0 bottom-0 w-1 bg-retro-gray md:hidden"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 10px, var(--retro-blue) 10px, var(--retro-blue) 20px)",
              }}
            ></div>
          )}

          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`mb-16 relative ${
                  isMobile
                    ? "ml-0 mr-0 pl-16 text-left" // Mobile: all cards on right side of vertical line
                    : index % 2 === 0
                      ? "text-right mr-auto ml-0" // Desktop: even cards on left
                      : "text-left ml-auto mr-0" // Desktop: odd cards on right
                }`}
                style={{
                  width: isMobile ? "100%" : "calc(50% - 20px)",
                  marginTop: index === 0 ? "0" : "-20px",
                  transform: !isMobile
                    ? `translateY(${
                        scrollY * 0.02 * (index % 2 === 0 ? -1 : 1)
                      }px)`
                    : "none", // Disable parallax on mobile
                }}
                onMouseEnter={() => setActiveItem(index)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <div
                  className={`retro-container relative p-4 md:p-6 ${
                    activeItem === index
                      ? "bg-retro-beige border-retro-blue"
                      : ""
                  }`}
                >
                  {/* Desktop connector lines */}
                  {!isMobile && (
                    <div
                      className={`absolute top-1/2 ${
                        index % 2 === 0 ? "left-full" : "right-full"
                      } w-5 h-1 bg-retro-gray`}
                      style={{ transform: "translateY(-50%)" }}
                    ></div>
                  )}

                  {/* Mobile connector line (always on left) */}
                  {isMobile && (
                    <div
                      className="absolute top-1/2 left-[-14px] w-5 h-1 bg-retro-gray md:hidden"
                      style={{ transform: "translateY(-50%)" }}
                    ></div>
                  )}

                  {/* Timeline dot/point */}
                  <div
                    className={`absolute ${
                      isMobile
                        ? "hidden" // Hide completely on mobile
                        : index % 2 === 0
                          ? "left-full ml-4" // Desktop: even cards dot on right
                          : "right-full mr-4" // Desktop: odd cards dot on left
                    } top-1/2 transform -translate-y-1/2 w-3 h-3 retro-container p-0 border-2 ${
                      activeItem === index
                        ? "border-retro-blue bg-retro-yellow"
                        : "border-retro-gray bg-retro-beige"
                    }`}
                  ></div>

                  <div className="font-mono text-xs text-retro-blue mb-1">
                    {exp.year}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <div className="text-retro-purple font-bold mb-2">
                    {exp.company}
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href={resumeUrl}
            download={resumeUrl.split("/").pop() || "resume.pdf"}
            className="hidden md:inline-block retro-container mx-auto cursor-pointer"
          >
            <div className="font-mono">
              <div className="mb-2">
                &gt; <span className="text-retro-blue">resume.exe</span>
              </div>
              <div className="text-retro-green blink">
                Download my full resume
              </div>
            </div>
          </a>

          {/* Mobile version of resume button without retro container */}
          <a
            href={resumeUrl}
            download={resumeUrl.split("/").pop() || "resume.pdf"}
            className="md:hidden inline-block mx-auto cursor-pointer"
          >
            <div className="font-mono">
              <div className="mb-2">
                <span className="text-retro-blue">resume.exe</span>
              </div>
              <div className="text-retro-green blink">
                Download my full resume
              </div>
            </div>
          </a>
        </m.div>
      </div>
    </section>
  );
}
