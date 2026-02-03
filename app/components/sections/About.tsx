"use client";

import { m } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 retro-container">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
            <span className="text-retro-purple">ABOUT</span>{" "}
            <span className="text-retro-gray">ME</span>
          </h2>
          <div className="w-24 h-1 bg-retro-green mx-auto"></div>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <m.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="retro-container p-4">
              <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden">
                <div className="absolute inset-4 bg-retro-gray flex items-center justify-center">
                  <div className="text-center text-retro-beige p-8">
                    <div className="text-xl mb-4 font-mono">
                      DEVELOPER PROFILE
                    </div>
                    <div className="border-t border-retro-beige my-4"></div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-left">
                        <div>NAME:</div>
                        <div>ROLE:</div>
                        <div>LOCATION:</div>
                        <div>EDUCATION:</div>
                      </div>
                      <div className="text-right">
                        <div>HAZEM EZZ</div>
                        <div>FULL STACK DEV</div>
                        <div>SUEZ, EGYPT</div>
                        <div>HITU AI BTECH</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="retro-container p-6">
              <h3 className="text-xl font-bold text-retro-gray mb-4">
                WHO <span className="text-retro-blue">AM I?</span>
              </h3>

              <p className="text-retro-gray mb-4 border-l-4 border-retro-purple pl-4">
                I&apos;m a full stack developer focused on responsive web
                application design, service integration, and reliable testing.
                I build user-friendly experiences with React.js, Tailwind CSS,
                and Laravel.
              </p>

              <p className="text-retro-gray mb-6 border-l-4 border-retro-green pl-4">
                I&apos;m also a Bachelor of Technology student in Artificial
                Intelligence at Helwan International Technological University.
                I enjoy collaborating, mentoring, and building scalable web
                solutions with clean, maintainable code.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div>
                  <h4 className="text-retro-purple font-bold mb-2">
                    EDUCATION
                  </h4>
                  <ul className="list-disc list-inside text-retro-gray">
                    <li>Helwan International Technological University</li>
                    <li>BTech in Artificial Intelligence</li>
                    <li>WE School for Applied Technology</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-retro-blue font-bold mb-2">INTERESTS</h4>
                  <ul className="list-disc list-inside text-retro-gray">
                    <li>Scalable Web Solutions</li>
                    <li>Service Integration</li>
                    <li>Skills Testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
