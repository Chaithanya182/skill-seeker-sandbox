
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import SkillInput from "../components/SkillInput";
import JobList from "../components/JobList";
import Footer from "../components/Footer";
import { fetchJobsFromIndeed } from "../services/apiService";
import { Job } from "../data/mockJobs";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Index = () => {
  // Use localStorage for selected skills
  const [selectedSkills, setSelectedSkills] = useLocalStorage<string[]>("userSkills", []);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch jobs when selected skills change
  useEffect(() => {
    const fetchJobs = async () => {
      if (selectedSkills.length === 0) {
        setJobs([]);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedJobs = await fetchJobsFromIndeed(selectedSkills);
        setJobs(fetchedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch job listings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, [selectedSkills]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-5xl mx-auto">
          <SkillInput 
            selectedSkills={selectedSkills} 
            setSelectedSkills={setSelectedSkills} 
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <JobList 
              jobs={jobs} 
              selectedSkills={selectedSkills}
              isLoading={isLoading}
              error={error}
            />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
