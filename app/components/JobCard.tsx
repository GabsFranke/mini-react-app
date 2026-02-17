'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '../lib/api';
import { Job, Candidate } from '../types';

interface JobCardProps {
  job: Job;
  candidate: Candidate;
}

export function JobCard({ job, candidate }: JobCardProps) {
  const [repoUrl, setRepoUrl] = useState('');

  const applyMutation = useMutation({
    mutationFn: () => api.applyToJob({
      uuid: candidate.uuid,
      jobId: job.id,
      candidateId: candidate.candidateId,
      repoUrl,
    }),
    onSuccess: () => {
      toast.success(`Successfully applied to ${job.title}!`);
      setRepoUrl('');
    },
    onError: (error: Error) => {
      toast.error(`Failed to apply: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      toast.error('Please enter a repository URL');
      return;
    }

    if (!repoUrl.startsWith('https://github.com/')) {
      toast.error('Please enter a valid GitHub repository URL');
      return;
    }

    applyMutation.mutate();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{job.title}</h3>
      <p className="text-sm text-gray-500 mb-4">Job ID: {job.id}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={`repo-${job.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Repository URL
          </label>
          <input
            id={`repo-${job.id}`}
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={applyMutation.isPending}
          />
        </div>
        
        <button
          type="submit"
          disabled={applyMutation.isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {applyMutation.isPending ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
