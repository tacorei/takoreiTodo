import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (feedback: { type: string; message: string }) => void;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [type, setType] = useState<string>('suggestion');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type, message });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Send Feedback</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Feedback Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="suggestion">Suggestion</option>
            <option value="bug">Bug Report</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
}