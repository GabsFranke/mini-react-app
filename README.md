# Job Application Portal

A Next.js application for applying to job positions with GitHub repository submissions.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **TanStack Query (React Query)** - Data fetching and state management
- **Tailwind CSS** - Styling
- **React Hot Toast** - Toast notifications

## Features

- Candidate authentication via email
- Job listing from API
- Apply to jobs with GitHub repository URL
- Loading states and error handling
- Form validation
- Responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── components/
│   ├── CandidateForm.tsx  # Email input form
│   ├── JobList.tsx        # Job listings container
│   └── JobCard.tsx        # Individual job card with apply form
├── lib/
│   └── api.ts             # API client functions
├── types/
│   └── index.ts           # TypeScript interfaces
├── providers.tsx          # React Query and Toast providers
├── layout.tsx             # Root layout
└── page.tsx               # Home page
```

## How It Works

1. User enters their email address
2. System fetches candidate data from API
3. Available job positions are displayed
4. User can enter GitHub repository URL for each position
5. Submit application with validation
6. Success/error feedback via toast notifications

## API Endpoints

- `GET /api/candidate/get-by-email?email={email}` - Get candidate data
- `GET /api/jobs/get-list` - Get available jobs
- `POST /api/candidate/apply-to-job` - Submit job application
