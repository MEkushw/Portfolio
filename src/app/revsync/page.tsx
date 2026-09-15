'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

interface LofiScreen {
  id: string;
  num: string;
  title: string;
  role: string;
  category: 'sales' | 'admin';
  layoutType: 'wide' | 'narrow';
  src: string;
  meta: string;
}

const BENTO_LOFI_SCREENS: LofiScreen[] = [
  {
    id: 'sales-dashboard',
    num: '01',
    title: 'Sales Rep Command Center',
    role: 'Sales Rep Flow',
    category: 'sales',
    layoutType: 'wide',
    src: '/assets/images/revsync/lofi/Sales_Dashboard.png',
    meta: 'Widescreen Desktop',
  },
  {
    id: 'lead-profile',
    num: '02',
    title: 'Contextual Lead Drawer',
    role: 'Sales Rep Flow',
    category: 'sales',
    layoutType: 'narrow',
    src: '/assets/images/revsync/lofi/Popup_Lead_Profile.png',
    meta: 'Slide-over Drawer',
  },
  {
    id: 'schedule-followup',
    num: '03',
    title: 'Rapid Follow-Up Scheduler',
    role: 'Sales Rep Flow',
    category: 'sales',
    layoutType: 'narrow',
    src: '/assets/images/revsync/lofi/Popup_Schedule_Follow_Up.png',
    meta: 'Modal Overlay',
  },
  {
    id: 'sales-leads',
    num: '04',
    title: 'Leads Pipeline & Matrix',
    role: 'Sales Rep Flow',
    category: 'sales',
    layoutType: 'wide',
    src: '/assets/images/revsync/lofi/Sales_Leads.png',
    meta: 'High-Density Table',
  },
  {
    id: 'admin-allocation',
    num: '05',
    title: 'Intelligent Lead Allocation Engine',
    role: 'Admin Operations',
    category: 'admin',
    layoutType: 'wide',
    src: '/assets/images/revsync/lofi/Admin_Leads_Allocation.png',
    meta: 'Bulk Distribution Matrix',
  },
  {
    id: 'import-leads',
    num: '06',
    title: 'Meta Ads CSV Import Wizard',
    role: 'Admin Operations',
    category: 'admin',
    layoutType: 'narrow',
    src: '/assets/images/revsync/lofi/Popup_Import_Leads.png',
    meta: 'Column Mapping Wizard',
  },
];

