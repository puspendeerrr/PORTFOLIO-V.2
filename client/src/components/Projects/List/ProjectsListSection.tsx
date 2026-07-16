import React, { useState, useEffect } from "react";
import { getProjects } from "../../../api/api";
import { InteractiveCard } from "../../Shared/InteractiveCard/InteractiveCard";
import { AlertCircle, ArrowUpRight, Code, Target, ShieldCheck, Award } from "lucide-react";
import "./ProjectsListSection.css";

interface Project {
  _id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  role?: string;
  outcome?: string;
  keyFeatures: string[];
  whatILearned: string;
  techStack: string[];
  codeLink: string;
  liveLink?: string;
  tag: string;
  createdAt: string;
}

export const ProjectsListSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        
        if (response.success) {
          setProjects(response.data || []);
        } else {
          throw new Error(response.message || 'Failed to fetch projects');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        console.error('Fetch projects error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="surface projects-list">
        <div className="loading-state">
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="surface projects-list">
        <div className="error-state">
          <p>Error: {error}</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="surface projects-list">
        <div className="empty-state">
          <p>No projects yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="surface projects-list">
      <div className="projects-cards">
        {projects.map((project) => (
          <InteractiveCard key={project._id} className="project-card" glowColor="rgba(16, 185, 129, 0.15)">
            <header className="project-card-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <h3 className="project-card-title">{project.title}</h3>
                <span className="tag project-tag-badge">{project.tag}</span>
              </div>
              <p className="project-card-summary">{project.description}</p>
            </header>

            <div className="project-card-body">
              {/* Problem */}
              {project.problem && (
                <div className="project-card-section">
                  <div className="project-card-section-label">Problem</div>
                  <p className="project-card-section-content">{project.problem}</p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="project-card-section">
                  <div className="project-card-section-label">Solution</div>
                  <p className="project-card-section-content">{project.solution}</p>
                </div>
              )}

              {/* Role */}
              {project.role && (
                <div className="project-card-section">
                  <div className="project-card-section-label">Role / Responsibility</div>
                  <p className="project-card-section-content">{project.role}</p>
                </div>
              )}

              {/* Outcome */}
              {project.outcome && (
                <div className="project-card-section">
                  <div className="project-card-section-label">Business Outcome & Impact</div>
                  <p className="project-card-section-content project-card-section-content--highlight">{project.outcome}</p>
                </div>
              )}

              {/* Fallback to Key Features / Learnings if Problem/Solution not set */}
              {!project.problem && project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="project-card-section">
                  <div className="project-card-section-label">Key Features</div>
                  <ul className="project-card-features">
                    {project.keyFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <footer className="project-card-footer" style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '20px', marginTop: '12px' }}>
              {project.techStack && project.techStack.length > 0 && (
                <div className="project-tech-section" style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: 600 }}>Technologies Used</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tag project-tech-pill" style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.02)' }}>{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span className="project-card-date" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric"
                  })}
                </span>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a 
                    href={project.codeLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn--ghost project-card-btn"
                    style={{ padding: '10px 18px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Code size={16} /> View Code
                  </a>
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn--primary project-card-btn"
                      style={{ padding: '10px 18px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      Live Demo <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </footer>
          </InteractiveCard>
        ))}
      </div>
    </section>
  );
};
