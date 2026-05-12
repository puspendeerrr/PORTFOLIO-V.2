import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { HomeHeroSection } from "./Hero/HomeHeroSection";
import { Disclaimer } from "../Shared/Disclaimer/Disclaimer";
import { InteractiveCard } from "../Shared/InteractiveCard/InteractiveCard";
import "./HomePage.css";

const TargetIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const LightningIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const MicIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
const ClipboardIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14h6"/><path d="M9 18h6"/><path d="M9 10h6"/></svg>;
const UsersIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const strengths = [
  {
    icon: <TargetIcon />,
    title: "Leadership & Management",
    desc: "Successfully led the Entrepreneurship Club and a Smart India Hackathon team. I excel at delegating tasks, managing deadlines, and ensuring everyone feels heard and valued.",
    accent: "linear-gradient(135deg, #7c3aed, #a855f7)",
    glow: "rgba(124, 58, 237, 0.25)",
    tag: "Core Skill",
    span: "large"
  },
  {
    icon: <LightningIcon />,
    title: "Technical Acumen",
    desc: "MERN stack, Python, C++. I bridge the gap between technical constraints and human-centric solutions.",
    accent: "linear-gradient(135deg, #ec4899, #f97316)",
    glow: "rgba(236, 72, 153, 0.25)",
    tag: "Tech",
    span: "tall"
  },
  {
    icon: <MicIcon />,
    title: "Communication",
    desc: "Experienced event host and anchor. I know how to read a room, engage an audience, and mediate conflicts effectively.",
    accent: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    glow: "rgba(6, 182, 212, 0.25)",
    tag: "Soft Skill",
    span: "wide"
  },
  {
    icon: <ClipboardIcon />,
    title: "Documentation",
    desc: "Detail-oriented documentation, MS Excel & Google Sheets analytics.",
    accent: "linear-gradient(135deg, #10b981, #06b6d4)",
    glow: "rgba(16, 185, 129, 0.25)",
    tag: "Tools",
    span: "small"
  },
  {
    icon: <UsersIcon />,
    title: "Diplomacy",
    desc: "Strong interpersonal skills built through HR interest, conflict resolution, and cross-functional teamwork.",
    accent: "linear-gradient(135deg, #f59e0b, #ef4444)",
    glow: "rgba(245, 158, 11, 0.25)",
    tag: "People",
    span: "small"
  },
];

const AnimatedCounter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const isDecimal = !Number.isInteger(numericValue) || value.includes(".");
  
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && !isNaN(numericValue) && numericValue > 0) {
      let start = 0;
      const duration = 2000;
      const increment = numericValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, numericValue]);

  if (isNaN(numericValue) || numericValue === 0) return <span>{value}</span>;
  
  const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count);
  return <span ref={ref}>{displayValue}{suffix}</span>;
};



export const HomePage: React.FC = () => {
  return (
    <motion.div
      className="home-page-grid"
      aria-label="Home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HomeHeroSection />

      {/* Core Strengths Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="home-strengths"
      >
        <motion.div variants={fadeUp} className="home-section-label">
          <span className="pill hero-pill" style={{ background: 'rgba(124,58,237,0.12)', borderColor: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>
            <span className="pill-dot" style={{ background: '#a78bfa', boxShadow: '0 0 8px #7c3aed' }} />
            WHAT I BRING TO THE TABLE
          </span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="home-strengths-title">
          Core <span className="text-gradient-accent">Strengths</span>
        </motion.h2>

        <div className="home-bento-grid">
          {strengths.map((s, i) => (
            <InteractiveCard 
              key={i} 
              variants={fadeUp} 
              className={`home-bento-card home-bento-card--${s.span}`}
              glowColor={s.glow}
            >
              <div className="home-bento-icon" style={{ background: s.accent }}>
                {s.icon}
              </div>
              <div className="home-bento-tag" style={{ background: s.accent }}>{s.tag}</div>
              <h3 className="home-bento-title">{s.title}</h3>
              <p className="home-bento-desc">{s.desc}</p>
            </InteractiveCard>
          ))}
        </div>
      </motion.section>

      {/* Stats Strip */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="home-stats-strip surface"
      >
        {[
          { value: "7.9", label: "CGPA Score", color: "#a78bfa" },
          { value: "2024", label: "Started BCA (AI)", color: "#f472b6" },
          { value: "4+", label: "Roles Led", color: "#34d399" },
          { value: "3", label: "Years Program", color: "#60a5fa" },
        ].map((stat, i) => (
          <motion.div key={i} variants={fadeUp} className="home-stat">
            <div className="home-stat-value" style={{ color: stat.color }}>
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="home-stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Disclaimer />
      </motion.div>
    </motion.div>
  );
};
