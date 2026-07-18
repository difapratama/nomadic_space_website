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
                }}>
                    {filtered.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            style={{ textDecoration: 'none', display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Thumbnail */}
                            <img
                                src={project.thumbnail}
                                alt={project.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    transform: hoveredId === project.id ? 'scale(1.08)' : 'scale(1)',
                                    transition: 'transform 0.5s ease',
                                }}
                            />

                            {/* Hover overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(30, 20, 10, 0.65)',
                                opacity: hoveredId === project.id ? 1 : 0,
                                transition: 'opacity 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 24,
                                textAlign: 'center',
                            }}>
                                <div style={{
                                    width: 32,
                                    height: 1,
                                    backgroundColor: '#fcd34d',
                                    marginBottom: 16,
                                    transform: hoveredId === project.id ? 'scaleX(1)' : 'scaleX(0)',
                                    transition: 'transform 0.4s ease 0.1s',
                                }} />
                                <p style={{
                                    color: '#ffffff',
                                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                                    fontSize: 18,
                                    fontWeight: 600,
                                    letterSpacing: '0.08em',
                                    marginBottom: 8,
                                    transform: hoveredId === project.id ? 'translateY(0)' : 'translateY(8px)',
                                    transition: 'transform 0.3s ease 0.1s',
                                }}>
                                    {project.name}
                                </p>
                                <p style={{
                                    color: 'rgba(253,230,138,0.85)',
                                    fontSize: 10,
                                    letterSpacing: '0.2em',
                                    fontFamily: 'Inter, sans-serif',
                                    transform: hoveredId === project.id ? 'translateY(0)' : 'translateY(8px)',
                                    transition: 'transform 0.3s ease 0.15s',
                                }}>
                                    {project.category} · {project.year}
                                </p>
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
      `}</style>
        </>
    );
}