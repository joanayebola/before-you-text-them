'use client';

import { useEffect, useState } from 'react';

export default function JournalPage() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Load saved entries from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(stored);
  }, []);

  // Save to localStorage
  const saveToLocalStorage = (updated) => {
    localStorage.setItem('journalEntries', JSON.stringify(updated));
  };

  // Submit new entry
  const handleSubmit = () => {
    if (entry.trim() === '') return;

    const newEntry = {
      text: entry.trim(),
      timestamp: new Date().toISOString(),
      expanded: false,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    setEntry('');
    setSubmitted(true);
    saveToLocalStorage(updated);
  };

  // Delete entry
  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
    saveToLocalStorage(updated);
  };

  // Start editing
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(entries[index].text);
    setSubmitted(false);
  };

  // Save edited entry
  const handleSaveEdit = (index) => {
    if (editingText.trim() === '') return;

    const updated = [...entries];
    updated[index].text = editingText;
    updated[index].timestamp = new Date().toISOString(); // update timestamp
    setEntries(updated);
    setEditingIndex(null);
    setEditingText('');
    saveToLocalStorage(updated);
  };

  // Toggle expansion
  const toggleExpand = (index) => {
    if (editingIndex !== null) return; // don't collapse if editing
    const updated = [...entries];
    updated[index].expanded = !updated[index].expanded;
    setEntries(updated);
  };

  return (
    <main className="min-h-screen px-4 py-12 flex flex-col items-center bg-white/90">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">
        Write what you wanted to say instead
      </h2>

      <textarea
        className="w-full max-w-xl h-60 p-4 text-slate-800 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
        placeholder="Type your thoughts..."
        value={entry}
        onChange={(e) => {
          setEntry(e.target.value);
          setSubmitted(false);
        }}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-rose-200 hover:bg-rose-300 text-rose-900 font-semibold px-6 py-3 rounded-full transition"
      >
        Submit Journal Entry
      </button>

      {submitted && (
        <p className="text-green-600 font-medium mt-3">
          ✅ Journal entry saved.
        </p>
      )}

      <div className="w-full max-w-xl mt-10 space-y-4">
        <h3 className="text-lg font-semibold text-slate-700">Past Entries</h3>

        {entries.length === 0 ? (
          <p className="text-slate-500">No entries yet.</p>
        ) : (
          entries.map((entryItem, index) => {
            const isExpanded = entryItem.expanded;
            const isEditing = editingIndex === index;

            return (
              <div
                key={index}
                className="bg-white/70 p-4 rounded-xl shadow space-y-2 cursor-pointer transition"
                onClick={() => toggleExpand(index)}
              >
                {isEditing ? (
                  <>
                    <textarea
                      className="w-full p-3 text-slate-800 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit(index);
                        }}
                        className="bg-green-200 hover:bg-green-300 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingIndex(null);
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-slate-800 whitespace-pre-wrap">
                      {isExpanded
                        ? entryItem.text
                        : entryItem.text.length > 120
                        ? entryItem.text.slice(0, 120) + '...'
                        : entryItem.text}
                    </p>

                    <p className="text-sm text-slate-500">
                      {new Date(entryItem.timestamp).toLocaleString()}
                    </p>

                    {isExpanded && (
                      <div className="flex justify-end gap-3 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(index);
                          }}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(index);
                          }}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
