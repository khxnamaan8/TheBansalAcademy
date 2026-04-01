import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send, MessageCircle } from "lucide-react";
import logoPath from "@assets/Bansal-Academy-Logo_1775023861712.png";

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-400/10 blur-[80px] animate-float-slow" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.img variants={fade} src={logoPath} alt="The Bansal Academy" className="h-20 w-auto object-contain mx-auto mb-8 drop-shadow-lg" />
            <motion.h1 variants={fade} className="text-4xl md:text-6xl font-black mb-5 tracking-tight">
              Get In <span className="text-gradient-blue">Touch</span>
            </motion.h1>
            <motion.p variants={fade} className="text-xl text-muted-foreground leading-relaxed">
              Ready to transform your academic journey? Contact us today and book your free demo session.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Info cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-col gap-5">
              <motion.h2 variants={fade} className="text-3xl font-black mb-2">Visit The <span className="text-gradient-blue">Academy</span></motion.h2>

              {/* Address */}
              <motion.div variants={fade} className="p-7 rounded-2xl bg-white border-2 border-blue-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-2">Address</h3>
                    <p className="font-semibold text-foreground leading-relaxed">
                      M 161, near Chinese Hut, Block M,<br/>
                      Jagat Ram Park, Laxmi Nagar,<br/>
                      Delhi – 110092
                    </p>
                    <a
                      href="https://maps.google.com/?q=Jagat+Ram+Park+Laxmi+Nagar+Delhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-primary font-semibold text-sm hover:underline"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={fade} className="p-7 rounded-2xl bg-white border-2 border-green-100 shadow-sm hover:shadow-md hover:border-green-300 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-2">Phone</h3>
                    <a href="tel:08750279822" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                      087502 79822
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Click to call directly</p>
                  </div>
                </div>
              </motion.div>

              {/* Timing */}
              <motion.div variants={fade} className="p-7 rounded-2xl bg-white border-2 border-orange-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-2">Timings</h3>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">Monday – Saturday</p>
                      <p className="text-muted-foreground text-sm">Morning: 7:00 AM – 10:00 AM</p>
                      <p className="text-muted-foreground text-sm">Evening: 4:00 PM – 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div variants={fade} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:08750279822"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all"
                >
                  <Phone className="w-5 h-5" /> Call Now
                </a>
                <a
                  href="https://wa.me/918750279822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-white shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5 transition-all"
                  style={{ background: "#25D366" }}
                >
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16a15.94 15.94 0 002.29 8.26L.792 29.816a.75.75 0 00.916.923l5.7-1.479A15.939 15.939 0 0016 32c8.824 0 16-7.176 16-16S24.828 0 16.004 0zm9.352 22.637c-.39.96-1.93 1.76-3.008 1.99-.8.17-1.844.307-5.355-1.152-4.494-1.851-7.39-6.41-7.614-6.707-.215-.297-1.812-2.414-1.812-4.606 0-2.19 1.145-3.262 1.55-3.714.39-.435.854-.544 1.14-.544.284 0 .57.003.82.014.264.012.618-.1.968.74.361.862 1.228 2.98 1.334 3.198.11.22.182.476.036.772-.146.296-.218.476-.436.734-.22.258-.463.578-.66.774-.22.22-.45.46-.194.906.258.447 1.148 1.891 2.464 3.063 1.694 1.51 3.12 1.98 3.566 2.2.445.218.703.182 1.02-.108.317-.29 1.08-1.187 1.37-1.596.29-.408.577-.34.97-.204.39.136 2.478 1.168 2.902 1.38.425.21.71.317.814.495.105.177.105 1.018-.285 1.977z"/>
                  </svg>
                  WhatsApp Chat
                </a>
              </motion.div>

              {/* Instagram */}
              <motion.div variants={fade}>
                <a
                  href="https://www.instagram.com/thebansalacademy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow us on Instagram @thebansalacademy
                </a>
              </motion.div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex flex-col gap-5"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-border h-[420px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9964522434316!2d77.27989917528956!3d28.63153547566539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcb5ab258a43%3A0x6c6e736db3229b1c!2sJagat%20Ram%20Park%2C%20Laxmi%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110092!5e0!3m2!1sen!2sin!4v1709230538965!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Bansal Academy Location"
                />
              </div>

              {/* Quick enquiry */}
              <div className="p-7 rounded-2xl bg-white border-2 border-primary/20 shadow-sm">
                <h3 className="font-black text-xl mb-1 flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" /> Quick Enquiry
                </h3>
                <p className="text-muted-foreground text-sm mb-5">Send us a WhatsApp message and we'll get back to you within minutes.</p>
                <a
                  href="https://wa.me/918750279822?text=Hello!%20I%20would%20like%20to%20enquire%20about%20coaching%20at%20The%20Bansal%20Academy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02]"
                  style={{ background: "#25D366" }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Send WhatsApp Message
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-8 text-center text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} The Bansal Academy. All rights reserved. | M 161, Jagat Ram Park, Laxmi Nagar, Delhi</p>
      </footer>
    </div>
  );
}
