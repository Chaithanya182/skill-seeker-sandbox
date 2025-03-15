
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Star, Clock } from "lucide-react";
import { Job } from "../data/mockJobs";
import { isTopMatch } from "../utils/jobMatching";

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
  const isTop = job.relevance ? isTopMatch(job.relevance) : false;
  const relevanceText = job.relevance ? `${Math.round(job.relevance)}% match` : "";
  
  return (
    <motion.div
      className={`glass-card rounded-xl overflow-hidden ${isTop ? "top-match" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          
          {isTop && (
            <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
              <Star className="w-3 h-3 mr-1" fill="currentColor" stroke="none" />
              Top Match
            </span>
          )}
        </div>
        
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4 mr-1.5" />
            <span>{job.company}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1.5" />
            <span>{job.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1.5" />
            <span>{job.date}</span>
            {relevanceText && (
              <>
                <span className="mx-1.5">•</span>
                <span className="text-primary font-medium">{relevanceText}</span>
              </>
            )}
          </div>
        </div>
        
        <p className="text-sm mb-4">{job.description}</p>
        
        <div className="flex flex-wrap gap-1.5">
          {job.skills.slice(0, 5).map((skill) => (
            <span 
              key={skill} 
              className="skill-tag"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 5 && (
            <span className="skill-tag">+{job.skills.length - 5} more</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
