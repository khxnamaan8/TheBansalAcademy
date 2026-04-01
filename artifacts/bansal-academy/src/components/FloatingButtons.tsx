import { motion } from "framer-motion";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Instagram */}
      <motion.a
        href="https://www.instagram.com/thebansalacademy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="group relative w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-300/40 hover:shadow-pink-400/60 transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 40%, #FCB045 100%)"
        }}
      >
        {/* Instagram SVG logo */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
          Follow on Instagram
        </span>
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/918750279822"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, type: "spring", bounce: 0.5 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        className="group relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-green-300/50 hover:shadow-green-400/70 transition-all duration-300"
        style={{ background: "#25D366" }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-2xl animate-pulse-ring" style={{ background: "#25D366", opacity: 0.4 }} />
        {/* Real WhatsApp logo SVG */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="white"
          className="relative z-10"
          aria-hidden="true"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16a15.94 15.94 0 002.29 8.26L.792 29.816a.75.75 0 00.916.923l5.7-1.479A15.939 15.939 0 0016 32c8.824 0 16-7.176 16-16S24.828 0 16.004 0zm9.352 22.637c-.39.96-1.93 1.76-3.008 1.99-.8.17-1.844.307-5.355-1.152-4.494-1.851-7.39-6.41-7.614-6.707-.215-.297-1.812-2.414-1.812-4.606 0-2.19 1.145-3.262 1.55-3.714.39-.435.854-.544 1.14-.544.284 0 .57.003.82.014.264.012.618-.1.968.74.361.862 1.228 2.98 1.334 3.198.11.22.182.476.036.772-.146.296-.218.476-.436.734-.22.258-.463.578-.66.774-.22.22-.45.46-.194.906.258.447 1.148 1.891 2.464 3.063 1.694 1.51 3.12 1.98 3.566 2.2.445.218.703.182 1.02-.108.317-.29 1.08-1.187 1.37-1.596.29-.408.577-.34.97-.204.39.136 2.478 1.168 2.902 1.38.425.21.71.317.814.495.105.177.105 1.018-.285 1.977z"/>
        </svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
          Chat with us
        </span>
      </motion.a>
    </div>
  );
}
