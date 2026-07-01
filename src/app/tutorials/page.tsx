import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import { BookOpen, FileText, Calendar, Bell, User, GraduationCap, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function TutorialsPage() {
  const session = (await getSession()) as any;

  // If student is not logged in
  if (!session || session.role !== 'student') {
    return (
      <div className="bg-slate-50 min-h-screen py-20 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <LoginForm />
        </div>
      </div>
    );
  }

  // If student is logged in, fetch their specific homework and general notices
  let homeworkList: any[] = [];
  let noticesList: any[] = [];
  let dbError = false;
  let dbErrorMessage = '';

  try {
    // Fetch homework matching the student's exact class
    homeworkList = await sql(
      'SELECT * FROM homework WHERE class = $1 ORDER BY id DESC',
      [session.class]
    );

    // Fetch all announcements/notices
    noticesList = await sql('SELECT * FROM notices ORDER BY id DESC');
  } catch (error: any) {
    console.error('Error loading student dashboard data:', error);
    dbError = true;
    dbErrorMessage = error.message || 'Database error';
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Dashboard Top Banner */}
      <section className="bg-primary text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-accent/25 rounded-2xl flex items-center justify-center text-accent">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold flex items-center">
                Welcome back, {session.name}!
              </h1>
              <p className="text-slate-300 text-sm font-semibold flex items-center mt-1">
                <GraduationCap className="h-4.5 w-4.5 text-accent mr-1.5 shrink-0" />
                Student Portal &bull; Grade: {session.class}
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {dbError && (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 mb-8 flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-rose-800 text-base">
                Database Connection Error
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
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Homework Section (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-xl font-bold text-primary">
                Assigned Homework
              </h2>
              <span className="bg-primary/10 text-primary text-xs font-extrabold px-2.5 py-1 rounded-full">
                {homeworkList.length}
              </span>
            </div>

            {homeworkList.length === 0 ? (
              <div className="bg-white border border-slate-200/60 rounded-3xl p-10 text-center shadow-sm">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-primary mb-1">
                  No Homework Posted
                </h3>
                <p className="text-slate-400 text-sm">
                  Great job! There are no active homework assignments for your class.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {homeworkList.map((hw) => (
                  <div
                    key={hw.id}
                    className="bg-white rounded-3xl border border-slate-100 hover:border-slate-200 shadow-md hover:shadow-lg transition-all p-6 sm:p-8"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="bg-orange-100 text-accent text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {hw.subject}
                      </span>
                      <div className="flex items-center text-xs font-bold text-rose-500 uppercase tracking-wider">
                        <Calendar className="h-4.5 w-4.5 mr-1 shrink-0" />
                        Due Date: {hw.due_date}
                      </div>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-primary mb-3">
                      Homework Task
                    </h3>
                    <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
                      {hw.description}
                    </p>

                    <div className="border-t border-slate-100 pt-4 mt-6 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      Posted on: {new Date(hw.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notices Section (Right 1 Column) */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-4">
              <Bell className="h-6 w-6 text-accent" />
              <h2 className="font-heading text-xl font-bold text-primary">
                Important Notices
              </h2>
              <span className="bg-orange-100 text-accent text-xs font-extrabold px-2.5 py-1 rounded-full">
                {noticesList.length}
              </span>
            </div>

            {noticesList.length === 0 ? (
              <div className="bg-white border border-slate-200/60 rounded-3xl p-10 text-center shadow-sm">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-primary mb-1">
                  No Active Notices
                </h3>
                <p className="text-slate-400 text-sm">
                  There are no recent notices or announcements posted.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {noticesList.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-white rounded-3xl border-l-4 border-l-accent border border-slate-100 shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-heading text-base font-bold text-primary mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {notice.content}
                    </p>
                    <div className="flex items-center text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      <Calendar className="h-3.5 w-3.5 mr-1 shrink-0" />
                      {new Date(notice.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
