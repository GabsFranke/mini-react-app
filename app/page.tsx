'use client';

import { useState } from 'react';
import { CandidateForm } from './components/CandidateForm';
import { JobList } from './components/JobList';
import { Candidate } from './types';

export default function Home() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Job Application Portal
          </h1>
          <p className="text-gray-600">
            Find your next opportunity and apply with your GitHub repository
          </p>
        </header>

        {!candidate ? (
          <CandidateForm onCandidateLoaded={setCandidate} />
        ) : (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-blue-800">
                <span className="font-semibold">Logged in as:</span> {candidate.firstName} {candidate.lastName} ({candidate.email})
              </p>
            </div>
            <JobList candidate={candidate} />
          </div>
        )}
      </div>
    </main>
  );
}
