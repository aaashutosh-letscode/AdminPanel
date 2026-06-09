import React from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <SettingsProvider>
      <AppRoutes />
    </SettingsProvider>
  );
};

export default App;
