export interface Candidate {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Job {
  id: string;
  title: string;
}

export interface ApplyJobRequest {
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}

export interface ApplyJobResponse {
  ok: boolean;
}

// Aliases for alternative naming
export type ApplicationRequest = ApplyJobRequest;
export type ApplicationResponse = ApplyJobResponse;
