
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import HealthToolsPage from './pages/HealthToolsPage';
import ContactPage from './pages/ContactPage';
import OrderPage from './pages/OrderPage';
import LoyaltyPage from './pages/LoyaltyPage';
import BranchesPage from './pages/BranchesPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import VirtualAssistant from './components/VirtualAssistant';
import { supabase } from './services/supabase';
import { CartItem, User, Product, Order } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    const syncData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const { data: medical } = await supabase
            .from('medical_records')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          setCurrentUser({
            id: session.user.id,
            role: profile.role || 'client',
            name: profile.full_name || session.user.email?.split('@')[0],
            email: session.user.email || '',
            loyaltyPoints: profile.points || 0,
            tier: profile.tier || 'Silver',
            medicalRecord: {
              allergies: medical?.allergies || [],
              chronicConditions: medical?.conditions || [],
              lastCheckup: medical?.last_visit || 'N/A'
            }
          });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    syncData();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => syncData());
    return () => subscription.unsubscribe();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleOrder = async (newOrder: Order) => {
    if (currentUser?.id) {
      await supabase.from('orders').insert({
        user_id: currentUser.id,
        order_number: newOrder.id,
        status: newOrder.status,
        total_amount: newOrder.total,
        items_snapshot: newOrder.items
      });
    }
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <span className="text-white font-black uppercase tracking-[0.3em] text-xs">Conectando a Cloud Node</span>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen relative bg-slate-50 font-sans">
        {currentUser && (
          <Navbar 
            user={currentUser} 
            cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
            onSwitchRole={() => {}} 
          />
        )}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/products" element={currentUser ? <ProductsPage onAddToCart={addToCart} /> : <Navigate to="/login" />} />
            <Route path="/tools" element={currentUser ? <HealthToolsPage /> : <Navigate to="/login" />} />
            <Route path="/contact" element={currentUser ? <ContactPage /> : <Navigate to="/login" />} />
            <Route path="/order" element={currentUser ? <OrderPage cart={cart} user={currentUser} onRemove={removeFromCart} onComplete={handleOrder} /> : <Navigate to="/login" />} />
            <Route path="/loyalty" element={currentUser ? <LoyaltyPage user={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/branches" element={currentUser ? <BranchesPage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={currentUser ? <ProfilePage user={currentUser} orders={orders} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={currentUser?.role === 'pharmacy' ? <AdminDashboard /> : <Navigate to="/" />} />
          </Routes>
        </main>

        {currentUser && <Footer />}

        {currentUser && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <button
              onClick={() => setIsAssistantOpen(!isAssistantOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] p-4 shadow-2xl transition-all flex items-center gap-3 group active:scale-95 border-b-4 border-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-black uppercase tracking-widest text-xs">
                {isAssistantOpen ? 'Cerrar' : 'Chat Soporte'}
              </span>
            </button>
            
            {isAssistantOpen && (
              <div className="absolute bottom-20 right-0 w-[350px] md:w-[480px]">
                <VirtualAssistant onClose={() => setIsAssistantOpen(false)} />
              </div>
            )}
          </div>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
