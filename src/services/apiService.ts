
import { Job } from "../data/mockJobs";

// Base URLs for APIs
const INDEED_API_BASE_URL = "https://api.indeed.com/v2";
const ONET_API_BASE_URL = "https://services.onetcenter.org/ws";

// Since we can't actually use the Indeed API without proper authentication,
// this is a simulated function that would normally fetch from the API
export const fetchJobsFromIndeed = async (keywords: string[]): Promise<Job[]> => {
  console.log("Simulating Indeed API call with keywords:", keywords);
  
  // In a real implementation, this would be:
  // const response = await fetch(`${INDEED_API_BASE_URL}/jobs?keywords=${keywords.join(",")}`);
  // const data = await response.json();
  // return data.results.map(mapIndeedJobToLocalFormat);
  
  // For now, we'll simulate a delay and return our mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Importing mock data dynamically to avoid circular dependencies
      import("../data/mockJobs").then(({ mockJobs }) => {
        resolve(mockJobs);
      });
    }, 1000);
  });
};

// Simulated function that would fetch skills from O*NET API
export const fetchSkillSuggestions = async (query: string): Promise<string[]> => {
  console.log("Simulating O*NET API call with query:", query);
  
  // In a real implementation, this would be:
  // const response = await fetch(`${ONET_API_BASE_URL}/skills?search=${query}`);
  // const data = await response.json();
  // return data.skills.map(skill => skill.name);
  
  // For now, we'll simulate a delay and return filtered mock skills
  return new Promise((resolve) => {
    setTimeout(() => {
      import("../data/mockSkills").then(({ mockSkills }) => {
        const filteredSkills = mockSkills.filter(skill => 
          skill.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filteredSkills.slice(0, 5));
      });
    }, 300);
  });
};
