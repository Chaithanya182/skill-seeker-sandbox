
import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="py-8 md:py-10 border-t border-border/40 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <div>
            <p>© {new Date().getFullYear()} The Invisible Job Board. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-foreground transition-colors duration-200">About</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Contact</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
