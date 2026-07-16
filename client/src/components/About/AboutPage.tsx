import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Brain, Star, Handshake, Target, Scale, Building, 
  GraduationCap, Briefcase, BarChart3, Lightbulb, Zap, User, 
  MessageSquare, Users, Calendar, ShieldCheck, Award
} from "lucide-react";
import { getProfilePicture } from "../../api/api";
import { Disclaimer } from "../Shared/Disclaimer/Disclaimer";
import { InteractiveCard } from "../Shared/InteractiveCard/InteractiveCard";
import "./AboutPage.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const interests = [
  { icon: <Brain size={16} color="#a78bfa" />, label: "Human behavior & communication", color: "#a78bfa" },
  { icon: <Star size={16} color="#f472b6" />, label: "Customer experience & satisfaction", color: "#f472b6" },
  { icon: <Handshake size={16} color="#34d399" />, label: "Client relationship management", color: "#34d399" },
  { icon: <Target size={16} color="#60a5fa" />, label: "Leadership & event coordination", color: "#60a5fa" },
  { icon: <Scale size={16} color="#fb923c" />, label: "Conflict resolution & diplomacy", color: "#fb923c" },
  { icon: <Building size={16} color="#e879f9" />, label: "Corporate workplace dynamics", color: "#e879f9" },
];

const businessSkills = [
  { name: "Verbal & Written Comm.", color: "#a78bfa" },
  { name: "Client Handling", color: "#f472b6" },
  { name: "Lead Generation", color: "#34d399" },
  { name: "Event Planning & Coordination", color: "#60a5fa" },
  { name: "Documentation & Reporting", color: "#fb923c" },
  { name: "Conflict Resolution", color: "#e879f9" },
];

const techAwareness = [
  { name: "Website Management", color: "#38bdf8" },
  { name: "SEO Optimization", color: "#34d399" },
  { name: "HTML & CSS", color: "#facc15" },
  { name: "React.js / JavaScript", color: "#a78bfa" },
  { name: "Git & GitHub", color: "#f472b6" },
];

export const AboutPage: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPic = async () => {
      try {
        const res = await getProfilePicture();
        if (res.success && res.data) {
          setProfilePic(res.data.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching about profile picture:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPic();
  }, []);

  return (
    <motion.div
      className="about-page"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {/* About Introduction Section */}
      <motion.section variants={fadeUp} className="about-hero">
        <div className="about-hero-grid">
          {/* Left: profile image */}
          <div className="about-hero-image-container">
            <div className="about-hero-image-wrapper">
              {loading ? (
                <div className="profile-pic-loading-pulse" />
              ) : profilePic ? (
                <img src={profilePic} alt="Puspender Kumar" className="about-profile-img" />
              ) : (
                <div className="about-profile-placeholder">
                  <User size={64} className="about-placeholder-icon" />
                </div>
              )}
            </div>
            <div className="about-hero-image-glow" />
          </div>

          {/* Right: bio text */}
          <div className="about-hero-text">
            <span className="pill about-pill">
              <span className="pill-dot" />
              PROFILE OVERVIEW
            </span>
            <h1 className="text-hero about-hero-title">
              About <span className="text-gradient-accent">Me</span>
            </h1>
            <p className="about-hero-desc">
              I am a motivated, proactive BCA (AI) student with proven internship and student coordination experience. I possess excellent communication skills and natural leadership qualities that enable me to coordinate events, coordinate with clients, and work efficiently within cross-functional corporate teams.
            </p>
            <p className="about-hero-subdesc">
              I focus on bridging the gap between business objectives and technology, applying structured organization, strong presentation abilities, and problem-solving to drive customer engagement and growth.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Bento Grid */}
      <div className="about-bento">
        {/* Leadership & Coordination Card - Large */}
        <InteractiveCard variants={fadeUp} className="about-card about-card--edu" glowColor="rgba(124,58,237,0.25)">
          <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}><Users color="white" /></div>
          <div className="about-card-tag" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>Core Strengths</div>
          <h2 className="about-card-title">Leadership & Communication</h2>
          <p className="about-card-intro-text" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Proven ability to coordinate events and manage cross-functional projects. Recognized for faculty liaison work, public speaking, and leading diverse groups.
          </p>
          <div className="about-edu-tags">
            {["Student Coordination", "Faculty Liaison", "Public Speaking", "Event Planning", "Teamwork", "Problem Solving", "Adaptability", "Customer Focus"].map(t => (
              <span key={t} className="about-skill-chip">{t}</span>
            ))}
          </div>
        </InteractiveCard>

        {/* Skills Card */}
        <InteractiveCard variants={fadeUp} className="about-card about-card--skills" glowColor="rgba(236,72,153,0.25)">
          <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}><BarChart3 color="white" /></div>
          <div className="about-card-tag" style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}>Competencies</div>
          <h2 className="about-card-title">Corporate Skills</h2>
          
          <div style={{ marginTop: '8px' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '12px' }}>Communication & Business</h3>
            <div className="about-skills-matrix">
              {businessSkills.map((s, i) => (
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
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '12px' }}>Technical Awareness</h3>
            <div className="about-skills-matrix" style={{ marginTop: 0 }}>
              {techAwareness.map((s, i) => (
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
          <h2 className="about-card-title">Professional Focus</h2>
          <div className="about-interests-grid">
            {interests.map((item) => (
              <div key={item.label} className="about-interest-chip">
                <span className="about-interest-icon">{item.icon}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </InteractiveCard>

        {/* Education & Academic Card */}
        <InteractiveCard variants={fadeUp} className="about-card about-card--facts" glowColor="rgba(16,185,129,0.25)">
          <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}><GraduationCap color="white" /></div>
          <div className="about-card-tag" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>Education</div>
          
          <div className="about-edu-details" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', width: '100%', alignItems: 'center' }}>
            <div>
              <h3 className="about-edu-degree" style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>BCA (Artificial Intelligence)</h3>
              <div className="about-edu-institution" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>CodeQuotient School of Technology</div>
            </div>
            <div className="about-edu-row" style={{ marginTop: 0 }}>
              <span className="about-edu-badge">2024 – 2027</span>
              <span className="about-edu-badge about-edu-badge--score" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Score: 7.9 <Star size={12} color="#f59e0b" fill="#f59e0b" /></span>
            </div>
          </div>
        </InteractiveCard>
      </div>

      <Disclaimer />
    </motion.div>
  );
};
