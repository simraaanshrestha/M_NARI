import React from 'react';
import { motion } from 'framer-motion';

const Story: React.FC = () => {
  return (
    <section className="py-24 md:py-40 bg-emerald-deep text-pearl overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square w-full max-w-md bg-pearl/5 border border-gold/20 p-8">
              <div className="w-full h-full bg-gradient-to-tr from-emerald-deep to-pearl/10 flex items-center justify-center">
                <span className="text-gold/20 text-7xl font-display italic">NARI</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute -bottom-10 -right-10 w-64 h-80 bg-gold/10 backdrop-blur-xl border border-gold/30 p-4 hidden md:block"
            >
              <div className="w-full h-full border border-gold/10" >
                <div className="w-full h-full bg-gradient-to-tr from-emerald-deep to-pearl/10 flex items-center justify-center">
                  <span className="text-gold/20 text-6xl font-display italic">2025</span>
                </div>
              </div>

            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-xs tracking-[0.5em] uppercase text-gold mb-6 block">Our Heritage</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              A Collection of <br />
              <span className="italic font-normal text-gold">Pure Brilliance</span>
            </h2>
            <div className="space-y-6 text-pearl/70 text-lg font-light leading-relaxed">
              <p>
                Founded in the heart of Nepal, NARI Joaillerie is a standard of luxury brand. Our journey began with a single vision: to transform the world's finest art's into wearable masterpieces.
              </p>
              <p>
                Each piece is a testament to our dedication, blending centuries-old techniques with modern innovation to create something truly eternal.
              </p>
            </div>
            <button className="mt-12 group flex items-center gap-4 text-xs tracking-[0.3em] uppercase hover:text-gold transition-colors">
              <span> Our Story</span>
              <div className="w-12 h-[1px] bg-gold group-hover:w-20 transition-all duration-500" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
