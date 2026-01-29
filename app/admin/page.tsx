"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  codeUrl: string;
  image?: string;
}

interface GuestbookEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  location?: string;
  created_at?: string;
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD; // Simple password - change this!

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    tags: [],
    demoUrl: "",
    codeUrl: "",
    image: "",
  });
  const [tagsInput, setTagsInput] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [isResumeLoading, setIsResumeLoading] = useState(false);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(
    [],
  );
  const [isLoadingGuestbook, setIsLoadingGuestbook] = useState(false);

  // Check for stored auth on mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("adminAuth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch projects and config when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
      fetchResumeConfig();
      fetchGuestbook();
    }
  }, [isAuthenticated]);

  const fetchResumeConfig = async () => {
    try {
      const response = await fetch("/api/config/resume");
      if (response.ok) {
        const data = await response.json();
        setResumeUrl(data.url);
      }
    } catch (err) {
      console.error("Failed to fetch resume config:", err);
    }
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResumeLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/config/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: resumeUrl }),
      });

      if (!response.ok) throw new Error("Failed to update resume URL");

      alert("Resume link updated successfully! 💾");
    } catch (err) {
      setError("Failed to update resume link");
      console.error(err);
    } finally {
      setIsResumeLoading(false);
    }
  };

  const fetchGuestbook = async () => {
    setIsLoadingGuestbook(true);
    try {
      const response = await fetch("/api/guestbook");
      if (!response.ok) throw new Error("Failed to fetch guestbook entries");
      const data = await response.json();
      setGuestbookEntries(data);
    } catch (err) {
      console.error("Failed to load guestbook:", err);
    } finally {
      setIsLoadingGuestbook(false);
    }
  };

  const handleDeleteGuestbook = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guestbook entry?"))
      return;

    try {
      const response = await fetch(`/api/guestbook?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete entry");

      await fetchGuestbook();
    } catch (err) {
      alert("Failed to delete entry");
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      setPassword("");
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    setFormData({
      ...formData,
      tags: e.target.value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tags: [],
      demoUrl: "",
      codeUrl: "",
      image: "",
    });
    setTagsInput("");
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setTagsInput(project.tags.join(", "));
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const method = editingProject ? "PUT" : "POST";
      const body = editingProject
        ? { ...formData, id: editingProject.id }
        : formData;

      const response = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save project");

      await fetchProjects();
      resetForm();
    } catch (err) {
      setError("Failed to save project");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      await fetchProjects();
    } catch (err) {
      setError("Failed to delete project");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="retro-container max-w-md w-full">
          <div className="retro-header">⚡ ADMIN LOGIN ⚡</div>

          <form onSubmit={handleLogin} className="p-6">
            <div className="mb-4">
              <label className="block text-retro-gray font-bold mb-2">
                PASSWORD:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="retro-input w-full p-2 border-2 border-black"
                placeholder="Enter admin password..."
              />
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-500 text-white text-center">
                {error}
              </div>
            )}

            <button type="submit" className="retro-button w-full py-3">
              LOGIN
            </button>
          </form>

          <div className="text-center p-4 text-xs text-retro-gray border-t-2 border-retro-gray">
            🔒 Authorized Personnel Only 🔒
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="retro-container mb-8">
          <div className="retro-header flex justify-between items-center">
            <span>🖥️ PORTFOLIO ADMIN DASHBOARD</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-retro-purple px-3 py-1 hover:bg-red-600 transition-colors"
            >
              LOGOUT
            </button>
          </div>

          <div className="p-4 flex flex-wrap gap-4">
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="retro-button"
            >
              {showForm ? "✖ CANCEL" : "➕ ADD NEW PROJECT"}
            </button>
            <button
              onClick={fetchProjects}
              className="retro-button"
              disabled={isLoading}
            >
              🔄 REFRESH
            </button>
            <a href="/" className="retro-button inline-block">
              🏠 VIEW SITE
            </a>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-500 text-white text-center retro-container">
            {error}
          </div>
        )}

        {/* Add/Edit Project Form */}
        <AnimatePresence>
          {showForm && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="retro-container">
                <div className="retro-header">
                  {editingProject ? "✏️ EDIT PROJECT" : "📝 NEW PROJECT"}
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-retro-gray font-bold mb-2">
                        TITLE *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="retro-input w-full p-2 border-2 border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-retro-gray font-bold mb-2">
                        CODE URL * (optional)
                      </label>
                      <input
                        type="url"
                        name="codeUrl"
                        value={formData.codeUrl}
                        onChange={handleInputChange}
                        placeholder="https://github.com/..."
                        className="retro-input w-full p-2 border-2 border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-retro-gray font-bold mb-2">
                      DESCRIPTION *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="retro-input w-full p-2 border-2 border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-retro-gray font-bold mb-2">
                        TAGS (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={handleTagsChange}
                        placeholder="React.js, JavaScript, CSS..."
                        className="retro-input w-full p-2 border-2 border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-retro-gray font-bold mb-2">
                        DEMO URL (optional)
                      </label>
                      <input
                        type="url"
                        name="demoUrl"
                        value={formData.demoUrl || ""}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                        className="retro-input w-full p-2 border-2 border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-retro-gray font-bold mb-2">
                      IMAGE PATH (optional)
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image || ""}
                      onChange={handleInputChange}
                      placeholder="/projects/myproject.webp"
                      className="retro-input w-full p-2 border-2 border-black"
                    />
                  </div>

                  <div className="flex gap-4 justify-center pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="retro-button px-8"
                    >
                      {isLoading
                        ? "SAVING..."
                        : editingProject
                          ? "UPDATE"
                          : "CREATE"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="retro-button bg-retro-purple"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Resume Configuration Section */}
        <div className="retro-container mb-8">
          <div className="retro-header">📄 RESUME CONFIGURATION</div>
          <div className="p-6">
            <form
              onSubmit={handleResumeSubmit}
              className="flex flex-col md:flex-row gap-4 items-end"
            >
              <div className="flex-1 w-full">
                <label className="block text-retro-gray font-bold mb-2">
                  RESUME URL / PATH
                </label>
                <input
                  type="text"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="/Hazem-cv.pdf or https://example.com/resume.pdf"
                  className="retro-input w-full p-2 border-2 border-black"
                />
              </div>
              <button
                type="submit"
                disabled={isResumeLoading}
                className="retro-button whitespace-nowrap"
              >
                {isResumeLoading ? "SAVING..." : "💾 SAVE RESUME LINK"}
              </button>
            </form>
          </div>
        </div>

        {/* Guestbook Section */}
        <div className="retro-container mb-8">
          <div className="retro-header flex justify-between items-center">
            <span>📖 GUESTBOOK ({guestbookEntries.length})</span>
            <button
              onClick={fetchGuestbook}
              className="text-xs bg-retro-purple px-2 py-1 hover:bg-retro-blue transition-colors"
              disabled={isLoadingGuestbook}
            >
              🔄
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoadingGuestbook && guestbookEntries.length === 0 ? (
              <div className="p-8 text-center">
                <div className="retro-loading"></div>
                <p className="mt-4 text-retro-gray">Loading entries...</p>
              </div>
            ) : guestbookEntries.length === 0 ? (
              <div className="p-8 text-center text-retro-gray">
                No guestbook entries found.
              </div>
            ) : (
              <div className="divide-y-2 divide-retro-gray">
                {guestbookEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 hover:bg-retro-beige/50 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-retro-purple">
                            {entry.name}
                          </span>
                          <span className="text-xs text-retro-gray">
                            ({entry.email})
                          </span>
                          {entry.location && (
                            <span className="text-xs bg-retro-gray text-retro-beige px-1 rounded">
                              📍 {entry.location}
                            </span>
                          )}
                        </div>
                        <p className="text-sm border-l-2 border-retro-gray pl-2 italic my-2">
                          "{entry.message}"
                        </p>
                        <div className="text-xs text-retro-gray">
                          🕒 {new Date(entry.created_at || "").toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteGuestbook(entry.id)}
                        className="retro-button text-xs px-2 py-1 bg-red-600 hover:bg-red-700 h-fit"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Projects List */}
        <div className="retro-container">
          <div className="retro-header">📂 PROJECTS ({projects.length})</div>

          {isLoading && projects.length === 0 ? (
            <div className="p-8 text-center">
              <div className="retro-loading"></div>
              <p className="mt-4 text-retro-gray">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center text-retro-gray">
              No projects found. Add your first project!
            </div>
          ) : (
            <div className="divide-y-2 divide-retro-gray">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 hover:bg-retro-beige/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-retro-purple">
                        {project.title}
                      </h3>
                      <p className="text-sm text-retro-gray mt-1 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-retro-gray text-retro-beige text-xs px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-2 text-xs">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-retro-blue hover:underline"
                          >
                            🔗 Demo
                          </a>
                        )}
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-retro-green hover:underline"
                        >
                          💾 Code
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="retro-button text-sm px-3 py-1"
                      >
                        ✏️ EDIT
                      </button>
                      <button
                        onClick={() => project.id && handleDelete(project.id)}
                        className="retro-button text-sm px-3 py-1 bg-red-600 hover:bg-red-700"
                      >
                        🗑️ DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-retro-gray">
          <p>💾 Portfolio Admin Dashboard v1.0 💾</p>
          <p className="mt-1">
            © {new Date().getFullYear()} - All Systems Operational
          </p>
        </div>
      </div>
    </div>
  );
}
