import React, { useState } from 'react';
import { UserRole } from '../../types';

interface RegisterFormProps {
  onSubmit: (data: {
    username: string;
    password: string;
    name: string;
    role: UserRole;
  }) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    role: 'student' as UserRole,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          required
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as UserRole }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="student">Student</option>
          <option value="worker">Worker</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  );
}