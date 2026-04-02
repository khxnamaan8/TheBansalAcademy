import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ThreeBackground } from "@/components/ThreeBackground";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Star, Phone, ChevronRight, Calculator, GraduationCap, Target, Sparkles, Users, BrainCircuit, CheckCircle2, MessageCircle, Plus, Minus } from "lucide-react";
import logoPath from "@assets/BansalAcademyLogo_1775025162159.png";

const namanImg = `${import.meta.env.BASE_URL}faculty-naman.png`;
const dipeshImg = `${import.meta.env.BASE_URL}faculty-dipesh.png`;

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// Hero flip cards
const flipCards = [
  {
    front: {
      icon: <Star className="w-10 h-10 text-yellow-500 fill-yellow-400" />,
      title: "5.0 Rating",
      subtitle: "200+ Happy Students",
      color: "from-yellow-50 to-amber-50",
      border: "border-yellow-200",
    },
    back: {
      icon: <GraduationCap className="w-10 h-10 text-blue-600" />,
      title: "Top Results",
      subtitle: "95%+ in Board Exams",
      color: "from-blue-50 to-indigo-50",
      border: "border-blue-200",
    },
  },
  {
    front: {
      icon: <Users className="w-10 h-10 text-green-600" />,
      title: "Small Batches",
      subtitle: "Personalized Attention",
      color: "from-green-50 to-emerald-50",
      border: "border-green-200",
    },
    back: {
      icon: <BrainCircuit className="w-10 h-10 text-purple-600" />,
      title: "Concept-First",
      subtitle: "Deep Understanding",
      color: "from-purple-50 to-violet-50",
      border: "border-purple-200",
    },
  },
  {
    front: {
      icon: <Calculator className="w-10 h-10 text-blue-600" />,
      title: "Maths & Science",
      subtitle: "Class 9 & 10",
      color: "from-sky-50 to-blue-50",
      border: "border-sky-200",
    },
    back: {
      icon: <Sparkles className="w-10 h-10 text-orange-500" />,
      title: "CUET Ready",
      subtitle: "Top Delhi Colleges",
      color: "from-orange-50 to-amber-50",
      border: "border-orange-200",
    },
  },
  {
    front: {
      icon: <Target className="w-10 h-10 text-red-500" />,
      title: "Commerce",
      subtitle: "Accounts & Economics",
      color: "from-red-50 to-rose-50",
      border: "border-red-200",
    },
    back: {
      icon: <CheckCircle2 className="w-10 h-10 text-teal-600" />,
      title: "Doubt Sessions",
      subtitle: "Never Miss a Concept",
      color: "from-teal-50 to-cyan-50",
      border: "border-teal-200",
    },
  },
];

// ─── 3D FACULTY CARD ───────────────────────────────────────────────────────────
interface FacultyCardProps {
  name: string;
  role: string;
  subject: string;
  subjectColor: string;
  badgeColor: string;
  photo: string;
  points: string[];
  delay: number;
  accent: "blue" | "violet";
}

