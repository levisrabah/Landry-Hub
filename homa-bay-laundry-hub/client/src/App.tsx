import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import ProviderDashboard from './pages/ProviderDashboard'; // Import provider dashboard
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationBanner from './components/NotificationBanner';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <ScrollToTop />
          <NotificationBanner />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/provider-dashboard" element={<ProtectedRoute><ProviderDashboard /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;