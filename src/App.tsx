import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import IntersectObserver from '@/components/common/IntersectObserver';
import PWAInstallPrompt from '@/components/common/PWAInstallPrompt';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { routes } from './routes';

const App: React.FC = () =&gt; {
  return (
    &lt;ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}&gt;
      &lt;AuthProvider&gt;
        &lt;Router&gt;
          &lt;IntersectObserver /&gt;
          <div>
            &lt;Routes&gt;
              {routes.map((route, index) =&gt; (
                &lt;Route key={index} path={route.path} element={route.element} /&gt;
              ))}
              &lt;Route path="*" element={&lt;Navigate to="/login" replace /&gt;} /&gt;
            &lt;/Routes&gt;
          </div>
          &lt;Toaster richColors position="top-center" /&gt;
          &lt;PWAInstallPrompt /&gt;
        &lt;/Router&gt;
      &lt;/AuthProvider&gt;
    &lt;/ThemeProvider&gt;
  );
};

export default App;
