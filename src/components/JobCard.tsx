
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
      whileHover={{ 
        y: -4, 
        transition: { duration: 0.2 } 
      }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg tracking-tight">{job.title}</h3>
          
          {isTop && (
            <motion.span 
              className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full flex items-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              <Star className="w-3 h-3 mr-1" fill="currentColor" stroke="none" />
              Top Match
            </motion.span>
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
        
        <p className="text-sm mb-4 text-foreground/90">{job.description}</p>
        
        <motion.div 
          className="flex flex-wrap gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + (index * 0.1) }}
        >
          {job.skills.slice(0, 5).map((skill, skillIndex) => (
            <motion.span 
              key={skill} 
              className="skill-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (index * 0.05) + (skillIndex * 0.03) }}
            >
              {skill}
            </motion.span>
          ))}
          {job.skills.length > 5 && (
            <motion.span 
              className="skill-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (index * 0.05) + (5 * 0.03) }}
            >
              +{job.skills.length - 5} more
            </motion.span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobCard;
