import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, FileText, Copy, Check } from "lucide-react";
import "./ContactInfoSection.css";

export const ContactInfoSection: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const contactItems = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "puspendernarayan@gmail.com",
      link: "mailto:puspendernarayan@gmail.com",
      copyable: true,
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+91 9306690894",
      link: "tel:+919306690894",
      copyable: true,
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Panipat, Haryana, India",
      copyable: true,
    },

    {
      icon: <Globe size={20} />,
      label: "Portfolio",
      value: "puspender.in",
      link: "/",
      copyable: false,
    },
    {
      icon: <FileText size={20} />,
      label: "Resume",
      value: "Puspender_Kumar_Resume.pdf",
      link: "/resume.pdf",
      download: "Puspender_Kumar_Resume.pdf",
      copyable: false,
    }
  ];

  return (
    <section className="surface contact-info-card">
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <span className="pill" style={{ background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', marginBottom: '12px' }}>
          <span className="pill-dot" style={{ background: '#34d399', boxShadow: '0 0 8px #10b981' }} />
          Get In Touch
        </span>
        <h2 className="section-title" style={{ fontSize: '2.2rem', margin: 0 }}>Contact Details</h2>
        <p className="section-caption" style={{ marginTop: '8px' }}>Direct channels to discuss corporate opportunities.</p>
      </div>

      <div className="contact-items-list">
        {contactItems.map((item, idx) => (
          <div key={idx} className="contact-item-row">
            <div className="contact-item-icon-box">
              {item.icon}
            </div>
            
            <div className="contact-item-details">
              <span className="contact-item-label">{item.label}</span>
              {item.link ? (
                <a 
                  href={item.link} 
                  download={item.download} 
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-item-value-link"
                >
                  {item.value}
                </a>
              ) : (
                <span className="contact-item-value">{item.value}</span>
              )}
            </div>

            {item.copyable && (
              <button
                type="button"
                className="contact-item-copy-btn"
                onClick={() => handleCopy(item.value, item.label)}
                title={`Copy ${item.label}`}
              >
                {copiedText === item.label ? (
                  <Check size={16} className="copy-success-icon" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
