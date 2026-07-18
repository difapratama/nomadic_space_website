'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Counter animation hook
function useCountUp(target, duration = 2000, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

function StatItem({ value, suffix, label, start }) {
    const count = useCountUp(value, 1800, start);
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 700,
                color: '#b45309',
                lineHeight: 1,
                marginBottom: 8,
            }}>
                {count}{suffix}
            </div>
            <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                letterSpacing: '0.2em',
                color: '#a8a29e',
                textTransform: 'uppercase',
            }}>
                {label}
            </div>
        </div>
    );
}

export default function AboutPage() {
    const statsRef = useRef(null);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 80, backgroundColor: '#FDFCF8', minHeight: '100vh' }}>

                {/* SECTION 1 — Hero split */}
                <section style={{ display: 'flex', minHeight: '90vh' }}>

                    {/* Left — image */}
                    <div style={{
                        width: '45%',
                        position: 'relative',
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}>
                        <img
                            src="https://www.arkadiaworks.com/wp-content/themes/domik-new/images/bg/slide1.jpg"
                            alt="Nomadic Space"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        {/* Warm overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(135deg, rgba(180,83,9,0.15) 0%, rgba(30,20,10,0.3) 100%)',
                        }} />
                        {/* Quote on image */}
                        <div style={{
                            position: 'absolute', bottom: 48, left: 40, right: 40,
                        }}>
                            <div style={{ width: 32, height: 1, backgroundColor: '#fcd34d', marginBottom: 16 }} />
                            <p style={{
                                fontFamily: 'Cormorant Garamond, Georgia, serif',
                                color: '#ffffff',
                                fontSize: 'clamp(18px, 2vw, 26px)',
                                fontWeight: 400,
                                fontStyle: 'italic',
                                lineHeight: 1.5,
                            }}>
                                "Every space tells a story.<br />We make sure it tells yours."
                            </p>
                        </div>
                    </div>

                    {/* Right — content */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 'clamp(40px, 6vw, 96px)',
                    }}>
                        <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 11,
                            letterSpacing: '0.25em',
                            color: '#b45309',
                            marginBottom: 24,
                            textTransform: 'uppercase',
                        }}>
                            About Us
                        </p>

                        <h1 style={{
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: 'clamp(32px, 4vw, 52px)',
                            fontWeight: 700,
                            color: '#1c1917',
                            lineHeight: 1.2,
                            marginBottom: 32,
                            letterSpacing: '0.02em',
                        }}>
                            A Husband & Wife Studio<br />
                            <span style={{ color: '#b45309' }}>Built on Passion</span>
                        </h1>

                        <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 14,
                            lineHeight: 1.9,
                            color: '#57534e',
                            marginBottom: 24,
                            maxWidth: 480,
                        }}>
                            Nomadic Space adalah studio desain interior yang lahir dari satu keyakinan sederhana —
                            bahwa ruang yang dirancang dengan hati akan mengubah cara orang merasa di dalamnya.
                        </p>

                        <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 14,
                            lineHeight: 1.9,
                            color: '#57534e',
                            marginBottom: 40,
                            maxWidth: 480,
                        }}>
                            Kami adalah tim kecil yang terdiri dari dua orang: seorang desainer interior berpengalaman
                            dan seorang problem-solver yang memastikan setiap proyek berjalan tepat waktu, tepat anggaran,
                            dan melampaui ekspektasi. Kecil bukan berarti terbatas — justru setiap klien mendapatkan
                            perhatian penuh dari kami, dari awal hingga akhir.
                        </p>

                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <Link href="/projects" style={{
                                display: 'inline-block',
                                backgroundColor: '#b45309',
                                color: '#ffffff',
                                padding: '14px 32px',
                                fontSize: 11,
                                letterSpacing: '0.2em',
                                textDecoration: 'none',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500,
                                transition: 'background-color 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#92400e'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#b45309'}
                            >
                                LIHAT PROYEK KAMI
                            </Link>
                            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" style={{
                                display: 'inline-block',
                                border: '1px solid #b45309',
                                color: '#b45309',
                                padding: '14px 32px',
                                fontSize: 11,
                                letterSpacing: '0.2em',
                                textDecoration: 'none',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500,
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#b45309'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#b45309'; }}
                            >
                                KONSULTASI GRATIS
                            </a>
                        </div>
                    </div>
                </section>

                {/* SECTION 2 — Our approach */}
                <section style={{
                    backgroundColor: '#1c1917',
                    padding: 'clamp(64px, 8vw, 120px) clamp(40px, 8vw, 120px)',
                }}>
                    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                        <p style={{
                            fontFamily: 'Inter, sans-serif', fontSize: 11,
                            letterSpacing: '0.25em', color: '#b45309', marginBottom: 24,
                        }}>
                            OUR APPROACH
                        </p>
                        <h2 style={{
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: 'clamp(28px, 4vw, 48px)',
                            fontWeight: 600, color: '#F5F0E8',
                            marginBottom: 64, maxWidth: 600, lineHeight: 1.3,
                        }}>
                            Desain yang personal,<br />proses yang transparan.
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
                            {[
                                {
                                    number: '01',
                                    title: 'Listen First',
                                    desc: 'Kami mulai dengan mendengarkan. Bukan hanya soal ukuran ruangan, tapi gaya hidup, kebiasaan, dan mimpi Anda tentang ruang ideal.',
                                },
                                {
                                    number: '02',
                                    title: 'Design with Purpose',
                                    desc: 'Setiap elemen dipilih dengan alasan. Tidak ada dekorasi yang sekadar mengisi — semua berfungsi dan bermakna.',
                                },
                                {
                                    number: '03',
                                    title: 'Deliver with Care',
                                    desc: 'Kami hadir di setiap tahap, dari sketsa pertama hingga sentuhan akhir, memastikan hasilnya persis seperti yang Anda bayangkan.',
                                },
                            ].map((item) => (
                                <div key={item.number}>
                                    <div style={{
                                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                                        fontSize: 48, fontWeight: 700,
                                        color: 'rgba(180,83,9,0.25)', lineHeight: 1, marginBottom: 16,
                                    }}>
                                        {item.number}
                                    </div>
                                    <h3 style={{
                                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                                        fontSize: 22, fontWeight: 600,
                                        color: '#F5F0E8', marginBottom: 16,
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        fontFamily: 'Inter, sans-serif', fontSize: 13,
                                        lineHeight: 1.8, color: '#a8a29e',
                                    }}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 3 — Stats */}
                <section
                    ref={statsRef}
                    style={{
                        padding: 'clamp(64px, 8vw, 100px) clamp(40px, 8vw, 120px)',
                        backgroundColor: '#F5F0E8',
                    }}
                >
                    <div style={{
                        maxWidth: 900, margin: '0 auto',
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48,
                    }}>
                        <StatItem value={15} suffix="+" label="Projects Completed" start={statsVisible} />
                        <StatItem value={10} suffix="+" label="Happy Clients" start={statsVisible} />
                        <StatItem value={100} suffix="%" label="Personal Attention" start={statsVisible} />
                    </div>
                </section>

                {/* SECTION 4 — CTA */}
                <section style={{
                    padding: 'clamp(64px, 8vw, 100px) clamp(40px, 8vw, 120px)',
                    backgroundColor: '#FDFCF8',
                    textAlign: 'center',
                }}>
                    <div style={{ width: 1, height: 48, backgroundColor: '#b45309', margin: '0 auto 32px' }} />
                    <h2 style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: 'clamp(28px, 4vw, 48px)',
                        fontWeight: 700, color: '#1c1917',
                        marginBottom: 16, lineHeight: 1.3,
                    }}>
                        Siap mewujudkan ruang impian Anda?
                    </h2>
                    <p style={{
                        fontFamily: 'Inter, sans-serif', fontSize: 14,
                        color: '#78716c', marginBottom: 40, letterSpacing: '0.05em',
                    }}>
                        Konsultasi pertama gratis. Tidak ada komitmen, hanya percakapan.
                    </p>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-block',
                        backgroundColor: '#b45309',
                        color: '#ffffff',
                        padding: '16px 48px',
                        fontSize: 11,
                        letterSpacing: '0.25em',
                        textDecoration: 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                    }}>
                        MULAI SEKARANG
                    </a>
                </section>

            </main>

            <style>{`
        @media (max-width: 768px) {
          section { flex-direction: column !important; }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </>
    );
}