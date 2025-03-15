
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="py-8 md:py-12 px-6 md:px-0 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <div className="text-center space-y-3 md:space-y-4">
        <motion.div 
          className="inline-block mb-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
            Beta
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The Invisible Job Board
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Jobs are hidden until you enter your skills. The more skills you add,
          the more perfectly matched positions will appear.
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
