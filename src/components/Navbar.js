'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CLIENTS', href: '/clients' },
    { label: 'CONTACT', href: '/contact' },
];

const WHATSAPP_NUMBER = '6281234567890';
const WHATSAPP_MESSAGE = 'Halo Nomadic Space, saya ingin konsultasi gratis mengenai desain interior.';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16, color: '#16a34a', flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // tutup menu kalau resize ke desktop
    useEffect(() => {
        if (!isMobile) setMenuOpen(false);
    }, [isMobile]);

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    return (
        <nav style={{
            position: 'fixed',
            top: 0, left: 0,
            width: isMobile ? '100%' : 1100,
            zIndex: 50,
            backgroundColor: scrolled ? '#F5F0E8' : '#ffffff',
            boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.08)' : 'none',
            transition: 'background-color 0.3s, box-shadow 0.3s',
        }}>
            <div style={{
                width: '100%',
                padding: '0 40px',
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
                    <span style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: 22, fontWeight: 600,
                        color: '#3a3228', letterSpacing: '0.05em',
                    }}>
                        Nomadic<span style={{ color: '#b45309' }}> Space</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                {!isMobile && (
                    <ul style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} style={{
                                    fontSize: 11, letterSpacing: '0.15em', fontWeight: 500,
                                    color: '#78716c', textDecoration: 'none', transition: 'color 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#b45309'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#78716c'}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Desktop WA Button */}
                {!isMobile && (
                    <div style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid #e7e5e4', paddingLeft: 24 }}>
                        <a href={waUrl} target="_blank" rel="noopener noreferrer"
                            className="wa-pulse-btn"
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                border: '1px solid #d6d3d1', padding: '8px 16px',
                                fontSize: 11, letterSpacing: '0.15em', fontWeight: 500,
                                color: '#57534e', textDecoration: 'none',
                                borderRadius: 4,
                            }}
                        >
                            <WhatsAppIcon />
                            FREE CONSULT
                        </a>
                    </div>
                )}

                {/* Mobile Hamburger */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        style={{
                            display: 'flex', flexDirection: 'column', gap: 5,
                            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
                        }}
                    >
                        <span style={{
                            display: 'block', width: 24, height: 2, backgroundColor: '#57534e',
                            transition: 'all 0.3s',
                            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                        }} />
                        <span style={{
                            display: 'block', width: 24, height: 2, backgroundColor: '#57534e',
                            transition: 'all 0.3s',
                            opacity: menuOpen ? 0 : 1,
                        }} />
                        <span style={{
                            display: 'block', width: 24, height: 2, backgroundColor: '#57534e',
                            transition: 'all 0.3s',
                            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                        }} />
                    </button>
                )}
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobile && (
                <div style={{
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #f5f5f4',
                    overflow: 'hidden',
                    maxHeight: menuOpen ? 400 : 0,
                    opacity: menuOpen ? 1 : 0,
                    transition: 'max-height 0.3s ease, opacity 0.3s ease',
                }}>
                    <ul style={{ listStyle: 'none', padding: '16px 24px', margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} onClick={() => setMenuOpen(false)} style={{
                                    fontSize: 13, letterSpacing: '0.15em', fontWeight: 500,
                                    color: '#78716c', textDecoration: 'none',
                                }}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                border: '1px solid #d6d3d1', padding: '10px 16px',
                                fontSize: 11, letterSpacing: '0.15em', fontWeight: 500,
                                color: '#57534e', textDecoration: 'none', borderRadius: 4,
                            }}>
                                <WhatsAppIcon />
                                FREE CONSULT
                            </a>
                        </li>
                    </ul>
                </div>
            )}

            <style>{`
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .wa-pulse-btn { animation: wa-pulse 2s infinite; }
        .wa-pulse-btn:hover { animation: none; background-color: #fef3c7 !important; border-color: #d97706 !important; }
      `}</style>
        </nav>
    );
}