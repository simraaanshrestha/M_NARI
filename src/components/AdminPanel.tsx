import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts, type Product } from '../context/ProductContext';
import { useOrders, type Order } from '../context/OrderContext';
import { Package, IndianRupee, Plus, Trash2, ChevronLeft, LayoutDashboard, History, Image as ImageIcon, Edit3, X, User, Phone, MapPin, CreditCard, CheckCircle2, Clock, Smartphone, LogOut, AlertTriangle } from 'lucide-react';

const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { products, addProduct, removeProduct, updateProduct } = useProducts();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<'inventory' | 'sales'>('inventory');
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Rings', image: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const formattedPrice = formData.price.startsWith('Rs')
      ? formData.price
      : `Rs ${formData.price.trim()}`;

    if (editingId) {
      updateProduct(editingId, { ...formData, price: formattedPrice });
      setEditingId(null);
    } else {
      const imageUrl = formData.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800';
      addProduct({ ...formData, image: imageUrl, price: formattedPrice });
    }
    setFormData({ name: '', price: '', category: 'Rings', image: '' });
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price.replace('Rs ', ''),
      category: product.category,
      image: product.image
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', category: 'Rings', image: '' });
  };

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="min-h-screen bg-emerald-deep text-pearl font-sans">
      <nav className="border-b border-gold/10 px-8 py-6 flex justify-between items-center bg-emerald-deep/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-display font-bold tracking-widest italic text-gold">NARI ADMIN</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-gold text-white' : 'hover:bg-white/5 text-pearl/60'}`}
          >
            <Package size={16} /> Inventory
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest transition-all ${activeTab === 'sales' ? 'bg-gold text-white' : 'hover:bg-white/5 text-pearl/60'}`}
          >
            <History size={16} /> Sales
          </button>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest transition-all hover:bg-red-500/10 text-red-400 border border-transparent hover:border-red-500/20"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        {activeTab === 'inventory' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 glass-card border-gold/20"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-display font-bold text-gold italic flex items-center gap-3">
                  {editingId ? <Edit3 size={20} /> : <Plus size={20} />}
                  {editingId ? 'Edit Piece' : 'Add New Piece'}
                </h2>
                {editingId && (
                  <button onClick={cancelEdit} className="text-pearl/40 hover:text-gold">
                    <X size={20} />
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Product Name</label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    placeholder="e.g. Royal Emerald Ring"
                    className="w-full bg-white/5 border border-gold/20 p-4 text-pearl focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Price (Rs)</label>
                  <input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    type="text"
                    placeholder="15,000"
                    className="w-full bg-white/5 border border-gold/20 p-4 text-pearl focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Image URL (Optional)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={18} />
                    <input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      type="text"
                      placeholder="https://unsplash.com/..."
                      className="w-full bg-white/5 border border-gold/10 p-4 pl-12 text-pearl focus:border-gold outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-gold/20 p-4 text-pearl focus:border-gold outline-none transition-colors appearance-none"
                  >
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelets">Bracelets</option>
                  </select>
                </div>
                <button type="submit" className="w-full btn-gold">
                  {editingId ? 'Update Collection' : 'Catalog Piece'}
                </button>
              </form>
            </motion.div>

            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-display font-bold text-pearl mb-8 italic">Current Collection ({products.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    className={`flex justify-between items-center p-4 border ${editingId === product.id ? 'border-gold bg-gold/5' : 'border-gold/10 bg-white/5'} group hover:border-gold/40 transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-pearl/5 border border-gold/10 overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-display text-pearl">{product.name}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-gold">{product.category} • {product.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="p-2 text-pearl/20 hover:text-gold transition-colors"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="p-2 text-pearl/20 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card border-gold/20 p-8 flex flex-col items-center text-center">
                <IndianRupee className="text-gold mb-4" size={32} />
                <span className="text-[10px] uppercase tracking-[0.3em] text-pearl/40 mb-2">Total Revenue</span>
                <span className="text-4xl font-display font-bold text-gold">Rs {totalRevenue.toLocaleString()}</span>
              </div>
              <div className="glass-card border-gold/20 p-8 flex flex-col items-center text-center">
                <LayoutDashboard className="text-gold mb-4" size={32} />
                <span className="text-[10px] uppercase tracking-[0.3em] text-pearl/40 mb-2">Sales Volume</span>
                <span className="text-4xl font-display font-bold text-gold">{orders.length}</span>
              </div>
              <div className="glass-card border-gold/20 p-8 flex flex-col items-center text-center">
                <Package className="text-gold mb-4" size={32} />
                <span className="text-[10px] uppercase tracking-[0.3em] text-pearl/40 mb-2">Inventory Count</span>
                <span className="text-4xl font-display font-bold text-gold">{products.length}</span>
              </div>
            </div>

            <div className="glass-card border-gold/20 overflow-hidden">
              <div className="px-8 py-6 border-b border-gold/10">
                <h2 className="text-xl font-display font-bold text-gold italic">Recent Sales Details</h2>
                <p className="text-[10px] text-pearl/20 uppercase tracking-widest mt-1 italic">Click an order to view customer details</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[10px] uppercase tracking-[0.2em] text-pearl/40 bg-white/5">
                    <tr>
                      <th className="px-8 py-4 font-normal">Order ID</th>
                      <th className="px-8 py-4 font-normal">Date</th>
                      <th className="px-8 py-4 font-normal">Customer</th>
                      <th className="px-8 py-4 font-normal">Payment</th>
                      <th className="px-8 py-4 font-normal text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/5">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-12 text-center text-pearl/20 italic">No sales recorded yet.</td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr
                          key={order.id}
                          onClick={() => setSelectedOrder(order)}
                          className="hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                          <td className="px-8 py-6 font-mono text-xs text-gold group-hover:underline">{order.id}</td>
                          <td className="px-8 py-6 text-sm text-pearl/60">{order.date}</td>
                          <td className="px-8 py-6 text-sm text-pearl">{order.customer?.name || 'Guest'}</td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${order.paymentStatus === 'Paid' ? 'bg-emerald-light/20 text-emerald-light' : 'bg-gold/20 text-gold'}`}>
                              {order.paymentStatus || 'Pending'}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right font-display font-bold text-gold">Rs {order.total.toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-emerald-deep/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-emerald-deep border border-gold/20 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 text-gold/60 hover:text-gold z-10"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Order Summary */}
                <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-gold/10">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-gold/60 mb-4 block italic font-bold">Order Details</span>
                  <h2 className="text-3xl font-display font-bold text-pearl mb-2 italic">{selectedOrder.id}</h2>
                  <p className="text-xs text-pearl/40 mb-10">{selectedOrder.date}</p>

                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60 mb-2 block">Acquired Pieces</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-4 custom-scrollbar">
                        {selectedOrder.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-pearl/80">{item.quantity}x {item.name}</span>
                            <span className="text-gold">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gold/10 flex justify-between items-end">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-pearl/40">Acquisition Total</span>
                      <span className="text-2xl font-display font-bold text-gold">Rs {selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Customer & Payment */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-white/5">
                  <div className="space-y-10">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60 mb-4 block">Customer Identity</label>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <User size={18} className="text-gold/40" />
                          <span className="text-pearl text-sm font-medium">{selectedOrder.customer?.name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Phone size={18} className="text-gold/40" />
                          <span className="text-pearl text-sm font-medium">{selectedOrder.customer?.phone || 'N/A'}</span>
                        </div>
                        <div className="flex items-start gap-4">
                          <MapPin size={18} className="text-gold/40 mt-1" />
                          <span className="text-pearl text-sm font-light leading-relaxed">{selectedOrder.customer?.address || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gold/60 mb-4 block">Payment Intelligence</label>
                      <div className={`p-4 border rounded-none flex items-center justify-between ${(selectedOrder.paymentStatus || 'Pending') === 'Paid' ? 'border-emerald-light/20 bg-emerald-light/5' : 'border-gold/20 bg-gold/5'}`}>
                        <div className="flex items-center gap-3">
                          {selectedOrder.paymentMethod === 'esewa' ? <Smartphone size={20} className="text-gold" /> : <CreditCard size={20} className="text-gold" />}
                          <div className="flex flex-col">
                            <span className="text-pearl text-xs font-bold uppercase tracking-widest">{selectedOrder.paymentMethod === 'esewa' ? 'eSewa Wallet' : 'Cash on Delivery'}</span>
                            <span className="text-[10px] text-pearl/40 uppercase tracking-widest">{selectedOrder.paymentMethod === 'esewa' ? 'Instant Digital' : 'Physical Transfer'}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${(selectedOrder.paymentStatus || 'Pending') === 'Paid' ? 'text-emerald-light' : 'text-gold'}`}>{selectedOrder.paymentStatus || 'Pending'}</span>
                          {(selectedOrder.paymentStatus || 'Pending') === 'Paid' ? <CheckCircle2 size={16} className="text-emerald-light mt-1" /> : <Clock size={16} className="text-gold mt-1" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-emerald-deep/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm glass-card border-red-500/20 p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} className="text-red-400" />
              </div>
              <h2 className="text-xl font-display font-bold text-pearl mb-2 italic">Confirm Logout</h2>
              <p className="text-xs text-pearl/40 mb-8 uppercase tracking-widest">Are you sure you want to Log Out?</p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 text-[10px] uppercase tracking-widest text-pearl/60 hover:text-pearl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-[10px] uppercase tracking-widest border border-red-500/20 transition-all"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
