import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, MessageSquare, FileSpreadsheet } from 'lucide-react';

const Home = ({ isAuthenticated }) => {
  return (
    <div style={{
      minHeight: 'calc(100vh - var(--navbar-height))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-8) var(--space-6)',
      background: 'linear-gradient(180deg, var(--color-gray-50) 0%, white 40%, var(--color-primary-50) 100%)',
      textAlign: 'center',
      animation: 'fadeIn 0.5s ease-out',
    }}>
      {/* Hero */}
      <div style={{ maxWidth: '680px', marginBottom: 'var(--space-12)' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          background: 'var(--color-primary-50)',
          border: '1px solid var(--color-primary-100)',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--color-primary-700)',
          marginBottom: 'var(--space-6)',
        }}>
          AI-Powered Research
        </div>
        
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          letterSpacing: '-0.04em',
          marginBottom: 'var(--space-5)',
        }}>
          Equity Research,
          <br />
          <span style={{ color: 'var(--color-primary-600)' }}>Reimagined</span>
        </h1>
        
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: 'var(--space-8)',
          maxWidth: '520px',
          margin: '0 auto var(--space-8) auto',
        }}>
          Analyze financial articles, generate visualizations, and export data — all powered by AI in a single workflow.
        </p>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {isAuthenticated ? (
            <Link to="/dashboard" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-primary-600)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: 'var(--text-base)',
              textDecoration: 'none',
              transition: 'all 200ms ease',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
            }}>
              Go to Dashboard
              <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link to="/signup" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: 'var(--space-3) var(--space-6)',
                background: 'var(--color-primary-600)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: 'var(--text-base)',
                textDecoration: 'none',
                transition: 'all 200ms ease',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
              }}>
                Get Started Free
                <ArrowRight size={16} />
              </Link>
              <Link to="/login" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: 'var(--space-3) var(--space-6)',
                background: 'var(--surface-primary)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: 'var(--text-base)',
                textDecoration: 'none',
                border: '1px solid var(--border-default)',
                transition: 'all 200ms ease',
              }}>
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-5)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '800px',
      }}>
        {[
          { icon: MessageSquare, title: 'Chat with AI', desc: 'Ask questions about your analyzed data in natural language' },
          { icon: BarChart3, title: 'Visualize Data', desc: 'Generate charts and graphs from your research sources' },
          { icon: FileSpreadsheet, title: 'Export to Excel', desc: 'Download structured data as spreadsheets instantly' },
        ].map((feature, i) => (
          <div key={i} style={{
            flex: '1 1 220px',
            maxWidth: '260px',
            padding: 'var(--space-6)',
            background: 'var(--surface-primary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'left',
            transition: 'all 200ms ease',
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-primary-50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)',
              color: 'var(--color-primary-600)',
            }}>
              <feature.icon size={18} />
            </div>
            <h3 style={{
              fontSize: 'var(--text-md)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-2)',
            }}>
              {feature.title}
            </h3>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
