'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '../lib/api';
import { Candidate } from '../types';

interface CandidateFormProps {
  onCandidateLoaded: (candidate: Candidate) => void;
}

export function CandidateForm({ onCandidateLoaded }: CandidateFormProps) {
  const [email, setEmail] = useState('');

  const candidateMutation = useMutation({
    mutationFn: (email: string) => api.getCandidateByEmail(email),
    onSuccess: (data) => {
      toast.success(`Welcome, ${data.firstName} ${data.lastName}!`);
      onCandidateLoaded(data);
    },
    onError: (error: Error) => {
      toast.error(`Failed to load candidate: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    candidateMutation.mutate(email);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Enter Your Email
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={candidateMutation.isPending}
          />
        </div>
        
        <button
          type="submit"
          disabled={candidateMutation.isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {candidateMutation.isPending ? 'Loading...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