export default function RevSyncPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [lightboxSub, setLightboxSub] = useState('');
  const [lofiFilter, setLofiFilter] = useState<'all' | 'sales' | 'admin'>('all');

  const filteredBentoScreens = lofiFilter === 'all'
    ? BENTO_LOFI_SCREENS
    : BENTO_LOFI_SCREENS.filter(screen => screen.category === lofiFilter);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
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
      if (currY > 60) {
        if (currY > lastScrollY.current + 2) {
          // Scrolling Down -> Hide Back CTA
          cta.classList.add('cta-hidden');
        } else if (currY < lastScrollY.current - 2) {
          // Scrolling Up -> Show Back CTA
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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLightbox]);

  return (
    <>


    {/*  Floating Smart Hide/Show Back CTA  */}
    <a href="/" ref={backCtaRef} className="cs-back-cta revsync-back-cta" aria-label="Back to Homepage">
        <span className="cs-back-icon-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
        </span>
        <span className="cs-back-text">Back to Homepage</span>
    </a>

    <main className="cs-container">

        {/*  ================= 01. HOME HERO BANNER =================  */}
        <section id="home" className="cs-section cs-hero-section">
            <div className="cs-section-inner">
                <div className="revsync-figma-hero-card">
                    <div className="hero-banner-content">
                        <div className="hero-text-col">
                            <div className="cs-badge-row">
                                <span className="cs-tag-pill revsync-tag-pill">B2B SAAS • CRM ARCHITECTURE</span>
                                <span className="cs-tag-date" style={{ color: '#A1A1AA', fontSize: '11px', fontWeight: 600, letterSpacing: '1px' }}>CONCEPT STRATEGY • 18 FIELD INTERVIEWS</span>
                            </div>
                            <h1 className="cs-main-title revsync-main-title">Rev<span className="accent-lime">Sync</span></h1>
                            <h2 className="hero-tagline-title">Designing a role-scoped CRM for sales teams running on spreadsheets.</h2>
                            <p className="hero-body-desc">
                                RevSync replaces <strong>fragmented Excel-based lead tracking</strong> with a role-scoped CRM that gives <strong>sales reps, team leaders, and admins</strong> each the exact view of the pipeline they need - <strong>eliminating lead drops and data collision</strong>.
                            </p>
                        </div>

                        <div className="hero-visual-col">
                            <div className="revsync-hero-visual-frame" onClick={() => openLightbox('/assets/images/revsync/source/Hero_Image.png', 'REVSYNC • HERO', 'Sales CRM Control Center Dashboard')}>
                                <img loading="lazy" decoding="async" src="/assets/images/revsync/source/Hero_Image.png" alt="RevSync Web CRM Dashboard Mockup" className="cs-image" />
                            </div>
                        </div>
                    </div>

                    {/*  Metadata Row (Frame 1261157046: 4 Cards)  */}
                    <div className="figma-meta-cards-row">
                        <div className="figma-meta-card">
                            <span className="f-meta-label">ROLE</span>
                            <strong className="f-meta-val">Lead Product Designer</strong>
                        </div>
                        <div className="figma-meta-card">
                            <span className="f-meta-label">PROJECT TYPE</span>
                            <strong className="f-meta-val">B2B SaaS Concept</strong>
                        </div>
                        <div className="figma-meta-card">
                            <span className="f-meta-label">TIMELINE</span>
                            <strong className="f-meta-val">3 Weeks (Research to Spec)</strong>
                        </div>
                        <div className="figma-meta-card">
                            <span className="f-meta-label">RESEARCH BASE</span>
                            <strong className="f-meta-val">18 SME Interviews</strong>
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
                                Auditing fragmented Excel lead tracking across <strong>18 interviews</strong>: 1 admin, 4 team leaders, 12 reps, and 1 Meta ads operator. Three operational breakdowns drove the design architecture.
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
                            <span>4-step handoff - no reminders, no visibility</span>
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
                            <p className="p-metric-sub">No reminders. Reps type dates manually - leads slip.</p>
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
                        <p className="audience-sub-desc">Each role scoped over the same lead data - individual, team, org-wide.</p>
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
                                    <p className="sample-table">Rahul Kumar - Mumbai</p>
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
                                            <span className="rem-sub">Rahul Kumar - Retail Branch Banking</span>
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
                <div className="revsync-lofi-container">
                    {/* Header */}
                    <div className="lofi-header-block">
                        <div className="cs-badge-row margin-bottom-12">
                            <span className="lofi-tag-pill">LOW-FIDELITY WIREFRAMES</span>
                        </div>
                        <h2 className="lofi-main-title">Core Layouts &amp; <span className="accent-lime">Wireframes</span></h2>
                        <p className="lofi-sub-desc">Early structural blueprints establishing information hierarchy, layout density, and primary workflows before visual styling.</p>
                    </div>

                    {/* Filter Pills */}
                    <div className="revsync-lofi-filters">
                        <button 
                            type="button"
                            className={`revsync-filter-pill ${lofiFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setLofiFilter('all')}
                        >
                            All Screens ({BENTO_LOFI_SCREENS.length})
                        </button>
                        <button 
                            type="button"
                            className={`revsync-filter-pill ${lofiFilter === 'sales' ? 'active' : ''}`}
                            onClick={() => setLofiFilter('sales')}
                        >
                            💼 Sales Rep Flows ({BENTO_LOFI_SCREENS.filter(s => s.category === 'sales').length})
                        </button>
                        <button 
                            type="button"
                            className={`revsync-filter-pill ${lofiFilter === 'admin' ? 'active' : ''}`}
                            onClick={() => setLofiFilter('admin')}
                        >
                            🛡️ Admin Operations ({BENTO_LOFI_SCREENS.filter(s => s.category === 'admin').length})
                        </button>
                    </div>

                    {/* 2026 Trending Editorial Bento Grid */}
                    <div className="revsync-lofi-bento">
                        {filteredBentoScreens.map((screen) => {
                            const isWide = lofiFilter === 'all' ? screen.layoutType === 'wide' : false;
                            return (
                                <div 
                                    key={screen.id}
                                    role="button"
                                    tabIndex={0}
                                    className={`bento-wireframe-card ${isWide ? 'bento-card-wide' : 'bento-card-narrow'}`}
                                    onClick={() => openLightbox(screen.src, `${screen.num}. ${screen.title.toUpperCase()}`, `${screen.role} • ${screen.meta}`)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            openLightbox(screen.src, `${screen.num}. ${screen.title.toUpperCase()}`, `${screen.role} • ${screen.meta}`);
                                        }
                                    }}
                                    title="Tap to inspect full resolution"
                                >
                                    <div className="bento-card-header">
                                        <div className="bento-header-left">
                                            <span className="bento-num-pill">{screen.num}</span>
                                            <h4 className="bento-card-title">{screen.title}</h4>
                                        </div>
                                        <span className={`bento-role-badge ${screen.category === 'admin' ? 'admin' : ''}`}>
                                            {screen.role}
                                        </span>
                                    </div>
                                    <div className="bento-visual-canvas">
                                        <img 
                                            loading="lazy" 
                                            decoding="async" 
                                            src={screen.src} 
                                            alt={screen.title} 
                                            className="bento-wireframe-img" 
                                        />
                                        <span className="bento-zoom-hint">🔍 Expand</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
                        {/*  Card 01: Sales Dashboard  */}
                        <div className="sol-card-item">
                            <div className="sol-card-header">
                                <div className="sol-icon-box icon-lime-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CCF655" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                </div>
                                <div className="sol-title-group">
                                    <h4 className="sol-card-title">Sales Dashboard</h4>
                                    <span className="sol-role-tag">Sales Rep View</span>
                                </div>
                            </div>
                            <p className="sol-card-sub">Daily execution cockpit - prioritized follow-up queue, conversion metrics, and one-tap call actions.</p>
                            <div 
                                role="button"
                                tabIndex={0}
                                className="sol-img-frame" 
                                onClick={() => openLightbox('/assets/images/revsync/hifi_new/Sales_Dashboard_HiFi.png', 'SALES DASHBOARD • SALES REP VIEW', 'Daily execution cockpit - prioritized follow-up queue, conversion metrics, and one-tap call actions.')}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        openLightbox('/assets/images/revsync/hifi_new/Sales_Dashboard_HiFi.png', 'SALES DASHBOARD • SALES REP VIEW', 'Daily execution cockpit - prioritized follow-up queue, conversion metrics, and one-tap call actions.');
                                    }
                                }}
                                title="Click to view full resolution"
                            >
                                <div className="sol-green-border-wrapper">
                                    <img loading="lazy" decoding="async" src="/assets/images/revsync/hifi_new/Sales_Dashboard_HiFi.png" alt="Sales Dashboard Hi-Fi Interface" className="sol-img" />
                                </div>
                            </div>
                        </div>

                        {/*  Card 02: Leads Pipeline  */}
                        <div className="sol-card-item">
                            <div className="sol-card-header">
                                <div className="sol-icon-box icon-blue-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                                </div>
                                <div className="sol-title-group">
                                    <h4 className="sol-card-title">Leads Pipeline</h4>
                                    <span className="sol-role-tag">Sales Rep View</span>
                                </div>
                            </div>
                            <p className="sol-card-sub">High-density lead management matrix with zero-latency status filtering and direct communication logging.</p>
                            <div 
                                role="button"
                                tabIndex={0}
                                className="sol-img-frame" 
                                onClick={() => openLightbox('/assets/images/revsync/hifi_new/Sales_Leads_HiFi.png', 'LEADS PIPELINE • SALES REP VIEW', 'High-density lead management matrix with zero-latency status filtering and direct communication logging.')}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        openLightbox('/assets/images/revsync/hifi_new/Sales_Leads_HiFi.png', 'LEADS PIPELINE • SALES REP VIEW', 'High-density lead management matrix with zero-latency status filtering and direct communication logging.');
                                    }
                                }}
                                title="Click to view full resolution"
                            >
                                <div className="sol-green-border-wrapper">
                                    <img loading="lazy" decoding="async" src="/assets/images/revsync/hifi_new/Sales_Leads_HiFi.png" alt="Sales Leads Pipeline Hi-Fi Interface" className="sol-img" />
                                </div>
                            </div>
                        </div>

                        {/*  Card 03: Executive Dashboard  */}
                        <div className="sol-card-item">
                            <div className="sol-card-header">
                                <div className="sol-icon-box icon-orange-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                </div>
                                <div className="sol-title-group">
                                    <h4 className="sol-card-title">Executive Dashboard</h4>
                                    <span className="sol-role-tag">Admin View</span>
                                </div>
                            </div>
                            <p className="sol-card-sub">Org-wide KPI overview - real-time conversion rates, team workload distribution, and channel attribution.</p>
                            <div 
                                role="button"
                                tabIndex={0}
                                className="sol-img-frame" 
                                onClick={() => openLightbox('/assets/images/revsync/hifi_new/Admin_Dashboard_HiFi.png', 'EXECUTIVE DASHBOARD • ADMIN VIEW', 'Org-wide KPI overview - real-time conversion rates, team workload distribution, and channel attribution.')}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        openLightbox('/assets/images/revsync/hifi_new/Admin_Dashboard_HiFi.png', 'EXECUTIVE DASHBOARD • ADMIN VIEW', 'Org-wide KPI overview - real-time conversion rates, team workload distribution, and channel attribution.');
                                    }
                                }}
                                title="Click to view full resolution"
                            >
                                <div className="sol-green-border-wrapper">
                                    <img loading="lazy" decoding="async" src="/assets/images/revsync/hifi_new/Admin_Dashboard_HiFi.png" alt="Executive Dashboard Hi-Fi Interface" className="sol-img" />
                                </div>
                            </div>
                        </div>

                        {/*  Card 04: Leads Import Engine  */}
                        <div className="sol-card-item">
                            <div className="sol-card-header">
                                <div className="sol-icon-box icon-green-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                </div>
                                <div className="sol-title-group">
                                    <h4 className="sol-card-title">Leads Import Engine</h4>
                                    <span className="sol-role-tag">Admin &amp; Team Leader View</span>
                                </div>
                            </div>
                            <p className="sol-card-sub">3-step intelligent CSV mapper replacing a 4-step manual handoff chain with zero data loss.</p>
                            <div 
                                role="button"
                                tabIndex={0}
                                className="sol-img-frame" 
                                onClick={() => openLightbox('/assets/images/revsync/hifi_new/Admin_Leads_Import_HiFi.png', 'LEADS IMPORT ENGINE • ADMIN & TEAM LEADER VIEW', '3-step intelligent CSV mapper replacing a 4-step manual handoff chain with zero data loss.')}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        openLightbox('/assets/images/revsync/hifi_new/Admin_Leads_Import_HiFi.png', 'LEADS IMPORT ENGINE • ADMIN & TEAM LEADER VIEW', '3-step intelligent CSV mapper replacing a 4-step manual handoff chain with zero data loss.');
                                    }
                                }}
                                title="Click to view full resolution"
                            >
                                <div className="sol-green-border-wrapper">
                                    <img loading="lazy" decoding="async" src="/assets/images/revsync/hifi_new/Admin_Leads_Import_HiFi.png" alt="Leads Import Engine Hi-Fi Interface" className="sol-img" />
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
                        <p className="res-sub-desc">Client-reported outcomes from the team using the design direction. Grounded in direct interviews, not a formal usability study - that's the next step.</p>
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
                            <h4 className="ba-card-title text-red">Before - Excel Process</h4>
                            <ul className="ba-list list-red">
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Export from Meta ads → receive CSV file</li>
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Team leader manually splits rows across reps</li>
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Each rep opens their own spreadsheet</li>
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Follow-up dates typed manually - no reminders</li>
                                <li><span className="ba-icon icon-red"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Admin opens every file to check performance</li>
                            </ul>
                        </div>

                        {/*  After Card  */}
                        <div className="ba-card card-after">
                            <h4 className="ba-card-title text-lime">After - RevSync</h4>
                            <ul className="ba-list list-lime">
                                <li><span className="ba-icon icon-lime"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CCF655" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Import CSV → leads appear in shared database</li>
                                <li><span className="ba-icon icon-lime"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CCF655" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Team leader selects and assigns in one action</li>
                                <li><span className="ba-icon icon-lime"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CCF655" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Reps see only their leads - clean, scoped view</li>
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
                                <span className="f-text">Usability testing on real interface - next step</span>
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
                <h3 className="next-proj-title">ATTENDLY - Mobile Attendance &amp; Task App →</h3>
                <p className="next-proj-desc">1.2-second check-in system designed for fast-paced SMB operations.</p>
            </a>
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
