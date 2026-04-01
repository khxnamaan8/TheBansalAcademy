import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, Quote } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const reviews = [
  { t: "Kind faculties, great infrastructure. My child's grades improved drastically after joining The Bansal Academy. The teachers here truly care about each student's progress.", n: "Priya Sharma", r: "Parent of Class 10 Student", stars: 5 },
  { t: "Best coaching for class 10 in Laxmi Nagar. Highly recommend! The concept-based approach really helped me understand Maths rather than just memorize formulas.", n: "Rahul Verma", r: "Class 10 Student", stars: 5 },
  { t: "Concept clarity improved a lot after joining. Faculty explains everything patiently and ensures every doubt is cleared before moving forward. Excellent experience.", n: "Anjali Singh", r: "Class 10 Student", stars: 5 },
  { t: "My daughter scored 95% in Maths after joining The Bansal Academy. The dedicated doubt sessions and personalized attention made all the difference. Amazing results!", n: "Suresh Kumar", r: "Parent", stars: 5 },
  { t: "CUET preparation was excellent. Got admission in my dream college thanks to the focused coaching and mock tests. Highly recommended for CUET aspirants!", n: "Neha Gupta", r: "CUET Student", stars: 5 },
  { t: "The Accounts classes here are exceptional. Complex topics are broken down into simple steps. I finally feel confident about my Commerce subjects.", n: "Karan Malhotra", r: "Class 12 Commerce Student", stars: 5 },
  { t: "My son's marks went from 65% to 91% in just one academic year. The small batch size means he gets individual attention that large coaching centers simply cannot provide.", n: "Meena Gupta", r: "Parent of Class 9 Student", stars: 5 },
  { t: "Joining The Bansal Academy was the best decision for my CUET preparation. The strategic approach to different sections and regular tests boosted my confidence tremendously.", n: "Divya Arora", r: "CUET Student", stars: 5 },
  { t: "The faculty here has a special way of making difficult concepts simple and memorable. My child actually enjoys studying now, which was unimaginable before.", n: "Ramesh Verma", r: "Parent", stars: 5 },
];

export default function Reviews() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-yellow-400/10 blur-[80px] animate-float-slow" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fade} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 mb-6">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              <span className="text-sm font-bold text-yellow-700 ml-1">5.0 Average Rating</span>
            </motion.div>
            <motion.h1 variants={fade} className="text-4xl md:text-6xl font-black mb-5 tracking-tight">
              Student <span className="text-gradient-blue">Success Stories</span>
            </motion.h1>
            <motion.p variants={fade} className="text-xl text-muted-foreground leading-relaxed">
              Real stories from real students and parents in Laxmi Nagar who chose The Bansal Academy.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
            {[
              { n: "200+", l: "Students Taught" },
              { n: "5.0", l: "Average Rating" },
              { n: "95%+", l: "Board Results" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl font-black text-primary mb-1">{s.n}</p>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08, type: "spring" }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
                className="break-inside-avoid p-7 rounded-2xl bg-white border border-border shadow-sm transition-all duration-300 mb-6"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= review.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-primary/20 mb-3" />
                <p className="text-foreground/80 italic leading-relaxed mb-6 text-sm">"{review.t}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    {review.n.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{review.n}</p>
                    <p className="text-xs text-primary font-semibold">{review.r}</p>
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
          <h2 className="text-3xl font-black mb-4">Join Our Success Story</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Be the next student to achieve your academic goals at The Bansal Academy.</p>
          <Link href="/contact">
            <motion.button whileHover={{ scale: 1.05 }} className="px-10 py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">
              Book Free Demo Session
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
