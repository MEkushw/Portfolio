'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';


function ParticleBanner({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isTouching, setIsTouching] = useState(false);
  const particlesRef = useRef<
    {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
    }[]
  >([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const w = canvas.parentElement?.clientWidth || 800;
      const h = (img.height / img.width) * w;
      canvas.width = w;
      canvas.height = h;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, w, h);
      const imgData = offCtx.getImageData(0, 0, w, h).data;

      const step = Math.max(6, Math.floor(w / 70));
      const newParticles = [];

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const idx = (y * w + x) * 4;
          const a = imgData[idx + 3];
          if (a > 50) {
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            newParticles.push({
              x,
              y,
              ox: x,
              oy: y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              color: `rgba(${r},${g},${b},${a / 255})`,
              size: Math.random() * 2.5 + 1.5,
            });
          }
        }
      }
      particlesRef.current = newParticles;
    };

    let time = 0;
    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const active = containerRef.current?.classList.contains('touching');

      particlesRef.current.forEach((p) => {
        if (active) {
          p.x += p.vx + Math.sin(time + p.ox) * 0.4;
          p.y += p.vy + Math.cos(time + p.oy) * 0.4;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -0.8;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -0.8;
        } else {
          p.x += (p.ox - p.x) * 0.12;
          p.y += (p.oy - p.y) * 0.12;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [src]);

  const handleTouchStart = () => setIsTouching(true);
  const handleTouchEnd = () => setIsTouching(false);

  return (
    <div
      ref={containerRef}
      className={`about-illustration ${isTouching ? 'touching' : ''}`}
      onMouseEnter={handleTouchStart}
      onMouseLeave={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <img src={src} alt={alt} className="about-banner-img" loading="lazy" />
      <canvas ref={canvasRef} className="about-particle-canvas" />
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const heroStatusRef = useRef<HTMLParagraphElement>(null);
  const typewriterDone = useRef(false);

  // ---- Hamburger Toggle ----
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : '';
      return !prev;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  // ---- Smooth Scroll ----
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        closeMenu();
        setTimeout(() => {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth',
          });
        }, menuOpen ? 350 : 0);
      }
    },
    [closeMenu, menuOpen]
  );

  // ---- Smart Navbar Hide/Show ----
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => {
      const currY = window.scrollY;
      nav.classList.toggle('scrolled', currY > 40);

      if (currY > 60) {
        if (currY > lastScrollY.current + 2) {
          // Scrolling Down -> Hide Header upwards
          nav.classList.add('nav-hidden');
        } else if (currY < lastScrollY.current - 2) {
          // Scrolling Up -> Show Header back into view
          nav.classList.remove('nav-hidden');
        }
      } else {
        nav.classList.remove('nav-hidden');
      }
      lastScrollY.current = currY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---- Scroll Reveal ----
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const selectors = [
      '.hero-title-group', '.hero-description',
      '.hero-stage', '.hero-status-wrapper',
      '.section-header-row', '.case-study-card',
      '.gallery-inner .section-title',
      '.about-label', '.about-quote', '.about-illustration',
      '.info-tagline', '.footer-headline', '.footer-bottom',
    ];
    selectors.forEach((sel) =>
      document.querySelectorAll(sel).forEach((el) => {
        el.classList.add('fade-in');
        io.observe(el);
      })
    );
    ['.nav-socials', '.footer-socials'].forEach((sel) =>
      document.querySelectorAll(sel).forEach((el) => {
        el.classList.add('stagger');
        io.observe(el);
      })
    );
    return () => io.disconnect();
  }, []);

  // ---- Typewriter ----
  useEffect(() => {
    const el = heroStatusRef.current;
    if (!el || typewriterDone.current) return;
    const text = el.textContent || '';
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !typewriterDone.current) {
            typewriterDone.current = true;
            el.textContent = '';
            let i = 0;
            (function type() {
              if (i < text.length) {
                el.textContent += text.charAt(i++);
                setTimeout(type, 24);
              }
            })();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // SVG icon components for reuse
  const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const BehanceIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
    </svg>
  );

  const ResumeIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="hero">
        <div className="hero-bg-image" />
        <div className="hero-bg-overlay" />

        {/* Navigation Bar */}
        <nav className="navbar" id="navbar" ref={navRef}>
          <span className="nav-logo">OMK<span className="logo-dot">.</span></span>
          <div className="nav-links">
            <a href="#case-studies" className="nav-link" onClick={(e) => handleAnchorClick(e, '#case-studies')}>WORKS</a>
            <a href="#about" className="nav-link" onClick={(e) => handleAnchorClick(e, '#about')}>ABOUT</a>
          </div>
          <div className="nav-socials">
            <a href="https://www.linkedin.com/in/omkushwaha" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn" id="social-linkedin"><LinkedInIcon /></a>
            <a href="https://www.behance.net/mkshw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance" id="social-behance"><BehanceIcon /></a>
            <a href="https://drive.google.com/drive/folders/1g7YznCz4lMgDVaWrqk4Cp38cFIs0JbNJ?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Resume" id="social-resume" title="View Resume"><ResumeIcon /></a>
          </div>
          <button className={`hamburger ${menuOpen ? 'active' : ''}`} id="hamburger-btn" aria-label="Menu" onClick={toggleMenu}>
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu" onClick={(e) => { if (e.target === e.currentTarget) closeMenu(); }}>
          <div className="mobile-menu-inner">
            <a href="#case-studies" className="mobile-menu-link" onClick={(e) => handleAnchorClick(e, '#case-studies')}>WORKS</a>
            <a href="#about" className="mobile-menu-link" onClick={(e) => handleAnchorClick(e, '#about')}>ABOUT</a>
            <div className="mobile-menu-divider" />
            <div className="mobile-menu-socials">
              <a href="https://www.linkedin.com/in/omkushwaha" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><LinkedInIcon size={18} /></a>
              <a href="https://www.behance.net/mkshw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance"><BehanceIcon size={18} /></a>
              <a href="https://drive.google.com/drive/folders/1g7YznCz4lMgDVaWrqk4Cp38cFIs0JbNJ?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Resume"><ResumeIcon size={18} /></a>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-main">
            <div className="hero-top-row">
              <div className="hero-title-group">
                <span className="hero-subtitle">I&apos;m a</span>
                <h1 className="hero-title">Product Designer</h1>
              </div>
              <p className="hero-description">I don&apos;t just design, I build the solutions with Engineering Mind and Design Interest.</p>
            </div>

            <div className="hero-stage" id="hero-stage">
              <div className="hero-card-window" id="hero-card">
                <img src="/assets/images/user_hero.png" alt="Om Kushwaha Voxel Product Designer Hero" className="user-hero-img" id="user-hero-img" />
              </div>
            </div>

            <div className="hero-status-wrapper">
              <p className="hero-status hero-status-bottom-left" style={{ color: '#F3B61F' }} ref={heroStatusRef}>CURRENTLY BUILDING ATTENDLY — ATTENDANCE &amp; TASK MANAGEMENT APP FOR SMALL TEAMS...</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CASE STUDIES SECTION ===== */}
      <section id="case-studies" className="case-studies">
        <div className="section-inner">
          <div className="section-header-row">
            <h2 className="section-title">Case Studies</h2>
          </div>

          {/* Case Study 01 - Attendly */}
          <div className="case-study-card" id="case-study-1">
            <div className="cs-info">
              <div className="cs-header-badge">
                <span className="cs-number">01</span>
                <span className="cs-tag">MOBILE APP • HR TECH</span>
              </div>
              <h3 className="cs-title">ATTENDLY — ATTENDANCE &amp; TASK MANAGEMENT APP FOR SMALL TEAMS</h3>
              <p className="cs-desc">Daily HR loop — check in, manage tasks, request leave, stay informed — into a mobile app simple enough for a non-technical office manager to run and fast enough for a mobile-first employee to actually use.</p>
              <Link href="/attendly" className="cs-btn cs-btn-yellow" id="btn-case-1">
                <span>View Case Study</span>
              </Link>
            </div>
            <div className="cs-visual cs-visual-attendly" id="cs-visual-1">
              <img src="/assets/images/casestudy1.png" alt="Attendly Case Study Visual" className="cs-img" />
            </div>
          </div>

          {/* Case Study 02 - RevSync */}
          <div className="case-study-card cs-card-reverse" id="case-study-2">
            <div className="cs-visual cs-visual-revsync" id="cs-visual-2">
              <img src="/assets/images/casestudy2.png" alt="RevSync CRM Case Study Visual" className="cs-img" />
            </div>
            <div className="cs-info cs-info-right">
              <div className="cs-header-badge">
                <span className="cs-number">02</span>
                <span className="cs-tag cs-tag-cyan">B2B CRM • DASHBOARD</span>
              </div>
              <h3 className="cs-title">REVSYNC— A SALES CRM FOR EXCEL-DEPENDENT TEAMS</h3>
              <p className="cs-desc">RevSync replaces fragmented Excel-based lead tracking with a CRM that gives sales reps, team leaders, and admins each the exact view of the pipeline they need — nothing more, nothing less.</p>
              <Link href="/revsync" className="cs-btn cs-btn-cyan" id="btn-case-2">
                <span>View Case Study</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== UI GALLERY SECTION ===== */}
      <section id="ui-gallery" className="ui-gallery">
        <div className="gallery-inner">
          <div className="section-header-row">
            <h2 className="section-title">UI Gallery</h2>
          </div>
          <div className="gallery-viewport">
            <div className="gallery-row gallery-row-1">
              <div className="gallery-track gallery-track-left">
                {[1, 2, 3, 4, 1, 2, 3, 4].map((n, i) => (
                  <div key={i} className={`gallery-card gc-card-${n}`}>
                    <img src={`/assets/images/gallery_card${n}.png`} alt={`UI Gallery Card ${n}`} className="gc-img" />
                  </div>
                ))}
              </div>
            </div>
            <div className="gallery-row gallery-row-2">
              <div className="gallery-track gallery-track-right">
                {[5, 6, 7, 5, 6, 7].map((n, i) => (
                  <div key={i} className={`gallery-card gc-card-${n}`}>
                    <img src={`/assets/images/gallery_card${n}.png`} alt={`UI Gallery Card ${n}`} className="gc-img" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="about-section">
        <div className="dot-marquee-wrapper" aria-hidden="true">
          <div className="dot-band dot-band-1" />
          <div className="dot-band dot-band-2" />
          <div className="dot-band dot-band-3" />
        </div>
        <div className="about-inner">
          <div className="about-content">
            <h2 className="about-label">About Me</h2>
            <blockquote className="about-quote">
              &quot;I&apos;m Om Kushwaha — I used to design mechanisms. Now I design interfaces. Same instinct, different material.&quot;
            </blockquote>
            <ParticleBanner src="/assets/images/about_banner_exact.png" alt="Om Kushwaha Mechanical to UI Design Watercolor Illustration" />
          </div>
        </div>
      </section>

      {/* ===== INFO SECTION ===== */}
      <section id="info" className="info-section">
        <div className="info-inner">
          <div className="info-tagline">
            <p className="tagline-line tagline-light">Engineered to work.</p>
            <p className="tagline-line tagline-red">Designed to feel right.</p>
          </div>
        </div>
        <div className="info-cards-row">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={`info-card info-card-${n}`}>
              <img src={`/assets/images/info_card${n}.png`} alt={`Info card ${n}`} loading="lazy" />
            </div>
          ))}
        </div>
        <div className="info-inner">
          <div className="info-labels-row">
            <div className="info-label-item il-col-1">
              <span className="info-meta">26.4499° N, 80.3319° E</span>
              <span className="info-bold">KANPUR, INDIA</span>
            </div>
            <div className="info-label-item il-col-2">
              <span className="info-meta">Mechanical Engineering</span>
              <span className="info-bold">REC AZAMGARH</span>
            </div>
            <div className="info-label-item il-col-3">
              <span className="info-meta">Google UX Design Professional Certificate</span>
              <span className="info-bold">COURSERA</span>
            </div>
            <div className="info-label-item il-col-4">
              <span className="info-meta">Chess &amp; Numismatics</span>
              <span className="info-bold">INTERESTED IN</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <footer id="footer" className="footer">
        <div className="footer-inner">
          <h2 className="footer-headline" aria-label="User-First Designer">
            <span className="fh-line">USER-FIRST</span>
            <span className="fh-line">DESIGNER</span>
          </h2>
          <div className="footer-bottom">
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/omkushwaha" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn" id="footer-linkedin"><LinkedInIcon /></a>
              <a href="https://www.behance.net/mkshw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance" id="footer-behance"><BehanceIcon /></a>
              <a href="https://drive.google.com/drive/folders/1g7YznCz4lMgDVaWrqk4Cp38cFIs0JbNJ?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Resume" id="footer-resume"><ResumeIcon /></a>
            </div>
            <div className="footer-right">
              <div className="footer-nav">
                <a href="#case-studies" className="footer-link" onClick={(e) => handleAnchorClick(e, '#case-studies')}>WORKS</a>
                <a href="#about" className="footer-link" onClick={(e) => handleAnchorClick(e, '#about')}>ABOUT</a>
              </div>
              <span className="footer-copy">COPYRIGHT@2026_OMKUSHW</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
