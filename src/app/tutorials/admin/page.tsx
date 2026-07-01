import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import LoginForm from '../LoginForm';
import AdminDashboardView from './AdminDashboardView';
import { AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = (await getSession()) as any;

  // If admin is not logged in
  if (!session || session.role !== 'admin') {
    return (
      <div className="bg-slate-50 min-h-screen py-20 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <LoginForm isAdmin={true} />
        </div>
      </div>
    );
  }

  // Load all initial lists from the database for the admin dashboard
  let homeworkList: any[] = [];
  let noticesList: any[] = [];
  let studentsList: any[] = [];
  let admissionsList: any[] = [];
  let dbError = false;
  let dbErrorMessage = '';

  try {
    homeworkList = await sql('SELECT * FROM homework ORDER BY id DESC');
    noticesList = await sql('SELECT * FROM notices ORDER BY id DESC');
    studentsList = await sql('SELECT * FROM students ORDER BY id DESC');
    admissionsList = await sql('SELECT * FROM admissions ORDER BY id DESC');
  } catch (error: any) {
    console.error('Error fetching admin dashboard data:', error);
    dbError = true;
    dbErrorMessage = error.message || 'Database error';
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {dbError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-rose-800 text-base">
                Database Error
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Could not connect to Neon PostgreSQL. Please make sure the `DATABASE_URL` environment variable is configured correctly.
              </p>
              <p className="text-slate-500 text-xs mt-3 italic">
                Details: {dbErrorMessage}
              </p>
              <div className="mt-4">
                <a
                  href="/api/init-db"
                  target="_blank"
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors inline-block"
                >
                  Click to Setup Tables & Seed Data
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Admin Dashboard View */}
      <AdminDashboardView
        initialHomework={homeworkList}
        initialNotices={noticesList}
        initialStudents={studentsList}
        initialAdmissions={admissionsList}
        adminName={session.name}
      />
    </div>
  );
}
