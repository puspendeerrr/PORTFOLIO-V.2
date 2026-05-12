import React from "react";
import { motion, Variants } from "framer-motion";
import { Disclaimer } from "../Shared/Disclaimer/Disclaimer";
import { InteractiveCard } from "../Shared/InteractiveCard/InteractiveCard";
import "./SkillsPage.css";

const skillsData = [
  {
    category: "Technical",
    skills: ["MERN Stack", "C++", "Python", "MS Excel", "Google Sheets", "Data Structures", "OOP", "DBMS"],
    gridClass: "skills-card-large",
    glow: "rgba(124, 58, 237, 0.25)"
  },
  {
    category: "HR & Management",
    skills: ["Talent Acquisition", "Employee Engagement", "Organizational Behavior", "Coordination"],
    gridClass: "skills-card-tall",
    glow: "rgba(236, 72, 153, 0.25)"
  },
  {
    category: "Communication & Leadership",
    skills: ["Public Speaking", "Team Coordination", "Conflict Resolution", "Interpersonal Skills"],
    gridClass: "skills-card-wide",
    glow: "rgba(6, 182, 212, 0.25)"
  },
  {
    category: "Documentation",
    skills: ["Reporting", "Structured Writing", "Technical Documentation"],
    gridClass: "skills-card-small",
    glow: "rgba(16, 185, 129, 0.25)"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export const SkillsPage: React.FC = () => {
  return (
    <motion.div 
      className="skills-page"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="section-header" style={{ alignItems: 'center', textAlign: 'center', marginBottom: '48px' }}>
        <h2 className="text-hero" style={{ fontSize: '3rem' }}>Skills <span className="text-gradient-accent">&</span> Expertise</h2>
        <p className="section-caption" style={{ fontSize: '1.2rem', marginTop: '16px' }}>A balanced mix of technical proficiency and human-centric skills.</p>
      </motion.div>
      
      <div className="bento-grid">
        {skillsData.map((section) => (
          <InteractiveCard 
            key={section.category} 
            variants={itemVariants}
            className={`surface bento-card ${section.gridClass}`}
            glowColor={section.glow}
          >
            <h3 className="bento-category-title">{section.category}</h3>
            <div className="bento-skills-list">
              {section.skills.map((skill) => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </InteractiveCard>
        ))}
      </div>
      
      <Disclaimer />
    </motion.div>
  );
};
