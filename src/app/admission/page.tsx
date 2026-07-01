'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Users,
  Calendar,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  FileText,
  HelpCircle,
} from 'lucide-react';

export default function AdmissionPage() {
  const [activeTab, setActiveTab] = useState<'register' | 'fees' | 'instructions'>('register');

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    classApplying: '',
    subject: '',
    mobile: '',
    email: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-fill subject based on class
  useEffect(() => {
    const cls = formData.classApplying;
    if (!cls) {
      setFormData((prev) => ({ ...prev, subject: '' }));
      return;
    }

    if (cls === '11 Arts' || cls === '12 Arts') {
      setFormData((prev) => ({
        ...prev,
        subject: 'Arts Stream (History, Geography, Political Science, Economics, English)',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        subject: 'All Subjects (Maths, Science, English, SST, Hindi)',
      }));
    }
  }, [formData.classApplying]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_name: formData.studentName,
          father_name: formData.fatherName,
          mother_name: formData.motherName,
          dob: formData.dob,
          class: formData.classApplying,
          mobile: formData.mobile,
          email: formData.email,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          studentName: '',
          fatherName: '',
          motherName: '',
          dob: '',
          classApplying: '',
          subject: '',
          mobile: '',
          email: '',
          address: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-primary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4">
            Admissions & Enrollments
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Take the first step towards academic success. Apply online, review fee structures, and read our registration guidelines.
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 justify-center space-x-2 md:space-x-8 mb-10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('register')}
            className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-heading font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'register'
                ? 'border-accent text-accent'
                : 'border-transparent text-slate-500 hover:text-primary hover:border-slate-300'
            }`}
          >
            <ClipboardList className="h-5 w-5" />
            <span>Registration Form</span>
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-heading font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'fees'
                ? 'border-accent text-accent'
                : 'border-transparent text-slate-500 hover:text-primary hover:border-slate-300'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Fee Structure</span>
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-heading font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'instructions'
                ? 'border-accent text-accent'
                : 'border-transparent text-slate-500 hover:text-primary hover:border-slate-300'
            }`}
          >
            <HelpCircle className="h-5 w-5" />
            <span>Important Instructions</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-10">
          {/* TAB 1: REGISTRATION FORM */}
          {activeTab === 'register' && (
            <div>
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                  Online Admission Request
                </h2>
                <p className="text-slate-500 text-sm">
                  Fill in the student detail form below. Once submitted, our admission desk will review and contact you.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                    Thank you for applying to Impact Institute. We have received your registration details. Our admin team will contact you shortly on the provided mobile number.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start space-x-3 mb-6">
                  <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  <div className="text-slate-700 text-sm">
                    <span className="font-bold text-rose-800">Error:</span> {errorMessage}
                  </div>
                </div>
              )}

              {submitStatus !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Student Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Student Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* DOB */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Date Of Birth *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all text-slate-600"
                        />
                      </div>
                    </div>

                    {/* Father Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Father&apos;s Name *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Mr. Anil Sharma"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Mother Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Mother&apos;s Name *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Mrs. Sunita Sharma"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Class Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Class Applying For *
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <select
                          name="classApplying"
                          value={formData.classApplying}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all text-slate-600 appearance-none"
                        >
                          <option value="">Select Grade</option>
                          {[...Array(8)].map((_, i) => (
                            <option key={i} value={`${i + 3}th`}>
                              Class {i + 3}th
                            </option>
                          ))}
                          <option value="11 Arts">Class 11th (Arts Stream)</option>
                          <option value="12 Arts">Class 12th (Arts Stream)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Auto-filled Subject Description */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Subjects (Auto-Filled)
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          readOnly
                          className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-500 focus:outline-none cursor-not-allowed"
                          placeholder="Select class to view subjects"
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                          placeholder="e.g. 9425150096"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. student@gmail.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Residential Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="e.g. Gayatri Vihar Colony, Pinto Park, Morar, Gwalior"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-accent hover:bg-accent-dark text-white font-bold px-10 py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 shrink-0"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: FEE STRUCTURE */}
          {activeTab === 'fees' && (
            <div>
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                  Fee Structure (Session 2026-27)
                </h2>
                <p className="text-slate-500 text-sm">
                  We believe in keeping high-quality academic tutoring affordable. Below is our standard fee chart.
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-inner mb-6">
                <table className="w-full border-collapse text-left text-sm text-slate-500">
                  <thead className="bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th scope="col" className="px-6 py-4 border-b border-slate-100">
                        Class Category
                      </th>
                      <th scope="col" className="px-6 py-4 border-b border-slate-100">
                        Monthly Tuition Fee
                      </th>
                      <th scope="col" className="px-6 py-4 border-b border-slate-100">
                        One-Time Admission Fee
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr className="hover:bg-slate-50/55 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 border-b border-slate-100">
                        3rd – 5th
                      </td>
                      <td className="px-6 py-4 text-slate-900 border-b border-slate-100 font-semibold">
                        ₹500 / month
                      </td>
                      <td className="px-6 py-4 text-slate-600 border-b border-slate-100">
                        ₹200
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/55 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 border-b border-slate-100">
                        6th – 8th
                      </td>
                      <td className="px-6 py-4 text-slate-900 border-b border-slate-100 font-semibold">
                        ₹700 / month
                      </td>
                      <td className="px-6 py-4 text-slate-600 border-b border-slate-100">
                        ₹200
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/55 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 border-b border-slate-100">
                        9th – 10th
                      </td>
                      <td className="px-6 py-4 text-slate-900 border-b border-slate-100 font-semibold">
                        ₹900 / month
                      </td>
                      <td className="px-6 py-4 text-slate-600 border-b border-slate-100">
                        ₹300
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/55 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 border-b border-slate-100">
                        11th – 12th (Arts Stream)
                      </td>
                      <td className="px-6 py-4 text-slate-900 border-b border-slate-100 font-semibold">
                        ₹1000 / month
                      </td>
                      <td className="px-6 py-4 text-slate-600 border-b border-slate-100">
                        ₹300
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <p className="text-slate-700 text-xs leading-relaxed font-semibold">
                  Note: Fees are subject to change. Please contact the institute directly or visit the office to discuss any concession, sibling discount policies, or customized modes of payment.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: IMPORTANT INSTRUCTIONS */}
          {activeTab === 'instructions' && (
            <div>
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                  Admission Instructions & Guidelines
                </h2>
                <p className="text-slate-500 text-sm">
                  Please read the following instructions carefully before finalizing the enrollment.
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-accent pl-4 py-1">
                  <h3 className="font-heading font-bold text-primary text-base mb-1">
                    Documents Required at the Time of Admission
                  </h3>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 mt-2">
                    <li>Photocopy of student&apos;s Aadhaar Card (ID Proof)</li>
                    <li>Photocopy of last class final mark sheet / report card</li>
                    <li>2 recent passport-size colored photographs of the student</li>
                    <li>Parents/Guardian identity card copy (Aadhaar or Voter Card)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-4 py-1">
                  <h3 className="font-heading font-bold text-primary text-base mb-1">
                    General Rules & Discipline
                  </h3>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 mt-2">
                    <li>Students must arrive at the institute at least 5 minutes before their batch starts.</li>
                    <li>In case of absence, prior written notice or phone call from the parent is mandatory.</li>
                    <li>Weekly tests are compulsory. Performance records are directly shared with parents via SMS/Call.</li>
                    <li>Monthly fee must be paid on or before the 10th of every calendar month.</li>
                    <li>Mobile phones are strictly prohibited during the lecture timings unless requested by the teacher for learning.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-emerald-500 pl-4 py-1">
                  <h3 className="font-heading font-bold text-primary text-base mb-1">
                    Demo Classes
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    We offer **2 Free Trial/Demo Classes** for all subjects. Students are encouraged to attend demo lectures to get comfortable with the faculty, environment, and teaching pace before completing official registration.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
