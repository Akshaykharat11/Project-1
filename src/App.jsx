import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Add new note
  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) return;
    const newNote = {
      id: Date.now(),
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setTags("");
  };

  // Filter notes by search
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>📝 Notes App</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙 Dark" : "🌞 Light"}
        </button>
      </header>

      {/* Note Input */}
      <div className="note-input">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your note (Markdown supported)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button onClick={handleAddNote}>➕ Add Note</button>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search notes by title, content, or tags"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Notes List */}
      <div className="notes-container">
        {filteredNotes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          filteredNotes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-header">
                <h3>{note.title}</h3>
              </div>
              <p>{note.content}</p>
              <div className="tags">
                {note.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
