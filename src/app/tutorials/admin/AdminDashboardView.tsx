'use client';

import { useState } from 'react';
import LogoutButton from '../LogoutButton';
import {
  BookOpen,
  Bell,
  UserPlus,
  ClipboardList,
  Calendar,
  FileText,
  Trash2,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Users,
  GraduationCap,
} from 'lucide-react';

interface AdminDashboardViewProps {
  initialHomework: any[];
  initialNotices: any[];
  initialStudents: any[];
  initialAdmissions: any[];
  adminName: string;
}

export default function AdminDashboardView({
  initialHomework,
  initialNotices,
  initialStudents,
  initialAdmissions,
  adminName,
}: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'homework' | 'notices' | 'students' | 'admissions'>('homework');

  // Lists state
  const [homework, setHomework] = useState(initialHomework);
  const [notices, setNotices] = useState(initialNotices);
  const [students, setStudents] = useState(initialStudents);
  const [admissions, setAdmissions] = useState(initialAdmissions);

  // Forms state
  const [hwForm, setHwForm] = useState({
    class: '',
    subject: '',
    description: '',
    dueDate: '',
  });

  const [noticeForm, setNoticeForm] = useState({
    title: '',
    content: '',
  });

  const [studentForm, setStudentForm] = useState({
    name: '',
    class: '',
    email: '',
    password: '',
  });

  // Action feedback states
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const clearFeedback = () => {
    setSuccessMsg('');
    setErrorMsg('');
  };

  // Form Submit Handlers
  const handleHwSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();
    setSubmitting(true);

    try {
      const res = await fetch('/api/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          class: hwForm.class,
          subject: hwForm.subject,
          description: hwForm.description,
          due_date: hwForm.dueDate,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setHomework([data.data, ...homework]); // Add to top
        setSuccessMsg('Homework posted successfully!');
        setHwForm({ class: '', subject: '', description: '', dueDate: '' });
      } else {
        setErrorMsg(data.error || 'Failed to post homework');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to post homework.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();
    setSubmitting(true);

    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noticeForm.title,
          content: noticeForm.content,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotices([data.data, ...notices]);
        setSuccessMsg('Notice posted successfully!');
        setNoticeForm({ title: '', content: '' });
      } else {
        setErrorMsg(data.error || 'Failed to post notice');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to post notice.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();
    setSubmitting(true);

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentForm.name,
          class: studentForm.class,
          email: studentForm.email,
          password: studentForm.password,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStudents([data.data, ...students]);
        setSuccessMsg('Student account created successfully!');
        setStudentForm({ name: '', class: '', email: '', password: '' });
      } else {
        setErrorMsg(data.error || 'Failed to add student');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to add student.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Action Handlers
  const handleDeleteHw = async (id: number) => {
    if (!confirm('Are you sure you want to delete this homework?')) return;
    clearFeedback();

    try {
      const res = await fetch(`/api/homework?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setHomework(homework.filter((item) => item.id !== id));
        setSuccessMsg('Homework deleted successfully.');
      } else {
        setErrorMsg(data.error || 'Failed to delete homework');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to delete homework.');
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    clearFeedback();

    try {
      const res = await fetch(`/api/notices?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotices(notices.filter((item) => item.id !== id));
        setSuccessMsg('Notice deleted successfully.');
      } else {
        setErrorMsg(data.error || 'Failed to delete notice');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to delete notice.');
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this student account?')) return;
    clearFeedback();

    try {
      const res = await fetch(`/api/students?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setStudents(students.filter((item) => item.id !== id));
        setSuccessMsg('Student account deleted.');
      } else {
        setErrorMsg(data.error || 'Failed to delete student');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to delete student.');
    }
  };

  const handleDeleteAdmission = async (id: number) => {
    if (!confirm('Are you sure you want to archive/delete this admission request?')) return;
    clearFeedback();

    try {
      const res = await fetch(`/api/admissions?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdmissions(admissions.filter((item) => item.id !== id));
        setSuccessMsg('Admission request removed.');
      } else {
        setErrorMsg(data.error || 'Failed to remove admission record');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to remove admission record.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Admin Banner */}
      <section className="bg-primary text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold flex items-center">
              Admin Control Panel
            </h1>
            <p className="text-slate-300 text-sm font-semibold flex items-center mt-1">
              Logged in as: {adminName} &bull; Teacher Portal
            </p>
          </div>
          <LogoutButton />
        </div>
      </section>

      {/* Tabs & Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Alerts */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-4 flex items-center justify-between mb-8 shadow-sm">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
              <span className="text-sm font-medium">{successMsg}</span>
            </div>
            <button onClick={clearFeedback} className="text-emerald-600 font-bold hover:text-emerald-800 text-sm">✕</button>
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 rounded-xl p-4 flex items-center justify-between mb-8 shadow-sm">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
              <span className="text-sm font-medium">{errorMsg}</span>
            </div>
            <button onClick={clearFeedback} className="text-rose-600 font-bold hover:text-rose-800 text-sm">✕</button>
          </div>
        )}

        {/* Tab Selection Row */}
        <div className="flex border-b border-slate-200 justify-start space-x-2 md:space-x-6 mb-8 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('homework'); clearFeedback(); }}
            className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-heading font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === 'homework' ? 'border-accent text-accent' : 'border-transparent text-slate-500 hover:text-primary'
            }`}
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span>Homework Posts</span>
          </button>
          <button
            onClick={() => { setActiveTab('notices'); clearFeedback(); }}
            className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-heading font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === 'notices' ? 'border-accent text-accent' : 'border-transparent text-slate-500 hover:text-primary'
            }`}
          >
            <Bell className="h-4.5 w-4.5" />
            <span>Notice Board</span>
          </button>
          <button
            onClick={() => { setActiveTab('students'); clearFeedback(); }}
            className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-heading font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === 'students' ? 'border-accent text-accent' : 'border-transparent text-slate-500 hover:text-primary'
            }`}
          >
            <Users className="h-4.5 w-4.5" />
            <span>Student Accounts</span>
          </button>
          <button
            onClick={() => { setActiveTab('admissions'); clearFeedback(); }}
            className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-heading font-bold text-sm transition-all whitespace-nowrap relative ${
              activeTab === 'admissions' ? 'border-accent text-accent' : 'border-transparent text-slate-500 hover:text-primary'
            }`}
          >
            <ClipboardList className="h-4.5 w-4.5" />
            <span>Admissions Inbox</span>
            {admissions.length > 0 && (
              <span className="ml-1.5 bg-accent text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
                {admissions.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Layout Grids */}

        {/* 1. HOMEWORK PANEL */}
        {activeTab === 'homework' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-4 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold text-primary mb-6 flex items-center">
                <PlusCircle className="h-5 w-5 text-accent mr-2" />
                Post New Homework
              </h2>
              <form onSubmit={handleHwSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class *</label>
                  <select
                    required
                    value={hwForm.class}
                    onChange={(e) => setHwForm({ ...hwForm, class: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select Grade</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i} value={`${i + 3}th`}>Class {i + 3}th</option>
                    ))}
                    <option value="11 Arts">Class 11th (Arts)</option>
                    <option value="12 Arts">Class 12th (Arts)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject / Topic *</label>
                  <input
                    type="text"
                    required
                    value={hwForm.subject}
                    onChange={(e) => setHwForm({ ...hwForm, subject: e.target.value })}
                    placeholder="e.g. Mathematics - Algebra"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={hwForm.dueDate}
                    onChange={(e) => setHwForm({ ...hwForm, dueDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Homework Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={hwForm.description}
                    onChange={(e) => setHwForm({ ...hwForm, description: e.target.value })}
                    placeholder="Describe the homework questions or instructions..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-xl transition-colors shadow-md hover:shadow-orange-500/10"
                >
                  {submitting ? 'Posting...' : 'Post Homework'}
                </button>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-8 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold text-primary mb-6">Posted Homework Log</h2>
              {homework.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-12">No homework posted yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-slate-500">
                    <thead className="bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-b">Class</th>
                        <th className="px-4 py-3 border-b">Subject</th>
                        <th className="px-4 py-3 border-b">Due Date</th>
                        <th className="px-4 py-3 border-b">Content</th>
                        <th className="px-4 py-3 border-b text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {homework.map((hwItem) => (
                        <tr key={hwItem.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-bold text-slate-900">{hwItem.class}</td>
                          <td className="px-4 py-3 font-semibold text-accent">{hwItem.subject}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{hwItem.due_date}</td>
                          <td className="px-4 py-3 text-xs max-w-xs truncate">{hwItem.description}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleDeleteHw(hwItem.id)}
                              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-xl transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. NOTICES PANEL */}
        {activeTab === 'notices' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-4 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold text-primary mb-6 flex items-center">
                <PlusCircle className="h-5 w-5 text-accent mr-2" />
                Post Announcement
              </h2>
              <form onSubmit={handleNoticeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Notice Title *</label>
                  <input
                    type="text"
                    required
                    value={noticeForm.title}
                    onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                    placeholder="e.g. Monthly Test Timings"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Announcement Content *</label>
                  <textarea
                    required
                    rows={6}
                    value={noticeForm.content}
                    onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                    placeholder="Type details of the announcement..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-xl transition-colors shadow-md"
                >
                  {submitting ? 'Posting...' : 'Post Notice'}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-8 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold text-primary mb-6">Posted Notices Log</h2>
              {notices.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-12">No notices posted yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-slate-500">
                    <thead className="bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-b">Notice Title</th>
                        <th className="px-4 py-3 border-b">Content</th>
                        <th className="px-4 py-3 border-b">Posted Date</th>
                        <th className="px-4 py-3 border-b text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {notices.map((n) => (
                        <tr key={n.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-bold text-slate-900 max-w-xs truncate">{n.title}</td>
                          <td className="px-4 py-3 text-xs max-w-sm truncate">{n.content}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{new Date(n.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleDeleteNotice(n.id)}
                              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-xl transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. STUDENT ACCOUNTS */}
        {activeTab === 'students' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-4 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold text-primary mb-6 flex items-center">
                <UserPlus className="h-5 w-5 text-accent mr-2" />
                Register Student
              </h2>
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    placeholder="e.g. Amit Kushwah"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class *</label>
                  <select
                    required
                    value={studentForm.class}
                    onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select Grade</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i} value={`${i + 3}th`}>Class {i + 3}th</option>
                    ))}
                    <option value="11 Arts">Class 11th (Arts)</option>
                    <option value="12 Arts">Class 12th (Arts)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Username *</label>
                  <input
                    type="email"
                    required
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    placeholder="e.g. amit@impact.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Default Password *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.password}
                    onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    placeholder="Password for student login"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-xl transition-colors shadow-md"
                >
                  {submitting ? 'Registering...' : 'Create Account'}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-8 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold text-primary mb-6">Registered Students</h2>
              {students.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-12">No student records registered.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-slate-500">
                    <thead className="bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-b">Name</th>
                        <th className="px-4 py-3 border-b">Class</th>
                        <th className="px-4 py-3 border-b">Email (Username)</th>
                        <th className="px-4 py-3 border-b text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-bold text-slate-900">{student.name}</td>
                          <td className="px-4 py-3 text-slate-600 font-semibold">{student.class}</td>
                          <td className="px-4 py-3 text-slate-500">{student.email}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-xl transition-colors"
                              title="Delete Account"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. ADMISSIONS INBOX */}
        {activeTab === 'admissions' && (
          <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-8">
            <h2 className="font-heading text-lg font-bold text-primary mb-6">Online Admissions Inbox</h2>
            {admissions.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-12">No admission forms submitted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs text-slate-500 min-w-[800px]">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 border-b">Date</th>
                      <th className="px-4 py-3 border-b">Student Details</th>
                      <th className="px-4 py-3 border-b">Parents Info</th>
                      <th className="px-4 py-3 border-b">Class / DOB</th>
                      <th className="px-4 py-3 border-b">Contact Info</th>
                      <th className="px-4 py-3 border-b">Address</th>
                      <th className="px-4 py-3 border-b text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {admissions.map((ad) => (
                      <tr key={ad.id} className="hover:bg-slate-50/50 align-top">
                        <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{new Date(ad.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3 font-bold text-slate-900">
                          {ad.student_name}
                        </td>
                        <td className="px-4 py-3 text-[11px]">
                          <div>Father: <span className="font-bold">{ad.father_name}</span></div>
                          <div>Mother: <span className="font-bold">{ad.mother_name}</span></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-accent">{ad.class}</div>
                          <div className="text-[10px] text-slate-400">DOB: {ad.dob}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div>Mob: <a href={`tel:${ad.mobile}`} className="font-bold text-primary underline">{ad.mobile}</a></div>
                          {ad.email && <div className="text-[10px] text-slate-400">Email: {ad.email}</div>}
                        </td>
                        <td className="px-4 py-3 text-[11px] max-w-xs">{ad.address}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteAdmission(ad.id)}
                            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-xl transition-colors"
                            title="Remove Application"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
