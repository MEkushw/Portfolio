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

  // Back CTA scroll hide
  useEffect(() => {
    const cta = backCtaRef.current;
    if (!cta) return;
    const onScroll = () => {
      const currY = window.scrollY;
      if (currY > 200) {
        if (currY > lastScrollY.current && currY - lastScrollY.current > 8) {
          cta.classList.add('cta-hidden');
        } else if (lastScrollY.current - currY > 8) {
          cta.classList.remove('cta-hidden');
        }
      } else {
        cta.classList.remove('cta-hidden');
      }
      lastScrollY.current = currY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  const [activeFilter, setActiveFilter] = useState('all');
  const [activeHiFi, setActiveHiFi] = useState(0);

  const navInspector = useCallback((type: string, dir: number) => {
    setActiveHiFi(prev => {
      const next = (prev + dir + 8) % 8;
      selectHiFi(next);
      return next;
    });
  }, []);

  const filterHiFi = useCallback((category: string) => {
    setActiveFilter(category);
    // Show/hide cards based on category
    setTimeout(() => {
      document.querySelectorAll('.thumb-card').forEach((card) => {
        const el = card as HTMLElement;
        if (category === 'all' || el.dataset.cat === category) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
      // Update active tab button
      document.querySelectorAll('.hifi-tab-btn').forEach((btn, i) => {
        btn.classList.remove('active');
      });
    }, 0);
  }, []);

  const selectHiFi = useCallback((index: number) => {
    setActiveHiFi(index);
    // Update active thumbnail
    setTimeout(() => {
      document.querySelectorAll('.thumb-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });
      // Update main preview image
      const activeCard = document.querySelectorAll('.thumb-card')[index];
      if (activeCard) {
        const img = activeCard.querySelector('img') as HTMLImageElement;
        const mainImg = document.querySelector('.stage-frame img') as HTMLImageElement;
        if (img && mainImg) {
          mainImg.src = img.src.replace('_thumb', '');
        }
      }
    }, 0);
  }, []);

  // Escape key closes lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLightbox]);

  return (
    <>


    {/*  Floating Smart Hide/Show Back CTA  */}
    <a href="/" className="cs-back-cta" aria-label="Back to Homepage">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to Homepage</span>
    </a>

    <main className="cs-container">

        {/*  ================= 01. HOME HERO BANNER =================  */}
        <section id="home" className="cs-section cs-hero-section">
            <div className="cs-section-inner">
                {/*  Combined Hero Banner: Text Left + Phone Mockups Right over BG Image  */}
                <div className="attendly-combined-hero">
                    <div className="hero-bg-overlay" style={{backgroundImage: 'url(\'assets/images/attendly/Home_BG.png\')'}}></div>
                    
                    <div className="hero-banner-content">
                        <div className="hero-text-col">
                            <div className="cs-badge-row">
                                <span className="cs-tag-pill">MOBILE APP DESIGN</span>
                                <span className="cs-tag-date">2025 CASE STUDY</span>
                            </div>
                            
                            <h1 className="cs-main-title">ATTENDLY</h1>
                            <h2 className="hero-tagline-title">Smart Attendance &amp; Task Management for Small Teams</h2>
                            
                            <p className="hero-body-desc">
                                Attendly compresses the daily HR loop — check in, manage tasks, request leave, stay informed — into a mobile app simple enough for a non-technical office manager to run and fast enough for a mobile-first employee to actually use.
                            </p>
                            
                            <div className="cs-meta-grid">
                                <div className="cs-meta-item">
                                    <span className="cs-meta-label">ROLE</span>
                                    <span className="cs-meta-value">Lead Product Designer</span>
                                </div>
                                <div className="cs-meta-item">
                                    <span className="cs-meta-label">TIMELINE</span>
                                    <span className="cs-meta-value">4 Weeks</span>
                                </div>
                                <div className="cs-meta-item">
                                    <span className="cs-meta-label">PLATFORM</span>
                                    <span className="cs-meta-value">iOS &amp; Android (Mobile)</span>
                                </div>
                                <div className="cs-meta-item">
                                    <span className="cs-meta-label">TOOLS</span>
                                    <span className="cs-meta-value">Figma, FigJam</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual-col">
                            <img src="/assets/images/attendly/attendly_hero_phones.png" alt="Attendly Mobile App Dual Phone Showcase" className="hero-phones-img" />
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 02. PROBLEM & OPPORTUNITY =================  */}
        <section id="problem-opportunity" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">02</span>
                    <h2 className="cs-step-title">Problem &amp; Opportunity</h2>
                </div>

                {/*  Problem Statement Showcase Cards  */}
                <div className="cs-dark-grid-2 margin-bottom-30">
                    <div className="cs-dark-card cs-showcase-text">
                        <div className="cs-card-badge red-badge">PROBLEM STATEMENT</div>
                        <h3 className="cs-card-title">Mismatched HR Complexity for Small Teams</h3>
                        <p className="cs-card-desc">Small organizations need an attendance and task tool that a non-technical admin can run and a mobile-first employee will actually open — without the overhead of enterprise HR software.</p>
                        
                        <div className="cs-key-takeaway">
                            <span className="takeaway-tag">THE CORE GAP</span>
                            <p>Current enterprise HR software is bloated for 15–150 person teams, while chat apps lack data structure.</p>
                        </div>
                    </div>

                    <div className="cs-dark-card cs-showcase-text">
                        <div className="cs-card-badge red-badge">USER PAIN POINTS</div>
                        <h3 className="cs-card-title">Where Existing Solutions Fail</h3>
                        
                        <div className="cs-pain-grid">
                            <div className="cs-pain-box">
                                <span className="cs-pain-num">01</span>
                                <h4>Mismatched Complexity</h4>
                                <p>Enterprise software requires heavy configuration for simple check-ins.</p>
                            </div>
                            <div className="cs-pain-box">
                                <span className="cs-pain-num">02</span>
                                <h4>Desktop-First Bias</h4>
                                <p>Mobile workers struggle with non-responsive web portals on the go.</p>
                            </div>
                            <div className="cs-pain-box">
                                <span className="cs-pain-num">03</span>
                                <h4>Disguised Automation</h4>
                                <p>Admins spend hours resolving manual check-in errors &amp; broken data.</p>
                            </div>
                            <div className="cs-pain-box">
                                <span className="cs-pain-num">04</span>
                                <h4>No "Small" Mode</h4>
                                <p>Lack of lightweight solutions tuned for 15–150 person organizations.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Opportunity Banner  */}
                <div className="cs-dark-card cs-opportunity-banner">
                    <div className="opp-content">
                        <div className="cs-card-badge yellow-badge">THE MARKET OPPORTUNITY</div>
                        <h3 className="cs-card-title">Building the Missing Middle Tier</h3>
                        <p className="cs-card-desc">The gap isn't a missing feature — it's a missing middle tier. There's room for a tool built specifically for the constraints of a small organization (15–150 people, no dedicated HR staff, mobile-first employees), rather than a stripped-down enterprise tool wearing a friendlier price tag.</p>
                    </div>
                    <div className="opp-stat-card">
                        <div className="opp-stat-num">15–150</div>
                        <div className="opp-stat-title">Target Team Size</div>
                        <p className="opp-stat-sub">Non-technical Admins &amp; Mobile Employees</p>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 03. COMPETITOR ANALYSIS =================  */}
        <section id="competitor-analysis" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">03</span>
                    <h2 className="cs-step-title">Competitor Analysis</h2>
                </div>

                <p className="cs-section-subtitle">Evaluating existing market alternatives to pinpoint Attendly's unique positioning.</p>

                {/*  Dark Competitor Table with Proper Icons and Spacious Layout  */}
                <div className="cs-dark-table-wrapper">
                    <table className="cs-dark-table">
                        <thead>
                            <tr>
                                <th className="col-comp">COMPETITOR</th>
                                <th>STRENGTH</th>
                                <th>WEAKNESS</th>
                                <th className="highlight-head-clean">
                                    <span className="attendly-edge-badge">ATTENDLY EDGE ★</span>
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
                                            <strong>Zoho People</strong>
                                            <span className="comp-category">Enterprise HR</span>
                                        </div>
                                    </div>
                                </td>
                                <td>Comprehensive, mature feature sets; handles complex org structures well.</td>
                                <td>Overbuilt for small teams; steep setup; pricing scales with unused features.</td>
                                <td className="highlight-cell">Strips the feature set down to what a 15–150 person team actually needs day to day.</td>
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
                                            <strong>WhatsApp</strong>
                                            <span className="comp-category">Chat App</span>
                                        </div>
                                    </div>
                                </td>
                                <td>Zero learning curve, already adopted by teams, completely free.</td>
                                <td>No structured data, no reporting, doesn't scale past a small group chat.</td>
                                <td className="highlight-cell">Matches the low-friction, always-open mobile habit — check-in feels as fast as sending a message.</td>
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
                                            <strong>Other Apps</strong>
                                            <span className="comp-category">Basic Check-in</span>
                                        </div>
                                    </div>
                                </td>
                                <td>Simple, fast clock-in/out button.</td>
                                <td>Rarely integrate task management or leave workflows, forcing multiple disconnected tools.</td>
                                <td className="highlight-cell">Combines attendance, tasks, leave, and announcements in one place to avoid tool fragmentation.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>


        {/*  ================= 04. PERSONAS =================  */}
        <section id="persona" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">04</span>
                    <h2 className="cs-step-title">Target User Personas</h2>
                </div>

                <div className="cs-dark-grid-2">
                    {/*  Persona 1: Employee  */}
                    <div className="cs-dark-card persona-card">
                        <div className="persona-top">
                            <img src="/assets/images/attendly/source/KhushiSingh.png" alt="Khushi Singh - Sales Executive" className="persona-avatar" />
                            <div>
                                <h3 className="persona-name">Khushi Singh</h3>
                                <span className="persona-role">Sales Executive (Employee)</span>
                            </div>
                        </div>
                        
                        <blockquote className="persona-quote">
                            "I just need to check in and get on with my day — I don't have time to figure out a new app."
                        </blockquote>

                        <div className="persona-details">
                            <div className="p-detail-row">
                                <strong>Device:</strong> Mobile only, checked in short bursts throughout the day
                            </div>
                            <div className="p-detail-row">
                                <strong>Goal:</strong> Check in/out fast, glance at tasks, catch anything urgent
                            </div>
                            <div className="p-detail-row">
                                <strong>Frustration:</strong> Any friction in a routine action costs her time before work even starts
                            </div>
                            <div className="p-detail-row priority-row">
                                <strong>Design Priority:</strong> Speed and instant confirmation
                            </div>
                        </div>
                    </div>

                    {/*  Persona 2: Admin  */}
                    <div className="cs-dark-card persona-card">
                        <div className="persona-top">
                            <img src="/assets/images/attendly/source/NomanKhan.png" alt="Noman Ketan - Director" className="persona-avatar" />
                            <div>
                                <h3 className="persona-name">Noman Ketan</h3>
                                <span className="persona-role">Director (Admin)</span>
                            </div>
                        </div>
                        
                        <blockquote className="persona-quote">
                            "I need to know who's in and what needs my sign-off without spending 30 minutes in a spreadsheet."
                        </blockquote>

                        <div className="persona-details">
                            <div className="p-detail-row">
                                <strong>Device:</strong> Mostly mobile, sometimes desktop, used deliberately
                            </div>
                            <div className="p-detail-row">
                                <strong>Goal:</strong> See what's outstanding, approve/reject decisions, spot patterns across the team
                            </div>
                            <div className="p-detail-row">
                                <strong>Frustration:</strong> Digging through raw data to find what actually needs attention
                            </div>
                            <div className="p-detail-row priority-row">
                                <strong>Design Priority:</strong> Clarity — surface what matters first, close the loop visibly
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 05. USER FLOW & ARCHITECTURE =================  */}
        <section id="user-flow" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">05</span>
                    <h2 className="cs-step-title">User Flow &amp; Information Architecture</h2>
                </div>
                <p className="cs-section-subtitle">System navigation structure and task-oriented user journeys engineered for zero friction in small teams.</p>

                {/*  Information Architecture (IA) Map  */}
                <div className="cs-dark-card ia-map-card margin-bottom-30">
                    <div className="ia-header">
                        <span className="ia-badge">NAVIGATION SITEMAP</span>
                        <h3 className="ia-title">Information Architecture</h3>
                        <p className="ia-desc">Structural breakdown of app modules divided into shared core tabs and role-specific operational hubs.</p>
                    </div>

                    <div className="ia-tree-grid">
                        {/*  IA Pillar 1: Shared Core  */}
                        <div className="ia-pillar">
                            <div className="ia-pillar-head pillar-shared">
                                <span>01</span>
                                <h4>Shared Core (Bottom Nav)</h4>
                            </div>
                            <ul className="ia-node-list">
                                <li><strong>Home Dashboard</strong> — Attendance status &amp; daily summary</li>
                                <li><strong>Task Manager</strong> — Daily assignments &amp; progress list</li>
                                <li><strong>Leave Portal</strong> — History &amp; request status tracker</li>
                                <li><strong>Profile &amp; Settings</strong> — Personal data &amp; preferences</li>
                            </ul>
                        </div>

                        {/*  IA Pillar 2: Employee Hub  */}
                        <div className="ia-pillar">
                            <div className="ia-pillar-head pillar-emp">
                                <span>02</span>
                                <h4>Employee Flow Hub</h4>
                            </div>
                            <ul className="ia-node-list">
                                <li><strong>Slide Check-In / Out</strong> — Instant 1.2s timestamp gesture</li>
                                <li><strong>WiFi / Geofence Check</strong> — Auto location verification</li>
                                <li><strong>Task Status Update</strong> — Mark active work as completed</li>
                                <li><strong>Leave Application</strong> — 2-tap date selection &amp; submission</li>
                            </ul>
                        </div>

                        {/*  IA Pillar 3: Admin & Director Hub  */}
                        <div className="ia-pillar">
                            <div className="ia-pillar-head pillar-admin">
                                <span>03</span>
                                <h4>Admin &amp; Director Hub</h4>
                            </div>
                            <ul className="ia-node-list">
                                <li><strong>Approval Desk</strong> — One-tap leave &amp; latecomer sign-offs</li>
                                <li><strong>Team Live Status</strong> — Real-time present/absent roster</li>
                                <li><strong>Broadcast Center</strong> — Create team-wide announcements</li>
                                <li><strong>Analytics &amp; Export</strong> — Download weekly CSV/PDF reports</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/*  UX Case Study Visual User Flows (3-Phase Flow Diagram)  */}
                <div className="user-flow-grid-wrapper">
                    {/*  Flow 1: Employee Routine  */}
                    <div className="cs-dark-card flow-diagram-card margin-bottom-30">
                        <div className="flow-card-header">
                            <div className="flow-title-row">
                                <span className="flow-role-badge">EMPLOYEE ROLE</span>
                                <h3>Khushi's Routine — Sales Executive</h3>
                            </div>
                            <span className="flow-metric-pill">⏱ Under 3 Total Taps / Shift</span>
                        </div>

                        <div className="flow-phases-grid">
                            {/*  Phase 1: Morning Arrival  */}
                            <div className="flow-phase-col">
                                <div className="phase-col-header morning-bg">
                                    <div className="phase-hdr-row">
                                        <span>PHASE 01</span>
                                        <span className="phase-arrow-tag">➔</span>
                                    </div>
                                    <h4>☀ Morning Arrival</h4>
                                </div>
                                <div className="flow-steps-stack">
                                    <div className="flow-step-node">
                                        <div className="node-num">01</div>
                                        <div className="node-content">
                                            <strong>Open Attendly App</strong>
                                            <span>Auto-detects office Wi-Fi &amp; GPS</span>
                                        </div>
                                    </div>
                                    <div className="flow-arrow-down">↓</div>
                                    <div className="flow-step-node node-highlight">
                                        <div className="node-num">02</div>
                                        <div className="node-content">
                                            <strong>Slide to Check-In</strong>
                                            <span>1.2s gesture confirms timestamp</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*  Phase 2: Shift Execution  */}
                            <div className="flow-phase-col">
                                <div className="phase-col-header midday-bg">
                                    <div className="phase-hdr-row">
                                        <span>PHASE 02</span>
                                        <span className="phase-arrow-tag">➔</span>
                                    </div>
                                    <h4>◑ Shift Execution</h4>
                                </div>
                                <div className="flow-steps-stack">
                                    <div className="flow-step-node">
                                        <div className="node-num">03</div>
                                        <div className="node-content">
                                            <strong>Review Daily Tasks</strong>
                                            <span>Glance at client deliverables</span>
                                        </div>
                                    </div>
                                    <div className="flow-arrow-down">↓</div>
                                    <div className="flow-step-node">
                                        <div className="node-num">04</div>
                                        <div className="node-content">
                                            <strong>Leave Request</strong>
                                            <span>2-tap submission &amp; status track</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*  Phase 3: Checkout  */}
                            <div className="flow-phase-col">
                                <div className="phase-col-header evening-bg">
                                    <div className="phase-hdr-row">
                                        <span>PHASE 03</span>
                                    </div>
                                    <h4>☾ Shift Checkout</h4>
                                </div>
                                <div className="flow-steps-stack">
                                    <div className="flow-step-node node-highlight">
                                        <div className="node-num">05</div>
                                        <div className="node-content">
                                            <strong>Slide to Check-Out</strong>
                                            <span>Locks shift summary &amp; logs hours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Flow 2: Director Routine  */}
                    <div className="cs-dark-card flow-diagram-card">
                        <div className="flow-card-header">
                            <div className="flow-title-row">
                                <span className="flow-role-badge admin-badge">ADMIN / DIRECTOR ROLE</span>
                                <h3>Noman's Routine — Director</h3>
                            </div>
                            <span className="flow-metric-pill admin-pill">📊 0 Spreadsheet Overhead</span>
                        </div>

                        <div className="flow-phases-grid">
                            {/*  Phase 1: Morning Operations  */}
                            <div className="flow-phase-col">
                                <div className="phase-col-header morning-bg">
                                    <div className="phase-hdr-row">
                                        <span>PHASE 01</span>
                                        <span className="phase-arrow-tag">➔</span>
                                    </div>
                                    <h4>☀ Morning Operations</h4>
                                </div>
                                <div className="flow-steps-stack">
                                    <div className="flow-step-node">
                                        <div className="node-num admin-num">01</div>
                                        <div className="node-content">
                                            <strong>Director Dashboard</strong>
                                            <span>View overall present headcount %</span>
                                        </div>
                                    </div>
                                    <div className="flow-arrow-down">↓</div>
                                    <div className="flow-step-node">
                                        <div className="node-num admin-num">02</div>
                                        <div className="node-content">
                                            <strong>Inspect Latecomers</strong>
                                            <span>Review delayed arrivals list</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*  Phase 2: Decisions  */}
                            <div className="flow-phase-col">
                                <div className="phase-col-header midday-bg">
                                    <div className="phase-hdr-row">
                                        <span>PHASE 02</span>
                                        <span className="phase-arrow-tag">➔</span>
                                    </div>
                                    <h4>◑ Decisions &amp; Delegates</h4>
                                </div>
                                <div className="flow-steps-stack">
                                    <div className="flow-step-node node-highlight">
                                        <div className="node-num admin-num">03</div>
                                        <div className="node-content">
                                            <strong>1-Tap Leave Action</strong>
                                            <span>Approve or reject leave queue</span>
                                        </div>
                                    </div>
                                    <div className="flow-arrow-down">↓</div>
                                    <div className="flow-step-node">
                                        <div className="node-num admin-num">04</div>
                                        <div className="node-content">
                                            <strong>Assign Daily Tasks</strong>
                                            <span>Delegate client tasks to staff</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*  Phase 3: Analytics  */}
                            <div className="flow-phase-col">
                                <div className="phase-col-header evening-bg">
                                    <div className="phase-hdr-row">
                                        <span>PHASE 03</span>
                                    </div>
                                    <h4>☾ Performance Tracking</h4>
                                </div>
                                <div className="flow-steps-stack">
                                    <div className="flow-step-node">
                                        <div className="node-num admin-num">05</div>
                                        <div className="node-content">
                                            <strong>Performance Report</strong>
                                            <span>Export monthly attendance CSV</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 06. LO-FI WIREFRAMES =================  */}
        <section id="lo-fi" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">06</span>
                    <h2 className="cs-step-title">Lo-Fi Wireframes</h2>
                </div>
                <p className="cs-section-subtitle">Iterating rapidly on spatial layout, navigation hierarchy, and one-hand touch ergonomics.</p>

                {/*  Lo-Fi Wireframe Showcase Gallery (Clean 8-Card Grid)  */}
                <div className="lofi-gallery-grid">
                    <div className="lofi-card" onClick={() => openLightbox('/assets/images/attendly/source/Lo-Fi_Wireframe_1.png', 'LO-FI WIREFRAME • 01', '01. Employee Dashboard')}>
                        <div className="lofi-img-frame">
                            <img src="/assets/images/attendly/source/Lo-Fi_Wireframe_1.png" alt="Employee Dashboard Wireframe" />
                        </div>
                        <div className="lofi-card-meta">
                            <span className="lofi-badge">EMPLOYEE • WF-01</span>
                            <h4>01. Employee Dashboard</h4>
                        </div>
                    </div>

                    <div className="lofi-card" onClick={() => openLightbox('/assets/images/attendly/source/Lo-Fi_Wireframe_2.png', 'LO-FI WIREFRAME • 02', '02. Attendance Log')}>
                        <div className="lofi-img-frame">
                            <img src="/assets/images/attendly/source/Lo-Fi_Wireframe_2.png" alt="Attendance Wireframe" />
                        </div>
                        <div className="lofi-card-meta">
                            <span className="lofi-badge">EMPLOYEE • WF-02</span>
                            <h4>02. Attendance</h4>
                        </div>
                    </div>

                    <div className="lofi-card" onClick={() => openLightbox('/assets/images/attendly/source/Lo-Fi_Wireframe_3.png', 'LO-FI WIREFRAME • 03', '03. Tasks Management')}>
                        <div className="lofi-img-frame">
                            <img src="/assets/images/attendly/source/Lo-Fi_Wireframe_3.png" alt="Tasks Wireframe" />
                        </div>
                        <div className="lofi-card-meta">
                            <span className="lofi-badge">EMPLOYEE • WF-03</span>
                            <h4>03. Tasks</h4>
                        </div>
                    </div>

                    <div className="lofi-card" onClick={() => openLightbox('/assets/images/attendly/source/Lo-Fi_Wireframe_4.png', 'LO-FI WIREFRAME • 04', '04. Leave Requests')}>
                        <div className="lofi-img-frame">
                            <img src="/assets/images/attendly/source/Lo-Fi_Wireframe_4.png" alt="Leave Requests Wireframe" />
                        </div>
                        <div className="lofi-card-meta">
                            <span className="lofi-badge">EMPLOYEE • WF-04</span>
                            <h4>04. Leave Requests</h4>
                        </div>
                    </div>

                    <div className="lofi-card" onClick={() => openLightbox('/assets/images/attendly/source/Lo-Fi_Wireframe_5.png', 'LO-FI WIREFRAME • 05', '05. Notifications Feed')}>
                        <div className="lofi-img-frame">
                            <img src="/assets/images/attendly/source/Lo-Fi_Wireframe_5.png" alt="Notifications Wireframe" />
                        </div>
                        <div className="lofi-card-meta">
                            <span className="lofi-badge">EMPLOYEE • WF-05</span>
                            <h4>05. Notifications</h4>
                        </div>
                    </div>

                    <div className="lofi-card" onClick={() => openLightbox('/assets/images/attendly/source/Lo-Fi_Wireframe_8.png', 'LO-FI WIREFRAME • 06', '06. Admin Dashboard')}>
                        <div className="lofi-img-frame">
                            <img src="/assets/images/attendly/source/Lo-Fi_Wireframe_8.png" alt="Admin Dashboard Wireframe" />
                        </div>
                        <div className="lofi-card-meta">
                            <span className="lofi-badge admin-lofi-badge">ADMIN • WF-06</span>
                            <h4>06. Admin Dashboard</h4>
                        </div>
                    </div>

                    <div className="lofi-card" onClick={() => openLightbox('/assets/images/attendly/source/Lo-Fi_Wireframe_6.png', 'LO-FI WIREFRAME • 07', '07. Assign Tasks')}>
                        <div className="lofi-img-frame">
                            <img src="/assets/images/attendly/source/Lo-Fi_Wireframe_6.png" alt="Assign Tasks Wireframe" />
                        </div>
                        <div className="lofi-card-meta">
                            <span className="lofi-badge admin-lofi-badge">ADMIN • WF-07</span>
                            <h4>07. Assign Tasks</h4>
                        </div>
                    </div>

                    <div className="lofi-card" onClick={() => openLightbox('/assets/images/attendly/source/Lo-Fi_Wireframe_7.png', 'LO-FI WIREFRAME • 08', '08. Employee Performance')}>
                        <div className="lofi-img-frame">
                            <img src="/assets/images/attendly/source/Lo-Fi_Wireframe_7.png" alt="Employee Performance Wireframe" />
                        </div>
                        <div className="lofi-card-meta">
                            <span className="lofi-badge admin-lofi-badge">ADMIN • WF-08</span>
                            <h4>08. Employee Performance</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 07. HI-FI DESIGNS =================  */}
        <section id="hi-fi" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">07</span>
                    <h2 className="cs-step-title">Hi-Fi UI Screens</h2>
                </div>
                <p className="cs-section-subtitle">Final polished interfaces — dark mode, high contrast, optimized for OLED displays.</p>

                {/*  Category Filter Pills  */}
                <div className="hifi-filter-tabs margin-bottom-20">
                    <button className="hifi-tab-btn active" onClick={() => { filterHiFi('all') }}>All Hi-Fi Screens (8)</button>
                    <button className="hifi-tab-btn" onClick={() => { filterHiFi('employee') }}>Employee Flow (4)</button>
                    <button className="hifi-tab-btn" onClick={() => { filterHiFi('admin') }}>Admin &amp; System (4)</button>
                </div>

                {/*  Interactive Dual-Pane Inspector (Compact ~480px height - NO scrollbars)  */}
                <div className="cs-dark-card inspector-card" id="hifi-inspector">
                    <div className="inspector-layout">
                        {/*  Featured Stage (Left)  */}
                        <div className="inspector-stage">
                            <div className="stage-frame hifi-frame" onClick={() => { openLightbox('/assets/images/attendly/source/Hi-Fi_Wireframe_1.png', 'Hi-Fi Featured Screen', 'Attendance') }} title="Tap to view full screen">
                                <img src="/assets/images/attendly/source/Hi-Fi_Wireframe_1.png" alt="Hi-Fi Featured Screen" id="hifi-stage-img" className="stage-img" />
                            </div>
                            <div className="stage-details">
                                <div className="stage-badge-row">
                                    <span className="stage-badge hifi-badge" id="hifi-stage-badge">EMPLOYEE HUB • WF-01</span>
                                    <span className="stage-counter" id="hifi-stage-counter">1 of 8</span>
                                </div>
                                <h3 className="stage-title" id="hifi-stage-title">Attendance</h3>
                                <p className="stage-desc" id="hifi-stage-desc">High-contrast dark mode dashboard giving staff instant visibility over daily attendance status, shift timer, and slide check-in timestamp.</p>

                                <div className="stage-nav-btns">
                                    <button className="stage-nav-btn" onClick={() => { navInspector('hifi', -1) }}>← Previous</button>
                                    <button className="stage-nav-btn" onClick={() => { navInspector('hifi', 1) }}>Next Screen →</button>
                                </div>
                            </div>
                        </div>

                        {/*  Thumbnail Grid Selector (Right)  */}
                        <div className="inspector-selector">
                            <h4 className="selector-heading">Select UI Screen (8 Screens)</h4>
                            <div className="thumb-grid" id="hifi-thumb-grid">
                                <div className="thumb-card active" data-cat="employee" onClick={() => selectHiFi(0)}>
                                    <img src="/assets/images/attendly/source/Hi-Fi_Wireframe_1.png" alt="Attendance" />
                                    <span>01. Attendance</span>
                                </div>
                                <div className="thumb-card" data-cat="employee" onClick={() => selectHiFi(1)}>
                                    <img src="/assets/images/attendly/source/Hi-Fi_Wireframe_3.png" alt="Notifications" />
                                    <span>02. Notifications</span>
                                </div>
                                <div className="thumb-card" data-cat="employee" onClick={() => selectHiFi(2)}>
                                    <img src="/assets/images/attendly/source/Hi-Fi_Wireframe_4.png" alt="Leave Requests" />
                                    <span>03. Leave Req</span>
                                </div>
                                <div className="thumb-card" data-cat="employee" onClick={() => selectHiFi(3)}>
                                    <img src="/assets/images/attendly/source/Hi-Fi_Wireframe_6.png" alt="Employee Performance" />
                                    <span>04. Emp Report</span>
                                </div>
                                <div className="thumb-card" data-cat="admin" onClick={() => selectHiFi(4)}>
                                    <img src="/assets/images/attendly/source/Hi-Fi_Wireframe_9.png" alt="Admin Dashboard" />
                                    <span>05. Admin Dash</span>
                                </div>
                                <div className="thumb-card" data-cat="admin" onClick={() => selectHiFi(5)}>
                                    <img src="/assets/images/attendly/source/Hi-Fi_Wireframe_5.png" alt="Latecomers Report" />
                                    <span>06. Latecomers</span>
                                </div>
                                <div className="thumb-card" data-cat="admin" onClick={() => selectHiFi(6)}>
                                    <img src="/assets/images/attendly/source/Hi-Fi_Wireframe_7.png" alt="Admin Employee Performance" />
                                    <span>07. Admin Perf</span>
                                </div>
                                <div className="thumb-card" data-cat="admin" onClick={() => selectHiFi(7)}>
                                    <img src="/assets/images/attendly/source/Hi-Fi_Wireframe_8.png" alt="404 Error State" />
                                    <span>08. 404 Error</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 08. CORE USER JOURNEYS =================  */}
        <section id="hi-fi-2" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">08</span>
                    <h2 className="cs-step-title">Core User Journeys &amp; Key Interactive Flows</h2>
                </div>
                <p className="cs-section-subtitle">Detailed step-by-step visual screen progressions for primary employee and admin user tasks.</p>

                <div className="key-flows-stack">
                    {/*  Flow 1: Employee Journey  */}
                    <div className="cs-dark-card flow-walkthrough-card">
                        <div className="flow-wt-header margin-bottom-24">
                            <div className="flow-title-badge-row">
                                <span className="flow-step-pill">EMPLOYEE JOURNEY</span>
                                <span className="flow-time-pill">⚡ 1.2 Seconds Total</span>
                            </div>
                            <h3>01. One-Gesture Attendance Check-In &amp; Daily Task Unlock</h3>
                            <p className="flow-desc-text">Eliminating multi-form friction — employees check in instantly upon arrival and view assigned daily work.</p>
                        </div>

                        <div className="journey-flow-deck">
                            {/*  Step 1  */}
                            <div className="journey-step-box">
                                <div className="journey-screen-frame" onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow1_Step1.png', 'EMPLOYEE JOURNEY • STEP 01', '01. Open Home Dashboard')} title="Tap to expand screen">
                                    <img src="/assets/images/attendly/flow_screens/Flow1_Step1.png" alt="Step 1: Open Home Dashboard" className="journey-img" />
                                </div>
                                <div className="journey-step-info">
                                    <span className="step-mini-badge">STEP 01</span>
                                    <h4>Open Home Dashboard</h4>
                                    <p>App auto-verifies office Wi-Fi network &amp; geofence location.</p>
                                </div>
                            </div>

                            <div className="flow-deck-arrow">➔</div>

                            {/*  Step 2  */}
                            <div className="journey-step-box featured-step">
                                <div className="journey-screen-frame" onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow1_Step2.png', 'EMPLOYEE JOURNEY • STEP 02', '02. Slide to Check-In')} title="Tap to expand screen">
                                    <img src="/assets/images/attendly/flow_screens/Flow1_Step2.png" alt="Step 2: Slide to Check-In" className="journey-img" />
                                </div>
                                <div className="journey-step-info">
                                    <span className="step-mini-badge gold-badge">STEP 02 • KEY GESTURE</span>
                                    <h4>Slide to Check-In</h4>
                                    <p>1.2s smooth slide gesture locks arrival timestamp with 0 typing.</p>
                                </div>
                            </div>

                            <div className="flow-deck-arrow">➔</div>

                            {/*  Step 3  */}
                            <div className="journey-step-box">
                                <div className="journey-screen-frame" onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow1_Step3.png', 'EMPLOYEE JOURNEY • STEP 03', '03. Confirm Attendance')} title="Tap to expand screen">
                                    <img src="/assets/images/attendly/flow_screens/Flow1_Step3.png" alt="Step 3: Confirm Attendance" className="journey-img" />
                                </div>
                                <div className="journey-step-info">
                                    <span className="step-mini-badge">STEP 03</span>
                                    <h4>Confirm Attendance</h4>
                                    <p>Timestamp confirmed, unlocking assigned daily deliverables.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Flow 2: Admin Journey  */}
                    <div className="cs-dark-card flow-walkthrough-card">
                        <div className="flow-wt-header margin-bottom-24">
                            <div className="flow-title-badge-row">
                                <span className="flow-step-pill admin-pill">DIRECTOR / ADMIN JOURNEY</span>
                                <span className="flow-time-pill">📊 Executive Oversight</span>
                            </div>
                            <h3>02. Executive Oversight, Leave Approval &amp; Delay Tracking</h3>
                            <p className="flow-desc-text">Surface what needs attention first — directors process leave requests and monitor latecomers on mobile.</p>
                        </div>

                        <div className="journey-flow-deck">
                            {/*  Step 1  */}
                            <div className="journey-step-box">
                                <div className="journey-screen-frame" onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow2_Step1.png', 'ADMIN JOURNEY • STEP 01', '01. Admin Dashboard')} title="Tap to expand screen">
                                    <img src="/assets/images/attendly/flow_screens/Flow2_Step1.png" alt="Step 1: Admin Dashboard" className="journey-img" />
                                </div>
                                <div className="journey-step-info">
                                    <span className="step-mini-badge admin-badge">STEP 01</span>
                                    <h4>Admin Dashboard</h4>
                                    <p>Executive portal summarizing organizational team headcount.</p>
                                </div>
                            </div>

                            <div className="flow-deck-arrow">➔</div>

                            {/*  Step 2  */}
                            <div className="journey-step-box featured-step">
                                <div className="journey-screen-frame" onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow2_Step2.png', 'ADMIN JOURNEY • STEP 02', '02. Leave Requests Queue')} title="Tap to expand screen">
                                    <img src="/assets/images/attendly/flow_screens/Flow2_Step2.png" alt="Step 2: Leave Requests Queue" className="journey-img" />
                                </div>
                                <div className="journey-step-info">
                                    <span className="step-mini-badge blue-badge">STEP 02 • ONE-TAP DECISION</span>
                                    <h4>Leave Requests</h4>
                                    <p>Approve or reject leave requests with 1 tap, auto-notifying staff.</p>
                                </div>
                            </div>

                            <div className="flow-deck-arrow">➔</div>

                            {/*  Step 3  */}
                            <div className="journey-step-box">
                                <div className="journey-screen-frame" onClick={() => openLightbox('/assets/images/attendly/flow_screens/Flow2_Step3.png', 'ADMIN JOURNEY • STEP 03', '03. Employee Performance Report')} title="Tap to expand screen">
                                    <img src="/assets/images/attendly/flow_screens/Flow2_Step3.png" alt="Step 3: Employee Performance Report" className="journey-img" />
                                </div>
                                <div className="journey-step-info">
                                    <span className="step-mini-badge admin-badge">STEP 03</span>
                                    <h4>Employee Performance</h4>
                                    <p>Drill down into employee work hours &amp; overtime reports.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 09. STYLE GUIDE =================  */}
        <section id="style-guide" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">09</span>
                    <h2 className="cs-step-title">Style Guide</h2>
                </div>

                {/*  Color Palette Showcase  */}
                <div className="cs-dark-card style-guide-card margin-bottom-30">
                    <h3 className="sg-section-title">Color Palette</h3>
                    <div className="color-palette-grid">
                        <div className="swatch-item">
                            <div className="swatch-color" style={{background: '#F3B61F', color: '#000'}}>#F3B61F</div>
                            <strong>Primary Yellow</strong>
                            <span>Main CTAs &amp; Status Badges</span>
                        </div>
                        <div className="swatch-item">
                            <div className="swatch-color" style={{background: '#E63946', color: '#FFF'}}>#E63946</div>
                            <strong>Accent Red</strong>
                            <span>Latecomer Alerts &amp; Urgency</span>
                        </div>
                        <div className="swatch-item">
                            <div className="swatch-color" style={{background: '#180BA9', color: '#FFF'}}>#180BA9</div>
                            <strong>Deep Blue</strong>
                            <span>Secondary CTA &amp; CRM Accents</span>
                        </div>
                        <div className="swatch-item">
                            <div className="swatch-color" style={{background: '#121216', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)'}}>#121216</div>
                            <strong>Surface Dark</strong>
                            <span>Card Backgrounds &amp; Modules</span>
                        </div>
                        <div className="swatch-item">
                            <div className="swatch-color" style={{background: '#070708', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)'}}>#070708</div>
                            <strong>Canvas Dark</strong>
                            <span>Background OLED Dark Theme</span>
                        </div>
                    </div>
                </div>

                {/*  Typography & Components (With Vector Icons Inside the Same Container)  */}
                <div className="cs-dark-grid-2">
                    <div className="cs-dark-card style-guide-card">
                        <h3 className="sg-section-title">Typography Hierarchy</h3>
                        <div className="typo-spec-list">
                            <div className="typo-spec">
                                <span className="typo-sample font-urbanist-bold">Urbanist Bold (700)</span>
                                <span>Headings &amp; Page Titles</span>
                            </div>
                            <div className="typo-spec">
                                <span className="typo-sample font-urbanist-medium">Urbanist Medium (500)</span>
                                <span>Card Titles &amp; Navigation</span>
                            </div>
                            <div className="typo-spec">
                                <span className="typo-sample font-caveat">Caveat Script (Accent)</span>
                                <span>Handwritten Quotes &amp; Annotations</span>
                            </div>
                        </div>
                    </div>

                    {/*  UI Components, Badges & Vector Icons in ONE Card Container  */}
                    <div className="cs-dark-card style-guide-card">
                        <h3 className="sg-section-title">UI Components &amp; Badges</h3>
                        <div className="ui-components-demo">
                            {/*  Button Components  */}
                            <div className="demo-row margin-bottom-20">
                                <button className="cs-btn cs-btn-yellow demo-btn">Slide to Check In</button>
                                <button className="cs-btn cs-btn-blue demo-btn">View Reports</button>
                            </div>
                            
                            {/*  Status Pills  */}
                            <div className="demo-row margin-bottom-20">
                                <span className="status-pill status-approved">✓ Approved</span>
                                <span className="status-pill status-pending">⏳ Pending</span>
                                <span className="status-pill status-rejected">✕ Rejected</span>
                            </div>

                            {/*  SVG Vector Icons Grid INSIDE the same container  */}
                            <div className="sg-icon-subhead">App Vector Icons</div>
                            <div className="sg-icon-row">
                                <div className="sg-icon-tile" title="Dashboard">
                                    <img src="/assets/images/attendly/svg/Dashboard ICON.svg" alt="Dashboard Icon" className="dark-theme-svg" />
                                    <span>Dashboard</span>
                                </div>
                                <div className="sg-icon-tile" title="Calendar">
                                    <img src="/assets/images/attendly/svg/Calendar.svg" alt="Calendar Icon" className="dark-theme-svg" />
                                    <span>Calendar</span>
                                </div>
                                <div className="sg-icon-tile" title="Notification">
                                    <img src="/assets/images/attendly/svg/Notification.svg" alt="Notification Icon" className="dark-theme-svg" />
                                    <span>Alerts</span>
                                </div>
                                <div className="sg-icon-tile" title="Office">
                                    <img src="/assets/images/attendly/svg/Office.svg" alt="Office Icon" className="dark-theme-svg" />
                                    <span>Office</span>
                                </div>
                                <div className="sg-icon-tile" title="Reminder">
                                    <img src="/assets/images/attendly/svg/Reminder.svg" alt="Reminder Icon" className="dark-theme-svg" />
                                    <span>Reminder</span>
                                </div>
                                <div className="sg-icon-tile" title="Settings">
                                    <img src="/assets/images/attendly/svg/Settings.svg" alt="Settings Icon" className="dark-theme-svg" />
                                    <span>Settings</span>
                                </div>
                                <div className="sg-icon-tile" title="Search">
                                    <img src="/assets/images/attendly/svg/search.svg" alt="Search Icon" className="dark-theme-svg" />
                                    <span>Search</span>
                                </div>
                                <div className="sg-icon-tile" title="Filter">
                                    <img src="/assets/images/attendly/svg/FIlter.svg" alt="Filter Icon" className="dark-theme-svg" />
                                    <span>Filter</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 10. DESIGN IMPACT =================  */}
        <section id="impact" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">10</span>
                    <h2 className="cs-step-title">Design Impact &amp; Results</h2>
                </div>

                {/*  3 Visual Columns with Clean Source Image Paths  */}
                <div className="cs-dark-grid-3">
                    <div className="cs-dark-card impact-visual-card">
                        <div className="impact-image-container">
                            <img src="/assets/images/attendly/source/DesignImpact_1.png" alt="Reduced interaction to a single gesture" className="impact-img" />
                        </div>
                        <div className="impact-meta">
                            <div className="impact-metric">1.2s</div>
                            <h3 className="impact-title">Reduced to a Single Gesture</h3>
                            <p className="impact-desc">Replaced complex 4-step check-in flows with a friction-free slide gesture.</p>
                        </div>
                    </div>

                    <div className="cs-dark-card impact-visual-card">
                        <div className="impact-image-container">
                            <img src="/assets/images/attendly/source/DesignImpact_2.png" alt="Built two report experiences from one data model" className="impact-img" />
                        </div>
                        <div className="impact-meta">
                            <div className="impact-metric">2-in-1</div>
                            <h3 className="impact-title">Dual Report Experiences</h3>
                            <p className="impact-desc">Built tailored employee view &amp; director overview from a unified data model.</p>
                        </div>
                    </div>

                    <div className="cs-dark-card impact-visual-card">
                        <div className="impact-image-container">
                            <img src="/assets/images/attendly/source/DesignImpact_3.png" alt="Shipped a complete working product" className="impact-img" />
                        </div>
                        <div className="impact-meta">
                            <div className="impact-metric">35</div>
                            <h3 className="impact-title">Routes Implemented</h3>
                            <p className="impact-desc">Shipped complete production-ready application with 0 type errors.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 11. WHAT I WOULD DO NEXT =================  */}
        <section id="next-steps" className="cs-section">
            <div className="cs-section-inner">
                <div className="cs-section-header">
                    <span className="cs-step-num">11</span>
                    <h2 className="cs-step-title">What I Would Do Next</h2>
                </div>

                {/*  5 Dark Cards with Minimal Outline Vector SVG Icons  */}
                <div className="cs-dark-grid-2 margin-bottom-20">
                    <div className="cs-dark-card next-card">
                        <div className="next-icon-badge">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3B61F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <h3 className="next-title">Validate Core Personas</h3>
                        <p className="next-desc">Conduct 5–7 interviews with Khushi- and Noman-like roles to pressure-test frequency &amp; complexity assumptions.</p>
                    </div>

                    <div className="cs-dark-card next-card">
                        <div className="next-icon-badge">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3B61F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <polyline points="17 11 19 13 23 9"></polyline>
                            </svg>
                        </div>
                        <h3 className="next-title">Usability-Test Check-in Flow</h3>
                        <p className="next-desc">Observe real behavior for the check-in interaction as daily engagement depends heavily on this flow.</p>
                    </div>

                    <div className="cs-dark-card next-card">
                        <div className="next-icon-badge">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3B61F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                        </div>
                        <h3 className="next-title">Accessibility Audit</h3>
                        <p className="next-desc">Run formal checks on contrast ratios, screen reader flow, and drag-gesture fallbacks.</p>
                    </div>

                    <div className="cs-dark-card next-card">
                        <div className="next-icon-badge">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3B61F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                                <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                                <line x1="12" y1="20" x2="12.01" y2="20"></line>
                            </svg>
                        </div>
                        <h3 className="next-title">Design for Offline</h3>
                        <p className="next-desc">Explicitly address low-connectivity check-ins. Especially for field and retail employees.</p>
                    </div>
                </div>

                <div className="cs-dark-card next-card full-width-card">
                    <div className="next-icon-badge">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3B61F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="6"></circle>
                            <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                    </div>
                    <h3 className="next-title">Extend the Core Thesis</h3>
                    <p className="next-desc">Focus on geolocation-tagged check-ins and push notifications. Both push further into "effortless, immediate attendance," rather than expanding into unrelated product surface areas.</p>
                </div>
            </div>
        </section>

        {/*  ===== NEXT PROJECT TEASER =====  */}
        <section className="cs-next-project">
            <div className="cs-section-inner">
                <div className="next-proj-card">
                    <div className="next-proj-info">
                        <span className="next-proj-label">NEXT CASE STUDY</span>
                        <h3 className="next-proj-title">REVSYNC — A Sales CRM for Excel-Dependent Teams</h3>
                        <p className="next-proj-desc">Replacing fragmented spreadsheet tracking with a unified B2B sales dashboard.</p>
                    </div>
                    <a href="index.html#case-studies" className="cs-btn cs-btn-blue">
                        <span>Explore Works</span>
                    </a>
                </div>
            </div>
        </section>

    </main>

    {/*  ===== FOOTER =====  */}
    <footer className="footer">
        <div className="footer-inner">
            <h2 className="footer-headline">USER-FIRST DESIGNER</h2>
            <div className="footer-bottom">
                <div className="footer-socials">
                    <a href="https://www.linkedin.com/in/omkushwaha" target="_blank" className="social-icon" aria-label="LinkedIn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                    <a href="https://www.behance.net/mkshw" target="_blank" className="social-icon" aria-label="Behance">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/>
                        </svg>
                    </a>
                    <a href="https://drive.google.com/drive/folders/1g7YznCz4lMgDVaWrqk4Cp38cFIs0JbNJ?usp=sharing" target="_blank" className="social-icon" aria-label="Resume">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                    </a>
                </div>
                <div className="footer-right">
                    <div className="footer-nav">
                        <a href="index.html#case-studies" className="footer-link">WORKS</a>
                        <a href="index.html#about" className="footer-link">ABOUT</a>
                    </div>
                    <p className="footer-copy">© 2025 Om Kushwaha. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    {/*  ===== LIGHTBOX MODAL FOR MOBILE & DESK ZOOM =====  */}
    <div className="cs-lightbox-modal" id="cs-lightbox" onClick={() => { closeLightbox() }}>
        <div className="lightbox-content">
            <button className="lightbox-close-btn" onClick={() => { closeLightbox() }}>✕ Close</button>
            <img src="" alt="Expanded Wireframe Screen" id="lightbox-img" />
            <div className="lightbox-caption" id="lightbox-caption">
                <span className="lb-badge" id="lb-badge"></span>
                <h4 id="lb-title"></h4>
            </div>
        </div>
    </div>

    
    


      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="cs-lightbox-overlay active" onClick={closeLightbox}>
          <div className="cs-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="cs-lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">&times;</button>
            <img src={lightboxSrc} alt={lightboxTitle} className="cs-lightbox-img" />
            {lightboxTitle && <p className="cs-lightbox-title">{lightboxTitle}</p>}
            {lightboxSub && <p className="cs-lightbox-sub">{lightboxSub}</p>}
          </div>
        </div>
      )}
    </>
  );
}
