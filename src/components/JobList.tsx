
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Job } from "../data/mockJobs";
import JobCard from "./JobCard";
import { getMatchingJobs } from "../utils/jobMatching";

interface JobListProps {
  jobs: Job[];
  selectedSkills: string[];
}

const JobList: React.FC<JobListProps> = ({ jobs, selectedSkills }) => {
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (selectedSkills.length > 0) {
      setIsLoading(true);
      
      // Simulate API call with delay
      const timer = setTimeout(() => {
        const filtered = getMatchingJobs(jobs, selectedSkills);
        setMatchedJobs(filtered);
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setMatchedJobs([]);
    }
  }, [jobs, selectedSkills]);
  
  // If no skills are selected yet, show the empty state
  if (selectedSkills.length === 0) {
    return (
      <motion.div 
        className="text-center py-16 md:py-24 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <div className="glass-darker rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-3">Jobs are invisible</h2>
          <p className="text-muted-foreground text-sm">
            Enter your skills above to reveal matching job opportunities tailored to your expertise.
          </p>
        </div>
      </motion.div>
    );
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-0">
        <div className="grid gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="glass-card rounded-xl h-[200px] shimmer-effect animate-pulse-soft"
            />
          ))}
        </div>
      </div>
    );
  }
  
  // Show no results state
  if (matchedJobs.length === 0) {
    return (
      <motion.div 
        className="text-center py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <div className="glass-darker rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-3">No matching jobs found</h2>
          <p className="text-muted-foreground text-sm">
            Try adding different skills or removing some to broaden your search.
          </p>
        </div>
      </motion.div>
    );
  }
  
  // Show results
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-0 mb-16">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-4 md:gap-6"
        >
          {matchedJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default JobList;
