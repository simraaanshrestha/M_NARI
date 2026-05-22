import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Moon, Sun, ShoppingBag, Menu } from 'lucide-react';

const Navbar: React.FC<{ onAdminClick: () => void }> = () => {
  const { theme, toggleTheme } = useTheme();
  const { cartItems, setIsCartOpen } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-5 flex justify-between items-center bg-white/80 dark:bg-emerald-deep/90 backdrop-blur-md border-b border-gold/20 shadow-lg transition-all duration-500"
    >
      {/* Left Group */}
      <div className="flex items-center gap-8 z-10">
        <div className="group relative">
          <div className="flex items-center gap-3 cursor-pointer group-hover:text-gold transition-colors">
            <Menu className="w-6 h-6 text-obsidian dark:text-pearl" />
            <span className="hidden md:block text-xs tracking-[0.3em] uppercase text-obsidian/60 dark:text-pearl/60">Collections</span>
          </div>

          {/* Categories Dropdown */}
          <div className="absolute top-full left-0 mt-4 w-56 bg-white dark:bg-emerald-deep border border-gold/20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all p-2 shadow-2xl">
            <div className="p-4 border-b border-gold/10 mb-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Explore NARI</span>
            </div>
            <button
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest text-obsidian/70 dark:text-pearl/70 hover:bg-gold/5 hover:text-gold transition-all"
            >
              Rings
            </button>
            <button
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest text-obsidian/70 dark:text-pearl/70 hover:bg-gold/5 hover:text-gold transition-all"
            >
              Necklaces
            </button>
            <button
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest text-obsidian/70 dark:text-pearl/70 hover:bg-gold/5 hover:text-gold transition-all"
            >
              Earrings
            </button>
            <button
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest text-obsidian/70 dark:text-pearl/70 hover:bg-gold/5 hover:text-gold transition-all mb-2"
            >
              Bracelets
            </button>

            {/* <div className="p-2 border-t border-gold/10">
                <button 
                  onClick={onAdminClick}
                  className="flex items-center gap-3 px-2 py-2 text-[9px] uppercase tracking-[0.2em] text-obsidian/40 dark:text-pearl/40 hover:text-gold transition-colors w-full"
                >
                  <Settings size={12} /> System Admin
                </button>
              </div> */}
          </div>
        </div>
      </div>

      {/* Centered Brand Name */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-[0.3em] text-gold-dark dark:text-gold italic">
          NARI
        </h1>
      </div>

      {/* Right Group */}
      <div className="flex items-center gap-8 z-10">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gold/10 transition-colors"
        >
          {theme === 'light' ? <Moon className="w-5 h-5 text-obsidian" /> : <Sun className="w-5 h-5 text-pearl" />}
        </button>
        <div className="relative group cursor-pointer" onClick={() => setIsCartOpen(true)}>
          <ShoppingBag className="w-5 h-5 text-obsidian dark:text-pearl group-hover:text-gold transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
