import React from 'react';
import { BarChart3, MessageSquare, FileSpreadsheet, Globe, Zap, Shield } from 'lucide-react';

const features = [
  { icon: Globe, title: 'URL Scraping', desc: 'Extract and process content from any financial article or report URL.' },
  { icon: Zap, title: 'AI Analysis', desc: 'Powered by advanced language models for deep equity research insights.' },
  { icon: MessageSquare, title: 'Interactive Chat', desc: 'Ask follow-up questions and explore analysis through conversation.' },
  { icon: BarChart3, title: 'Visualizations', desc: 'Generate charts and graphs directly from your research data.' },
  { icon: FileSpreadsheet, title: 'Excel Export', desc: 'Download structured data as Excel spreadsheets for further analysis.' },
  { icon: Shield, title: 'Secure Access', desc: 'OTP-verified authentication to keep your research private.' },
];

const About = () => {
  return (
    <div style={{
      minHeight: 'calc(100vh - var(--navbar-height))',
      background: 'linear-gradient(180deg, var(--color-gray-50) 0%, white 100%)',
      padding: 'var(--space-12) var(--space-6)',
      animation: 'fadeIn 0.4s ease-out',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h1 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-4)',
          }}>
            About Equity Research Tool
          </h1>
          <p style={{
            fontSize: 'var(--text-lg)',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Streamline your equity research workflow with AI-powered analysis, visualization, 
            and data extraction — all from a single interface.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-5)',
          marginBottom: 'var(--space-12)',
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'var(--surface-primary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              transition: 'all 200ms ease',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-primary-200)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-primary-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
                color: 'var(--color-primary-600)',
              }}>
                <f.icon size={20} />
              </div>
              <h3 style={{
                fontSize: 'var(--text-md)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-2)',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-8)',
          background: 'var(--surface-primary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
        }}>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Built with React, FastAPI, and modern AI capabilities. 
            Designed for analysts and investors who demand speed and accuracy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
