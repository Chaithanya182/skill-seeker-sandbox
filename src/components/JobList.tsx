
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Job } from "../data/mockJobs";
import JobCard from "./JobCard";
import { getMatchingJobs } from "../utils/jobMatching";
import { Search, AlertCircle, Loader2 } from "lucide-react";

interface JobListProps {
  jobs: Job[];
  selectedSkills: string[];
  isLoading?: boolean;
  error?: string | null;
}

const JobList: React.FC<JobListProps> = ({ 
  jobs, 
  selectedSkills,
  isLoading = false,
  error = null
}) => {
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    if (selectedSkills.length > 0 && jobs.length > 0) {
      const filtered = getMatchingJobs(jobs, selectedSkills);
      setMatchedJobs(filtered);
    } else {
      setMatchedJobs([]);
    }
  }, [jobs, selectedSkills]);
  
  // If no skills are selected yet, show the empty state
  if (selectedSkills.length === 0) {
    return (
      <motion.div 
        className="text-center py-20 md:py-28 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <motion.div 
            className="glass-darker rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
              transition: { duration: 0.2 }
            }}
          >
            <Search 
              size={40}
              className="text-muted-foreground"
              strokeWidth={1.5}
            />
          </motion.div>
          <motion.h2 
            className="text-xl font-semibold mb-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Jobs are invisible
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Enter your skills above to reveal matching job opportunities tailored to your expertise.
          </motion.p>
        </div>
      </motion.div>
    );
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-0">
        <div className="text-center py-12">
          <motion.div
            className="inline-flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 
              className="w-8 h-8 text-primary animate-spin" 
              strokeWidth={1.5}
            />
            <span className="ml-3 text-muted-foreground">
              Searching for matching jobs...
            </span>
          </motion.div>
        </div>
        <div className="grid gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i} 
              className="glass-card rounded-xl h-[200px] shimmer-effect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <motion.div 
        className="text-center py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <motion.div 
            className="glass-darker rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-destructive/10"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AlertCircle
              size={40}
              className="text-destructive"
              strokeWidth={1.5}
            />
          </motion.div>
          <motion.h2 
            className="text-xl font-semibold mb-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Error loading jobs
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {error}
          </motion.p>
        </div>
      </motion.div>
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
          <motion.div 
            className="glass-darker rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AlertCircle
              size={40}
              className="text-muted-foreground"
              strokeWidth={1.5}
            />
          </motion.div>
          <motion.h2 
            className="text-xl font-semibold mb-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            No matching jobs found
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Try adding different skills or removing some to broaden your search.
          </motion.p>
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
