import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProviderProfile from './pages/ProviderProfile';
import PaymentPage from './pages/PaymentPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Sidebar />
        <main className="flex-grow p-4">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/customer-dashboard" component={CustomerDashboard} />
            <Route path="/provider-dashboard" component={ProviderDashboard} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
            <Route path="/provider-profile/:id" component={ProviderProfile} />
            <Route path="/payment" component={PaymentPage} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;