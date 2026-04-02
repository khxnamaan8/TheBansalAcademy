import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "wouter";
import { BrainCircuit, Users, GraduationCap, Target, CheckCircle2, Award, BookOpen, Heart } from "lucide-react";
import logoPath from "@assets/BansalAcademyLogo_1775025162159.png";

const namanImg = `${import.meta.env.BASE_URL}faculty-naman.png`;
const dipeshImg = `${import.meta.env.BASE_URL}faculty-dipesh.png`;

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

interface AboutFacultyCardProps {
  name: string;
  role: string;
  subject: string;
  bio: string;
  points: string[];
  photo: string;
  accent: "blue" | "violet";
  delay: number;
}

function AboutFacultyCard({ name, role, subject, bio, points, photo, accent, delay }: AboutFacultyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-60, 60], [6, -6]);
  const rotY = useTransform(mx, [-60, 60], [-6, 6]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const gradFrom = accent === "blue" ? "from-blue-500 to-blue-600" : "from-violet-500 to-purple-600";
  const ringCol  = accent === "blue" ? "ring-blue-300"            : "ring-violet-300";
  const tagCol   = accent === "blue"
    ? "bg-blue-50 text-blue-700 border-blue-200"
    : "bg-violet-50 text-violet-700 border-violet-200";
  const checkCol = accent === "blue" ? "text-blue-500" : "text-violet-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.7, type: "spring", bounce: 0.25 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative bg-white rounded-3xl border-2 border-border shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex"
      >
        {/* Left — gradient panel with photo */}
        <div className={`relative flex-shrink-0 w-44 bg-gradient-to-b ${gradFrom} flex items-end justify-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent)]" />
          <motion.img
            style={{ translateZ: 30, height: "260px" }}
            src={photo}
            alt={name}
            className="relative z-10 w-full object-cover object-top"
          />
        </div>

        {/* Right — content */}
        <div className="flex-1 p-7 flex flex-col justify-center">
          <span className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-bold border ${tagCol} mb-3`}>
            {role}
          </span>
          <h3 className="text-2xl font-black text-foreground mb-1">{name}</h3>
          <div className={`inline-flex self-start px-3 py-1.5 rounded-xl bg-gradient-to-r ${gradFrom} text-white text-xs font-bold mb-4 shadow-sm`}>
            {subject}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{bio}</p>
          <div className="border-t border-border pt-4 space-y-2.5">
            {points.map((pt, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${checkCol}`} />
                <span className="text-sm text-foreground/75 font-medium">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-32 pb-20 hero-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-[80px] animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-violet-400/10 blur-[60px] animate-float-slow" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fade} className="mb-8 flex justify-center">
              <img src={logoPath} alt="The Bansal Academy" className="h-24 w-auto object-contain" />
            </motion.div>
            <motion.h1 variants={fade} className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              About <span className="text-gradient-blue">The Bansal Academy</span>
            </motion.h1>
            <motion.p variants={fade} className="text-xl text-muted-foreground leading-relaxed">
              A premier coaching institute in Laxmi Nagar, Delhi dedicated to transforming students through deep conceptual clarity, personalized guidance, and unwavering commitment to excellence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Our <span className="text-gradient-blue">Mission</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We bridge the gap between hard work and smart work. Our methodologies are engineered to build problem-solving muscle, critical thinking, and academic confidence — not just exam scores.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Located in the heart of Laxmi Nagar, we have built a reputation for producing students who don't just pass exams — they understand subjects deeply and carry that knowledge for life.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Award, label: "Top Results", val: "95%+", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
                { icon: Users, label: "Students Taught", val: "200+", color: "bg-blue-50 text-blue-600 border-blue-200" },
                { icon: Heart, label: "Parent Satisfaction", val: "100%", color: "bg-pink-50 text-pink-600 border-pink-200" },
                { icon: BookOpen, label: "Courses Offered", val: "4+", color: "bg-green-50 text-green-600 border-green-200" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
                  className={`p-6 rounded-2xl bg-white border-2 ${stat.color.split(' ')[2]} shadow-sm text-center`}
                >
                  <div className={`w-12 h-12 rounded-xl ${stat.color.split(' ')[0]} ${stat.color.split(' ')[1]} flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-2xl font-black text-foreground">{stat.val}</p>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 section-alt">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fade} className="text-3xl md:text-5xl font-black mb-4">Our Core <span className="text-gradient-blue">Values</span></motion.h2>
            <motion.p variants={fade} className="text-muted-foreground text-lg max-w-xl mx-auto">What makes The Bansal Academy the first choice for students and parents in Laxmi Nagar.</motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BrainCircuit, title: "Concept-Based Learning", desc: "True mastery, not surface knowledge. Every concept is broken down until it clicks.", color: "bg-blue-50 text-blue-600" },
              { icon: Users, title: "Personalized Attention", desc: "Small batches ensure every student is seen, heard, and supported at every step.", color: "bg-green-50 text-green-600" },
              { icon: GraduationCap, title: "Expert Faculty", desc: "Experienced educators who are passionate about teaching and student growth.", color: "bg-violet-50 text-violet-600" },
              { icon: Target, title: "Goal-Oriented", desc: "Every session, every doubt session, every test — all focused on your goal.", color: "bg-orange-50 text-orange-600" },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -6 }}
                className="p-7 rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${v.color} flex items-center justify-center mb-5`}>
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-20 bg-background overflow-visible">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger} className="text-center mb-6"
          >
            <motion.span variants={fade} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-4">
              <GraduationCap className="w-4 h-4" /> Meet Our Teachers
            </motion.span>
            <motion.h2 variants={fade} className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
              The Faces Behind <span className="text-gradient-blue">Your Success</span>
            </motion.h2>
            <motion.p variants={fade} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Two dedicated educators with one mission — make every student a confident, top-scoring achiever.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <AboutFacultyCard
              name="Naman Bansal"
              role="Founder & Head Teacher"
              subject="Class 9 & 10 · Maths & Science"
              bio="The visionary behind The Bansal Academy. Naman Sir specialises in building unshakeable fundamentals — from basic arithmetic to advanced CBSE problem-solving."
              points={[
                "PAQ coverage of last 5 years",
                "Basic-to-advanced concept flow",
                "Regular tests & case-based practice",
                "1-on-1 doubt clearing every week",
              ]}
              photo={namanImg}
              accent="blue"
              delay={0}
            />
            <AboutFacultyCard
              name="Dipesh Sir"
              role="Commerce Expert"
              subject="Class 11 & 12 · Commerce"
              bio="A Commerce specialist who makes Accountancy, Economics and Business Studies genuinely easy to understand — with structured notes, real-life examples, and relentless support."
              points={[
                "Accountancy, Economics & BST",
                "Concept-first, no rote learning",
                "Personalized attention every class",
                "Dedicated doubt-clearing sessions",
              ]}
              photo={dipeshImg}
              accent="violet"
              delay={0.15}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black mb-4">Ready to Join The Academy?</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">Book your free demo session and experience the difference firsthand.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.95)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-xl bg-white text-primary font-bold shadow-lg transition-all"
              >
                Book Free Demo
              </motion.button>
            </Link>
            <Link href="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-xl border-2 border-white/40 text-white font-bold hover:bg-white/10 transition-all"
              >
                View Courses
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 text-center text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} The Bansal Academy. All rights reserved. | Laxmi Nagar, Delhi</p>
      </footer>
    </div>
  );
}
