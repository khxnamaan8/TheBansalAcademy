import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ThreeBackground } from "@/components/ThreeBackground";
import { Calculator, Users, Star, GraduationCap, ChevronRight, Phone, MessageCircle, MapPin, Sparkles, BrainCircuit, Target, CheckCircle2 } from "lucide-react";
import logoPath from "@assets/Bansal-Academy-Logo_1775023861712.png";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Preloader timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground font-sans">
      
      {/* 1. PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                filter: ['drop-shadow(0 0 10px rgba(34, 211, 238, 0.2))', 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.8))', 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.2))']
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={logoPath} alt="The Bansal Academy" className="h-24 md:h-32 w-auto object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent transform origin-left z-50 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
        style={{ scaleX }}
      />

      {/* 2. NAVBAR */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-background/70 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo('home')}>
            <img src={logoPath} alt="The Bansal Academy" className="h-10 md:h-12 w-auto drop-shadow-[0_0_10px_rgba(37,99,235,0.3)]" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Courses', 'Why Us', 'Reviews', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                className="text-sm font-medium text-white/70 hover:text-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] tracking-wide uppercase"
              >
                {item}
              </button>
            ))}
          </div>
          
          <div className="hidden md:block">
            <button 
              onClick={() => scrollTo('contact')}
              className="px-6 py-2.5 rounded-full bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 font-bold tracking-wide uppercase text-sm"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            className="md:hidden p-2 text-white relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {['About', 'Courses', 'Why Us', 'Reviews', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                      scrollTo(item.toLowerCase().replace(' ', '-'));
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-lg font-medium text-white/80 hover:text-accent transition-colors py-2 uppercase tracking-wide"
                  >
                    {item}
                  </button>
                ))}
                <button 
                  onClick={() => {
                    scrollTo('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="mt-4 px-6 py-3 rounded-full bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-bold uppercase text-sm w-full"
                >
                  Join Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* 3. HERO SECTION */}
        <section id="home" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
          <ErrorBoundary>
            <ThreeBackground />
          </ErrorBoundary>
          
          <div className="container relative z-10 mx-auto px-6 lg:px-12 text-center md:text-left">
            <div className="max-w-4xl mx-auto md:mx-0">
              <motion.div
                initial="hidden"
                animate={!loading ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-accent/50 transition-colors">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">5.0 Rating | 200+ Reviews</span>
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-6 text-white drop-shadow-2xl">
                  Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-purple-400">Maths & Commerce</span><br/>With Confidence
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-white/70 mb-12 max-w-2xl leading-relaxed mx-auto md:mx-0 font-light">
                  Expert Coaching for Class 9, 10, Commerce & CUET. The IIT of coaching institutes in Laxmi Nagar.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                  <button onClick={() => scrollTo('contact')} className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group uppercase tracking-wider">
                    Book Free Demo
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="tel:08750279822" className="px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-bold text-lg hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 hidden md:block">
            <button onClick={() => scrollTo('about')} className="p-3 rounded-full border border-white/20 bg-background/50 backdrop-blur-md text-white/50 hover:text-white hover:border-white/50 transition-colors">
              <ChevronRight className="w-6 h-6 rotate-90" />
            </button>
          </div>
          
          {/* Bottom Fade Gradient to blend with next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </section>

        {/* 4. ABOUT SECTION */}
        <section id="about" className="py-32 relative z-10 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary animate-pulse">Excellence</span>
              </h2>
              <p className="text-white/60 max-w-3xl mx-auto text-xl font-light">We engineer success through deep conceptual clarity and personalized mentorship. No shortcuts. Just results.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: BrainCircuit, title: "Concept-Based Learning", desc: "Deep understanding, not rote memorization. We build the foundation from the ground up." },
                { icon: Users, title: "Small Batch Sizes", desc: "Personalized attention for every student ensuring no doubt ever goes unanswered." },
                { icon: GraduationCap, title: "Expert Faculty", desc: "Years of specialized teaching experience combined with proven pedagogical strategies." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                  variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.7, type: "spring", bounce: 0.4 } } }}
                  className="group relative p-10 rounded-3xl bg-card/50 backdrop-blur-sm border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)]"
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                >
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/20 blur-3xl group-hover:bg-accent/30 transition-colors duration-500" />
                  
                  <div className="relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                      <item.icon className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white tracking-wide">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed text-lg font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. COURSES SECTION */}
        <section id="courses" className="py-32 relative z-10 bg-[#060810] border-y border-white/5">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Courses</span></h2>
              <div className="h-1 w-24 bg-gradient-to-r from-accent to-primary rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Class 9 & 10", subtitle: "Maths & Science Foundation", icon: Calculator },
                { title: "Commerce", subtitle: "Accounts, Economics & BST", icon: Target },
                { title: "CUET Prep", subtitle: "Target Top Delhi Colleges", icon: Sparkles },
                { title: "Doubt Sessions", subtitle: "Special 1-on-1 Clarity", icon: MessageCircle }
              ].map((course, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ hidden: { opacity: 0, scale: 0.9, y: 30 }, visible: { opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.15, type: "spring" } } }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative p-8 rounded-3xl bg-background/80 backdrop-blur-xl border border-white/10 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:border-accent/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 group-hover:bg-accent/20 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 relative z-10">
                    <course.icon className="w-7 h-7 text-primary group-hover:text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-wide">{course.title}</h3>
                  <p className="text-white/50 text-sm mb-8 leading-relaxed font-light">{course.subtitle}</p>
                  
                  <div className="flex items-center text-sm font-bold tracking-widest uppercase text-primary group-hover:text-accent transition-colors mt-auto">
                    Explore <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. WHY CHOOSE US SECTION */}
        <section id="why-us" className="py-32 relative z-10 bg-background overflow-hidden">
          {/* Abstract glow */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">Why Choose <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">The Bansal Academy?</span></h2>
                <p className="text-white/60 text-xl mb-12 leading-relaxed font-light">
                  We bridge the gap between hard work and smart work. Our methodologies are engineered to build problem-solving muscle rather than just passing exams.
                </p>
                
                <div className="space-y-8">
                  {[
                    "Personalized Attention",
                    "Proven Track Record & Results",
                    "Regular Dedicated Doubt Clearing Sessions",
                    "Interactive, Highly Motivating Environment"
                  ].map((feature, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-6 group cursor-default"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300">
                        <CheckCircle2 className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                      </div>
                      <span className="text-xl font-medium text-white/80 group-hover:text-white transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.9 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, type: "spring" }}
                className="relative hidden lg:block"
              >
                {/* Futuristic Visual Element */}
                <div className="aspect-square w-full max-w-[500px] mx-auto relative flex items-center justify-center">
                  {/* Outer Rings */}
                  <div className="absolute inset-0 rounded-full border-[1px] border-white/5 animate-[spin_30s_linear_infinite]" />
                  <div className="absolute inset-10 rounded-full border-[2px] border-dashed border-accent/20 animate-[spin_20s_linear_infinite_reverse]" />
                  <div className="absolute inset-20 rounded-full border-[1px] border-primary/30 animate-[spin_15s_linear_infinite]" />
                  
                  {/* Core Content */}
                  <div className="absolute inset-28 bg-gradient-to-br from-card to-background rounded-full backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_80px_rgba(37,99,235,0.2)]">
                    <div className="text-center relative z-10">
                      <span className="block text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-white mb-2 drop-shadow-lg">100%</span>
                      <span className="text-sm font-bold text-white/50 uppercase tracking-[0.3em]">Commitment</span>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-10 right-20 w-16 h-16 rounded-2xl bg-card border border-white/10 backdrop-blur-md flex items-center justify-center animate-bounce delay-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <Star className="w-8 h-8 text-accent" />
                  </div>
                  <div className="absolute bottom-20 left-10 w-20 h-20 rounded-full bg-card border border-white/10 backdrop-blur-md flex items-center justify-center animate-bounce delay-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <Target className="w-10 h-10 text-primary" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. REVIEWS SECTION */}
        <section id="reviews" className="py-32 relative z-10 bg-[#060810] border-y border-white/5 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Success</span></h2>
            <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">Real results from real students in Laxmi Nagar.</p>
          </div>
          
          <div className="relative flex overflow-x-hidden group py-10">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060810] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#060810] to-transparent z-10 pointer-events-none" />
            
            <div className="animate-[scroll_40s_linear_infinite] flex gap-8 px-4 group-hover:[animation-play-state:paused]">
              {[
                { t: "Kind faculties, great infrastructure. My child's grades improved drastically!", n: "Priya Sharma", r: "Parent" },
                { t: "Best coaching for class 10 in Laxmi Nagar. Highly recommend!", n: "Rahul Verma", r: "Student" },
                { t: "Concept clarity improved a lot after joining. Faculty explains everything patiently.", n: "Anjali Singh", r: "Class 10" },
                { t: "My daughter scored 95% in Maths after joining. Amazing results!", n: "Suresh Kumar", r: "Parent" },
                { t: "CUET preparation was excellent. Got admission in my dream college!", n: "Neha Gupta", r: "CUET Student" },
                // Duplicate for smooth loop
                { t: "Kind faculties, great infrastructure. My child's grades improved drastically!", n: "Priya Sharma", r: "Parent" },
                { t: "Best coaching for class 10 in Laxmi Nagar. Highly recommend!", n: "Rahul Verma", r: "Student" },
                { t: "Concept clarity improved a lot after joining. Faculty explains everything patiently.", n: "Anjali Singh", r: "Class 10" },
              ].map((review, i) => (
                <div key={i} className="w-[400px] flex-shrink-0 p-8 rounded-3xl bg-card/40 backdrop-blur-xl border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1.5 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 text-accent fill-accent drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" />)}
                  </div>
                  <p className="text-white/80 mb-8 text-lg font-light italic leading-relaxed">"{review.t}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                      {review.n.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white tracking-wide">{review.n}</h4>
                      <span className="text-sm font-medium text-primary uppercase tracking-widest">{review.r}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. CONTACT SECTION */}
        <section id="contact" className="py-32 relative z-10 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Get In <span className="text-accent">Touch</span></h2>
              <p className="text-xl text-white/60 font-light">Ready to transform your academic journey? The time is now.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative background in contact form */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="relative z-10 space-y-12">
                  <div>
                    <h3 className="text-3xl font-bold mb-10 tracking-tight text-white">Visit The Academy</h3>
                    <div className="space-y-8">
                      <div className="flex gap-6 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <MapPin className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white/50 text-sm mb-2 uppercase tracking-widest">Location</h4>
                          <p className="text-white/90 text-lg leading-relaxed">M 161, near Chinese Hut, Block M,<br/>Jagat Ram Park, Laxmi Nagar, Delhi</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-6 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                          <Phone className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white/50 text-sm mb-2 uppercase tracking-widest">Phone</h4>
                          <a href="tel:08750279822" className="text-white/90 text-xl font-medium hover:text-accent transition-colors drop-shadow-[0_0_10px_rgba(0,0,0,1)]">08750279822</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-5">
                    <a 
                      href="tel:08750279822"
                      className="flex-1 px-8 py-5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg text-center transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 uppercase tracking-wide"
                    >
                      <Phone className="w-5 h-5" /> Call Us
                    </a>
                    <a 
                      href="https://wa.me/918750279822"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-8 py-5 rounded-2xl bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold text-lg text-center transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 uppercase tracking-wide"
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="h-[400px] lg:h-auto min-h-[500px] w-full relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9964522434316!2d77.27989917528956!3d28.63153547566539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcb5ab258a43%3A0x6c6e736db3229b1c!2sJagat%20Ram%20Park%2C%20Laxmi%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110092!5e0!3m2!1sen!2sin!4v1709230538965!5m2!1sen!2sin" 
                  className="absolute inset-0 w-full h-full border-0 filter invert-[90%] hue-rotate-[180deg] brightness-[80%] contrast-[85%] grayscale-[20%]" 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                ></iframe>
                {/* Overlay to blend edges */}
                <div className="absolute inset-0 border-l border-white/10 pointer-events-none hidden lg:block" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. FOOTER */}
      <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16 text-center md:text-left">
            <div>
              <img src={logoPath} alt="The Bansal Academy" className="h-16 w-auto mb-6 mx-auto md:mx-0 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
              <p className="text-white/50 max-w-sm text-lg font-light">Elite coaching institute for Maths & Commerce in Laxmi Nagar, Delhi.</p>
            </div>
            
            <div className="flex gap-6">
              <a href="https://www.instagram.com/thebansalacademy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-500 hover:to-orange-500 hover:border-transparent transition-all duration-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] group">
                <svg className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-white/30 font-light">
            <p>&copy; {new Date().getFullYear()} The Bansal Academy. All rights reserved.</p>
            <p className="mt-4 md:mt-0 tracking-widest uppercase text-xs font-bold text-white/20">Designed for Excellence</p>
          </div>
        </div>
      </footer>

      {/* 9. FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/918750279822" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40 duration-1000"></span>
        <MessageCircle className="w-8 h-8 relative z-10" />
        <span className="absolute right-full mr-6 bg-card/90 backdrop-blur-md text-white text-sm font-bold tracking-wide px-4 py-2 rounded-lg shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us
        </span>
      </a>

      {/* Global CSS animation for continuous scroll */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-400px * 5 - 2rem * 5)); }
        }
      `}</style>
    </div>
  );
}
