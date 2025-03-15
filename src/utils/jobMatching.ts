
import { Job } from "../data/mockJobs";
import _ from "lodash";

// Calculate the relevance of a job based on the user's skills
export const calculateJobRelevance = (job: Job, userSkills: string[]): number => {
  if (!userSkills.length) return 0;
  
  const matchingSkills = _.intersection(
    job.skills.map(skill => skill.toLowerCase()),
    userSkills.map(skill => skill.toLowerCase())
  );
  
  return (matchingSkills.length / job.skills.length) * 100;
};

// Filter and sort jobs based on user skills
export const getMatchingJobs = (jobs: Job[], userSkills: string[]): Job[] => {
  if (!userSkills.length) return [];
  
  const jobsWithRelevance = jobs.map(job => ({
    ...job,
    relevance: calculateJobRelevance(job, userSkills)
  }));
  
  // Filter jobs that have at least one matching skill
  const matchingJobs = jobsWithRelevance.filter(job => job.relevance > 0);
  
  // Sort by relevance (highest first)
  return _.orderBy(matchingJobs, ['relevance'], ['desc']);
};

// Check if a job is a top match (80% or higher relevance)
export const isTopMatch = (relevance: number): boolean => {
  return relevance >= 80;
};
