
import { Job } from "../data/mockJobs";
import axios from "axios";

// Base URLs for APIs
const INDEED_API_BASE_URL = "https://employers.indeed.com/api/v2";
const ONET_API_BASE_URL = "https://services.onetcenter.org/ws";

// Function to fetch jobs from Indeed API
export const fetchJobsFromIndeed = async (keywords: string[]): Promise<Job[]> => {
  console.log("Fetching jobs from Indeed API with keywords:", keywords);
  
  try {
    // First try to fetch from the actual Indeed API
    const response = await axios({
      method: 'get',
      url: `${INDEED_API_BASE_URL}/jobs`,
      headers: { 
        'Accept': 'application/json'
      }
    });
    
    console.log("Indeed API response:", response.data);
    
    // Transform the API response to match our Job interface
    // This mapping would need to be adjusted based on the actual API response structure
    return response.data.map((job: any) => ({
      id: job.id || job.jobUuid,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      salary: job.salary || "Competitive",
      skills: job.skills || keywords, // If API doesn't provide skills, use keywords
      postDate: job.postDate || new Date().toISOString(),
      applyUrl: job.applyUrl || "#"
    }));
  } catch (error) {
    console.error("Error fetching from Indeed API, falling back to mock data:", error);
    
    // Fallback to mock data if API call fails
    return new Promise((resolve) => {
      setTimeout(() => {
        import("../data/mockJobs").then(({ mockJobs }) => {
          // Filter mock jobs based on keywords for simulation
          const filteredJobs = mockJobs.filter(job => 
            keywords.some(keyword => 
              job.skills.some(skill => 
                skill.toLowerCase().includes(keyword.toLowerCase())
              )
            )
          );
          resolve(filteredJobs.length > 0 ? filteredJobs : mockJobs);
        });
      }, 1000);
    });
  }
};

// Function to fetch job details from Indeed API
export const fetchJobDetails = async (jobId: string): Promise<Job | null> => {
  console.log("Fetching job details from Indeed API for job ID:", jobId);
  
  try {
    const response = await axios({
      method: 'get',
      url: `${INDEED_API_BASE_URL}/jobs/${jobId}`,
      headers: { 
        'Accept': 'application/json'
      }
    });
    
    console.log("Job details response:", response.data);
    
    // Transform the API response to match our Job interface
    return {
      id: response.data.id || response.data.jobUuid,
      title: response.data.title,
      company: response.data.company,
      location: response.data.location,
      description: response.data.description,
      salary: response.data.salary || "Competitive",
      skills: response.data.skills || [],
      postDate: response.data.postDate || new Date().toISOString(),
      applyUrl: response.data.applyUrl || "#"
    };
  } catch (error) {
    console.error("Error fetching job details, falling back to mock data:", error);
    
    // Fallback to mock data if API call fails
    return new Promise((resolve) => {
      setTimeout(() => {
        import("../data/mockJobs").then(({ mockJobs }) => {
          const job = mockJobs.find(j => j.id === jobId);
          resolve(job || null);
        });
      }, 500);
    });
  }
};

// Function to fetch skills from O*NET API
export const fetchSkillSuggestions = async (query: string): Promise<string[]> => {
  console.log("Fetching skill suggestions from O*NET API with query:", query);
  
  if (!query.trim()) {
    return [];
  }
  
  try {
    // This is a placeholder URL - would need to be updated with actual O*NET API endpoint
    const response = await axios({
      method: 'get',
      url: `${ONET_API_BASE_URL}/skills?q=${encodeURIComponent(query)}`,
      headers: { 
        'Accept': 'application/json'
      }
    });
    
    console.log("O*NET API response:", response.data);
    
    // Transform the API response to match our expected format
    // This mapping would need to be adjusted based on the actual API response structure
    return response.data.slice(0, 5).map((skill: any) => skill.name || skill);
  } catch (error) {
    console.error("Error fetching from O*NET API, falling back to mock data:", error);
    
    // Fallback to mock data if API call fails
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
  }
};
