'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

export default function RevSyncPage() {
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

  // Escape key closes lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLightbox]);

  return (
    <>


    {/*  Floating Smart Hide/Show Back CTA  */}
    <a href="/" className="cs-back-cta revsync-back-cta" aria-label="Back to Homepage">
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
                <div className="revsync-figma-hero-card">
                    <div className="hero-banner-content">
                        <div className="hero-text-col">
                            <div className="cs-badge-row">
                                <span className="cs-tag-pill revsync-tag-pill">SAAS</span>
                            </div>
                            <h1 className="cs-main-title revsync-main-title">Rev<span className="accent-lime">Sync</span></h1>
                            <h2 className="hero-tagline-title">Designing a role-scoped CRM for sales teams running on spreadsheets.</h2>
                            <p className="hero-body-desc">
                                RevSync replaces fragmented Excel-based lead tracking with a CRM that gives sales reps, team leaders, and admins each the exact view of the pipeline they need — nothing more, nothing less.
                            </p>

                            {/*  Metadata Row (Frame 1261157046: 3 Cards from Figma Spec)  */}
                            <div className="figma-meta-cards-row">
                                <div className="figma-meta-card">
                                    <span className="f-meta-label">ROLE</span>
                                    <strong className="f-meta-val">UI/UX Designer</strong>
                                </div>
                                <div className="figma-meta-card">
                                    <span className="f-meta-label">TIMELINE</span>
                                    <strong className="f-meta-val">3 Weeks</strong>
                                </div>
                                <div className="figma-meta-card">
                                    <span className="f-meta-label">TOOLS</span>
                                    <strong className="f-meta-val">Figma, Claude</strong>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual-col">
                            <div className="cs-image-frame revsync-hero-visual-frame" onClick={() => openLightbox('/assets/images/revsync/source/Hero_Image.png', 'REVSYNC • HERO', 'Sales CRM Control Center Dashboard')}>
                                <img loading="lazy" decoding="async" src="/assets/images/revsync/source/Hero_Image.png" alt="RevSync Web CRM Dashboard Mockup" className="cs-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/*  ================= 02. PROBLEM STATEMENT =================  */}
        <section id="problem" className="cs-section">
            <div className="cs-section-inner">
                <div className="revsync-problem-container">
                    
                    {/*  Top Row: Title + Quote Card (2-Column Flex)  */}
                    <div className="problem-top-row">
                        {/*  Left Column: Title & Research Subtitle  */}
                        <div className="problem-left-col">
                            <div className="cs-badge-row">
                                <span className="problem-tag-pill">THE PROBLEM</span>
                            </div>
                            <h2 className="problem-main-title">Leads falling through the <span className="accent-lime">cracks</span></h2>
                            <p className="problem-sub-desc">
                                Excel-based lead tracking. 18 interviews: admin, 4 team leaders, 12 reps, Meta ads operator. Three breakdowns drove the project.
                            </p>
                        </div>

                        {/*  Right Column: Problem Statement Card  */}
                        <div className="problem-quote-card">
                            <span className="p-card-label">PROBLEM STATEMENT</span>
                            <p className="p-card-quote">
                                Spreadsheet-based lead tracking loses deals not from lack of leads, but from <span className="highlight-red">manual handoffs</span> and <span className="highlight-red">missed follow-ups</span>.
                            </p>
                        </div>
                    </div>

                    {/*  Middle Row: 4-Step Handoff Pipeline Flow  */}
                    <div className="problem-pipeline-wrapper">
                        <div className="problem-pipeline-flow">
                            {/*  Node 1: Meta Ads  */}
                            <div className="flow-node-box">
                                <div className="node-icon-red">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </div>
                                <span className="node-title">Meta Ads</span>
                                <span className="node-sub">Lead generation</span>
                            </div>

                            <span className="flow-arrow">➔</span>

                            {/*  Node 2: CSV Export  */}
                            <div className="flow-node-box">
                                <div className="node-icon-red">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                                </div>
                                <span className="node-title">CSV Export</span>
                                <span className="node-sub">Manual download</span>
                            </div>

                            <span className="flow-arrow">➔</span>

                            {/*  Node 3: Manual Split  */}
                            <div className="flow-node-box short-box">
                                <span className="node-title">Manual Split</span>
                                <span className="node-sub">TL copies rows</span>
                            </div>

                            <span className="flow-arrow">➔</span>

                            {/*  Node 4: N Excel Files  */}
                            <div className="flow-node-box">
                                <div className="node-icon-red">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                                </div>
                                <span className="node-title">N Excel Files</span>
                                <span className="node-sub">One per rep</span>
                            </div>
                        </div>

                        {/*  Bottom Warning Badge  */}
                        <div className="pipeline-warning-pill">
                            <span className="warn-cross"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                            <span>4-step handoff — no reminders, no visibility</span>
                        </div>
                    </div>

                    {/*  Bottom Row: 3 Impact Metric Cards Grid  */}
                    <div className="problem-metrics-grid">
                        {/*  Card 01: Orange  */}
                        <div className="p-metric-card">
                            <div className="p-card-icon icon-orange">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <h3 className="p-metric-num num-orange">0</h3>
                            <h4 className="p-metric-title">Missed follow-ups/day</h4>
                            <p className="p-metric-sub">No reminders. Reps type dates manually — leads slip.</p>
                        </div>

                        {/*  Card 02: Blue  */}
                        <div className="p-metric-card">
                            <div className="p-card-icon icon-blue">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <h3 className="p-metric-num num-blue">N</h3>
                            <h4 className="p-metric-title">Spreadsheets to check</h4>
                            <p className="p-metric-sub">Admin opens every rep's file individually. No consolidated view.</p>
                        </div>

                        {/*  Card 03: Lime  */}
                        <div className="p-metric-card">
                            <div className="p-card-icon icon-lime">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCF655" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                            </div>
                            <h3 className="p-metric-num num-lime">100%</h3>
                            <h4 className="p-metric-title">Manual relay</h4>
                            <p className="p-metric-sub">TL copies rows from one CSV to N files. Zero visibility mid-chain.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        {/*  ================= 03. TARGET AUDIENCE =================  */}
        <section id="audience" className="cs-section">
            <div className="cs-section-inner">
                <div className="revsync-audience-container">
                    
                    {/*  Section Header  */}
                    <div className="audience-header-block">
                        <div className="cs-badge-row margin-bottom-12">
                            <span className="audience-tag-pill">TARGET AUDIENCE</span>
                        </div>
                        <h2 className="audience-main-title">Three roles, one <span className="accent-lime">database</span></h2>
                        <p className="audience-sub-desc">Each role scoped over the same lead data — individual, team, org-wide.</p>
                    </div>

                    {/*  3 Redesigned Persona Cards Grid  */}
                    {/*  3 Minimalist Persona Cards Grid  */}
                    <div className="persona-cards-grid">
                        
                        {/*  Persona Card 01: Sales Rep (Orange Theme)  */}
                        <div className="persona-card-min card-theme-orange">
                            {/*  Card Header: Avatar + Title  */}
                            <div className="persona-header-min">
                                <div className="persona-avatar-min avatar-orange">SR</div>
                                <div className="persona-info-min">
                                    <h3 className="persona-title-min">Sales Rep</h3>
                                    <span className="persona-count-min">12 users</span>
                                </div>
                            </div>

                            {/*  Minimal Quote  */}
                            <div className="persona-quote-min border-orange-quote">
                                <p className="quote-text-min">“I just need to know who to call today and when to follow up.”</p>
                            </div>

                            {/*  Minimal Attribute List  */}
                            <div className="persona-attr-list">
                                <div className="attr-row-min">
                                    <div className="attr-tag-min">
                                        <span className="dot-min dot-green"></span>
                                        <span className="label-min text-green">Goals</span>
                                    </div>
                                    <p className="desc-min">Never miss a follow-up, without relying on memory</p>
                                </div>

                                <div className="attr-row-min">
                                    <div className="attr-tag-min">
                                        <span className="dot-min dot-red"></span>
                                        <span className="label-min text-red">Frustration</span>
                                    </div>
                                    <p className="desc-min">Manually typing follow-up dates and status into Excel</p>
                                </div>

                                <div className="attr-row-min">
                                    <div className="attr-tag-min">
                                        <span className="dot-min dot-lime"></span>
                                        <span className="label-min text-lime">Success Metric</span>
                                    </div>
                                    <p className="desc-min">Leads closed this week</p>
                                </div>
                            </div>
                        </div>

                        {/*  Persona Card 02: Team Leader (Blue Theme)  */}
                        <div className="persona-card-min card-theme-blue">
                            {/*  Card Header: Avatar + Title  */}
                            <div className="persona-header-min">
                                <div className="persona-avatar-min avatar-blue">TL</div>
                                <div className="persona-info-min">
                                    <h3 className="persona-title-min">Team Leader</h3>
                                    <span className="persona-count-min">4 users</span>
                                </div>
                            </div>

                            {/*  Minimal Quote  */}
                            <div className="persona-quote-min border-blue-quote">
                                <p className="quote-text-min">“I need to get leads to my team fast and know who's actually working them.”</p>
                            </div>

                            {/*  Minimal Attribute List  */}
                            <div className="persona-attr-list">
                                <div className="attr-row-min">
                                    <div className="attr-tag-min">
                                        <span className="dot-min dot-green"></span>
                                        <span className="label-min text-green">Goals</span>
                                    </div>
                                    <p className="desc-min">Distribute leads quickly and fairly, without manual splitting</p>
                                </div>

                                <div className="attr-row-min">
                                    <div className="attr-tag-min">
                                        <span className="dot-min dot-red"></span>
                                        <span className="label-min text-red">Frustration</span>
                                    </div>
                                    <p className="desc-min">Manually dividing one Excel export across team members by hand</p>
                                </div>

                                <div className="attr-row-min">
                                    <div className="attr-tag-min">
                                        <span className="dot-min dot-lime"></span>
                                        <span className="label-min text-lime">Success Metric</span>
                                    </div>
                                    <p className="desc-min">Team conversion rate</p>
                                </div>
                            </div>
                        </div>

                        {/*  Persona Card 03: Admin (Lime Theme)  */}
                        <div className="persona-card-min card-theme-lime">
                            {/*  Card Header: Avatar + Title  */}
                            <div className="persona-header-min">
                                <div className="persona-avatar-min avatar-lime">AD</div>
                                <div className="persona-info-min">
                                    <h3 className="persona-title-min">Admin</h3>
                                    <span className="persona-count-min">1 user</span>
                                </div>
                            </div>

                            {/*  Minimal Quote  */}
                            <div className="persona-quote-min border-lime-quote">
                                <p className="quote-text-min">“I don't have time to open ten spreadsheets to know how the team's doing.”</p>
                            </div>

                            {/*  Minimal Attribute List  */}
                            <div className="persona-attr-list">
                                <div className="attr-row-min">
                                    <div className="attr-tag-min">
                                        <span className="dot-min dot-green"></span>
                                        <span className="label-min text-green">Goals</span>
                                    </div>
                                    <p className="desc-min">See org-wide performance at a glance</p>
                                </div>

                                <div className="attr-row-min">
                                    <div className="attr-tag-min">
                                        <span className="dot-min dot-red"></span>
                                        <span className="label-min text-red">Frustration</span>
                                    </div>
                                    <p className="desc-min">Opening individual rep's spreadsheet to piece together full picture</p>
                                </div>

                                <div className="attr-row-min">
                                    <div className="attr-tag-min">
                                        <span className="dot-min dot-lime"></span>
                                        <span className="label-min text-lime">Success Metric</span>
                                    </div>
                                    <p className="desc-min">Overall pipeline health / conversion rate</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>


        {/*  ================= 04. ARCHITECTURE & FLOWS =================  */}
        <section id="architecture" className="cs-section">
            <div className="cs-section-inner">
                <div className="revsync-arch-container">
                    
                    {/*  Section Header  */}
                    <div className="arch-header">
                        <div className="cs-badge-row margin-bottom-12">
                            <span className="arch-tag-pill">ARCHITECTURE &amp; FLOWS</span>
                        </div>
                        <h2 className="arch-main-title"><span className="accent-lime">Role-scoped access</span> to one shared lead database</h2>
                        <p className="arch-sub-desc">Admin sees everything. TL sees their team. Rep sees their own leads.</p>
                    </div>

                    {/*  Core Flow Block  */}
                    <div className="arch-core-flow-block">
                        <span className="core-flow-title">CORE FLOW: IMPORT ➔ ASSIGN ➔ CONNECT ➔ CLOSE</span>
                        
                        <div className="core-flow-nodes-row">
                            {/*  Node 1: Import  */}
                            <div className="c-node-box node-blue">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                                <span className="c-node-name text-blue">Import</span>
                                <span className="c-node-sub">Meta CSV</span>
                            </div>

                            <span className="c-arrow arrow-blue">➔</span>

                            {/*  Node 2: Assign  */}
                            <div className="c-node-box node-green">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#07CF52" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                                <span className="c-node-name text-green">Assign</span>
                                <span className="c-node-sub">To reps</span>
                            </div>

                            <span className="c-arrow arrow-green">➔</span>

                            {/*  Node 3: Call  */}
                            <div className="c-node-box node-orange">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <span className="c-node-name text-orange">Call</span>
                                <span className="c-node-sub">Log + Notes</span>
                            </div>

                            <span className="c-arrow arrow-orange">➔</span>

                            {/*  Node 4: Follow-up  */}
                            <div className="c-node-box node-lime">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCF655" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                <span className="c-node-name text-lime">Follow-up</span>
                                <span className="c-node-sub">Automatic reminder</span>
                            </div>

                            <span className="c-arrow arrow-lime">➔</span>

                            {/*  Node 5: Closed  */}
                            <div className="c-node-box node-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                <span className="c-node-name text-white">Closed</span>
                                <span className="c-node-sub">Won / Lost</span>
                            </div>
                        </div>
                    </div>

                    {/*  Flow Visualization Journeys  */}
                    <div className="flow-vis-wrapper">
                        <span className="vis-section-title">FLOW VISUALIZATION</span>

                        {/*  Journey 01: Sales Rep Flow  */}
                        <div className="journey-row">
                            <div className="j-role-hdr">
                                <span className="j-avatar avatar-orange">SR</span>
                                <span className="j-role-title">Sales Rep Flow</span>
                            </div>
                            <div className="j-steps-pills">
                                <span className="j-step-pill">Login</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill">View assigned leads</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill">Call lead</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill">Log call / notes</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill">Set follow-up date</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill pill-highlight-orange">Get Reminder</span>
                            </div>
                        </div>

                        {/*  Journey 02: Team Leader Journey  */}
                        <div className="journey-row">
                            <div className="j-role-hdr">
                                <span className="j-avatar avatar-blue">TL</span>
                                <span className="j-role-title">Team Leader Journey</span>
                            </div>
                            <div className="j-steps-pills">
                                <span className="j-step-pill">Import / receive leads</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill">Select leads</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill">Assign leads to reps</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill pill-highlight-blue">Monitor team progress</span>
                            </div>
                        </div>

                        {/*  Journey 03: Admin Journey  */}
                        <div className="journey-row">
                            <div className="j-role-hdr">
                                <span className="j-avatar avatar-lime">AD</span>
                                <span className="j-role-title">Admin Journey</span>
                            </div>
                            <div className="j-steps-pills">
                                <span className="j-step-pill">Open dashboard</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill">View org-wide KPIs</span>
                                <span className="j-step-arrow">›</span>
                                <span className="j-step-pill pill-highlight-lime">Track Individual/Team Performance</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        {/*  ================= 05. STYLE GUIDE =================  */}
        <section id="style-guide" className="cs-section">
            <div className="cs-section-inner">
                <div className="revsync-sg-container">
                    
                    {/*  Section Header  */}
                    <div className="sg-header-block">
                        <div className="cs-badge-row margin-bottom-12">
                            <span className="sg-tag-pill">STYLE GUIDE</span>
                        </div>
                        <h2 className="sg-main-title"><span className="accent-lime">Built for Working,</span><br />not for impressing.</h2>
                        <p className="sg-sub-desc">Information first, aesthetics second. Every UI choice answers to table legibility. Inter font, tight typography scaling, low-contrast palette.</p>
                    </div>

                    {/*  1. Color Palette Block  */}
                    <div className="sg-block">
                        <span className="sg-block-label">COLOR PALETTE</span>
                        
                        <div className="sg-swatches-grid">
                            {/*  Swatch 01  */}
                            <div className="sg-swatch-card">
                                <div className="swatch-color-sq" style={{background: '#2563EB'}}></div>
                                <div className="swatch-meta">
                                    <div className="swatch-title-row">
                                        <span className="swatch-name">Primary Blue</span>
                                        <span className="swatch-hex">#2563EB</span>
                                    </div>
                                    <span className="swatch-usage">Actions, nav, key metrics</span>
                                </div>
                            </div>

                            {/*  Swatch 02  */}
                            <div className="sg-swatch-card">
                                <div className="swatch-color-sq" style={{background: '#CCF655'}}></div>
                                <div className="swatch-meta">
                                    <div className="swatch-title-row">
                                        <span className="swatch-name">Secondary Green</span>
                                        <span className="swatch-hex">#CCF655</span>
                                    </div>
                                    <span className="swatch-usage">Highlight, Headline, key metrics</span>
                                </div>
                            </div>

                            {/*  Swatch 03  */}
                            <div className="sg-swatch-card">
                                <div className="swatch-color-sq" style={{background: '#1E293B'}}></div>
                                <div className="swatch-meta">
                                    <div className="swatch-title-row">
                                        <span className="swatch-name">Neutral Dark</span>
                                        <span className="swatch-hex">#1E293B</span>
                                    </div>
                                    <span className="swatch-usage">Body text</span>
                                </div>
                            </div>

                            {/*  Swatch 04  */}
                            <div className="sg-swatch-card">
                                <div className="swatch-color-sq" style={{background: '#64748B'}}></div>
                                <div className="swatch-meta">
                                    <div className="swatch-title-row">
                                        <span className="swatch-name">Neutral Gray</span>
                                        <span className="swatch-hex">#64748B</span>
                                    </div>
                                    <span className="swatch-usage">Secondary text</span>
                                </div>
                            </div>

                            {/*  Swatch 05  */}
                            <div className="sg-swatch-card">
                                <div className="swatch-color-sq" style={{background: '#07CF52'}}></div>
                                <div className="swatch-meta">
                                    <div className="swatch-title-row">
                                        <span className="swatch-name">Success Green</span>
                                        <span className="swatch-hex">#07CF52</span>
                                    </div>
                                    <span className="swatch-usage">Positive trends, Success</span>
                                </div>
                            </div>

                            {/*  Swatch 06  */}
                            <div className="sg-swatch-card">
                                <div className="swatch-color-sq" style={{background: '#F97316'}}></div>
                                <div className="swatch-meta">
                                    <div className="swatch-title-row">
                                        <span className="swatch-name">Warning Orange</span>
                                        <span className="swatch-hex">#F97316</span>
                                    </div>
                                    <span className="swatch-usage">Follow-up flags</span>
                                </div>
                            </div>

                            {/*  Swatch 07  */}
                            <div className="sg-swatch-card">
                                <div className="swatch-color-sq" style={{background: '#DC2626'}}></div>
                                <div className="swatch-meta">
                                    <div className="swatch-title-row">
                                        <span className="swatch-name">Warning Red</span>
                                        <span className="swatch-hex">#DC2626</span>
                                    </div>
                                    <span className="swatch-usage">Error, Not interested</span>
                                </div>
                            </div>

                            {/*  Swatch 08  */}
                            <div className="sg-swatch-card">
                                <div className="swatch-color-sq" style={{background: '#F8FAFC'}}></div>
                                <div className="swatch-meta">
                                    <div className="swatch-title-row">
                                        <span className="swatch-name">Background Light</span>
                                        <span className="swatch-hex">#F8FAFC</span>
                                    </div>
                                    <span className="swatch-usage">App background</span>
                                </div>
                            </div>

                            {/*  Swatch 09  */}
                            <div className="sg-swatch-card">
                                <div className="swatch-color-sq" style={{background: '#0C0C0C', border: '1px solid rgba(255,255,255,0.2)'}}></div>
                                <div className="swatch-meta">
                                    <div className="swatch-title-row">
                                        <span className="swatch-name">Background Dark</span>
                                        <span className="swatch-hex">#0C0C0C</span>
                                    </div>
                                    <span className="swatch-usage">App background</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  2. Typography Block  */}
                    <div className="sg-block">
                        <span className="sg-block-label">TYPOGRAPHY</span>

                        <div className="sg-typo-card">
                            {/*  Top Fonts Row  */}
                            <div className="typo-fonts-row">
                                <div className="typo-font-item">
                                    <span className="typo-badge">PRIMARY</span>
                                    <h3 className="typo-font-title text-lime font-space">Space Grotesk</h3>
                                </div>
                                <div className="typo-font-item">
                                    <span className="typo-badge">SECONDARY</span>
                                    <h3 className="typo-font-title text-white font-inter-title">Inter</h3>
                                </div>
                            </div>

                            {/*  Bottom Type Hierarchy Grid  */}
                            <div className="typo-samples-grid">
                                <div className="typo-sample-col">
                                    <span className="sample-spec">Heading / 20px / 600</span>
                                    <h4 className="sample-heading font-space">Lead Management</h4>
                                </div>
                                <div className="typo-sample-col">
                                    <span className="sample-spec">Body / 16px / 400</span>
                                    <p className="sample-body">Assigned leads awaiting follow-up</p>
                                </div>
                                <div className="typo-sample-col">
                                    <span className="sample-spec">Table / 14px / 400</span>
                                    <p className="sample-table">Rahul Kumar — Mumbai</p>
                                </div>
                                <div className="typo-sample-col">
                                    <span className="sample-spec">CTA / 16px / 600</span>
                                    <span className="sample-cta">Follow Up</span>
                                </div>
                                <div className="typo-sample-col">
                                    <span className="sample-spec">Caption / 12px / 500</span>
                                    <span className="sample-caption font-space">LAST CONTACTED</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  3. Components Showcase Block  */}
                    <div className="sg-block">
                        <span className="sg-block-label">COMPONENTS</span>

                        <div className="sg-components-card">
                            {/*  KPI Cards Sub-row  */}
                            <div className="comp-sub-block">
                                <span className="comp-sub-title">KPI CARDS</span>

                                <div className="sg-kpi-grid">
                                    <div className="sg-kpi-box">
                                        <span className="sg-kpi-lbl">TOTAL LEADS</span>
                                        <h4 className="sg-kpi-num">1,247</h4>
                                        <span className="sg-kpi-trend trend-green">↑ +12.4%</span>
                                    </div>
                                    <div className="sg-kpi-box">
                                        <span className="sg-kpi-lbl">FOLLOW-UPS DUE</span>
                                        <h4 className="sg-kpi-num">38</h4>
                                        <span className="sg-kpi-trend trend-green">↑ +7.5% than last week</span>
                                    </div>
                                    <div className="sg-kpi-box">
                                        <span className="sg-kpi-lbl">CLOSED THIS WEEK</span>
                                        <h4 className="sg-kpi-num">14</h4>
                                        <span className="sg-kpi-trend trend-red">↓ -4% than last week</span>
                                    </div>
                                    <div className="sg-kpi-box">
                                        <span className="sg-kpi-lbl">Not Interested</span>
                                        <h4 className="sg-kpi-num">40</h4>
                                        <span className="sg-kpi-trend trend-red">↓ +14% than last week</span>
                                    </div>
                                </div>
                            </div>

                            {/*  Bottom Row: Status Pills, Filter Tab, Reminder Notification  */}
                            <div className="comp-bottom-row">
                                {/*  Status Pills  */}
                                <div className="comp-col-item">
                                    <span className="comp-sub-title">STATUS PILLS</span>
                                    <div className="sg-pills-wrap">
                                        <span className="sg-pill pill-orange-sub">Follow-up</span>
                                        <span className="sg-pill pill-yellow-sub">Interested</span>
                                        <span className="sg-pill pill-white-sub">New</span>
                                        <span className="sg-pill pill-strike-sub">Not Interested</span>
                                        <span className="sg-pill pill-blue-sub">Contacted</span>
                                        <span className="sg-pill pill-green-sub">Closed</span>
                                    </div>
                                </div>

                                {/*  Filter Tab  */}
                                <div className="comp-col-item">
                                    <span className="comp-sub-title">FILTER TAB</span>
                                    <div className="sg-filter-tabs-bar">
                                        <button className="sg-tab-btn active-tab">All Leads</button>
                                        <button className="sg-tab-btn">Follow-ups</button>
                                        <button className="sg-tab-btn">New</button>
                                        <button className="sg-tab-btn">Closed</button>
                                    </div>
                                </div>

                                {/*  Reminder Notification  */}
                                <div className="comp-col-item">
                                    <span className="comp-sub-title">REMINDER NOTIFICATION</span>
                                    <div className="sg-reminder-card">
                                        <div className="sg-rem-icon-box">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                        </div>
                                        <div className="sg-rem-info">
                                            <h5 className="rem-title">Follow-up due today</h5>
                                            <span className="rem-sub">Rahul Kumar — Retail Branch Banking</span>
                                        </div>
                                        <span className="rem-arrow">›</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>


        {/*  ================= 05. LO-FI WIREFRAMES =================  */}
        <section id="wireframes" className="cs-section">
            <div className="cs-section-inner">
                <div className="revsync-lofi-hero-frame" onClick={() => openLightbox('/assets/images/revsync/Lo-Fi Wireframes.png', 'LOW FIDELITY WIREFRAMES', 'Structural sketches to validate decision &amp; information hierarchy')} title="Tap to view full screen">
                    <img loading="lazy" decoding="async" src="/assets/images/revsync/Lo-Fi Wireframes.png" alt="Low Fidelity Wireframes Frame" className="lofi-hero-img" />
                </div>
            </div>
        </section>

        {/*  ================= 06. THE SOLUTION =================  */}
        <section id="solution" className="cs-section">
            <div className="cs-section-inner">
                <div className="revsync-sol-container">
                    
                    {/*  Section Header  */}
                    <div className="sol-header-block">
                        <div className="cs-badge-row margin-bottom-12">
                            <span className="sol-tag-pill">THE SOLUTION</span>
                        </div>
                        <h2 className="sol-main-title">What each screen is<br />designed to <span className="accent-lime">Prove</span></h2>
                        <p className="sol-sub-desc">Hypotheses, validated. A breakdown of the final UI to show exactly how each screen executes on the research.</p>
                    </div>

                    {/*  4 Hi-Fi Screen Solution Cards (2 x 2 Grid Layout)  */}
                    <div className="sol-cards-grid">
                        {/*  Card 01: Dashboard  */}
                        <div className="sol-card-item">
                            <div className="sol-card-header">
                                <div className="sol-icon-box icon-lime-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CCF655" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                </div>
                                <div className="sol-title-group">
                                    <h4 className="sol-card-title">Dashboard</h4>
                                    <span className="sol-role-tag">Admin View</span>
                                </div>
                            </div>
                            <p className="sol-card-sub">Org-wide KPIs at login — replaces opening every rep's file.</p>
                            <div className="sol-img-frame" onClick={() => openLightbox('/assets/images/revsync/source/Dashboard_Hi-Fi_Wireframe.png', 'DASHBOARD • ADMIN VIEW', 'Org-wide KPIs at login')}>
                                <div className="sol-green-border-wrapper">
                                    <img loading="lazy" decoding="async" src="/assets/images/revsync/source/Dashboard_Hi-Fi_Wireframe.png" alt="Dashboard Hi-Fi Wireframe" className="sol-img" />
                                </div>
                            </div>
                        </div>

                        {/*  Card 02: Leads Import  */}
                        <div className="sol-card-item">
                            <div className="sol-card-header">
                                <div className="sol-icon-box icon-blue-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                </div>
                                <div className="sol-title-group">
                                    <h4 className="sol-card-title">Leads Import</h4>
                                    <span className="sol-role-tag">Team Leader view</span>
                                </div>
                            </div>
                            <p className="sol-card-sub">One import replaces 4-step manual handoff chain.</p>
                            <div className="sol-img-frame" onClick={() => openLightbox('/assets/images/revsync/source/LeadsImport_Hi-Fi_Wireframe.png', 'LEADS IMPORT • TEAM LEADER VIEW', 'One import replaces 4-step manual handoff chain')}>
                                <div className="sol-green-border-wrapper">
                                    <img loading="lazy" decoding="async" src="/assets/images/revsync/source/LeadsImport_Hi-Fi_Wireframe.png" alt="Leads Import Hi-Fi Wireframe" className="sol-img" />
                                </div>
                            </div>
                        </div>

                        {/*  Card 03: Lead Detail  */}
                        <div className="sol-card-item">
                            <div className="sol-card-header">
                                <div className="sol-icon-box icon-orange-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </div>
                                <div className="sol-title-group">
                                    <h4 className="sol-card-title">Lead Detail</h4>
                                    <span className="sol-role-tag">Rep View</span>
                                </div>
                            </div>
                            <p className="sol-card-sub">Full lead history — no more info trapped in one person.</p>
                            <div className="sol-img-frame" onClick={() => openLightbox('/assets/images/revsync/source/LeadDetail_Hi-Fi_Wireframe.png', 'LEAD DETAIL • REP VIEW', 'Full lead history and timeline')}>
                                <div className="sol-green-border-wrapper">
                                    <img loading="lazy" decoding="async" src="/assets/images/revsync/source/LeadDetail_Hi-Fi_Wireframe.png" alt="Lead Detail Hi-Fi Wireframe" className="sol-img" />
                                </div>
                            </div>
                        </div>

                        {/*  Card 04: Assign Leads  */}
                        <div className="sol-card-item">
                            <div className="sol-card-header">
                                <div className="sol-icon-box icon-green-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                                </div>
                                <div className="sol-title-group">
                                    <h4 className="sol-card-title">Assign Leads</h4>
                                    <span className="sol-role-tag">Team Leader View</span>
                                </div>
                            </div>
                            <p className="sol-card-sub">Select, assign, done — no more splitting CSV rows by hand.</p>
                            <div className="sol-img-frame" onClick={() => openLightbox('/assets/images/revsync/source/AssignLeads_Hi-Fi_Wireframe.png', 'ASSIGN LEADS • TEAM LEADER VIEW', 'Select, assign, done')}>
                                <div className="sol-green-border-wrapper">
                                    <img loading="lazy" decoding="async" src="/assets/images/revsync/source/AssignLeads_Hi-Fi_Wireframe.png" alt="Assign Leads Hi-Fi Wireframe" className="sol-img" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        {/*  ================= 07. RESULTS & TAKEAWAYS =================  */}
        <section id="results" className="cs-section">
            <div className="cs-section-inner">
                <div className="revsync-res-container">
                    
                    {/*  Section Header  */}
                    <div className="res-header-block">
                        <div className="cs-badge-row margin-bottom-12">
                            <span className="res-tag-pill">RESULTS &amp; TAKEAWAYS</span>
                        </div>
                        <h2 className="res-main-title">What changed, and<br />what <span className="accent-lime">I’d do in future</span></h2>
                        <p className="res-sub-desc">Client-reported outcomes from the team using the design direction. Grounded in direct interviews, not a formal usability study — that's the next step.</p>
                    </div>

                    {/*  3 Impact Metric Cards Row  */}
                    <div className="res-stats-row">
                        {/*  Stat 01  */}
                        <div className="res-stat-card">
                            <h3 className="stat-big-num text-lime">10%</h3>
                            <p className="stat-desc">Improvement in lead distribution and handling efficiency.</p>
                        </div>

                        {/*  Stat 02  */}
                        <div className="res-stat-card">
                            <h3 className="stat-big-num text-lime">4 to 1</h3>
                            <p className="stat-desc">Collapsed 4-step manual handoff into single import action</p>
                        </div>

                        {/*  Stat 03  */}
                        <div className="res-stat-card">
                            <h3 className="stat-big-num text-lime">N➔1</h3>
                            <p className="stat-desc">Replaced N spreadsheets with one role scoped dashboard per person</p>
                        </div>
                    </div>

                    {/*  Before vs. After Comparison Row  */}
                    <div className="res-ba-row">
                        {/*  Before Card  */}
                        <div className="ba-card card-before">
                            <h4 className="ba-card-title text-red">Before — Excel Process</h4>
                            <ul className="ba-list list-red">
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Export from Meta ads → receive CSV file</li>
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Team leader manually splits rows across reps</li>
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Each rep opens their own spreadsheet</li>
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Follow-up dates typed manually — no reminders</li>
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Admin opens every file to check performance</li>
                            </ul>
                        </div>

                        {/*  After Card  */}
                        <div className="ba-card card-after">
                            <h4 className="ba-card-title text-lime">After — RevSync</h4>
                            <ul className="ba-list list-lime">
                                <li><span className="ba-icon icon-lime"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CCF655" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Import CSV → leads appear in shared database</li>
                                <li><span className="ba-icon icon-lime"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CCF655" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Team leader selects and assigns in one action</li>
                                <li><span className="ba-icon icon-lime"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CCF655" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Reps see only their leads — clean, scoped view</li>
                                <li><span className="ba-icon icon-lime"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CCF655" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Follow-up dates trigger automatic reminders</li>
                                <li><span className="ba-icon icon-lime"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CCF655" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Admin sees org-wide KPIs on one dashboard</li>
                            </ul>
                        </div>
                    </div>

                    {/*  What I'd Do Differently Block  */}
                    <div className="res-future-block">
                        <span className="future-section-title">WHAT I’D DO DIFFERENTLY</span>
                        
                        <div className="future-pills-row">
                            <div className="future-pill">
                                <span className="f-num num-orange">1</span>
                                <span className="f-text">Usability testing on real interface — next step</span>
                            </div>
                            <div className="future-pill">
                                <span className="f-num num-blue">2</span>
                                <span className="f-text">Validate table-vs-kanban with reps directly</span>
                            </div>
                            <div className="future-pill">
                                <span className="f-num num-lime">3</span>
                                <span className="f-text">Stress-test import with more messy client data</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        {/*  ================= NEXT PROJECT BANNER =================  */}
        <section className="next-project-section">
            <a href="/attendly" className="next-proj-card">
                <div className="next-proj-label">NEXT CASE STUDY</div>
                <h3 className="next-proj-title">ATTENDLY — Mobile Attendance &amp; Task App →</h3>
                <p className="next-proj-desc">1.2-second check-in system designed for fast-paced SMB operations.</p>
            </a>
        </section>

    </main>
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="cs-lightbox-overlay active" onClick={closeLightbox}>
          <div className="cs-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="cs-lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">&times;</button>
            <img loading="lazy" decoding="async" src={lightboxSrc} alt={lightboxTitle} className="cs-lightbox-img" />
            {lightboxTitle && <p className="cs-lightbox-title">{lightboxTitle}</p>}
            {lightboxSub && <p className="cs-lightbox-sub">{lightboxSub}</p>}
          </div>
        </div>
      )}
    </>
  );
}
