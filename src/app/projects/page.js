'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { projects } from '@/data/projects';

const categories = ['ALL', 'OFFICE', 'COMMERCIAL', 'RESIDENTIAL'];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [hoveredId, setHoveredId] = useState(null);

    const filtered = activeCategory === 'ALL'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 80, minHeight: '100vh', backgroundColor: '#FDFCF8' }}>

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 0,
                }} className="projects-grid">
                    {filtered.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden' }}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Thumbnail */}
                            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                                <img
                                    src={project.thumbnail}
                                    alt={project.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                        transform: hoveredId === project.id ? 'scale(1.06)' : 'scale(1)',
                                        transition: 'transform 0.5s ease',
                                    }}
                                />
                                {/* Hover overlay */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    backgroundColor: hoveredId === project.id ? 'rgba(30,20,10,0.35)' : 'rgba(30,20,10,0)',
                                    transition: 'background-color 0.3s ease',
                                }} />
                            </div>

                            {/* Info bar */}
                            <div style={{
                                backgroundColor: hoveredId === project.id ? '#1c1917' : '#ffffff',
                                borderBottom: '2px solid',
                                borderColor: hoveredId === project.id ? '#b45309' : '#e7e5e4',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.3s ease',
                            }}>
                                <div>
                                    <p style={{
                                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                                        fontSize: 15,
                                        fontWeight: 600,
                                        color: hoveredId === project.id ? '#ffffff' : '#1c1917',
                                        marginBottom: 2,
                                        transition: 'color 0.3s',
                                        letterSpacing: '0.02em',
                                    }}>
                                        {project.name}
                                    </p>
                                    <p style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: 10,
                                        letterSpacing: '0.18em',
                                        color: hoveredId === project.id ? '#b45309' : '#a8a29e',
                                        transition: 'color 0.3s',
                                    }}>
                                        {project.category} · {project.year}
                                    </p>
                                </div>

                                {/* Arrow icon */}
                                <div style={{
                                    opacity: hoveredId === project.id ? 1 : 0,
                                    transform: hoveredId === project.id ? 'translateX(0)' : 'translateX(-8px)',
                                    transition: 'all 0.3s ease',
                                    color: '#b45309',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Filter tabs — bottom */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 32,
                    padding: '20px 40px',
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #f5f5f4',
                }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 11,
                                letterSpacing: '0.15em',
                                fontWeight: activeCategory === cat ? 600 : 400,
                                color: activeCategory === cat ? '#3a3228' : '#a8a29e',
                                paddingBottom: 4,
                                borderBottom: activeCategory === cat ? '2px solid #b45309' : '2px solid transparent',
                                transition: 'all 0.2s ease',
                                fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

            </main>

            <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .projects-grid { grid-template-columns: repeat(1, 1fr) !important; }
        }

        @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 1024px) and (min-width: 769px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
      `}</style>
        </>
    );
}