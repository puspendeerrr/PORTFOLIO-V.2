import React from "react";
import { motion } from "framer-motion";
import { Trophy, Lightbulb, Mic, Building2, Users, Calendar, Award } from "lucide-react";
import { Disclaimer } from "../Shared/Disclaimer/Disclaimer";
import { InteractiveCard } from "../Shared/InteractiveCard/InteractiveCard";
import "./ExperiencePage.css";

const professionalItems = [
  {
    id: "intern",
    icon: <Building2 color="white" />,
    title: "Project Delivery Intern – CQST Panchkula",
    type: "Professional Experience",
    period: "Jul – Aug 2025",
    description: "Collaborated in a corporate team environment to deliver digital projects. Emphasized professional communication, detailed requirement documentation, cross-functional team coordination, and project tracking to ensure timely deliveries. Participated actively in business alignment meetings and client presentations.",
    accent: "linear-gradient(135deg, #10b981, #06b6d4)",
    glow: "rgba(16, 185, 129, 0.3)",
  }
];

const leadershipItems = [
  {
    id: "student-coord",
    icon: <Users color="white" />,
    title: "Student Coordinator",
    type: "Leadership Role",
    period: "2024 – Present",
    description: "Served as the primary liaison between student groups and department faculty. Responsible for planning and organizing campus initiatives, managing volunteer teams, and facilitating clear, structured channels of communication across academic levels.",
    accent: "linear-gradient(135deg, #7c3aed, #a855f7)",
    glow: "rgba(124, 58, 237, 0.3)",
  },
  {
    id: "freshers-anchor",
    icon: <Mic color="white" />,
    title: "Freshers Event Anchor / Host",
    type: "Public Speaking & Coordination",
    period: "2024 – Present",
    description: "Anchored large-scale institutional events. Managed volunteer teams, drove high audience engagement, navigated live scheduling changes, and coordinated with technical staff to deliver a polished public experience.",
    accent: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    glow: "rgba(6, 182, 212, 0.3)",
  },
  {
    id: "ec-head",
    icon: <Trophy color="white" />,
    title: "Head – Entrepreneurship Club",
    type: "Leadership Role",
    period: "2024 – Present",
    description: "Led and coordinated club activities, workshops, and business case discussions. Handled task allocation, set deadlines, managed team members, and coordinated with external speakers and faculty advisors.",
    accent: "linear-gradient(135deg, #ec4899, #f97316)",
    glow: "rgba(236, 72, 153, 0.3)",
  },
  {
    id: "sih-lead",
    icon: <Lightbulb color="white" />,
    title: "Team Lead – Smart India Hackathon",
    type: "Project Leadership",
    period: "2024",
    description: "Coordinated tasks, resources, and deadlines for a 6-member team. Acted as main presenter to evaluators and successfully aligned technical objectives with clear user-centric outcomes, receiving commendations from the department head.",
    accent: "linear-gradient(135deg, #fb923c, #ec4899)",
    glow: "rgba(251, 146, 60, 0.3)",
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

export const ExperiencePage: React.FC = () => {
  return (
    <motion.div
      className="experience-page"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {/* Hero Section */}
      <motion.section variants={fadeUp} className="exp-hero">
        <span className="pill exp-pill">
          <span className="pill-dot" />
          CAREER & LEADERSHIP JOURNEY
        </span>
        <h1 className="text-hero exp-hero-title">
          Leadership <span className="text-gradient-accent">&</span> Experience
        </h1>
        <p className="exp-hero-desc">
          A track record of taking initiative, leading teams, coordination, and ensuring smooth project and event execution.
        </p>
      </motion.section>

      {/* Professional Experience Section */}
      <motion.section 
        className="exp-section"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <h2 className="exp-section-title">Professional Experience</h2>
        <div className="experience-grid">
          {professionalItems.map((item) => (
            <InteractiveCard
              key={item.id}
              variants={fadeUp}
              className="exp-card exp-card--wide"
              glowColor={item.glow}
            >
              <div className="exp-card-icon" style={{ background: item.accent }}>
                {item.icon}
              </div>
              <div className="exp-card-badge" style={{ background: item.accent }}>
                {item.type}
              </div>
              <h3 className="exp-card-title">{item.title}</h3>
              <div className="exp-card-period">{item.period}</div>
              <p className="exp-card-description">{item.description}</p>
            </InteractiveCard>
          ))}
        </div>
      </motion.section>

      {/* Leadership & Event Coordination Section */}
      <motion.section 
        className="exp-section"
        style={{ marginTop: '56px' }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <h2 className="exp-section-title">Leadership & Coordination</h2>
        <div className="experience-grid">
          {leadershipItems.map((item) => (
            <InteractiveCard
              key={item.id}
              variants={fadeUp}
              className="exp-card"
              glowColor={item.glow}
            >
              <div className="exp-card-icon" style={{ background: item.accent }}>
                {item.icon}
              </div>
              <div className="exp-card-badge" style={{ background: item.accent }}>
                {item.type}
              </div>
              <h3 className="exp-card-title">{item.title}</h3>
              <div className="exp-card-period">{item.period}</div>
              <p className="exp-card-description">{item.description}</p>
            </InteractiveCard>
          ))}
        </div>
      </motion.section>

      <Disclaimer />
    </motion.div>
  );
};
