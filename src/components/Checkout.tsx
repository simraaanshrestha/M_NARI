import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, User, Phone, MapPin, Truck, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

const Checkout: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { totalPrice, clearCart, cartItems } = useCart();
  const { addOrder } = useOrders();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'esewa'>('cod');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      addOrder({
        items: cartItems.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        total: totalPrice,
        customer: customerInfo,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'esewa' ? 'Paid' : 'Pending'
      });

      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        onClose();
        setIsSuccess(false);
        setStep(1);
        setCustomerInfo({ name: '', phone: '', address: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-deep/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-emerald-deep border border-gold/20 p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gold/60 hover:text-gold z-10">
              <X size={24} />
            </button>

            {isSuccess ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/30"
                >
                  <ShieldCheck className="text-gold" size={40} />
                </motion.div>
                <h2 className="text-3xl font-display font-bold text-pearl mb-4 italic">Payment Confirmed</h2>
                <p className="text-pearl/60 font-light">Thank you, {customerInfo.name.split(' ')[0]}. Your NARI piece is being prepared.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-display font-bold text-pearl mb-2 tracking-wider italic">Secure Acquisition</h2>
                  <div className="flex justify-center gap-2">
                    <div className={`h-1 w-8 rounded-full ${step === 1 ? 'bg-gold' : 'bg-gold/20'}`} />
                    <div className={`h-1 w-8 rounded-full ${step === 2 ? 'bg-gold' : 'bg-gold/20'}`} />
                  </div>
                </div>

                {step === 1 ? (
                  <form onSubmit={handleNext} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-4 text-gold/40" size={18} />
                        <input
                          required
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          type="text"
                          placeholder="Ex: Your Name"
                          className="w-full bg-white/5 border border-gold/20 p-4 pl-12 text-pearl placeholder:text-pearl/20 focus:border-gold outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Contact Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-4 text-gold/40" size={18} />
                        <input
                          required
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          type="telephone"
                          placeholder="+977 98XXXXXXXX"
                          className="w-full bg-white/5 border border-gold/20 p-4 pl-12 text-pearl placeholder:text-pearl/20 focus:border-gold outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Delivery Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-gold/40" size={18} />
                        <textarea
                          required
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          placeholder="Street, City, Area 
(Detailed Location for Delivery)"
                          rows={3}
                          className="w-full bg-white/5 border border-gold/20 p-4 pl-12 text-pearl placeholder:text-pearl/20 focus:border-gold outline-none transition-colors resize-none"
                        />
                      </div>
                    </div>

                    <button type="submit" className="w-full btn-gold mt-4">
                      Continue to Payment
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handlePayment} className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Select Payment Method</label>

                      <div
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-6 border cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'cod' ? 'border-gold bg-gold/5' : 'border-gold/10 bg-white/5 hover:border-gold/30'}`}
                      >
                        <div className="flex items-center gap-4">
                          <Truck className={paymentMethod === 'cod' ? 'text-gold' : 'text-pearl/40'} />
                          <div>
                            <p className="text-pearl text-sm font-medium">Cash on Delivery</p>
                            <p className="text-[10px] text-pearl/40 uppercase tracking-widest">Pay upon arrival</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'cod' ? 'border-gold bg-gold' : 'border-gold/20'}`} />
                      </div>

                      <div
                        onClick={() => setPaymentMethod('esewa')}
                        className={`p-6 border cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'esewa' ? 'border-gold bg-gold/5' : 'border-gold/10 bg-white/5 hover:border-gold/30'}`}
                      >
                        <div className="flex items-center gap-4">
                          <Smartphone className={paymentMethod === 'esewa' ? 'text-gold' : 'text-pearl/40'} />
                          <div>
                            <p className="text-pearl text-sm font-medium">E-sewa Wallet</p>
                            <p className="text-[10px] text-pearl/40 uppercase tracking-widest">Instant Digital Payment</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'esewa' ? 'border-gold bg-gold' : 'border-gold/20'}`} />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gold/10">
                      <div className="flex justify-between items-end mb-6">
                        <span className="text-pearl/40 uppercase tracking-[0.2em] text-[10px]">Grand Total</span>
                        <span className="text-3xl font-display font-bold text-gold">Rs {totalPrice.toLocaleString()}</span>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 py-4 border border-gold/20 text-gold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
                        >
                          Back
                        </button>
                        <button type="submit" className="flex-[2] btn-gold">
                          {paymentMethod === 'esewa' ? 'Pay via eSewa' : 'Confirm Order'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                <div className="mt-8 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.2em] text-pearl/20">
                  <ShieldCheck size={12} />
                  <span>Verified Transaction</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Checkout;
