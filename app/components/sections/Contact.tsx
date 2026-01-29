"use client";

import { m } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSubmitStatus("success");
      setFormData({ from_name: "", from_email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 retro-container">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
            <span className="text-retro-purple">CONTACT</span>{" "}
            <span className="text-retro-gray">ME</span>
          </h2>
          <div className="w-24 h-1 bg-retro-green mx-auto"></div>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="retro-container p-6"
          >
            <h3 className="text-xl font-bold text-retro-gray mb-6">
              <span className="text-retro-blue">GET</span> IN TOUCH
            </h3>

            <p className="text-retro-gray mb-8 border-l-4 border-retro-purple pl-4">
              Have a project in mind or just want to say hello? Feel free to
              drop me a message using the form. I&apos;ll get back to you as
              soon as possible!
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-retro-gray flex items-center justify-center mr-4">
                  <span className="text-retro-beige text-xl">@</span>
                </div>
                <div>
                  <h4 className="text-retro-purple font-bold">Email</h4>
                  <p className="text-retro-gray">hazemezz988@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-retro-gray flex items-center justify-center mr-4">
                  <span className="text-retro-beige text-xl">!</span>
                </div>
                <div>
                  <h4 className="text-retro-blue font-bold">LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/in/hazem-ezz-424498285"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-retro-gray hover:text-retro-blue"
                  >
                    Hazem Ezz
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-retro-gray flex items-center justify-center mr-4">
                  <span className="text-retro-beige text-xl">*</span>
                </div>
                <div>
                  <h4 className="text-retro-green font-bold">Phone</h4>
                  <p className="text-retro-gray">+20 1005291205</p>
                </div>
              </div>

              <div className="flex items-start mt-4">
                <div className="flex-shrink-0 w-12 h-12 bg-retro-gray flex items-center justify-center mr-4">
                  <span className="text-retro-beige text-xl">#</span>
                </div>
                <div>
                  <h4 className="text-retro-orange font-bold">GitHub</h4>
                  <a
                    href="https://github.com/hazemezz123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-retro-gray hover:text-retro-blue"
                  >
                    hazemezz123
                  </a>
                </div>
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="retro-container p-6">
              <div className="mb-4">
                <label
                  htmlFor="from_name"
                  className="block text-retro-gray font-bold mb-2"
                >
                  NAME
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  className="retro-input w-full p-3 bg-retro-beige border-2 border-retro-gray text-retro-gray"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="from_email"
                  className="block text-retro-gray font-bold mb-2"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  className="retro-input w-full p-3 bg-retro-beige border-2 border-retro-gray text-retro-gray"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-retro-gray font-bold mb-2"
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="retro-input w-full p-3 bg-retro-beige border-2 border-retro-gray text-retro-gray"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="retro-button font-bold text-white px-6 py-3 w-full"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>

              {submitStatus === "success" && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="retro-container p-4 border-2 border-retro-green bg-black relative">
                    <div className="scanline absolute inset-0 opacity-20 pointer-events-none"></div>
                    <div className="text-center">
                      <div className="text-retro-green font-mono font-bold text-lg mb-1">
                        MESSAGE SENT!
                      </div>
                      <div className="text-retro-beige text-sm mb-2">
                        Thank you for reaching out!
                      </div>
                      <div className="pixel-dots mx-auto w-16 h-1 bg-retro-green"></div>
                      <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.3,
                        }}
                        className="mt-3 inline-block"
                      >
                        <div className="text-3xl">✓</div>
                      </m.div>
                    </div>
                  </div>
                </m.div>
              )}

              {submitStatus === "error" && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="retro-container p-4 border-2 border-red-500 bg-black relative">
                    <div className="scanline absolute inset-0 opacity-20 pointer-events-none"></div>
                    <div className="text-center">
                      <div className="text-red-500 font-mono font-bold text-lg mb-1">
                        ERROR!
                      </div>
                      <div className="text-retro-beige text-sm mb-2">
                        Message failed to send. Please try again.
                      </div>
                      <div className="pixel-dots mx-auto w-16 h-1 bg-red-500"></div>
                      <m.div
                        animate={{
                          x: [-5, 5, -5, 5, -5, 5, -5, 5, 0],
                          transition: { duration: 0.5, delay: 0.2 },
                        }}
                        className="mt-3 inline-block"
                      >
                        <div className="text-3xl">✗</div>
                      </m.div>
                    </div>
                  </div>
                </m.div>
              )}
            </form>
          </m.div>
        </div>
      </div>
    </section>
  );
}
