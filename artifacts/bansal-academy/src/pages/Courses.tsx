import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calculator, Target, Sparkles, MessageCircle, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const courses = [
  {
    icon: Calculator,
    title: "Class 9 & 10 — Maths & Science",
    tagline: "Build the foundation that lasts a lifetime",
    color: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    features: [
      "Complete NCERT syllabus coverage",
      "Chapter-wise concept building",
      "Regular tests & mock papers",
      "Board exam preparation",
      "Doubt clearing sessions every week",
      "Individual progress tracking",
    ],
    desc: "Our Class 9 & 10 program lays a rock-solid academic foundation. We cover the entire NCERT curriculum with deep concept-based teaching ensuring students not only score well in boards but also develop a lasting love for the subject.",
  },
  {
    icon: Target,
    title: "Commerce — Accounts & Economics",
    tagline: "Master the language of business",
    color: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-600",
    features: [
      "Accountancy — full syllabus",
      "Economics — micro & macro",
      "Business Studies coverage",
      "Practical journal & ledger work",
      "CBSE board pattern focus",
      "Case study practice",
    ],
    desc: "Our Commerce program covers Accountancy, Economics, and Business Studies with expert guidance. Students gain conceptual clarity through real-world examples and rigorous practice, ensuring top performance in CBSE Class 11 and 12.",
  },
  {
    icon: Sparkles,
    title: "CUET Preparation",
    tagline: "Your gateway to top Delhi universities",
    color: "from-orange-500 to-amber-500",
    lightBg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
    features: [
      "Domain subject coaching",
      "General test preparation",
      "Full-length mock tests",
      "Current affairs coverage",
      "Speed & accuracy drills",
      "University selection guidance",
    ],
    desc: "CUET (Common University Entrance Test) is the gateway to India's top central universities. Our specialized program prepares students for domain subjects, general tests, and critical reasoning — helping them secure seats in their dream colleges.",
  },
  {
    icon: MessageCircle,
    title: "Doubt Clearing Sessions",
    tagline: "No concept left behind",
    color: "from-teal-500 to-cyan-500",
    lightBg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-600",
    features: [
      "1-on-1 dedicated sessions",
      "Scheduled weekly doubt hours",
      "Cross-chapter problem solving",
      "Previous year question practice",
      "Exam-day strategy coaching",
      "Parent progress updates",
    ],
    desc: "Doubts are the enemy of progress. Our dedicated doubt clearing sessions ensure no student moves forward with unresolved concepts. Available weekly, these focused 1-on-1 sessions have been a game-changer for students struggling with specific topics.",
  },
];

export default function Courses() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-blue-400/10 blur-[80px] animate-float-slow" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fade} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-6">
              <BookOpen className="w-4 h-4" /> 4 Specialized Programs
            </motion.span>
            <motion.h1 variants={fade} className="text-4xl md:text-6xl font-black mb-5 tracking-tight">
              Our <span className="text-gradient-blue">Courses</span>
            </motion.h1>
            <motion.p variants={fade} className="text-xl text-muted-foreground leading-relaxed">
              Carefully designed programs for Class 9-10, Commerce, CUET, and specialized doubt clearing — covering every student's academic need.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col gap-10">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", bounce: 0.2 }}
                className="group p-8 md:p-10 rounded-3xl bg-white border-2 border-border hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left */}
                  <div className="lg:col-span-1">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
                      <course.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-black mb-2 tracking-tight">{course.title}</h2>
                    <p className={`${course.text} font-semibold text-sm mb-4`}>{course.tagline}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{course.desc}</p>
                  </div>

                  {/* Right */}
                  <div className="lg:col-span-2">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">What You'll Get</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.features.map((f, j) => (
                        <div key={j} className={`flex items-center gap-3 p-3 rounded-xl ${course.lightBg} border ${course.border}`}>
                          <CheckCircle2 className={`w-5 h-5 ${course.text} flex-shrink-0`} />
                          <span className="text-sm font-medium text-foreground/80">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hero-bg text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black mb-4">Ready to Enroll?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Get in touch to book your free demo session and find the right course for you.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center gap-2">
                Enquire Now <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-8 text-center text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} The Bansal Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}
