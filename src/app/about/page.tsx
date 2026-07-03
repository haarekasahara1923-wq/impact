import Link from 'next/link';
import { Target, Eye, Compass, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const faculty = [
    {
      name: 'Manvendra Singh',
      role: 'Director & Senior Mentor',
      subject: 'Mathematics & Science (Class 9-10)',
      experience: '12+ Years Experience',
      initials: 'MS',
      color: 'bg-blue-600 text-white',
    },
    {
      name: 'Sumit Singh Tomar',
      role: 'Senior Faculty',
      subject: 'Class 11th and 12th',
      experience: 'Expert Mentor',
      initials: 'ST',
      color: 'bg-orange-600 text-white',
    },
  ];

  const differentiators = [
    {
      title: 'Conceptual Clarity First',
      description: 'We believe in building foundation blocks rather than rote learning. Our lectures focus on the "why" behind concepts.',
      icon: Compass,
      bgColor: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Strict Quality Control',
      description: 'Small batch sizes mean we observe every student. Monthly feedback reports are shared transparently with parents.',
      icon: ShieldCheck,
      bgColor: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Empathy-Led Mentoring',
      description: 'Every student learns at their own pace. We provide extra support classes for students who need additional time to grasp concepts.',
      icon: Heart,
      bgColor: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-primary text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4">
            About Impact Institute
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Dedicated to providing quality education, sharpening minds, and instilling absolute academic confidence in the youth of Gwalior.
          </p>
        </div>
      </section>

      {/* Our Story & Mission/Vision */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            {/* Left side: Our Story */}
            <div className="lg:col-span-7">
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                Our Story: A Decade of Shaping Minds
              </h2>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Founded over 10 years ago in Gwalior, MP, India, **Impact Institute** began with a simple yet powerful vision: to bridge the gap between classroom teaching and individual student comprehension. We recognized that in standard classroom formats, students often hesitate to ask questions, leaving gaps in their core understanding.
                </p>
                <p>
                  Starting with a handful of students, we grew steadily based on word-of-mouth recommendations from satisfied parents and high-achieving alumni. Today, we stand as a trusted name in Gwalior, offering comprehensive coaching for **Classes 3rd to 10th (All Subjects)** and specialized coaching for **Class 11th & 12th (Arts Stream)**.
                </p>
                <p>
                  Our classes are designed to be dynamic and engaging. We incorporate regular mock testing, comprehensive analytics, and direct parental communication to make sure that learning is a shared journey. We are proud of our legacy and excited to welcome the next generation of academic leaders.
                </p>
              </div>
            </div>

            {/* Right side: Mission & Vision Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Mission Card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary">Our Mission</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To provide structured, high-quality, and affordable academic mentoring that empowers students, builds analytical foundations, and helps them score to their maximum potential.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary">Our Vision</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To become Gwalior&apos;s most reliable coaching institute, recognized for nurturing student interest in learning, boosting conceptual retention, and producing excellent academic results.
                </p>
              </div>
            </div>
          </div>

          {/* Differentiators ("Why We're Different") */}
          <div className="border-t border-slate-100 pt-20 mb-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-accent text-sm font-extrabold tracking-widest uppercase mb-3">
                Our Core Pillars
              </h2>
              <p className="font-heading text-3xl font-bold text-primary">
                What Makes Impact Institute Stand Out?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {differentiators.map((diff, index) => {
                const IconComponent = diff.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                  >
                    <div className={`p-4 rounded-full mb-6 ${diff.bgColor}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary mb-3">
                      {diff.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Faculty Section */}
          <div className="border-t border-slate-100 pt-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-accent text-sm font-extrabold tracking-widest uppercase mb-3">
                Our Faculty
              </h2>
              <p className="font-heading text-3xl font-bold text-primary">
                Meet Our Expert Instructors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {faculty.map((f, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 flex flex-col items-center p-8 text-center"
                >
                  {/* Photo Placeholder with styled initials */}
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center font-heading text-3xl font-extrabold shadow-inner mb-6 ${f.color}`}
                  >
                    {f.initials}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-1">
                    {f.name}
                  </h3>
                  <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-2">
                    {f.role}
                  </p>
                  <p className="text-slate-600 text-sm font-medium mb-1">
                    {f.subject}
                  </p>
                  <span className="inline-flex items-center text-slate-400 text-xs mt-3">
                    <Award className="h-4 w-4 text-orange-500 mr-1.5" />
                    {f.experience}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action strip linking to Admission page */}
      <section className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-left mb-6 md:mb-0">
            <h3 className="font-heading text-2xl font-bold text-primary mb-2">
              Embark on Your Academic Journey Today
            </h3>
            <p className="text-slate-500 text-sm">
              Register online or download our admission guidelines to get started.
            </p>
          </div>
          <Link
            href="/admission"
            className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-orange-500/20 transition-all duration-200 group shrink-0"
          >
            Go to Admission Panel
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
