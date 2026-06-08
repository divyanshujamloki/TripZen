'use client';

import { useState, FormEvent } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { TripQuestion } from '../../types/trip';
import { apiFetch } from '../../lib/apiClient';
import Button from '../ui/Button';

interface TripQuestionsProps {
  slug: string;
  initialQuestions: TripQuestion[];
}

export default function TripQuestions({ slug, initialQuestions }: TripQuestionsProps) {
  const [questions] = useState(initialQuestions);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiFetch(`/api/trips/${slug}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, question }),
      });
      if (res.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setQuestion('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {questions.length > 0 && (
        <div className="space-y-3 sm:space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="tz-card p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <MessageCircle size={16} className="text-white shrink-0 mt-1" />
                <div className="min-w-0">
                  <p className="text-white text-sm sm:text-base font-medium">{q.question}</p>
                  <p className="text-[#6e6e73] text-xs sm:text-sm mt-1">{q.name}</p>
                  {q.answer && (
                    <p className="text-[#a1a1a6] text-sm mt-3 pl-3 border-l border-white/20 leading-relaxed">
                      {q.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="tz-card p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-white mb-4">Ask a question</h3>
        {submitted ? (
          <p className="text-[#a1a1a6] text-sm">Thank you. We&apos;ll respond shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="tz-input" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="tz-input" />
            </div>
            <textarea
              placeholder="Your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows={3}
              className="tz-input resize-none"
            />
            <Button type="submit" disabled={loading} size="sm">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={14} className="mr-2" /> Submit</>}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
