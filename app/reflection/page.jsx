'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


const prompts = [
  { icon: '❓', question: 'What triggered this?' },
  { icon: '🥺', question: 'What are you feeling?' },
  { icon: '🧠', question: 'Will this help or hurt you?' },
];

export default function ReflectionPage() {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const router = useRouter();



  useEffect(() => {
    const savedAnswers = localStorage.getItem("reflectionAnswers");
    const savedJournal = localStorage.getItem("journalEntry");
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedJournal) setJournalEntry(savedJournal);
  }, []);

  useEffect(() => {
    localStorage.setItem("reflectionAnswers", JSON.stringify(answers));
  }, [answers]);


  useEffect(() => {
    if (submitted) {
      localStorage.setItem("journalEntry", journalEntry);
    }
  }, [journalEntry, submitted]);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const hasContent = answers.some((ans) => ans.trim() !== "");
  
    if (hasContent) {
      setSubmitted(true);
      setError(false);
      setAnswers(["", "", ""]); 
      router.push('/journal'); 
    } else {
      setSubmitted(false);
      setError(true);
    }
  };
  
  

  return (
    <main className="min-h-screen flex flex-col items-center gap-6 px-4 py-12 bg-white/90">
      <h2 className="text-xl font-medium text-slate-700">
        Reflection Progress: {Math.round((answers.filter(ans => ans.trim() !== "").length / answers.length) * 100)}%
      </h2>

      {prompts.map((item, index) => (
        <div
          key={index}
          className="w-full max-w-xl p-5 rounded-2xl bg-white/70 backdrop-blur-md shadow-md space-y-3"
        >
          <div className="flex items-center text-lg font-semibold text-slate-800">
            <span className="text-2xl mr-3">{item.icon}</span>
            {item.question}
          </div>
          <textarea
            className="w-full h-24 p-3 border border-slate-300 text-slate-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
            placeholder="Type your thoughts here..."
            value={answers[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}

      <button
        className="mt-6 bg-rose-200 hover:bg-rose-300 text-rose-900 font-semibold px-6 py-3 rounded-full transition"
        onClick={handleSubmit}
      >
        Submit Reflection
      </button>

      {submitted && (
        <p className="text-green-700 font-medium mt-4">
          ✅ Your reflection has been saved.
        </p>
      )}
      {error && (
        <p className="text-red-600 font-medium mt-4">
          ⚠️ Please reflect on at least one prompt before submitting.
        </p>
      )}
    </main>
  );
}
