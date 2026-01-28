"use client";

import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface GuestbookEntry {
  id?: string;
  _id?: string;
  name: string;
  email?: string;
  message: string;
  location?: string;
  created_at?: string;
  createdAt?: string;
  date?: string;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    location: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side only mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch guestbook entries when the component mounts
  useEffect(() => {
    if (!isMounted) return;

    setCurrentDate(new Date().toISOString().split("T")[0]);
    fetchEntries();
  }, [isMounted]);

  const fetchEntries = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/guestbook");
      if (!response.ok) throw new Error("Failed to fetch guestbook entries");

      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching guestbook entries:", error);
      setError("Failed to load guestbook entries. Please try again later.");
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything during SSR
  if (!isMounted) {
    return (
      <section id="guestbook" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
              <span className="text-retro-gray">GUEST</span>
              <span className="text-retro-purple">BOOK</span>
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>
          <div className="retro-container">
            <div className="text-center p-8">Loading guestbook...</div>
          </div>
        </div>
      </section>
    );
  }

  const handleRetry = () => {
    fetchEntries();
  };

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
    setError(null);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          location: formData.location || "",
        }),
      });

      if (!response.ok) throw new Error("Failed to add guestbook entry");

      const newEntry = await response.json();
      setEntries([newEntry, ...entries]);
      setFormData({ name: "", message: "", location: "", email: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding guestbook entry:", error);
      setError("Failed to add guestbook entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <section id="guestbook" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
            <span className="text-retro-gray">GUEST</span>
            <span className="text-retro-purple">BOOK</span>
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </m.div>

        <div className="retro-container">
          <div className="marquee-container mb-8 bg-black text-white">
            <div className="marquee-content">
              ★ SIGN MY GUESTBOOK ★ LEAVE A MESSAGE ★ A TRADITION SINCE THE 90s
              WEB ★ THANKS FOR VISITING ★
            </div>
          </div>

          <div className="mb-8 text-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="retro-button px-6 py-3 font-bold"
            >
              {showForm ? "CANCEL" : "SIGN GUESTBOOK"}
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-500 text-white text-center">
              <p>{error}</p>
              <button
                onClick={handleRetry}
                className="mt-2 px-4 py-2 retro-button bg-retro-gray text-white"
                disabled={isLoading}
              >
                {isLoading ? "RETRYING..." : "RETRY"}
              </button>
            </div>
          )}

          <AnimatePresence>
            {showForm && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-12 overflow-hidden"
              >
                <form
                  onSubmit={handleSubmit}
                  className="retro-container bg-retro-beige p-6 border-2 border-black"
                >
                  <h3 className="text-black text-xl mb-4 font-bold text-center">
                    Sign the Guestbook
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-black font-bold mb-2">
                        NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="retro-input w-full p-2 border-2 border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-black font-bold mb-2">
                        LOCATION
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="retro-input w-full p-2 border-2 border-black"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-black font-bold mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="retro-input w-full p-2 border-2 border-black"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-black font-bold mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="retro-input w-full p-2 border-2 border-black"
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="retro-button px-6 py-2"
                    >
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                    </button>
                  </div>
                </form>
              </m.div>
            )}
          </AnimatePresence>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="retro-loading"></div>
              <p className="mt-4 text-retro-gray">
                Loading guestbook entries...
              </p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 bg-retro-beige p-6 border-2 border-black">
              <p className="text-black">
                No entries yet. Be the first to sign the guestbook!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {entries.map((entry) => (
                <div
                  key={entry.id || entry._id}
                  className="retro-container bg-retro-beige p-4 border-2 border-black"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{entry.name}</h3>
                      {entry.location && (
                        <p className="text-xs text-retro-gray mb-2">
                          from {entry.location}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-retro-blue">
                      {formatDate(
                        entry.created_at || entry.createdAt || entry.date,
                      )}
                    </p>
                  </div>
                  <p className="text-sm mt-2">{entry.message}</p>
                </div>
              ))}

              <div className="text-center text-xs text-retro-gray pt-4">
                <p>
                  [Pages]: 1 of 1 | [Entries]: {entries.length} | [Last
                  Updated]: {currentDate}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
