import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Calendar,
  CheckCircle,
  FileText,
  UserCheck,
  Star,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  const stats = [
    { value: '500+', label: 'Students Guided' },
    { value: 'Class 3–12', label: 'Grades Covered' },
    { value: '10+ Years', label: 'Teaching Experience' },
    { value: '95%', label: 'Success Rate' },
  ];

  const whyChooseUs = [
    {
      title: 'Expert Faculty',
      description: 'Learn from highly qualified educators who specialize in simplified conceptual teaching.',
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Regular Tests',
      description: 'Weekly test series and performance tracking to build confidence and exam readiness.',
      icon: FileText,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      title: 'Personal Attention',
      description: 'Small batch sizes ensuring tailored guidance and dedicated doubt-solving sessions.',
      icon: UserCheck,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Affordable Fees',
      description: 'High-quality education accessible to all with reasonable monthly fee structures.',
      icon: Award,
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  const classesOffered = [
    {
      title: 'Class 3rd to 10th',
      subtitle: 'Foundation Classes',
      description: 'Comprehensive coverage of All Subjects (Science, Maths, SST, English, Hindi) with special focus on analytical skills, logic, and regular evaluation.',
      subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi/Sanskrit'],
      badge: 'All Subjects',
    },
    {
      title: 'Class 11th & 12th',
      subtitle: 'Arts Stream Specialty',
      description: 'In-depth and exam-focused mentorship for Arts Stream subjects, paving the way for academic success and competitive exam preparation.',
      subjects: ['History', 'Geography', 'Political Science', 'Economics', 'English'],
      badge: 'Arts Stream',
    },
  ];

  const testimonials = [
    {
      name: 'Ankit Gurjar',
      grade: 'Class 10 (91.40%)',
      text: 'Impact Institute changed the way I look at Maths and Science. The teachers explain everything from basics, and the weekly test series helped me manage my time perfectly during board exams.',
      rating: 5,
    },
    {
      name: 'Shivam Gurjar',
      grade: 'Class 10 (89.40%)',
      text: 'Finding a coaching class specifically for Arts in Morar was difficult until I joined Impact. The study material for Geography and Political Science is top-notch, and the faculty is very supportive.',
      rating: 5,
    },
    {
      name: 'Ronak Bhadoriya',
      grade: 'Class 10 (88.80%)',
      text: 'The small batch sizes meant that the teacher answered all my doubts immediately. My grades improved significantly within just six months of joining.',
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION WITH DIAGONAL SPLIT */}
      <section className="relative bg-white pt-10 pb-20 lg:pt-16 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Blue banner (using Tailwind color matching brand #1E3A8A) */}
            <div className="lg:col-span-7 bg-primary text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden group">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-accent text-white uppercase tracking-wider mb-6 animate-pulse">
                  Admissions Open 2026-27
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                  Shape Your Future with <span className="text-accent">Impact Institute</span>
                </h1>
                <p className="text-lg text-slate-200 mb-8 leading-relaxed max-w-xl">
                  Gwalior&apos;s leading coaching hub providing top-tier academic mentorship for Classes 3–12. Build strong concepts, excel in board exams, and construct a path to success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/admission"
                    className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    View Courses
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side: White/Light with Premium Custom Illustration */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Gradient blobs in background */}
              <div className="absolute -top-12 -left-12 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-60" />

              {/* Custom SVG Learning Illustration */}
              <svg
                viewBox="0 0 500 500"
                className="w-full max-w-[420px] h-auto drop-shadow-2xl relative z-10 transition-transform duration-500 hover:scale-102"
                aria-label="Student Learning Illustration"
              >
                {/* Background circles */}
                <circle cx="250" cy="250" r="220" fill="#f8fafc" />
                <circle cx="250" cy="250" r="180" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8 8" />

                {/* Orange accent elements */}
                <path d="M 400 120 L 420 140 M 420 120 L 400 140" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="160" r="8" fill="#f97316" />
                <circle cx="380" cy="380" r="15" fill="#f97316" opacity="0.15" />

                {/* Desk Base */}
                <rect x="100" y="380" width="300" height="12" rx="6" fill="#1e3a8a" />
                <path d="M 150 392 L 130 440 M 350 392 L 370 440" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" />

                {/* Large Stacked Books */}
                <rect x="130" y="330" width="110" height="24" rx="4" fill="#f97316" />
                <rect x="135" y="354" width="100" height="26" rx="4" fill="#3b82f6" />
                <path d="M 230 330 L 230 354 M 225 354 L 225 380" stroke="#ffffff" strokeWidth="2" />

                {/* Laptop / Screen */}
                <rect x="250" y="270" width="110" height="75" rx="6" fill="#334155" />
                <rect x="258" y="278" width="94" height="58" rx="2" fill="#0f172a" />
                <rect x="235" y="345" width="140" height="8" rx="4" fill="#64748b" />
                {/* Code snippets / charts on screen */}
                <line x1="268" y1="288" x2="310" y2="288" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                <line x1="268" y1="298" x2="290" y2="298" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                <line x1="268" y1="308" x2="330" y2="308" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />

                {/* Glowing bulb of Ideas */}
                <path d="M 250 80 C 230 80, 220 95, 220 110 C 220 125, 235 135, 240 145 L 260 145 C 265 135, 280 125, 280 110 C 280 95, 270 80, 250 80 Z" fill="#fef08a" />
                <rect x="242" y="145" width="16" height="8" rx="2" fill="#94a3b8" />
                <line x1="250" y1="50" x2="250" y2="65" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                <line x1="205" y1="85" x2="218" y2="93" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                <line x1="295" y1="85" x2="282" y2="93" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />

                {/* Floating Graduation Cap */}
                <path d="M 180 140 L 220 120 L 260 140 L 220 160 Z" fill="#1e3a8a" />
                <rect x="205" y="150" width="30" height="15" fill="#0f172a" />
                <path d="M 235 140 L 245 180 L 240 182" fill="none" stroke="#f97316" strokeWidth="2" />
                <circle cx="240" cy="183" r="3" fill="#f97316" />

                {/* Plant on Desk */}
                <path d="M 370 340 A 10 10 0 0 0 390 340 Z" fill="#b91c1c" />
                <rect x="375" y="340" width="10" height="40" fill="#dc2626" />
                <path d="M 380 340 C 370 320, 365 300, 375 290 C 385 300, 380 320, 380 340 Z" fill="#10b981" />
                <path d="M 380 330 C 390 315, 395 305, 390 295 C 380 305, 382 320, 380 330 Z" fill="#059669" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-slate-50 border-y border-slate-100 py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-heading text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-accent text-sm font-extrabold tracking-widest uppercase mb-3">
              Why Impact Institute
            </h2>
            <p className="font-heading text-3xl sm:text-4xl font-bold text-primary">
              Empowering Students through Quality Education and Individual Mentorship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${item.color}`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CLASSES OFFERED SECTION */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-accent text-sm font-extrabold tracking-widest uppercase mb-3">
              Programs Offered
            </h2>
            <p className="font-heading text-3xl sm:text-4xl font-bold text-primary">
              Academic Curriculums Tailored for Excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {classesOffered.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-slate-100 overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                <div className="p-8 sm:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-orange-100 text-accent text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {course.badge}
                    </span>
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    {course.subtitle}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {course.description}
                  </p>

                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                    Subjects Covered:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-slate-50 text-slate-600 border border-slate-100 text-xs px-3 py-1.5 rounded-lg flex items-center"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-accent mr-1.5 shrink-0" />
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Registration Ongoing
                  </span>
                  <Link
                    href="/admission"
                    className="inline-flex items-center text-sm font-bold text-accent hover:text-accent-dark transition-colors group"
                  >
                    Enroll Now
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-accent text-sm font-extrabold tracking-widest uppercase mb-3">
              Student Stories
            </h2>
            <p className="font-heading text-3xl sm:text-4xl font-bold text-primary">
              What Our Achievers Say About Us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between relative"
              >
                {/* Quote symbol */}
                <span className="absolute top-4 right-6 text-7xl font-serif text-slate-200 pointer-events-none select-none">
                  &ldquo;
                </span>

                <div className="relative z-10">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(t.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="border-t border-slate-200/50 pt-4 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-primary">
                      {t.name}
                    </h4>
                    <p className="text-slate-400 text-xs font-semibold">
                      {t.grade}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION STRIP */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Take Your Grades to the Next Level?
          </h2>
          <p className="text-slate-200 mb-8 max-w-xl mx-auto">
            Admissions are open for the current academic session. Book a free counselling call or register online today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/admission"
              className="bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-200"
            >
              Online Registration
            </Link>
            <a
              href="tel:9425150096"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
            >
              Call 9425150096
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
