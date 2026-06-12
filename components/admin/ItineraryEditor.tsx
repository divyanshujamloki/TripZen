'use client';

import { Plus, Trash2 } from 'lucide-react';
import { ItineraryDay } from '../../types/trip';
import Button from '../ui/Button';

interface ItineraryEditorProps {
  value: ItineraryDay[];
  onChange: (days: ItineraryDay[]) => void;
}

export function normalizeItinerary(raw: unknown): ItineraryDay[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return [{ day: 1, title: 'Day 1', activities: [''] }];
  }

  return raw.map((item, index) => {
    const day = item as Record<string, unknown>;
    const activities = Array.isArray(day.activities) ? day.activities.map(String) : [];
    return {
      day: typeof day.day === 'number' ? day.day : index + 1,
      title: String(day.title ?? `Day ${index + 1}`),
      activities: activities.length > 0 ? activities : [''],
    };
  });
}

export function cleanItineraryForSubmit(days: ItineraryDay[]): ItineraryDay[] {
  return days
    .map((day, index) => ({
      day: day.day || index + 1,
      title: day.title.trim(),
      activities: day.activities.map((a) => a.trim()).filter(Boolean),
    }))
    .filter((day) => day.title || day.activities.length > 0);
}

export default function ItineraryEditor({ value, onChange }: ItineraryEditorProps) {
  const inputClass = 'tz-input w-full';

  const updateDay = (index: number, patch: Partial<ItineraryDay>) => {
    onChange(value.map((day, i) => (i === index ? { ...day, ...patch } : day)));
  };

  const addDay = () => {
    onChange([
      ...value,
      { day: value.length + 1, title: `Day ${value.length + 1}`, activities: [''] },
    ]);
  };

  const removeDay = (index: number) => {
    if (value.length <= 1) return;
    onChange(
      value
        .filter((_, i) => i !== index)
        .map((day, i) => ({ ...day, day: i + 1 }))
    );
  };

  const updateActivity = (dayIndex: number, activityIndex: number, text: string) => {
    const activities = [...value[dayIndex].activities];
    activities[activityIndex] = text;
    updateDay(dayIndex, { activities });
  };

  const addActivity = (dayIndex: number) => {
    updateDay(dayIndex, { activities: [...value[dayIndex].activities, ''] });
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const activities = value[dayIndex].activities.filter((_, i) => i !== activityIndex);
    updateDay(dayIndex, { activities: activities.length > 0 ? activities : [''] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <label className="block text-sm text-gray-400">Itinerary</label>
        <Button type="button" variant="secondary" size="sm" onClick={addDay}>
          <Plus size={14} className="mr-1.5" />
          Add day
        </Button>
      </div>

      <div className="space-y-4">
        {value.map((day, dayIndex) => (
          <div key={dayIndex} className="rounded-lg border border-white/10 bg-black/40 p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white text-sm font-medium shrink-0 mt-1">
                {day.day}
              </div>
              <div className="flex-1 grid sm:grid-cols-[1fr_auto] gap-3">
                <div>
                  <label className="block text-xs text-[#a1a1a6] mb-1">Day title</label>
                  <input
                    className={inputClass}
                    value={day.title}
                    onChange={(e) => updateDay(dayIndex, { title: e.target.value })}
                    placeholder="e.g. Departure & Arrival"
                  />
                </div>
                {value.length > 1 && (
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => removeDay(dayIndex)}
                    >
                      <Trash2 size={14} className="mr-1.5" />
                      Remove day
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:ml-12 space-y-2">
              <label className="block text-xs text-[#a1a1a6]">Activities</label>
              {day.activities.map((activity, activityIndex) => (
                <div key={activityIndex} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white shrink-0" />
                  <input
                    className={inputClass}
                    value={activity}
                    onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                    placeholder="e.g. Breakfast at 8:00 am"
                  />
                  <button
                    type="button"
                    className="p-2 text-[#a1a1a6] hover:text-red-400 transition-colors shrink-0"
                    onClick={() => removeActivity(dayIndex, activityIndex)}
                    aria-label="Remove activity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <Button type="button" variant="ghost" size="sm" onClick={() => addActivity(dayIndex)}>
                <Plus size={14} className="mr-1.5" />
                Add activity
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
