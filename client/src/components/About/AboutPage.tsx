import React from "react";
import { motion } from "framer-motion";
import { Brain, Star, Handshake, Target, Scale, Building, GraduationCap, BarChart3, Lightbulb, Zap } from "lucide-react";
import { Disclaimer } from "../Shared/Disclaimer/Disclaimer";
import { InteractiveCard } from "../Shared/InteractiveCard/InteractiveCard";
import "./AboutPage.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const interests = [
  { icon: <Brain size={16} color="#a78bfa" />, label: "Human behavior & communication", color: "#a78bfa" },
  { icon: <Star size={16} color="#f472b6" />, label: "Customer experience", color: "#f472b6" },
  { icon: <Handshake size={16} color="#34d399" />, label: "Relationship management", color: "#34d399" },
  { icon: <Target size={16} color="#60a5fa" />, label: "Leadership & team coordination", color: "#60a5fa" },
  { icon: <Scale size={16} color="#fb923c" />, label: "Conflict resolution", color: "#fb923c" },
  { icon: <Building size={16} color="#e879f9" />, label: "Workplace dynamics", color: "#e879f9" },
];

const techSkills = [
  { name: "MERN Stack", color: "#a78bfa" },
  { name: "React.js & Node.js", color: "#38bdf8" },
  { name: "Python", color: "#f472b6" },
  { name: "C++", color: "#34d399" },
  { name: "JavaScript / TS", color: "#facc15" },
  { name: "MongoDB & SQL", color: "#10b981" },
  { name: "HTML & CSS", color: "#fb923c" },
];

const softSkills = [
  { name: "MS Excel / Sheets", color: "#60a5fa" },
  { name: "Documentation", color: "#fb923c" },
  { name: "Public Speaking", color: "#e879f9" },
  { name: "Team Leadership", color: "#a78bfa" },
  { name: "Problem Solving", color: "#34d399" },
  { name: "Communication", color: "#f472b6" },
];

export const AboutPage: React.FC = () => {
  return (
    <motion.div
      className="about-page"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {/* Hero */}
      <motion.section variants={fadeUp} className="about-hero">
        <span className="pill about-pill">
          <span className="pill-dot" />
          PROFILE OVERVIEW
        </span>
        <h1 className="text-hero about-hero-title">
          About <span className="text-gradient-accent">Me</span>
        </h1>
        <p className="about-hero-desc">
          I am a motivated BCA (AI) student with a strong interest in{" "}
          <span className="about-highlight">Human Resources</span>,{" "}
          <span className="about-highlight">people management</span>, and{" "}
          <span className="about-highlight">communication</span>. I bring a proactive,
          detail-oriented mindset backed by real leadership experience.
        </p>
      </motion.section>

      {/* Bento Grid */}
      <div className="about-bento">

        {/* Education Card - Large */}
        <InteractiveCard variants={fadeUp} className="about-card about-card--edu" glowColor="rgba(124,58,237,0.25)">
          <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}><GraduationCap color="white" /></div>
          <div className="about-card-tag" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>Education</div>
          <h2 className="about-card-title">BCA (Artificial Intelligence)</h2>
          <div className="about-edu-school">CodeQuotient School of Technology</div>
          <div className="about-edu-row">
            <span className="about-edu-badge">2024 – 2027</span>
            <span className="about-edu-badge about-edu-badge--score" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Score: 7.9 <Star size={12} color="#f59e0b" fill="#f59e0b" /></span>
          </div>
          <div className="about-edu-tags">
            {["MERN Stack","Python","C++","DSA","OOP","AI/ML","DBMS","Networking"].map(t => (
              <span key={t} className="about-skill-chip">{t}</span>
            ))}
          </div>
        </InteractiveCard>

        {/* Skills Card */}
        <InteractiveCard variants={fadeUp} className="about-card about-card--skills" glowColor="rgba(236,72,153,0.25)">
          <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}><BarChart3 color="white" /></div>
          <div className="about-card-tag" style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}>Skill Levels</div>
          <h2 className="about-card-title">Core Competencies</h2>
          
          <div style={{ marginTop: '8px' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '12px' }}>Technical Skills</h3>
            <div className="about-skills-matrix">
              {techSkills.map((s, i) => (
                <motion.div 
                  key={s.name} 
                  className="about-skill-badge"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="about-skill-dot" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                  <span style={{ color: 'var(--color-text)' }}>{s.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '12px' }}>Soft Skills & Tools</h3>
            <div className="about-skills-matrix" style={{ marginTop: 0 }}>
              {softSkills.map((s, i) => (
                <motion.div 
                  key={s.name} 
                  className="about-skill-badge"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                >
                  <span className="about-skill-dot" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                  <span style={{ color: 'var(--color-text)' }}>{s.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </InteractiveCard>

        {/* Interests Card */}
        <InteractiveCard variants={fadeUp} className="about-card about-card--interests" glowColor="rgba(6,182,212,0.25)">
          <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}><Lightbulb color="white" /></div>
          <div className="about-card-tag" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>Focus Areas</div>
          <h2 className="about-card-title">Professional Interests</h2>
          <div className="about-interests-grid">
            {interests.map((item) => (
              <div key={item.label} className="about-interest-chip">
                <span className="about-interest-icon">{item.icon}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </InteractiveCard>

        {/* Quick Facts */}
        <InteractiveCard variants={fadeUp} className="about-card about-card--facts" glowColor="rgba(16,185,129,0.25)">
          <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}><Zap color="white" /></div>
          <div className="about-card-tag" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>Quick Facts</div>
          <h2 className="about-card-title">At a Glance</h2>
          <div className="about-facts-list">
            {[
              { label: "Location", value: "India" },
              { label: "Email", value: "puspendernarayan@gmail.com" },
              { label: "Phone", value: "+91 9306690894" },
              { label: "Website", value: "puspender.in" },
            ].map(f => (
              <div key={f.label} className="about-fact-row">
                <span className="about-fact-label">{f.label}</span>
                <span className="about-fact-value">{f.value}</span>
              </div>
            ))}
          </div>
        </InteractiveCard>
      </div>

      <Disclaimer />
    </motion.div>
  );
};
