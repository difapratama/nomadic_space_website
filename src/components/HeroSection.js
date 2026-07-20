'use client';

import { useState, useEffect, useRef } from 'react';

const slides = [
    {
        image: 'https://res.cloudinary.com/tovmg2or/image/upload/v1784444114/nomadic-space01_xs9nr7.jpg',
        title: 'WELCOME TO NOMADIC SPACE',
        subtitle: 'WE CRAFT SPACES THAT FEEL LIKE HOME',
    },
    {
        image: 'https://res.cloudinary.com/tovmg2or/image/upload/v1784444272/nomadic-space02_k8a0oq.jpg',
        title: 'THOUGHTFUL INTERIOR DESIGN',
        subtitle: 'BLENDING FUNCTION WITH BEAUTY',
    },
    {
        image: 'https://res.cloudinary.com/tovmg2or/image/upload/v1784445349/nomadic-space03_oznzq2.jpg',
        title: 'YOUR SPACE, YOUR STORY',
        subtitle: 'CREATING GREAT WORKPLACES & LIVING SPACES',
    },
    {
        image: 'https://res.cloudinary.com/tovmg2or/image/upload/v1784558773/venchi-galaxy-mall-surabaya-01_k6igdt.jpg',
        title: 'Venchura Nomadic Space',
        subtitle: 'CREATING GREAT WORKPLACES & LIVING SPACES',
    },
];

const TOTAL = slides.length;

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const locked = useRef(false);
    const currentRef = useRef(0);

    const goTo = (index) => {
        if (locked.current) return;
        locked.current = true;
        const next = ((index % TOTAL) + TOTAL) % TOTAL;
        currentRef.current = next;
        setCurrent(next);
        setTimeout(() => { locked.current = false; }, 900);
    };

    const goNext = () => goTo(currentRef.current + 1);
    const goPrev = () => goTo(currentRef.current - 1);

    // Scroll wheel
    useEffect(() => {
        const handleWheel = (e) => {
            const hero = document.getElementById('hero-section');
            if (!hero) return;
            const rect = hero.getBoundingClientRect();
            if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
            e.preventDefault();
            if (e.deltaY > 0) goNext();
            else goPrev();
        };
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Touch
    useEffect(() => {
        let startY = null;
        const onStart = (e) => { startY = e.touches[0].clientY; };
        const onEnd = (e) => {
            if (startY === null) return;
            const diff = startY - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
            startY = null;
        };
        window.addEventListener('touchstart', onStart);
        window.addEventListener('touchend', onEnd);
        return () => {
            window.removeEventListener('touchstart', onStart);
            window.removeEventListener('touchend', onEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keyboard
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section
            id="hero-section"
            style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
            aria-label="Hero slider"
        >
            {slides.map((slide, i) => (
                <div
                    key={i}
                    aria-hidden={i !== current}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: i === current ? 1 : 0,
                        zIndex: i === current ? 10 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(30,20,10,0.65) 0%, rgba(30,20,10,0.15) 50%, transparent 100%)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 120,
                        paddingLeft: 24,
                        paddingRight: 24,
                        textAlign: 'center',
                        opacity: i === current ? 1 : 0,
                        transform: i === current ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}>
                        <div style={{ width: 1, height: 48, backgroundColor: 'rgba(253,230,138,0.6)', marginBottom: 24 }} />
                        <h1 style={{
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            color: '#ffffff',
                            fontSize: 'clamp(22px, 4vw, 48px)',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            marginBottom: 12,
                            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                        }}>
                            {slide.title}
                        </h1>
                        <p style={{
                            color: 'rgba(254,243,199,0.9)',
                            fontSize: 'clamp(10px, 1.2vw, 13px)',
                            letterSpacing: '0.25em',
                            fontWeight: 300,
                            fontFamily: 'Inter, sans-serif',
                        }}>
                            {slide.subtitle}
                        </p>
                    </div>
                </div>
            ))}

            {/* Dot indicators */}
            <div style={{
                position: 'absolute', left: 24, top: '50%',
                transform: 'translateY(-50%)', zIndex: 20,
                display: 'flex', flexDirection: 'column', gap: 12,
            }}>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        style={{
                            width: i === current ? 10 : 6,
                            height: i === current ? 10 : 6,
                            borderRadius: '50%',
                            backgroundColor: i === current ? '#fcd34d' : 'rgba(255,255,255,0.5)',
                            border: 'none', cursor: 'pointer', padding: 0,
                            transition: 'all 0.3s ease',
                        }}
                    />
                ))}
            </div>

            {/* Arrow nav */}
            <div style={{
                position: 'absolute', bottom: 32, right: 32, zIndex: 20,
                display: 'flex', alignItems: 'center', gap: 16,
            }}>
                <button onClick={goPrev} aria-label="Previous slide" style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)', padding: 4,
                }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fcd34d'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 22, height: 22 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
                    {String(current + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
                </span>
                <button onClick={goNext} aria-label="Next slide" style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)', padding: 4,
                }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fcd34d'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 22, height: 22 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>

            {/* Scroll hint */}
            <div style={{
                position: 'absolute', bottom: 32, left: '50%',
                transform: 'translateX(-50%)', zIndex: 20,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.6,
            }}>
                <span style={{ color: '#fff', fontSize: 10, letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>SCROLL</span>
                <div style={{ width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.5)', animation: 'pulse 2s infinite' }} />
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
        </section>
    );
}