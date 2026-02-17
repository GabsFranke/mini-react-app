import { Candidate, Job, ApplyJobRequest, ApplyJobResponse } from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
  async getCandidateByEmail(email: string): Promise<Candidate> {
    const response = await fetch(
      `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch candidate: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getJobs(): Promise<Job[]> {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    }
    
    return response.json();
  },

  async applyToJob(data: ApplyJobRequest): Promise<ApplyJobResponse> {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to apply to job: ${response.statusText}`);
    }
    
    return response.json();
  },
};
