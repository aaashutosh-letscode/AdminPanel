import React, { createContext, useContext, useState, useCallback } from 'react';

const defaultSettings = {
  restaurant: {
    name: 'The Rustic Table',
    phone: '(415) 555-0123',
    logo: null,
  },
  admin: {
    name: 'Skylar James',
    email: 'admin@restaurant.com',
  },
  theme: 'light',
};

const SettingsContext = createContext(null);

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSettings = useCallback((section, data) => {
    setSettings((prev) => {
      if (section === 'theme') return { ...prev, theme: data };
      return { ...prev, [section]: { ...prev[section], ...data } };
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
