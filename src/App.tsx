import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { Layout } from "@/components/layout/Layout";
// Import other pages (to be created)
import ResourceChannelDetail from "@/pages/ResourceChannelDetail";
import ResourceChannels from "@/pages/ResourceChannels";
import DemandPublish from "@/pages/DemandPublish";
import ResourceProviderOnboarding from "@/pages/ResourceProviderOnboarding";
import ConnectionProgress from "@/pages/ConnectionProgress";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/AdminDashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Layout>
        <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resource-channels" element={<ResourceChannels />} />
            <Route path="/resource-channels/:id" element={<ResourceChannelDetail />} />
            <Route path="/progress-tracking" element={<ConnectionProgress />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/demand-publish" element={<DemandPublish />} />
              <Route path="/resource-onboarding" element={<ResourceProviderOnboarding />} />
              <Route path="/about" element={<Home />} />
            <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        </Routes>s
      </Layout>
    </AuthContext.Provider>
  );
}