function FacultyCard({ name, role, subject, subjectColor, badgeColor, photo, points, delay, accent }: FacultyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [8, -8]);
  const rotateY = useTransform(x, [-80, 80], [-8, 8]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const glowColor = accent === "blue"
    ? "hover:shadow-blue-200/60"
    : "hover:shadow-violet-200/60";
  const ringColor = accent === "blue" ? "ring-blue-200" : "ring-violet-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.7, type: "spring", bounce: 0.3 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative bg-white rounded-3xl border-2 border-border shadow-xl ${glowColor} hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-default`}
      >
        {/* Top gradient band */}
        <div className={`h-2 w-full bg-gradient-to-r ${subjectColor}`} />

        <div className="p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Photo */}
            <motion.div style={{ translateZ: 30 }} className="relative flex-shrink-0">
              <div className={`w-40 h-44 rounded-2xl overflow-hidden ring-4 ${ringColor} shadow-lg bg-gradient-to-b ${subjectColor} relative`}>
                <img src={photo} alt={name} className="w-full h-full object-contain object-bottom" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />
              </div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl text-xs font-bold border ${badgeColor} shadow-md`}
              >
                {accent === "blue" ? "Maths & Science" : "Commerce"}
              </motion.div>
            </motion.div>

            {/* Info */}
            <motion.div style={{ translateZ: 20 }} className="flex-1 min-w-0">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${badgeColor} mb-3`}>
                {role}
              </span>
              <h3 className="text-2xl font-black text-foreground mb-1">{name}</h3>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${subjectColor} text-white text-xs font-bold mb-5 shadow-sm`}>
                {subject}
              </div>
              <div className="space-y-2.5">
                {points.map((pt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.1 + i * 0.06 }}
                    className="flex items-center gap-2.5"
                  >
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${accent === "blue" ? "text-blue-500" : "text-violet-500"}`} />
                    <span className="text-sm text-foreground/75 font-medium">{pt}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ translateZ: 10 }}
          className={`absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br ${subjectColor} opacity-8 blur-2xl pointer-events-none`}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── FAQ SECTION ──────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What subjects are taught at The Bansal Academy?",
    a: "We offer expert coaching in Mathematics & Science for Class 9 & 10, and Commerce subjects (Accountancy, Economics, Business Studies) for Class 11 & 12. We also provide specialized CUET preparation for students targeting top Delhi universities.",
  },
  {
    q: "How small are the batch sizes?",
    a: "We maintain strictly small batches to ensure every student gets personalized attention. This means your doubts are always heard and addressed — unlike large coaching centers where students easily get lost in the crowd.",
  },
  {
    q: "Where is The Bansal Academy located?",
    a: "We are located at M 161, near Chinese Hut, Block M, Jagat Ram Park, Laxmi Nagar, Delhi – 110092. Easily accessible from all parts of Laxmi Nagar.",
  },
  {
    q: "Is there a free demo class available?",
    a: "Yes! We offer a completely free demo session so you can experience our teaching methodology, meet the faculty, and assess the learning environment before enrolling. Contact us at 08750279822 or WhatsApp us to book your slot.",
  },
  {
    q: "What are the batch timings?",
    a: "We have morning batches (7:00 AM – 10:00 AM) and evening batches (4:00 PM – 8:00 PM), Monday to Saturday. Specific slot availability depends on the subject and class — contact us for the latest schedule.",
  },
  {
    q: "Do you offer doubt clearing sessions?",
    a: "Absolutely. Dedicated doubt clearing sessions are a core part of our program. We believe no student should move forward with unresolved concepts, so we schedule regular 1-on-1 doubt sessions every week.",
  },
  {
    q: "How is The Bansal Academy different from other coaching centers?",
    a: "Three things set us apart: concept-first teaching (never rote memorization), genuinely small batch sizes for real personal attention, and dedicated weekly doubt sessions. Our 5.0 rating from 200+ students speaks for itself.",
  },
  {
    q: "How can I contact or enroll?",
    a: "Call us at 08750279822, WhatsApp at +91 87502 79822 or +91 79820 62095, or visit us directly at Jagat Ram Park, Laxmi Nagar. You can also follow us on Instagram @thebansalacademy.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Frequently Asked <span className="text-gradient-blue">Questions</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to know about The Bansal Academy.
          </motion.p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring" }}
              className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                open === i
                  ? "border-primary/40 shadow-md shadow-blue-100"
                  : "border-border bg-white hover:border-primary/20"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className={`font-bold text-base leading-snug ${open === i ? "text-primary" : "text-foreground"}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    open === i ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed text-sm border-t border-border pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HERO FLIPPER ─────────────────────────────────────────────────────────────
function HeroCardFlipper() {
  const [flipped, setFlipped] = useState([false, false, false, false]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const idx = indexRef.current % flipCards.length;
      setFlipped((prev) => {
        const next = [...prev];
        next[idx] = !next[idx];
        return next;
      });
      indexRef.current++;
    }, 2000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto">
      {flipCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30, rotateY: -10 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ delay: 0.4 + i * 0.15, type: "spring", bounce: 0.4 }}
          className="card-flip-container h-40 cursor-pointer"
          onClick={() => setFlipped((prev) => { const n = [...prev]; n[i] = !n[i]; return n; })}
        >
          <div className={`card-flip-inner ${flipped[i] ? "flipped" : ""} w-full h-full`}>
            {/* FRONT */}
            <div
              className={`card-flip-front rounded-2xl border-2 ${card.front.border} bg-gradient-to-br ${card.front.color} shadow-md flex flex-col items-center justify-center p-4 gap-2`}
            >
              {card.front.icon}
              <p className="font-black text-foreground text-sm text-center leading-tight">{card.front.title}</p>
              <p className="text-muted-foreground text-xs text-center font-medium">{card.front.subtitle}</p>
            </div>
            {/* BACK */}
            <div
              className={`card-flip-back rounded-2xl border-2 ${card.back.border} bg-gradient-to-br ${card.back.color} shadow-md flex flex-col items-center justify-center p-4 gap-2`}
            >
              {card.back.icon}
              <p className="font-black text-foreground text-sm text-center leading-tight">{card.back.title}</p>
              <p className="text-muted-foreground text-xs text-center font-medium">{card.back.subtitle}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);


  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          >
            <motion.img
              src={logoPath}
              alt="The Bansal Academy"
              className="h-32 w-auto object-contain"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%]"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] progress-bar origin-left z-[100]"
        style={{ scaleX }}
      />

      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-screen flex items-center overflow-hidden hero-bg pt-24">
          {/* 3D Background */}
          <ErrorBoundary>
            <ThreeBackground />
          </ErrorBoundary>

          {/* Floating gradient blobs for depth */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-400/10 blur-[80px] pointer-events-none animate-float-slow" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-300/8 blur-[120px] pointer-events-none" />

          {/* Floating math symbols */}
          {["∑", "∫", "π", "√", "∞", "x²", "Δ", "θ"].map((sym, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl md:text-3xl font-bold text-primary/20 select-none pointer-events-none"
              style={{
                left: `${8 + (i * 12) % 85}%`,
                top: `${10 + (i * 17) % 80}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${5 + (i % 3) * 2}s`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, i % 2 === 0 ? 8 : -8, 0],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{ duration: 5 + (i % 3) * 2, repeat: Infinity, delay: i * 0.8 }}
            >
              {sym}
            </motion.span>
          ))}

          <div className="container relative z-10 mx-auto px-6 lg:px-16 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* LEFT — hero text */}
              <motion.div initial="hidden" animate={!loading ? "visible" : "hidden"} variants={stagger}>
                {/* Badge */}
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-yellow-300 shadow-sm mb-8 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                  <span className="text-sm font-bold text-foreground/80">5.0 Rating | 200+ Reviews</span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-5"
                  style={{ fontFamily: "Poppins, Inter, sans-serif" }}
                >
                  Master{" "}
                  <span className="text-gradient-blue">Maths & Commerce</span>
                  <br />
                  with Confidence
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                  Expert coaching for Class 9, 10, Commerce & CUET in Laxmi Nagar, Delhi.
                  Small batches, concept-based learning, proven results.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(37,99,235,0.35)" }}
                      whileTap={{ scale: 0.97 }}
                      className="px-8 py-4 rounded-2xl bg-primary text-white font-bold text-base shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center gap-2 group"
                    >
                      Book Free Demo
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <motion.a
                    href="tel:08750279822"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-2xl bg-white border-2 border-primary/20 text-primary font-bold text-base hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Phone className="w-4 h-4" /> Call Now
                  </motion.a>
                </motion.div>

                {/* Quick stats */}
                <motion.div variants={fadeInUp} className="mt-10 flex gap-8">
                  {[{ n: "200+", l: "Students" }, { n: "5.0", l: "Rating" }, { n: "95%", l: "Avg. Score" }].map((s, i) => (
                    <div key={i}>
                      <p className="text-2xl font-black text-primary">{s.n}</p>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{s.l}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* RIGHT — card flipper */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={!loading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                className="hidden lg:flex flex-col items-center gap-6"
              >
                <HeroCardFlipper />
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Click any card to flip it
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom blend */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
        </section>

        {/* ─── ABOUT PREVIEW ─── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-16">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="text-center mb-14"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                Why We're <span className="text-gradient-blue">Different</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                At The Bansal Academy, we engineer academic success through deep understanding, not shortcuts.
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: BrainCircuit, title: "Concept-Based Learning", desc: "We build true understanding from the ground up — no rote memorization, ever.", color: "bg-blue-50 text-blue-600", border: "border-blue-100", glow: "hover:shadow-blue-100" },
                { icon: Users, title: "Small Batch Sizes", desc: "Each student gets personalized attention. No doubt goes unanswered.", color: "bg-green-50 text-green-600", border: "border-green-100", glow: "hover:shadow-green-100" },
                { icon: GraduationCap, title: "Expert Faculty", desc: "Years of specialized teaching experience with proven pedagogical strategies.", color: "bg-violet-50 text-violet-600", border: "border-violet-100", glow: "hover:shadow-violet-100" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.12, type: "spring", bounce: 0.3 }}
                  whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
                  className={`p-8 rounded-2xl bg-white border-2 ${item.border} shadow-sm ${item.glow} transition-all duration-300 cursor-default`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="px-8 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
                >
                  Learn More About Us
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── COURSES PREVIEW ─── */}
        <section className="py-24 section-alt">
          <div className="container mx-auto px-6 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Our <span className="text-gradient-blue">Courses</span></motion.h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Calculator, title: "Class 9 & 10", sub: "Maths & Science Foundation", c: "from-blue-500 to-blue-600" },
                { icon: Target, title: "Commerce", sub: "Accounts, Economics & BST", c: "from-violet-500 to-purple-600" },
                { icon: Sparkles, title: "CUET Prep", sub: "Target Top Delhi Colleges", c: "from-orange-500 to-amber-500" },
                { icon: MessageCircle, title: "Doubt Sessions", sub: "Special 1-on-1 Clarity", c: "from-teal-500 to-cyan-500" },
              ].map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group p-7 rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-default"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.c} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
                    <course.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{course.sub}</p>
                  <Link href="/courses">
                    <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Details <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FACULTY SECTION ─── */}
        <section className="py-24 section-alt overflow-hidden">
          <div className="container mx-auto px-6 lg:px-16">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-5">
                <GraduationCap className="w-4 h-4" /> Expert Faculty
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                Meet Our <span className="text-gradient-blue">Teachers</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Passionate educators who don't just teach — they inspire, mentor, and transform students into confident achievers.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Naman Bansal */}
              <FacultyCard
                name="Naman Bansal"
                role="Founder & Head Teacher"
                subject="Class 9 & 10 — Maths & Science"
                subjectColor="from-blue-500 to-blue-600"
                badgeColor="bg-blue-50 text-blue-700 border-blue-200"
                photo={namanImg}
                points={[
                  "PAQ Coverage of Last 5 Years",
                  "Basic to Advanced Concepts",
                  "Regular Tests & Assessments",
                  "Case-Based Question Practice",
                ]}
                delay={0}
                accent="blue"
              />
              {/* Dipesh Sir */}
              <FacultyCard
                name="Dipesh Sir"
                role="Commerce Expert"
                subject="Class 11 & 12 — Commerce"
                subjectColor="from-violet-500 to-purple-600"
                badgeColor="bg-violet-50 text-violet-700 border-violet-200"
                photo={dipeshImg}
                points={[
                  "Accountancy, Economics & BST",
                  "Personalized Attention Always",
                  "Regular Assessments & Tests",
                  "Dedicated Doubt Clearing Sessions",
                ]}
                delay={0.15}
                accent="violet"
              />
            </div>
          </div>
        </section>

        {/* ─── FAQ SECTION ─── */}
        <FaqSection />

        {/* ─── CONTACT CTA ─── */}
        <section className="py-20 hero-bg relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[100px]" />
          </div>
          <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight">
                Ready to <span className="text-gradient-blue">Excel?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join the academy that transforms students into top scorers. Book your free demo session today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(37,99,235,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-10 py-4 rounded-2xl bg-primary text-white font-bold text-base shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
                  >
                    Book Free Demo
                  </motion.button>
                </Link>
                <motion.a
                  href="https://wa.me/918750279822"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-base shadow-lg shadow-green-200 hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="white"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16a15.94 15.94 0 002.29 8.26L.792 29.816a.75.75 0 00.916.923l5.7-1.479A15.939 15.939 0 0016 32c8.824 0 16-7.176 16-16S24.828 0 16.004 0zm9.352 22.637c-.39.96-1.93 1.76-3.008 1.99-.8.17-1.844.307-5.355-1.152-4.494-1.851-7.39-6.41-7.614-6.707-.215-.297-1.812-2.414-1.812-4.606 0-2.19 1.145-3.262 1.55-3.714.39-.435.854-.544 1.14-.544.284 0 .57.003.82.014.264.012.618-.1.968.74.361.862 1.228 2.98 1.334 3.198.11.22.182.476.036.772-.146.296-.218.476-.436.734-.22.258-.463.578-.66.774-.22.22-.45.46-.194.906.258.447 1.148 1.891 2.464 3.063 1.694 1.51 3.12 1.98 3.566 2.2.445.218.703.182 1.02-.108.317-.29 1.08-1.187 1.37-1.596.29-.408.577-.34.97-.204.39.136 2.478 1.168 2.902 1.38.425.21.71.317.814.495.105.177.105 1.018-.285 1.977z"/></svg>
                  WhatsApp Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="bg-foreground text-white pt-14 pb-8">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
              <div>
                <img src={logoPath} alt="The Bansal Academy" className="h-16 w-auto object-contain mb-4 brightness-0 invert" />
                <p className="text-white/60 text-sm max-w-xs leading-relaxed">Elite coaching for Maths & Commerce in Laxmi Nagar, Delhi.</p>
              </div>
              <div className="flex gap-12">
                <div>
                  <h4 className="font-bold mb-4 text-white/80 uppercase text-xs tracking-widest">Pages</h4>
                  <div className="flex flex-col gap-2">
                    {[
                      { l: "Home", h: "/" },
                      { l: "About", h: "/about" },
                      { l: "Courses", h: "/courses" },
                      { l: "Why Us", h: "/why-us" },
                      { l: "Contact", h: "/contact" },
                    ].map(item => (
                      <Link key={item.h} href={item.h}>
                        <span className="text-white/50 hover:text-white text-sm cursor-pointer transition-colors">{item.l}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-white/80 uppercase text-xs tracking-widest">Contact</h4>
                  <div className="flex flex-col gap-2 text-sm text-white/50">
                    <a href="tel:08750279822" className="hover:text-white transition-colors">08750279822</a>
                    <p>Jagat Ram Park,<br/>Laxmi Nagar, Delhi</p>
                    <a
                      href="https://www.instagram.com/thebansalacademy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank" rel="noopener noreferrer"
                      className="hover:text-pink-400 transition-colors"
                    >
                      @thebansalacademy
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
              <p>&copy; {new Date().getFullYear()} The Bansal Academy. All rights reserved.</p>
              <p className="uppercase tracking-widest font-bold">Laxmi Nagar, Delhi</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
