import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Search } from "lucide-react";
import { fetchSkillSuggestions } from "../services/apiService";
import _ from "lodash";

interface SkillInputProps {
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

const SkillInput: React.FC<SkillInputProps> = ({ selectedSkills, setSelectedSkills }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Debounced function to fetch skill suggestions
  const debouncedFetchSuggestions = useRef(
    _.debounce(async (value: string) => {
      if (value.trim()) {
        setIsLoading(true);
        try {
          const fetchedSuggestions = await fetchSkillSuggestions(value);
          setSuggestions(
            fetchedSuggestions.filter(skill => !selectedSkills.includes(skill))
          );
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300)
  ).current;
  
  // Update suggestions when input value changes
  useEffect(() => {
    debouncedFetchSuggestions(inputValue);
    
    // Clean up the debounced function on component unmount
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [inputValue, selectedSkills, debouncedFetchSuggestions]);
  
  // Handle adding a skill
  const addSkill = (skill: string) => {
    if (
      skill.trim() && 
      !selectedSkills.includes(skill) && 
      selectedSkills.length < 10
    ) {
      setSelectedSkills(prev => [...prev, skill]);
      setInputValue("");
      inputRef.current?.focus();
    }
  };
  
  // Handle removing a skill
  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    addSkill(suggestion);
    setSuggestions([]);
  };
  
  // Handle input key events (Enter to add, Backspace to remove)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      if (suggestions.length > 0) {
        addSkill(suggestions[0]);
      } else {
        addSkill(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && selectedSkills.length > 0) {
      removeSkill(selectedSkills[selectedSkills.length - 1]);
    }
  };
  
  // Handle clicks outside of the component to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto mb-10 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
      ref={containerRef}
    >
      <div className="glass rounded-2xl p-2 relative hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center px-3 py-1">
          <Search className="text-muted-foreground w-5 h-5 mr-2 flex-shrink-0" />
          
          <div className="flex flex-wrap gap-2 items-center flex-1 min-h-10">
            <AnimatePresence>
              {selectedSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  {skill}
                  <button 
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 text-foreground/60 hover:text-foreground"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
            
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder={selectedSkills.length === 0 ? "Enter your skills (e.g. JavaScript, React)" : ""}
              className="flex-1 border-none bg-transparent p-2 text-sm focus:outline-none min-w-[150px]"
              aria-label="Enter your skills"
            />
          </div>
          
          {selectedSkills.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              type="button"
              onClick={() => setSelectedSkills([])}
              className="text-sm text-muted-foreground hover:text-foreground px-2 py-1 rounded-md transition-colors"
            >
              Clear all
            </motion.button>
          )}
        </div>
        
        {/* Skill suggestions */}
        <AnimatePresence>
          {isFocused && (suggestions.length > 0 || isLoading) && (
            <motion.div
              className="absolute left-0 right-0 top-full mt-1 rounded-xl shadow-lg z-10 overflow-hidden glass-darker"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="py-1">
                {isLoading ? (
                  <li className="px-4 py-2 text-sm text-muted-foreground">
                    Loading suggestions...
                  </li>
                ) : suggestions.length > 0 ? (
                  suggestions.map((suggestion, idx) => (
                    <motion.li
                      key={suggestion}
                      className="px-4 py-2 hover:bg-secondary/80 cursor-pointer text-sm flex items-center"
                      onClick={() => handleSuggestionClick(suggestion)}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      whileHover={{ 
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        x: 2,
                        transition: { duration: 0.1 }
                      }}
                    >
                      <Plus className="w-3 h-3 mr-2 text-primary" />
                      {suggestion}
                    </motion.li>
                  ))
                ) : null}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {selectedSkills.length === 0 ? (
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.6, 0.9, 0.6], 
            transition: { 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            } 
          }}
        >
          Enter your skills to discover matching job opportunities
        </motion.p>
      ) : (
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {selectedSkills.length === 10 ? (
            "Maximum skills reached (10)"
          ) : (
            `Showing jobs matching ${selectedSkills.length} skill${selectedSkills.length === 1 ? "" : "s"}`
          )}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SkillInput;
