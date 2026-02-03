"use client";

import { m } from "framer-motion";
import { useState, useEffect, useCallback, memo } from "react";

// Define proper types for skills
interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React.js", icon: "⚛️", level: 90 },
      { name: "Next.js", icon: "🔼", level: 85 },
      { name: "TypeScript", icon: "📘", level: 80 },
      { name: "Tailwind CSS", icon: "🌊", level: 85 },
      { name: "HTML5", icon: "💻", level: 95 },
      { name: "CSS3", icon: "🎨", level: 90 },
      { name: "JavaScript", icon: "📜", level: 85 },
      { name: "Framer Motion", icon: "✨", level: 80 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "PHP", icon: "🐘", level: 85 },
      { name: "Laravel", icon: "🧱", level: 80 },
      { name: "MySQL", icon: "🗃️", level: 80 },
      { name: "Node.js", icon: "🟢", level: 60 },
      { name: "Express", icon: "🚂", level: 60 },
      { name: "REST APIs", icon: "🔌", level: 70 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: "🔄", level: 85 },
      { name: "VS Code", icon: "📝", level: 90 },
      { name: "Cursor AI", icon: "🤖", level: 95 },
      { name: "Postman", icon: "📮", level: 80 },
    ],
  },
  {
    name: "Other",
    skills: [
      { name: "Responsive Design", icon: "📱", level: 90 },
      { name: "Web App Design", icon: "🧭", level: 85 },
      { name: "Service Integration", icon: "🔗", level: 80 },
      { name: "Skills Testing", icon: "🧪", level: 75 },
      { name: "Python Applications", icon: "🐍", level: 85 },
      { name: "Performance Opt.", icon: "⚡", level: 70 },
      { name: "Security Basics", icon: "🔒", level: 75 },
      { name: "Problem Solving", icon: "🧩", level: 80 },
      { name: "Team Leadership", icon: "👥", level: 80 },
    ],
  },
];

// Memoized skill item to prevent unnecessary re-renders
const SkillItem = memo(({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <m.div
      key={skill.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="retro-container p-4 flex flex-col items-center text-center"
    >
      <div
        className="text-4xl mb-2"
        role="img"
        aria-label={`${skill.name} icon`}
      >
        {skill.icon}
      </div>
      <h3 className="font-bold mb-2 text-base">{skill.name}</h3>
    </m.div>
  );
});
SkillItem.displayName = "SkillItem";

// Memoized skill bar to prevent unnecessary re-renders
const SkillBar = memo(({ skill }: { skill: Skill }) => {
  return (
    <div key={skill.name} className="mb-10">
      {/* Skill header with name and percentage */}
      <div className="bg-retro-gray text-white font-bold py-2 px-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl ml-1">{skill.icon}</span>
          <span className="bg-retro-beige text-black px-2 py-0.5 ">
            {skill.name}
          </span>
        </div>
        <span className="bg-black text-white px-2 py-0.5 font-mono text-sm mr-1">
          {skill.level}%
        </span>
      </div>

      {/* The main progress bar container with 3D effect */}
      <div className="relative">
        {/* Shadow effect for 3D look */}
        <div className="absolute -bottom-3 -right-3 w-full h-10 bg-black opacity-40"></div>

        {/* Main bar container */}
        <div className="relative w-full bg-white border-2 border-black overflow-hidden">
          {/* Progress bar */}
          <div className="w-full h-10 bg-black">
            <m.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              className="h-full bg-white"
              style={{ willChange: "width" }}
              transition={{
                duration: 1,
                bounce: 0.3,
                type: "spring",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
SkillBar.displayName = "SkillBar";

// Memoized category button to prevent unnecessary re-renders
const CategoryButton = memo(
  ({
    category,
    isActive,
    onClick,
  }: {
    category: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`retro-button px-4 py-2 ${isActive ? "bg-retro-blue" : ""}`}
    >
      {category}
    </button>
  )
);
CategoryButton.displayName = "CategoryButton";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [scrollY, setScrollY] = useState(0);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoized handler to prevent recreation on render
  const handleCategoryChange = useCallback((categoryName: string) => {
    setActiveCategory(categoryName);
  }, []);

  // Find current category only when activeCategory changes
  const currentCategory = skillCategories.find(
    (cat) => cat.name === activeCategory
  );

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
            <span className="text-white">MY SKILLS</span>
          </h2>
          <div className="w-24 h-1 bg-retro-green mx-auto"></div>
        </m.div>

        <div className="retro-container p-6">
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {skillCategories.map((category) => (
              <CategoryButton
                key={category.name}
                category={category.name}
                isActive={activeCategory === category.name}
                onClick={() => handleCategoryChange(category.name)}
              />
            ))}
          </div>

          <div
            className="relative mb-16"
            style={{
              transform: `translateY(${scrollY * 0.01}px)`, // Reduced multiplier for smoother parallax
              willChange: "transform", // Optimize GPU acceleration
            }}
          >
            <div className="absolute -top-2 left-0 right-0 h-[1px] bg-retro-gray"></div>
            <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-retro-gray"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 py-6 items-center justify-center">
              {currentCategory?.skills.map((skill, index) => (
                <SkillItem key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="retro-header inline-block px-4 py-2 mb-6">
              <span className="text-white">{activeCategory} PROFICIENCY</span>
            </h3>

            <div className="grid gap-6">
              {currentCategory?.skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="font-mono text-sm">
              <span className="text-retro-purple">▶</span> {activeCategory}{" "}
              Skills: {currentCategory?.skills.length}{" "}
              <span className="text-retro-purple">◀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
