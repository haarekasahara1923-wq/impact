import { Camera, Award, Star, Trophy } from 'lucide-react';

export default function MediaPage() {
  // 9 Achievement placeholders
  const galleryItems = [
    { title: 'Annual Result Celebration 2025', desc: 'Toppers receiving excellence awards' },
    { title: 'Science Exhibition Prep', desc: 'Students collaborating on physics projects' },
    { title: 'Weekly Test Top Performers', desc: 'Rewarding consistency in evaluation' },
    { title: 'Maths Olympiad Preparation', desc: 'Special batch solving advance equations' },
    { title: 'Interactive Group Discussions', desc: 'Humanities batch in political science debates' },
    { title: 'Parent-Teacher Meet Oct 2025', desc: 'Discussing performance metrics & reviews' },
    { title: 'Republic Day Celebration', desc: 'Speech and flag hoisting at the center' },
    { title: 'Board Exam Guidance Seminar', desc: 'Strategic session for Class 10 & 12 board preparations' },
    { title: 'Summer Foundation Workshop', desc: 'Class 3-8 mental mathematics exercises' },
  ];

  // Board toppers dummy data
  const toppers = [
    {
      name: 'Ankit Gurjar',
      class: 'Class 10th',
      score: '91.40%',
      rank: 'Rank 1',
      color: 'border-yellow-400 text-yellow-600 bg-yellow-50',
      award: '1st Position',
      initials: 'AG',
    },
    {
      name: 'Shivam Gurjar',
      class: 'Class 10th',
      score: '89.40%',
      rank: 'Rank 2',
      color: 'border-slate-300 text-slate-500 bg-slate-50',
      award: '2nd Position',
      initials: 'SG',
    },
    {
      name: 'Ronak Bhadoriya',
      class: 'Class 10th',
      score: '88.80%',
      rank: 'Rank 3',
      color: 'border-amber-600 text-amber-700 bg-amber-50',
      award: '3rd Position',
      initials: 'RB',
    },
    {
      name: 'Shivani Tomar',
      class: 'Class 10th',
      score: '88.60%',
      rank: 'Rank 4',
      color: 'border-blue-200 text-blue-600 bg-blue-50',
      award: '4th Position',
      initials: 'ST',
    },
    {
      name: 'Veeresh Rajak',
      class: 'Class 10th',
      score: '83.60%',
      rank: 'Rank 5',
      color: 'border-blue-200 text-blue-600 bg-blue-50',
      award: '5th Position',
      initials: 'VR',
    },
    {
      name: 'Ashu Girvasiya',
      class: 'Class 10th',
      score: '82.60%',
      rank: 'Rank 6',
      color: 'border-blue-200 text-blue-600 bg-blue-50',
      award: '6th Position',
      initials: 'AG',
    },
    {
      name: 'Krishna Ojha',
      class: 'Class 10th',
      score: '79.40%',
      rank: 'Rank 7',
      color: 'border-blue-200 text-blue-600 bg-blue-50',
      award: '7th Position',
      initials: 'KO',
    },
    {
      name: 'Avadhkishor',
      class: 'Class 10th',
      score: '78.20%',
      rank: 'Rank 8',
      color: 'border-blue-200 text-blue-600 bg-blue-50',
      award: '8th Position',
      initials: 'AK',
    },
    {
      name: 'Raj Bhadoriya',
      class: 'Class 10th',
      score: '76.40%',
      rank: 'Rank 9',
      color: 'border-blue-200 text-blue-600 bg-blue-50',
      award: '9th Position',
      initials: 'RB',
    },
    {
      name: 'Amit Shrivas',
      class: 'Class 10th',
      score: '74.00%',
      rank: 'Rank 10',
      color: 'border-blue-200 text-blue-600 bg-blue-50',
      award: '10th Position',
      initials: 'AS',
    },
    {
      name: 'Krishna Kushwaha',
      class: 'Class 10th',
      score: '70.40%',
      rank: 'Rank 11',
      color: 'border-blue-200 text-blue-600 bg-blue-50',
      award: '11th Position',
      initials: 'KK',
    },
    {
      name: 'Upasana Baghel',
      class: 'Class 12th',
      score: '79.60%',
      rank: 'Rank 12',
      color: 'border-pink-200 text-pink-600 bg-pink-50',
      award: '12th Position',
      initials: 'UB',
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-primary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4">
            Institute Media Gallery
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            A visual glimpse into student achievements, exam celebrations, classroom discussions, and academic activities.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Results / Toppers Section */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-accent text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3">
              <Trophy className="h-4.5 w-4.5" />
              <span>Wall Of Fame</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-primary">
              Our Board Exam Stars (Session 2025-26)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {toppers.map((t, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl border-2 shadow-lg overflow-hidden flex flex-col items-center p-8 text-center relative transition-transform duration-300 hover:-translate-y-1.5 ${t.color}`}
              >
                {/* Medal Icon Badge */}
                <div className="absolute top-4 right-4 flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-current" />
                </div>

                {/* Avatar Placeholder */}
                <div className="w-20 h-20 rounded-full bg-primary text-white font-heading text-2xl font-bold flex items-center justify-center shadow-md mb-6">
                  {t.initials}
                </div>

                <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-slate-100 mb-3 shadow-sm">
                  {t.award}
                </span>

                <h3 className="font-heading text-xl font-bold text-primary mb-1">
                  {t.name}
                </h3>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
                  {t.class}
                </p>
                <div className="text-accent text-3xl font-black mb-1">
                  {t.score}
                </div>
                <p className="text-slate-400 text-xs font-semibold">
                  {t.rank}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="border-t border-slate-100 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl font-bold text-primary mb-3">
              Student Achievements & Moments
            </h2>
            <p className="text-slate-500 text-sm">
              Capturing daily study routines, test award distributions, and extra-curricular initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* Photo Grid Placeholder */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-6 border-b border-slate-200 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <Camera className="h-10 w-10 text-slate-400 mb-3 group-hover:scale-110 group-hover:text-accent transition-all duration-300" />
                  <span className="font-heading text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Achievement Photo
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    [Slot {idx + 1}]
                  </span>
                </div>
                {/* Photo Details */}
                <div className="p-6 bg-white flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-base font-bold text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center text-[10px] font-bold uppercase text-accent tracking-wider mt-4">
                    Impact Photo Archive
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
