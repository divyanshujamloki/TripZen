'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { TripQuestion } from '../../../types/trip';
import Button from '../../../components/ui/Button';

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<TripQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const load = () => {
    const token = localStorage.getItem('tripzen_token');
    if (!token) return;
    fetch('/api/admin/questions?answered=false', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setQuestions(d.questions ?? []));
  };

  useEffect(() => { load(); }, []);

  const handleAnswer = async (id: string) => {
    const answer = answers[id];
    if (!answer) return;
    setLoading(id);
    const token = localStorage.getItem('tripzen_token');
    if (!token) return;
    await fetch(`/api/admin/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ answer }),
    });
    setLoading(null);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-8">Questions</h1>
      {questions.length === 0 ? (
        <p className="text-[#a1a1a6]">No pending questions.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="tz-card p-5">
              <p className="text-white font-medium">{q.question}</p>
              <p className="text-sm text-[#6e6e73] mt-1">{q.name} · {q.tripSlug}</p>
              <textarea
                className="tz-input mt-4 resize-none"
                rows={2}
                placeholder="Your answer..."
                value={answers[q.id] ?? ''}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              />
              <Button size="sm" className="mt-3" onClick={() => handleAnswer(q.id)} disabled={loading === q.id}>
                {loading === q.id ? <Loader2 size={14} className="animate-spin" /> : 'Publish answer'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
