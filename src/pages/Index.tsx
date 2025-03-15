
import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import SkillInput from "../components/SkillInput";
import JobList from "../components/JobList";
import Footer from "../components/Footer";
import { mockJobs } from "../data/mockJobs";

const Index = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
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
              jobs={mockJobs} 
              selectedSkills={selectedSkills} 
            />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
