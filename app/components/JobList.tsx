'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { JobCard } from './JobCard';
import { Candidate } from '../types';

interface JobListProps {
  candidate: Candidate;
}

export function JobList({ candidate }: JobListProps) {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: api.getJobs,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-medium">Error loading jobs</p>
        <p className="text-red-600 text-sm mt-2">{(error as Error).message}</p>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-800">No jobs available at the moment</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}
