'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';

export default function ProjectDetail({ params }) {
    const { id } = use(params);
    const project = projects.find((p) => p.id === id);
    if (!project) notFound();

    const currentIndex = projects.findIndex((p) => p.id === id);
    const prevProject = projects[currentIndex - 1] || null;
    const nextProject = projects[currentIndex + 1] || null;

    const allImages = [project.thumbnail, ...(project.images || [])].filter(
        (img, i, arr) => arr.indexOf(img) === i
    );
    const gridImages = allImages.length < 6
        ? [...allImages, ...Array(6 - allImages.length).fill(project.thumbnail)]
        : allImages;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);

    const openModal = (i) => { setModalIndex(i); setModalOpen(true); };
    const closeModal = () => setModalOpen(false);
    const modalNext = () => setModalIndex((prev) => (prev + 1) % gridImages.length);
    const modalPrev = () => setModalIndex((prev) => (prev - 1 + gridImages.length) % gridImages.length);

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: 80, minHeight: '100vh', backgroundColor: '#FDFCF8' }}>
                <div style={{ display: 'flex', minHeight: '100vh' }}>
                    <div style={{
                        flex: 1,
                        padding: '128px 48px 48px 48px',   // ← padding top 128 = navbar + space
                        maxWidth: '62%'
                    }}>

                        <h1 style={{
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: 'clamp(36px, 4vw, 60px)',
                            fontWeight: 700, color: '#1c1917',
                            letterSpacing: '0.02em', marginBottom: 40, lineHeight: 1.1,
                        }}>
                            {project.name}
                        </h1>

                        {/* Grid 3 kolom */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 40 }}>
                            {gridImages.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => openModal(i)}
                                    style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }}
                                    onMouseEnter={e => {
                                        e.currentTarget.querySelector('img').style.transform = 'scale(1.06)';
                                        e.currentTarget.querySelector('.overlay').style.backgroundColor = 'rgba(30,20,10,0.35)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                                        e.currentTarget.querySelector('.overlay').style.backgroundColor = 'rgba(30,20,10,0)';
                                    }}
                                >
                                    <img src={img} alt={`${project.name} ${i + 1}`} style={{
                                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                                        transition: 'transform 0.4s ease',
                                    }} />
                                    <div className="overlay" style={{
                                        position: 'absolute', inset: 0,
                                        backgroundColor: 'rgba(30,20,10,0)',
                                        transition: 'background-color 0.3s',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" style={{ width: 28, height: 28, opacity: 0.8 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div style={{ maxWidth: 580, marginBottom: 64 }}>
                            <p style={{
                                fontFamily: 'Cormorant Garamond, Georgia, serif',
                                fontSize: 16, fontStyle: 'italic', color: '#78716c',
                                marginBottom: 16, lineHeight: 1.6,
                            }}>
                                {project.tagline || 'Turning Challenges into Achievements'}
                            </p>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.8, color: '#57534e' }}>
                                {project.description}
                            </p>
                        </div>

                        {/* Bottom nav */}
                        <div style={{ borderTop: '1px solid #e7e5e4', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <Link href={prevProject ? `/projects/${prevProject.id}` : '#'} style={{
                                    color: prevProject ? '#3a3228' : '#d6d3d1', textDecoration: 'none',
                                    pointerEvents: prevProject ? 'auto' : 'none',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                </Link>
                                <span style={{ color: '#d6d3d1' }}>/</span>
                                <Link href={nextProject ? `/projects/${nextProject.id}` : '#'} style={{
                                    color: nextProject ? '#3a3228' : '#d6d3d1', textDecoration: 'none',
                                    pointerEvents: nextProject ? 'auto' : 'none',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                            <Link href="/projects" style={{ color: '#3a3228', textDecoration: 'none' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 22, height: 22 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT — fixed full height image */}
                    <div style={{
                        width: '38%',
                        position: 'fixed',
                        top: 0,                        // ← ubah dari 80 ke 0
                        right: 0,
                        height: '100vh',               // ← ubah dari calc(100vh - 80px) ke 100vh
                        overflow: 'hidden',
                        zIndex: 1,                     // ← tambah ini
                    }}>
                        <img
                            src={project.thumbnail}
                            alt={project.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <div style={{
                            position: 'absolute', top: 24, right: 24,
                            color: 'rgba(255,255,255,0.75)',
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: 13, letterSpacing: '0.1em',
                        }}>
                            Nomadic Space
                        </div>
                    </div>

                </div>
            </main>

            {/* MODAL LIGHTBOX */}
            {modalOpen && (
                <div onClick={closeModal} style={{
                    position: 'fixed', inset: 0, zIndex: 100,
                    backgroundColor: 'rgba(0,0,0,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <div onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>
                        <img
                            src={gridImages[modalIndex]}
                            alt={`Slide ${modalIndex + 1}`}
                            style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain', display: 'block' }}
                        />
                        <div style={{
                            position: 'absolute', bottom: -32, left: '50%', transform: 'translateX(-50%)',
                            color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif',
                        }}>
                            {String(modalIndex + 1).padStart(2, '0')} / {String(gridImages.length).padStart(2, '0')}
                        </div>
                    </div>

                    <button onClick={e => { e.stopPropagation(); modalPrev(); }} style={{
                        position: 'fixed', left: 24, top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 16,
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fcd34d'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 32, height: 32 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>

                    <button onClick={e => { e.stopPropagation(); modalNext(); }} style={{
                        position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 16,
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fcd34d'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 32, height: 32 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>

                    <button onClick={closeModal} style={{
                        position: 'fixed', top: 24, right: 24,
                        background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 8,
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fcd34d'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 28, height: 28 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}