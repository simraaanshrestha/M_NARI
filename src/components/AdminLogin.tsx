import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication: admin / nari2026
    setTimeout(() => {
      if (username === 'admin' && password === 'nari2026') {
        onLogin();
      } else {
        setError('Invalid credentials. Please contact system administrator.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-emerald-deep flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-light/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-display font-bold tracking-[0.3em] text-gold mb-4 italic"
          >
            NARI
          </motion.h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-pearl/40">Administrative Portal</p>
        </div>

        <div className="glass-card border-gold/20 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gold/50" />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Registry Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={18} />
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-gold/10 p-4 pl-12 text-pearl focus:border-gold outline-none transition-colors placeholder:text-pearl/10"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Access Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={18} />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-gold/10 p-4 pl-12 text-pearl focus:border-gold outline-none transition-colors placeholder:text-pearl/10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full btn-gold group relative overflow-hidden py-4"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Authenticate Access</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-10 flex items-center justify-between border-t border-gold/10 pt-8">
            <button
              onClick={onBack}
              className="text-[10px] uppercase tracking-[0.2em] text-pearl/40 hover:text-gold transition-colors"
            >
              Back to Boutique
            </button>
            <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-pearl/20">
              <ShieldCheck size={12} />
              <span>Encrypted Session</span>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-[9px] uppercase tracking-[0.5em] text-pearl/20"
        >
          NARI Joaillerie • System Integrity
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
