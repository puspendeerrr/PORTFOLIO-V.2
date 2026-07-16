import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { getProfilePicture } from "../../../api/api";
import { User, FileText, Send, Briefcase } from "lucide-react";
import "./HomeHeroSection.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export const HomeHeroSection: React.FC = () => {
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
        console.error("Error fetching hero profile picture:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPic();
  }, []);

  return (
    <section className="home-hero-section">
      <motion.div 
        className="home-hero-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Hero Text */}
        <div className="home-hero-text-col">
          <motion.div variants={fadeUp} className="pill hero-pill">
            <span className="pill-dot" />
            BCA (AI) student & coordinator
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-hero home-hero-title">
            PUSPENDER KUMAR
          </motion.h1>

          <motion.h2 variants={fadeUp} className="home-hero-subtitle">
            BCA (Artificial Intelligence)
          </motion.h2>
          
          <motion.div variants={fadeUp} className="home-hero-roles">
            <span className="text-gradient-accent">
              <TypeAnimation
                sequence={[
                  'IT Inside Marketing Executive', 2000,
                  'IT Inside Sales Executive', 2000,
                  'HR Executive', 2000,
                  'Customer Success Specialist', 2000,
                  'Business Support Coordinator', 2000,
                  'Operations Coordinator', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </motion.div>
          
          <motion.p variants={fadeUp} className="home-hero-body">
            Motivated BCA (AI) student with internship experience, leadership experience, and excellent communication skills. Passionate about client communication, business growth, customer engagement, and delivering exceptional customer experiences.
          </motion.p>
          
          <motion.div variants={fadeUp} className="home-hero-actions">
            <a href="/resume.pdf" download="Puspender_Kumar_Resume.pdf" className="btn btn--primary btn-icon-gap">
              <FileText size={18} /> Download Resume
            </a>
            <Link to="/contact" className="btn btn--ghost btn-icon-gap">
              <Send size={18} /> Contact Me
            </Link>
            <Link to="/projects" className="btn btn--ghost btn-icon-gap">
              <Briefcase size={18} /> View Projects
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Profile Picture */}
        <motion.div 
          className="home-hero-image-col"
          variants={fadeUp}
        >
          <div className="home-hero-image-card">
            <div className="home-hero-image-wrapper">
              {loading ? (
                <div className="profile-pic-loading-pulse" />
              ) : profilePic ? (
                <img src={profilePic} alt="Puspender Kumar" className="home-hero-profile-img" />
              ) : (
                <div className="home-hero-image-placeholder">
                  <User size={80} className="home-hero-placeholder-icon" />
                </div>
              )}
            </div>
            <div className="home-hero-image-glow" style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)' }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Info Strip */}
      <motion.div 
        className="home-hero-meta-strip"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeUp} className="surface home-meta-card">
          <div className="home-meta-label">Focus Area</div>
          <div className="home-meta-value text-gradient">Client Relations & Sales Enablement</div>
        </motion.div>
        <motion.div variants={fadeUp} className="surface home-meta-card">
          <div className="home-meta-label">Interpersonal Strengths</div>
          <div className="home-meta-value text-gradient">Public Speaking, Coordination & HR Focus</div>
        </motion.div>
      </motion.div>
    </section>
  );
};
