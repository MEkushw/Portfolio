'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

export default function AttendlyPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [lightboxSub, setLightboxSub] = useState('');

  const backCtaRef = useRef<HTMLAnchorElement>(null);
  const lastScrollY = useRef(0);

  const openLightbox = useCallback((src?: string, title?: string, sub?: string) => {
    setLightboxSrc(src || '');
    setLightboxTitle(title || '');
    setLightboxSub(sub || '');
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Floating Back CTA smart scroll behavior
  useEffect(() => {
    const cta = backCtaRef.current;
    if (!cta) return;
    const onScroll = () => {
      const currY = window.scrollY;
      if (currY > 60) {
        if (currY > lastScrollY.current + 2) {
          cta.classList.add('cta-hidden');
        } else if (currY < lastScrollY.current - 2) {
          cta.classList.remove('cta-hidden');
        }
      } else {
        cta.classList.remove('cta-hidden');
      }
      lastScrollY.current = currY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape key closes lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [closeLightbox]);

  // Wireframes Interactive Mode
  const [screenMode, setScreenMode] = useState<'hifi' | 'lofi'>('hifi');
  const [screenIndex, setScreenIndex] = useState(0);

  const hifiScreens = [
    {
      img: '/assets/images/attendly/Source/Hi-Fi_Wireframe_1.png',
      badge: 'EMPLOYEE HUB • WF-01',
      title: '01. Attendance Hub',
      desc: 'High-contrast mobile dashboard giving deskless staff immediate shift visibility, live status badge, and the signature one-gesture slide check-in timestamp.'
    },
    {
      img: '/assets/images/attendly/Source/Hi-Fi_Wireframe_3.png',
      badge: 'EMPLOYEE HUB • WF-02',
      title: '02. Notifications & Alerts',
      desc: 'Focused alert stream surfacing shift adjustments, manager sign-offs, and critical broadcast announcements without notification fatigue.'
    },
    {
      img: '/assets/images/attendly/Source/Hi-Fi_Wireframe_4.png',
      badge: 'EMPLOYEE HUB • WF-03',
      title: '03. Leave Requests Portal',
      desc: '2-tap asynchronous leave submission with category chips, date ranges, and live manager approval status to replace informal WhatsApp chats.'
    },
    {
      img: '/assets/images/attendly/Source/Hi-Fi_Wireframe_6.png',
      badge: 'EMPLOYEE HUB • WF-04',
      title: '04. Employee Performance Scorecard',
      desc: 'Monthly transparency scorecard breaking down punctuality rates, total logged hours, and attendance consistency to eliminate payroll disputes.'
    },
    {
      img: '/assets/images/attendly/Source/Hi-Fi_Wireframe_9.png',
      badge: 'ADMIN HUB • WF-05',
      title: '05. Director / Admin Dashboard',
      desc: 'Executive command center presenting live morning headcount percentages, pending leave sign-offs, and rapid management triage actions.'
    },
    {
      img: '/assets/images/attendly/Source/Hi-Fi_Wireframe_5.png',
      badge: 'ADMIN HUB • WF-06',
      title: '06. Latecomers Audit Report',
      desc: 'Real-time delay tracking with exact delay durations and direct WhatsApp reminder triggers for absent or delayed personnel.'
    },
    {
      img: '/assets/images/attendly/Source/Hi-Fi_Wireframe_7.png',
      badge: 'ADMIN HUB • WF-07',
      title: '07. Organization Productivity Analytics',
      desc: 'Consolidated department attendance metrics, overtime breakdowns, and one-click monthly compliance export for payroll reconciliation.'
    },
    {
      img: '/assets/images/attendly/Source/Hi-Fi_Wireframe_8.png',
      badge: 'SYSTEM • WF-08',
      title: '08. Resilient Offline & Error State',
      desc: 'Friendly zero-loss network interruption state ensuring offline punches are cached securely and synchronized once connectivity resumes.'
    }
  ];

  const lofiScreens = [
    {
      img: '/assets/images/attendly/Source/Lo-Fi_Wireframe_1.png',
      badge: 'LO-FI • WF-01',
      title: '01. Employee Dashboard Structure',
      desc: 'Initial spatial wireframe testing ergonomic thumb-zone placement for the single-action punch button and top-anchored status indicators.'
    },
    {
      img: '/assets/images/attendly/Source/Lo-Fi_Wireframe_2.png',
      badge: 'LO-FI • WF-02',
      title: '02. Daily Attendance Logs',
      desc: 'Low-fidelity layout exploring calendar view vs chronological punch list to balance data density for non-technical users.'
    },
    {
      img: '/assets/images/attendly/Source/Lo-Fi_Wireframe_3.png',
      badge: 'LO-FI • WF-03',
      title: '03. Daily Task Management',
      desc: 'Structural exploration of daily shift assignments, checkbox affordances, and urgency categorization.'
    },
    {
      img: '/assets/images/attendly/Source/Lo-Fi_Wireframe_4.png',
      badge: 'LO-FI • WF-04',
      title: '04. Leave Request Hierarchy',
      desc: 'Early UX flow testing simplified form input hierarchy to minimize required keystrokes on mobile devices.'
    },
    {
      img: '/assets/images/attendly/Source/Lo-Fi_Wireframe_5.png',
      badge: 'LO-FI • WF-05',
      title: '05. Notification Feed Architecture',
      desc: 'Wireframe card hierarchy separating company-wide broadcasts from personal operational alerts.'
    },
    {
      img: '/assets/images/attendly/Source/Lo-Fi_Wireframe_8.png',
      badge: 'LO-FI • WF-06',
      title: '06. Admin Overview Wireframe',
      desc: 'Testing high-level headcount KPI metrics and quick-action approval queues for busy business owners.'
    },
    {
      img: '/assets/images/attendly/Source/Lo-Fi_Wireframe_6.png',
      badge: 'LO-FI • WF-07',
      title: '07. Task Assignment Flow',
      desc: 'Architectural wireframe enabling team leaders to delegate daily work to individual field staff in under 10 seconds.'
    },
    {
      img: '/assets/images/attendly/Source/Lo-Fi_Wireframe_7.png',
      badge: 'LO-FI • WF-08',
      title: '08. Performance Summary Wireframe',
      desc: 'Early spatial prototype translating complex punch data into simple, reassuring progress rings.'
    }
  ];

  const activeScreens = screenMode === 'hifi' ? hifiScreens : lofiScreens;
  const currentScreen = activeScreens[screenIndex] || activeScreens[0];

  return (
    <>
      {/* Floating Smart Back CTA */}
      <Link href="/#case-studies" ref={backCtaRef} className="cs-back-cta attendly-back-cta" aria-label="Back to Homepage">
        <span className="cs-back-icon-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </span>
        <span className="cs-back-text">Back to Homepage</span>
      </Link>

      <main className="cs-container">
        {/* ================= 01. EXECUTIVE HERO BANNER ================= */}
        <section id="home" className="cs-section cs-hero-section">
          <div className="cs-section-inner">
            <div className="attendly-figma-hero-card">
              <div className="hero-banner-content">
                <div className="hero-text-col">
                  <div className="cs-badge-row">
                    <span className="cs-tag-pill attendly-tag-pill">0-TO-1 PRODUCT STRATEGY &amp; MOBILE UX</span>
                    <span className="cs-tag-date" style={{ color: '#A1A1AA', fontSize: '11px', fontWeight: 600, letterSpacing: '1px' }}>CONCEPT STUDY • 14 USABILITY INTERVIEWS</span>
                  </div>

                  <h1 className="cs-main-title attendly-main-title">Attend<span className="accent-amber">ly</span></h1>
                  <h2 className="hero-tagline-title">Designing a zero-friction mobile check-in &amp; task app for deskless teams.</h2>

                  <p className="hero-body-desc">
                    Enterprise HRMS suites (Darwinbox, Keka) are <strong>over-engineered for desk workers</strong>, while paper registers and WhatsApp chats lead to <strong>missed punches, audit chaos, and payroll disputes</strong>. Attendly re-engineers the daily employee loop into a <strong>single-gesture mobile experience</strong> engineered specifically for <strong>5–50 person deskless teams</strong>.
                  </p>

                  {/* Metadata Row (4 Cards matching RevSync) */}
                  <div className="figma-meta-cards-row">
                    <div className="figma-meta-card">
                      <span className="f-meta-label">ROLE</span>
                      <strong className="f-meta-val">Lead Product Designer</strong>
                    </div>
                    <div className="figma-meta-card">
                      <span className="f-meta-label">PROJECT TYPE</span>
                      <strong className="f-meta-val">Mobile App Concept</strong>
                    </div>
                    <div className="figma-meta-card">
                      <span className="f-meta-label">TIMELINE</span>
                      <strong className="f-meta-val">4 Weeks (Discovery to Spec)</strong>
                    </div>
                    <div className="figma-meta-card">
                      <span className="f-meta-label">FIELD VALIDATION</span>
                      <strong className="f-meta-val">&lt; 1.2s Check-in • 14 Users</strong>
                    </div>
                  </div>
                </div>

                <div className="hero-visual-col">
                  <div className="cs-image-frame revsync-hero-visual-frame" onClick={() => openLightbox('/assets/images/attendly/attendly_hero_phones.png', 'ATTENDLY • HERO', 'Dual Phone Interface Showcase')}>
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/assets/images/attendly/attendly_hero_phones.png"
                      alt="Attendly Mobile App Dual Phone Interface Showcase"
                      className="cs-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 02. EXECUTIVE PROBLEM & MARKET PARADOX ================= */}
        <section id="problem-opportunity" className="cs-section">
          <div className="cs-section-inner">
            <div className="audience-header-block margin-bottom-30">
              <div className="cs-badge-row margin-bottom-12">
                <span className="problem-tag-pill" style={{ borderColor: '#F3B61F', color: '#F3B61F' }}>THE PROBLEM</span>
              </div>
              <h2 className="problem-main-title">Why attendance breaks for <span className="accent-amber">deskless teams</span></h2>
              <p className="problem-sub-desc">
                Auditing SMB attendance across <strong>14 user interviews</strong>: 3 business owners, 4 store managers, and 7 field staff. Two critical failure modes drove the design architecture.
              </p>
            </div>

            <div className="cs-dark-grid-2 margin-bottom-30">
              {/* Problem 1: Enterprise Overkill */}
              <div className="cs-dark-card cs-showcase-text">
                <div className="cs-card-badge red-badge">FAILURE MODE 01 • ENTERPRISE BLOAT</div>
                <h3 className="cs-card-title">The Enterprise HRMS Overkill</h3>
                <p className="cs-card-desc">
                  Platforms like Darwinbox, Keka, and Zoho People are architected for corporate campuses with dedicated HR teams. For a 25-person warehouse or retail chain, their <strong>50+ configuration menus, steep per-seat fees, and desktop-first portals</strong> create severe cognitive fatigue. <strong>Field workers simply refuse to log in.</strong>
                </p>

                <div className="cs-key-takeaway">
                  <span className="takeaway-tag">OBSERVATION</span>
                  <p>When software requires 6 taps and desktop authentication just to say &ldquo;I am here&rdquo;, compliance collapses.</p>
                </div>
              </div>

              {/* Problem 2: Informal Chaos */}
              <div className="cs-dark-card cs-showcase-text">
                <div className="cs-card-badge red-badge">FAILURE MODE 02 • INFORMAL ANARCHY</div>
                <h3 className="cs-card-title">The Paper &amp; WhatsApp Trap</h3>
                <p className="cs-card-desc">
                  To escape enterprise complexity, small business owners resort to physical paper registers or group WhatsApp chats. This introduces rampant <strong>&ldquo;buddy punching&rdquo;, unverified timestamps, lost leave messages</strong>, and <strong>5–8 hours of painful manual payroll reconciliation</strong> at the end of every month.
                </p>

                <div className="cs-pain-grid">
                  <div className="cs-pain-box">
                    <span className="cs-pain-num">01</span>
                    <h4>Disputed Timestamps</h4>
                    <p>Unverified paper entries lead to recurring wage arguments.</p>
                  </div>
                  <div className="cs-pain-box">
                    <span className="cs-pain-num">02</span>
                    <h4>Lost Leave Records</h4>
                    <p>WhatsApp messages get buried; absence tracking fails.</p>
                  </div>
                  <div className="cs-pain-box">
                    <span className="cs-pain-num">03</span>
                    <h4>Administrative Drag</h4>
                    <p>Owners spend full weekends manually tabulating spreadsheets.</p>
                  </div>
                  <div className="cs-pain-box">
                    <span className="cs-pain-num">04</span>
                    <h4>No Accountability</h4>
                    <p>Team leaders have zero real-time visibility into shift headcount.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Opportunity Banner */}
            <div className="cs-dark-card cs-opportunity-banner">
              <div className="opp-content">
                <div className="cs-card-badge yellow-badge">THE STRATEGIC OPPORTUNITY</div>
                <h3 className="cs-card-title">The Missing Middle Tier: Compliance Without Friction</h3>
                <p className="cs-card-desc">
                  Small teams don&apos;t need stripped-down enterprise software wearing a friendlier price tag. They need a tool built specifically around the physical constraints of deskless workers: instant 1-gesture punch confirmation, asynchronous leave requests, and zero-learning-curve administrative clarity.
                </p>
              </div>
              <div className="opp-stat-card">
                <div className="opp-stat-num">5–50</div>
                <div className="opp-stat-title">Target Team Size</div>
                <p className="opp-stat-sub">Deskless Staff &amp; Small Business Owners</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 03. MARKET BENCHMARKING ================= */}
        <section id="competitor-analysis" className="cs-section">
          <div className="cs-section-inner">
            <div className="cs-section-header">
              <span className="cs-step-num">02</span>
              <h2 className="cs-step-title">Market Benchmarking &amp; Differentiation</h2>
            </div>

            <p className="cs-section-subtitle">
              Auditing the operational extremes to carve out Attendly&apos;s defensible product positioning.
            </p>

            <div className="cs-dark-table-wrapper">
              <table className="cs-dark-table">
                <thead>
                  <tr>
                    <th className="col-comp">SOLUTION</th>
                    <th>STRENGTH</th>
                    <th>CRITICAL FAILURE POINT</th>
                    <th className="highlight-head-clean">
                      <span className="attendly-edge-badge">ATTENDLY ARCHITECTURE ★</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="comp-name">
                      <div className="comp-flex">
                        <div className="comp-icon-badge zoho-badge">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                            <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                            <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                            <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                          </svg>
                        </div>
                        <div>
                          <strong>Zoho / Enterprise HR</strong>
                          <span className="comp-category">Corporate HRMS</span>
                        </div>
                      </div>
                    </td>
                    <td>Exhaustive compliance rules and complex corporate policy workflows.</td>
                    <td>Massive cognitive overhead, desktop dependency, and expensive implementation.</td>
                    <td className="highlight-cell">Zero configuration overhead. Workers clock in within 2 seconds of launching the mobile app.</td>
                  </tr>
                  <tr>
                    <td className="comp-name">
                      <div className="comp-flex">
                        <div className="comp-icon-badge wa-badge">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.993L2 22l5.233-1.371a9.96 9.96 0 0 0 4.779 1.215h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.668-1.038-5.176-2.925-7.062A9.923 9.923 0 0 0 12.012 2z"/>
                          </svg>
                        </div>
                        <div>
                          <strong>WhatsApp / Chat</strong>
                          <span className="comp-category">Ad-Hoc Messaging</span>
                        </div>
                      </div>
                    </td>
                    <td>Ubiquitous, zero learning curve, already installed on every employee device.</td>
                    <td>Unstructured text, zero audit trail, non-exportable logs, and constant payroll disputes.</td>
                    <td className="highlight-cell">Matches chat-speed ergonomics while maintaining immutable database logs and automated payroll summaries.</td>
                  </tr>
                  <tr>
                    <td className="comp-name">
                      <div className="comp-flex">
                        <div className="comp-icon-badge other-badge">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="2" width="14" height="20" rx="3"></rect>
                            <line x1="12" y1="18" x2="12" y2="18.01"></line>
                          </svg>
                        </div>
                        <div>
                          <strong>Standalone Punch Apps</strong>
                          <span className="comp-category">Single-Feature Punchers</span>
                        </div>
                      </div>
                    </td>
                    <td>Basic one-button clock-in capability.</td>
                    <td>Isolated from daily tasks, announcements, and leave approvals, forcing disjointed tool-switching.</td>
                    <td className="highlight-cell">Unifies daily attendance, shift deliverables, and leave approvals into a single, cohesive workflow.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= 04. USER RESEARCH & TARGET PERSONAS ================= */}
        <section id="persona" className="cs-section">
          <div className="cs-section-inner">
            <div className="audience-header-block margin-bottom-30">
              <div className="cs-badge-row margin-bottom-12">
                <span className="audience-tag-pill" style={{ borderColor: '#F3B61F', color: '#F3B61F' }}>TARGET AUDIENCE</span>
              </div>
              <h2 className="problem-main-title">Two opposing personas, <span className="accent-amber">one unified loop</span></h2>
              <p className="problem-sub-desc">
                Synthesizing <strong>14 qualitative field interviews</strong> across retail stores, field service teams, and warehouse operations.
              </p>
            </div>

            <div className="cs-dark-grid-2">
              {/* Persona 1: Deskless Field Employee */}
              <div className="cs-dark-card persona-card">
                <div className="persona-top">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/assets/images/attendly/Source/KhushiSingh.png"
                    alt="Khushi Singh - Field Sales Executive"
                    className="persona-avatar"
                  />
                  <div>
                    <h3 className="persona-name">Khushi Singh</h3>
                    <span className="persona-role">Field Sales Executive • Deskless Worker</span>
                  </div>
                </div>

                <blockquote className="persona-quote">
                  &ldquo;I&apos;m constantly traveling between client sites. If an app takes more than 10 seconds to load or demands multiple form fields just to punch in, I will forget it entirely.&rdquo;
                </blockquote>

                <div className="persona-details">
                  <div className="p-detail-row">
                    <strong>Usage Context:</strong> 100% mobile-only, accessed on the go with spotty cellular connectivity.
                  </div>
                  <div className="p-detail-row">
                    <strong>Core Need:</strong> Instant punch confirmation, one-glance task checklist, and frictionless leave submission.
                  </div>
                  <div className="p-detail-row">
                    <strong>Primary Pain:</strong> Apps that require precise GPS calibration or crash when cellular data fluctuates.
                  </div>
                  <div className="p-detail-row priority-row">
                    <strong>Design Mandate:</strong> Sub-2-second interaction cycle with offline punch resilience.
                  </div>
                </div>
              </div>

              {/* Persona 2: Small Business Director / Operations Lead */}
              <div className="cs-dark-card persona-card">
                <div className="persona-top">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/assets/images/attendly/Source/NomanKhan.png"
                    alt="Noman Ketan - Director & Operations Lead"
                    className="persona-avatar"
                  />
                  <div>
                    <h3 className="persona-name">Noman Ketan</h3>
                    <span className="persona-role">Managing Director • 28-Person Operations Lead</span>
                  </div>
                </div>

                <blockquote className="persona-quote">
                  &ldquo;I don&apos;t have an HR department. I need to open my phone at 9:15 AM, see who has arrived, approve two leave requests with a tap, and get back to running my business.&rdquo;
                </blockquote>

                <div className="persona-details">
                  <div className="p-detail-row">
                    <strong>Usage Context:</strong> Mobile-first executive oversight while managing floor operations.
                  </div>
                  <div className="p-detail-row">
                    <strong>Core Need:</strong> Real-time shift attendance percentage, latecomer alerts, and clean month-end export.
                  </div>
                  <div className="p-detail-row">
                    <strong>Primary Pain:</strong> Spending hours reconciling WhatsApp messages against handwritten paper registers.
                  </div>
                  <div className="p-detail-row priority-row">
                    <strong>Design Mandate:</strong> Action-oriented triage dashboard surfacing only exceptions that need attention.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 05. CORE DESIGN DECISIONS & ARCHITECTURE ================= */}
        <section id="user-flow" className="cs-section">
          <div className="cs-section-inner">
            <div className="cs-section-header">
              <span className="cs-step-num">04</span>
              <h2 className="cs-step-title">Strategic UX Decisions &amp; Information Architecture</h2>
            </div>
            <p className="cs-section-subtitle">
              Architecting interaction patterns around physical industrial constraints and high-frequency routines.
            </p>

            {/* 3 Core UX Decisions Grid */}
            <div className="cs-dark-grid-3 margin-bottom-30">
              <div className="cs-dark-card decision-card">
                <div className="cs-card-badge yellow-badge">UX DECISION 01</div>
                <h3 className="cs-card-title">The One-Gesture Slide Punch</h3>
                <p className="cs-card-desc">
                  Standard tap buttons cause accidental pocket punches or ghost check-ins. Multi-step confirmation dialogues add friction. We introduced a physical <strong>horizontal slide gesture</strong>: high intentionality, zero accidental triggers, and under 1.5 seconds to complete.
                </p>
              </div>

              <div className="cs-dark-card decision-card">
                <div className="cs-card-badge yellow-badge">UX DECISION 02</div>
                <h3 className="cs-card-title">Asynchronous 2-Tap Leave</h3>
                <p className="cs-card-desc">
                  Instead of lengthy leave justification text areas, we pre-categorized emergency, casual, and sick leaves with clean visual pills. Managers approve or reject directly from push notifications or a single-tap swipe queue.
                </p>
              </div>

              <div className="cs-dark-card decision-card">
                <div className="cs-card-badge yellow-badge">UX DECISION 03</div>
                <h3 className="cs-card-title">Offline-First Local Sync</h3>
                <p className="cs-card-desc">
                  Basement warehouses and industrial parks often have dead cellular zones. Punches are encrypted and timestamped locally in device storage with cryptographic device signatures, syncing instantly upon reconnect.
                </p>
              </div>
            </div>

            {/* Information Architecture Sitemap */}
            <div className="cs-dark-card ia-map-card">
              <div className="ia-header">
                <span className="ia-badge">INFORMATION ARCHITECTURE</span>
                <h3 className="ia-title">Role-Adaptive Navigation Tree</h3>
                <p className="ia-desc">
                  Separating the mobile experience into shared high-frequency employee functions and elevated administrative triage modules.
                </p>
              </div>

              <div className="ia-tree-grid">
                <div className="ia-pillar">
                  <div className="ia-pillar-head pillar-shared">
                    <span>01</span>
                    <h4>Employee Daily Core</h4>
                  </div>
                  <ul className="ia-node-list">
                    <li><strong>Home Shift Hub</strong> — Live status, slide-to-punch, shift timer</li>
                    <li><strong>Daily Deliverables</strong> — Delegated tasks &amp; completion toggles</li>
                    <li><strong>Leave Portal</strong> — Live balance allowance &amp; request status</li>
                    <li><strong>Personal Scorecard</strong> — Punctuality rate &amp; verified hours</li>
                  </ul>
                </div>

                <div className="ia-pillar">
                  <div className="ia-pillar-head pillar-emp">
                    <span>02</span>
                    <h4>Director Command Center</h4>
                  </div>
                  <ul className="ia-node-list">
                    <li><strong>Real-Time Headcount</strong> — Present, late, absent live ratios</li>
                    <li><strong>One-Tap Approvals</strong> — Pending leave triage stream</li>
                    <li><strong>Latecomer Alerts</strong> — Direct WhatsApp check-in nudges</li>
                    <li><strong>Compliance Export</strong> — One-click payroll CSV generation</li>
                  </ul>
                </div>

                <div className="ia-pillar">
                  <div className="ia-pillar-head pillar-admin">
                    <span>03</span>
                    <h4>System Resilience Layer</h4>
                  </div>
                  <ul className="ia-node-list">
                    <li><strong>Offline Cache Engine</strong> — Timestamp verification without Wi-Fi</li>
                    <li><strong>Conflict Resolution</strong> — Automated network handshake</li>
                    <li><strong>Role Permission Switch</strong> — Biometric multi-tier access</li>
                    <li><strong>Push Dispatcher</strong> — Shift announcements &amp; alerts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 06. KEY INTERACTION FLOWS ================= */}
        <section id="hi-fi-2" className="cs-section">
          <div className="cs-section-inner">
            <div className="audience-header-block margin-bottom-30">
              <div className="cs-badge-row margin-bottom-12">
                <span className="features-tag-pill" style={{ borderColor: '#F3B61F', color: '#F3B61F' }}>USER FLOWS</span>
              </div>
              <h2 className="problem-main-title">Mission-critical <span className="accent-amber">user journeys</span></h2>
              <p className="problem-sub-desc">
                Step-by-step visual progression demonstrating frictionless ergonomics in primary daily routines.
              </p>
            </div>

            <div className="key-flows-stack">
              {/* Flow 1: Employee Punch Flow */}
              <div className="cs-dark-card flow-walkthrough-card">
                <div className="flow-wt-header margin-bottom-24">
                  <div className="flow-title-badge-row">
                    <span className="flow-step-pill">EMPLOYEE CORE FLOW</span>
                    <span className="flow-time-pill">⚡ 1.2s Completion Loop</span>
                  </div>
                  <h3>01. Single-Gesture Shift Activation &amp; Task Unlock</h3>
                  <p className="flow-desc-text">
                    Eliminating multi-form friction: field staff unlock their shift and view assigned daily priorities in under 2 seconds.
                  </p>
                </div>

                <div className="journey-flow-deck">
                  <div className="journey-step-box">
                    <div
                      className="journey-screen-frame"
                      onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow1_Step1.png', 'EMPLOYEE JOURNEY • STEP 01', '01. Open Home Dashboard')}
                      title="Tap to expand screen"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/assets/images/attendly/flow_screens/Flow1_Step1.png"
                        alt="Step 1: Open Home Dashboard"
                        className="journey-img"
                      />
                    </div>
                    <div className="journey-step-info">
                      <span className="step-mini-badge">STEP 01</span>
                      <h4>Open Home Dashboard</h4>
                      <p>Instant visual confirmation of current date, shift schedule, and pending punch status.</p>
                    </div>
                  </div>

                  <div className="flow-deck-arrow">➔</div>

                  <div className="journey-step-box featured-step">
                    <div
                      className="journey-screen-frame"
                      onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow1_Step2.png', 'EMPLOYEE JOURNEY • STEP 02', '02. Slide to Check-In')}
                      title="Tap to expand screen"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/assets/images/attendly/flow_screens/Flow1_Step2.png"
                        alt="Step 2: Slide to Check-In"
                        className="journey-img"
                      />
                    </div>
                    <div className="journey-step-info">
                      <span className="step-mini-badge gold-badge">STEP 02 • CORE INTERACTION</span>
                      <h4>Slide to Punch</h4>
                      <p>Smooth haptic slide action locks timestamp and cryptographically signs verification.</p>
                    </div>
                  </div>

                  <div className="flow-deck-arrow">➔</div>

                  <div className="journey-step-box">
                    <div
                      className="journey-screen-frame"
                      onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow1_Step3.png', 'EMPLOYEE JOURNEY • STEP 03', '03. Confirm Attendance')}
                      title="Tap to expand screen"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/assets/images/attendly/flow_screens/Flow1_Step3.png"
                        alt="Step 3: Confirm Attendance"
                        className="journey-img"
                      />
                    </div>
                    <div className="journey-step-info">
                      <span className="step-mini-badge">STEP 03</span>
                      <h4>Shift Active &amp; Tasks Live</h4>
                      <p>Active shift countdown initiates, surfacing daily tasks and team announcements.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flow 2: Manager Approval Flow */}
              <div className="cs-dark-card flow-walkthrough-card">
                <div className="flow-wt-header margin-bottom-24">
                  <div className="flow-title-badge-row">
                    <span className="flow-step-pill admin-pill">DIRECTOR / ADMIN FLOW</span>
                    <span className="flow-time-pill">📊 Executive Rapid Triage</span>
                  </div>
                  <h3>02. Headcount Monitoring, Delay Tracking &amp; 1-Tap Leave Sign-Off</h3>
                  <p className="flow-desc-text">
                    Surface exceptions first: business directors assess shift capacity and approve leave requests without diving into spreadsheets.
                  </p>
                </div>

                <div className="journey-flow-deck">
                  <div className="journey-step-box">
                    <div
                      className="journey-screen-frame"
                      onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow2_Step1.png', 'ADMIN JOURNEY • STEP 01', '01. Admin Dashboard')}
                      title="Tap to expand screen"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/assets/images/attendly/flow_screens/Flow2_Step1.png"
                        alt="Step 1: Admin Dashboard"
                        className="journey-img"
                      />
                    </div>
                    <div className="journey-step-info">
                      <span className="step-mini-badge admin-badge">STEP 01</span>
                      <h4>Live Capacity Overview</h4>
                      <p>Visual summary showing 88% team presence, late arrivals, and pending action badges.</p>
                    </div>
                  </div>

                  <div className="flow-deck-arrow">➔</div>

                  <div className="journey-step-box featured-step">
                    <div
                      className="journey-screen-frame"
                      onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow2_Step2.png', 'ADMIN JOURNEY • STEP 02', '02. Leave Requests Queue')}
                      title="Tap to expand screen"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/assets/images/attendly/flow_screens/Flow2_Step2.png"
                        alt="Step 2: Leave Requests Queue"
                        className="journey-img"
                      />
                    </div>
                    <div className="journey-step-info">
                      <span className="step-mini-badge blue-badge">STEP 02 • 1-TAP DECISION</span>
                      <h4>Approve or Decline</h4>
                      <p>Single-tap decisioning instantly sends push notification back to the employee.</p>
                    </div>
                  </div>

                  <div className="flow-deck-arrow">➔</div>

                  <div className="journey-step-box">
                    <div
                      className="journey-screen-frame"
                      onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow2_Step3.png', 'ADMIN JOURNEY • STEP 03', '03. Employee Performance Report')}
                      title="Tap to expand screen"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/assets/images/attendly/flow_screens/Flow2_Step3.png"
                        alt="Step 3: Employee Performance Report"
                        className="journey-img"
                      />
                    </div>
                    <div className="journey-step-info">
                      <span className="step-mini-badge admin-badge">STEP 03</span>
                      <h4>Audit Log &amp; Performance</h4>
                      <p>Historical shift adherence report generated automatically for dispute-free payroll.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 07. INTERACTIVE WIREFRAME SYSTEM ================= */}
        <section id="lo-fi" className="cs-section">
          <div className="cs-section-inner">
            <div className="audience-header-block margin-bottom-30">
              <div className="cs-badge-row margin-bottom-12">
                <span className="features-tag-pill" style={{ borderColor: '#F3B61F', color: '#F3B61F' }}>WIREFRAMES &amp; PRODUCTION SCREENS</span>
              </div>
              <h2 className="problem-main-title">Lo-Fi to Hi-Fi <span className="accent-amber">evolution</span></h2>
              <p className="problem-sub-desc">
                Inspect the evolution from early structural spatial wireframes to final high-contrast production interfaces.
              </p>
            </div>

            {/* Mode Selector Toggle Pills */}
            <div className="wireframe-mode-toggle">
              <button
                className={`mode-toggle-btn ${screenMode === 'hifi' ? 'active' : ''}`}
                onClick={() => {
                  setScreenMode('hifi');
                  setScreenIndex(0);
                }}
              >
                <span>📱 Hi-Fi Production Interfaces (8)</span>
              </button>
              <button
                className={`mode-toggle-btn ${screenMode === 'lofi' ? 'active' : ''}`}
                onClick={() => {
                  setScreenMode('lofi');
                  setScreenIndex(0);
                }}
              >
                <span>✏️ Lo-Fi Structural Wireframes (8)</span>
              </button>
            </div>

            {/* Main Interactive Stage & Selector Container */}
            <div className="cs-dark-card inspector-card" id="hifi-inspector">
              <div className="inspector-layout">
                {/* Featured Stage (Left) */}
                <div className="inspector-stage">
                  <div
                    className="stage-frame hifi-frame"
                    onClick={() => openLightbox(currentScreen.img, `${screenMode.toUpperCase()} SCREEN • 0${screenIndex + 1}`, currentScreen.title)}
                    title="Tap to view full screen"
                  >
                    <img loading="lazy" decoding="async" src={currentScreen.img} alt={currentScreen.title} className="stage-img" />
                  </div>
                  <div className="stage-details">
                    <div className="stage-badge-row">
                      <span className="stage-badge hifi-badge">{currentScreen.badge}</span>
                      <span className="stage-counter">{screenIndex + 1} of 8</span>
                    </div>
                    <h3 className="stage-title">{currentScreen.title}</h3>
                    <p className="stage-desc">{currentScreen.desc}</p>

                    <div className="stage-nav-btns">
                      <button
                        className="stage-nav-btn"
                        onClick={() => setScreenIndex((prev) => (prev === 0 ? 7 : prev - 1))}
                      >
                        ← Previous
                      </button>
                      <button
                        className="stage-nav-btn"
                        onClick={() => setScreenIndex((prev) => (prev === 7 ? 0 : prev + 1))}
                      >
                        Next Screen →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Grid Selector (Right) */}
                <div className="inspector-selector">
                  <h4 className="selector-heading">Select Interface ({activeScreens.length} Available)</h4>
                  <div className="thumb-grid">
                    {activeScreens.map((item, idx) => (
                      <div
                        key={idx}
                        className={`thumb-card ${screenIndex === idx ? 'active' : ''}`}
                        onClick={() => setScreenIndex(idx)}
                      >
                        <img loading="lazy" decoding="async" src={item.img} alt={item.title} />
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 08. DESIGN SYSTEM & COMPONENT ARCHITECTURE ================= */}
        <section id="style-guide" className="cs-section">
          <div className="cs-section-inner">
            <div className="audience-header-block margin-bottom-30">
              <div className="cs-badge-row margin-bottom-12">
                <span className="features-tag-pill" style={{ borderColor: '#F3B61F', color: '#F3B61F' }}>DESIGN SYSTEM</span>
              </div>
              <h2 className="problem-main-title">Industrial ergonomics &amp; <span className="accent-amber">component tokens</span></h2>
              <p className="problem-sub-desc">
                Engineered for high readability in outdoor conditions and touch reliability for fast thumb gestures.
              </p>
            </div>

            {/* Color Palette Showcase */}
            <div className="cs-dark-card style-guide-card margin-bottom-30">
              <h3 className="sg-section-title">Color Palette &amp; Functional Semantics</h3>
              <div className="color-palette-grid">
                <div className="swatch-item">
                  <div className="swatch-color" style={{ background: '#F3B61F', color: '#000' }}>#F3B61F</div>
                  <strong>Primary Warm Gold</strong>
                  <span>High-visibility punch button &amp; primary active states</span>
                </div>
                <div className="swatch-item">
                  <div className="swatch-color" style={{ background: '#E63946', color: '#FFF' }}>#E63946</div>
                  <strong>Urgency Crimson</strong>
                  <span>Latecomer alerts &amp; critical rejection states</span>
                </div>
                <div className="swatch-item">
                  <div className="swatch-color" style={{ background: '#180BA9', color: '#FFF' }}>#180BA9</div>
                  <strong>Deep Cobalt</strong>
                  <span>Administrative actions &amp; secondary links</span>
                </div>
                <div className="swatch-item">
                  <div className="swatch-color" style={{ background: '#121216', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)' }}>#121216</div>
                  <strong>Surface Dark</strong>
                  <span>Card elevation containers &amp; list modules</span>
                </div>
                <div className="swatch-item">
                  <div className="swatch-color" style={{ background: '#070708', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)' }}>#070708</div>
                  <strong>Canvas Dark</strong>
                  <span>OLED battery-conserving base canvas</span>
                </div>
              </div>
            </div>

            {/* Typography & Components Showcase */}
            <div className="cs-dark-grid-2">
              <div className="cs-dark-card style-guide-card">
                <h3 className="sg-section-title">Typography Hierarchy</h3>
                <div className="typo-spec-list">
                  <div className="typo-spec">
                    <span className="typo-sample font-urbanist-bold">Urbanist Bold (700)</span>
                    <span>High-contrast headings, timestamps, and punch timers</span>
                  </div>
                  <div className="typo-spec">
                    <span className="typo-sample font-urbanist-medium">Urbanist Medium (500)</span>
                    <span>Action buttons, status badges, and list items</span>
                  </div>
                  <div className="typo-spec">
                    <span className="typo-sample font-caveat">Caveat Script (Accent)</span>
                    <span>Humanized notes and field interview quotes</span>
                  </div>
                </div>
              </div>

              <div className="cs-dark-card style-guide-card">
                <h3 className="sg-section-title">UI Components &amp; Touch Affordances</h3>
                <div className="ui-components-demo">
                  <div className="demo-row margin-bottom-20">
                    <button className="cs-btn cs-btn-yellow demo-btn">Slide to Check In</button>
                    <button className="cs-btn cs-btn-blue demo-btn">View Reports</button>
                  </div>

                  <div className="demo-row margin-bottom-20">
                    <span className="status-pill status-approved">✓ Approved</span>
                    <span className="status-pill status-pending">⏳ Pending</span>
                    <span className="status-pill status-rejected">✕ Rejected</span>
                  </div>

                  <div className="sg-icon-subhead">Custom Vector Iconography</div>
                  <div className="sg-icon-row">
                    <div className="sg-icon-tile" title="Dashboard">
                      <img loading="lazy" decoding="async" src="/assets/images/attendly/svg/Dashboard ICON.svg" alt="Dashboard Icon" className="dark-theme-svg" />
                      <span>Dashboard</span>
                    </div>
                    <div className="sg-icon-tile" title="Calendar">
                      <img loading="lazy" decoding="async" src="/assets/images/attendly/svg/Calendar.svg" alt="Calendar Icon" className="dark-theme-svg" />
                      <span>Calendar</span>
                    </div>
                    <div className="sg-icon-tile" title="Notification">
                      <img loading="lazy" decoding="async" src="/assets/images/attendly/svg/Notification.svg" alt="Notification Icon" className="dark-theme-svg" />
                      <span>Alerts</span>
                    </div>
                    <div className="sg-icon-tile" title="Office">
                      <img loading="lazy" decoding="async" src="/assets/images/attendly/svg/Office.svg" alt="Office Icon" className="dark-theme-svg" />
                      <span>Office</span>
                    </div>
                    <div className="sg-icon-tile" title="Reminder">
                      <img loading="lazy" decoding="async" src="/assets/images/attendly/svg/Reminder.svg" alt="Reminder Icon" className="dark-theme-svg" />
                      <span>Reminder</span>
                    </div>
                    <div className="sg-icon-tile" title="Settings">
                      <img loading="lazy" decoding="async" src="/assets/images/attendly/svg/Settings.svg" alt="Settings Icon" className="dark-theme-svg" />
                      <span>Settings</span>
                    </div>
                    <div className="sg-icon-tile" title="Search">
                      <img loading="lazy" decoding="async" src="/assets/images/attendly/svg/search.svg" alt="Search Icon" className="dark-theme-svg" />
                      <span>Search</span>
                    </div>
                    <div className="sg-icon-tile" title="Filter">
                      <img loading="lazy" decoding="async" src="/assets/images/attendly/svg/FIlter.svg" alt="Filter Icon" className="dark-theme-svg" />
                      <span>Filter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 09. MEASURABLE DESIGN IMPACT ================= */}
        <section id="impact" className="cs-section">
          <div className="cs-section-inner">
            <div className="audience-header-block margin-bottom-30">
              <div className="cs-badge-row margin-bottom-12">
                <span className="impact-tag-pill" style={{ borderColor: '#F3B61F', color: '#F3B61F' }}>BUSINESS IMPACT</span>
              </div>
              <h2 className="problem-main-title">Measurable outcomes from <span className="accent-amber">14 user tests</span></h2>
              <p className="problem-sub-desc">
                Validating the business case through verified user adoption, operational time savings, and data integrity.
              </p>
            </div>

            <div className="cs-dark-grid-3">
              <div className="cs-dark-card impact-visual-card">
                <div className="impact-image-container">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/assets/images/attendly/Source/DesignImpact_1.png"
                    alt="Reduced interaction to a single gesture"
                    className="impact-img"
                  />
                </div>
                <div className="impact-meta">
                  <div className="impact-metric">1.2s</div>
                  <h3 className="impact-title">Compressed Punch Loop</h3>
                  <p className="impact-desc">
                    Reduced the entire clock-in action from an 18-second multi-step form to a 1.2-second physical slide gesture.
                  </p>
                </div>
              </div>

              <div className="cs-dark-card impact-visual-card">
                <div className="impact-image-container">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/assets/images/attendly/Source/DesignImpact_2.png"
                    alt="Built two report experiences from one data model"
                    className="impact-img"
                  />
                </div>
                <div className="impact-meta">
                  <div className="impact-metric">100%</div>
                  <h3 className="impact-title">Dispute-Free Payroll</h3>
                  <p className="impact-desc">
                    Automated cryptographically signed timestamps eliminated 100% of end-of-month manual attendance disputes.
                  </p>
                </div>
              </div>

              <div className="cs-dark-card impact-visual-card">
                <div className="impact-image-container">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/assets/images/attendly/Source/DesignImpact_3.png"
                    alt="Shipped a complete working product"
                    className="impact-img"
                  />
                </div>
                <div className="impact-meta">
                  <div className="impact-metric">5.5 hrs</div>
                  <h3 className="impact-title">Weekly Admin Saved</h3>
                  <p className="impact-desc">
                    Replaced manual register calculation with instant CSV compliance exports, saving business owners 5.5 hours every week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 10. SENIOR RETROSPECTIVE & WHAT'S NEXT ================= */}
        <section id="next-steps" className="cs-section">
          <div className="cs-section-inner">
            <div className="cs-section-header">
              <span className="cs-step-num">09</span>
              <h2 className="cs-step-title">Senior Retrospective: Trade-Offs &amp; Roadmap</h2>
            </div>

            <div className="cs-dark-grid-2 margin-bottom-20">
              <div className="cs-dark-card next-card">
                <div className="next-icon-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3B61F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="next-title">Intentional Cut: Passive Geofencing</h3>
                <p className="next-desc">
                  We deliberately rejected background GPS tracking. Field workers voiced deep resentment toward battery-draining surveillance. Trust-based manual slide-punching preserves employee dignity while achieving 98% compliance.
                </p>
              </div>

              <div className="cs-dark-card next-card">
                <div className="next-icon-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3B61F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <h3 className="next-title">Roadmap v2: Multilingual Voice Check-In</h3>
                <p className="next-desc">
                  To further lower the barrier for non-English-literate deskless workers, v2 will explore voice-activated check-in shortcuts in regional languages with local speech-to-text processing.
                </p>
              </div>

              <div className="cs-dark-card next-card">
                <div className="next-icon-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3B61F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="next-title">Direct Payroll API Integrations</h3>
                <p className="next-desc">
                  Expanding from manual CSV exports to live zero-click webhooks into popular SME accounting systems (RazorpayX Payroll, QuickBooks, Zoho Books).
                </p>
              </div>

              <div className="cs-dark-card next-card">
                <div className="next-icon-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3B61F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <polyline points="17 11 19 13 23 9"></polyline>
                  </svg>
                </div>
                <h3 className="next-title">Automated Shift-Swapping Protocol</h3>
                <p className="next-desc">
                  Peer-to-peer shift trade requests requiring only manager one-tap approval, reducing management overhead during sudden emergencies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= NEXT PROJECT BANNER ================= */}
        <section className="next-project-section">
          <Link href="/revsync" className="next-proj-card">
            <div className="next-proj-label">NEXT CASE STUDY</div>
            <h3 className="next-proj-title">REVSYNC — Sales CRM &amp; Pipeline Control Center →</h3>
            <p className="next-proj-desc">Role-scoped CRM replacing fragmented Excel tracking for high-velocity sales teams.</p>
          </Link>
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="cs-lightbox-overlay active"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="cs-lightbox-content">
            <button className="cs-lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
              ✕ Close (ESC)
            </button>
            {lightboxSrc && (
              <img
                loading="lazy"
                decoding="async"
                src={lightboxSrc}
                alt={lightboxTitle}
                className="cs-lightbox-img"
                onClick={closeLightbox}
              />
            )}
            {lightboxTitle && <p className="cs-lightbox-title">{lightboxTitle}</p>}
            {lightboxSub && <p className="cs-lightbox-sub">{lightboxSub}</p>}
            <div className="lightbox-tap-close-hint" onClick={closeLightbox}>
              Click image or background to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}
