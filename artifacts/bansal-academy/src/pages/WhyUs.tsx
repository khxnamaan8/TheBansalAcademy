import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Star, Users, BrainCircuit, Target, Heart, Award, Clock, Lightbulb, MessageCircle } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function WhyUs() {
  const reasons = [
    { icon: BrainCircuit, title: "Concept-Based Learning", desc: "We don't teach you to memorize. We teach you to understand. Every concept is explained from first principles, building a framework that lasts.", color: "bg-blue-50 text-blue-600" },
    { icon: Users, title: "Small, Focused Batches", desc: "Strict batch size limits mean you always get individual attention. Your questions matter. Your pace matters. You matter.", color: "bg-green-50 text-green-600" },
    { icon: Award, title: "Proven Track Record", desc: "Year after year, our students score above 90% in board exams and secure seats in top institutions. Results speak for themselves.", color: "bg-yellow-50 text-yellow-600" },
    { icon: Clock, title: "Regular Doubt Sessions", desc: "Dedicated weekly doubt-clearing sessions ensure you never carry unresolved questions into your exams. Clarity is non-negotiable.", color: "bg-violet-50 text-violet-600" },
    { icon: Heart, title: "Friendly & Supportive Environment", desc: "Academic pressure is real. We create a space where students feel safe to ask questions, make mistakes, and grow without judgment.", color: "bg-pink-50 text-pink-600" },
    { icon: Lightbulb, title: "Innovative Teaching Methods", desc: "From visual explanations to real-world examples, our teaching adapts to how students best understand complex topics.", color: "bg-orange-50 text-orange-600" },
    { icon: Target, title: "Goal-Oriented Approach", desc: "Every session is aligned with your specific academic goals — whether it's CBSE boards, CUET, or building a strong commerce foundation.", color: "bg-teal-50 text-teal-600" },
    { icon: MessageCircle, title: "Parent Communication", desc: "We keep parents informed about their child's progress through regular updates, ensuring a supportive home environment.", color: "bg-indigo-50 text-indigo-600" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-violet-400/10 blur-[80px] animate-float-slow" />
          <div className="absolute bottom-1/4 left-1/4 w-60 h-60 rounded-full bg-blue-400/8 blur-[60px]" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fade} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 mb-6">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span className="text-sm font-bold text-yellow-700">Laxmi Nagar's Most Trusted Academy</span>
            </motion.div>
            <motion.h1 variants={fade} className="text-4xl md:text-6xl font-black mb-5 tracking-tight">
              Why Choose <span className="text-gradient-blue">The Bansal Academy?</span>
            </motion.h1>
            <motion.p variants={fade} className="text-xl text-muted-foreground leading-relaxed">
              We're not just a coaching institute. We're your academic success partner — committed to building genuine understanding, confidence, and results.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Reasons grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.09)" }}
                className="p-7 rounded-2xl bg-white border border-border shadow-sm transition-all duration-300 cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl ${r.color} flex items-center justify-center mb-5`}>
                  <r.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-3 leading-tight">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 section-alt">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-black mb-4">The <span className="text-gradient-blue">Bansal Difference</span></motion.h2>
            <motion.p variants={fade} className="text-muted-foreground max-w-xl mx-auto">What sets us apart from ordinary coaching centers.</motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-border shadow-md overflow-hidden">
              <div className="grid grid-cols-3 bg-foreground text-white text-sm font-bold uppercase tracking-wide">
                <div className="p-4 text-center text-foreground/40">Feature</div>
                <div className="p-4 text-center text-primary bg-blue-50/5">The Bansal Academy</div>
                <div className="p-4 text-center text-foreground/40">Others</div>
              </div>
              {[
                ["Small Batch Sizes", true, false],
                ["Personalized Attention", true, false],
                ["Dedicated Doubt Sessions", true, false],
                ["Concept-First Approach", true, false],
                ["Parent Progress Updates", true, false],
                ["5.0 Student Rating", true, false],
              ].map(([label, us, others], i) => (
                <div key={i} className={`grid grid-cols-3 border-t border-border ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <div className="p-4 text-sm font-medium text-foreground/70">{label}</div>
                  <div className="p-4 flex justify-center">
                    {us ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <span className="text-muted-foreground text-lg">—</span>}
                  </div>
                  <div className="p-4 flex justify-center">
                    {others ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <span className="text-muted-foreground">✗</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black mb-4">Experience the Difference</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">One free demo session is all it takes to see why students and parents choose The Bansal Academy.</p>
          <Link href="/contact">
            <motion.button whileHover={{ scale: 1.05 }} className="px-10 py-4 rounded-xl bg-white text-primary font-bold shadow-xl hover:bg-blue-50 transition-colors">
              Book Free Demo Now
            </motion.button>
          </Link>
        </div>
      </section>

      <footer className="bg-foreground text-white py-8 text-center text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} The Bansal Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}
