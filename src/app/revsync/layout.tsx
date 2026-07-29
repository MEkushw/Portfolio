import '@/styles/case-study.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RevSync Case Study — OMK. Product Designer',
  description: 'RevSync: A Sales CRM for Excel-Dependent Teams. B2B lead management platform case study by Om Kushwaha.',
};

export default function RevSyncLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
