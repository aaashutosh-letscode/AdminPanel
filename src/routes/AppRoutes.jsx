import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import MenuPage from '../pages/Menu/MenuPage';
import OrdersPage from '../pages/Orders/OrdersPage';
import OffersPage from '../pages/Offers/OffersPage';
import HomeCMSPage from '../pages/HomeCMS/HomeCMSPage';
import SettingsPage from '../pages/Settings/SettingsPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="home-cms" element={<HomeCMSPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
