import '@/styles/case-study.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attendly Case Study — OMK. Product Designer',
  description: 'Attendly: Attendance & Task Management App for Small Teams. Mobile HR tech case study by Om Kushwaha.',
};

export default function AttendlyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
