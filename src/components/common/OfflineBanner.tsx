import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() =&gt; {
    const goOffline = () =&gt; setIsOffline(true);
    const goOnline = () =&gt; setIsOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () =&gt; {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div>
      &lt;WifiOff className="w-3.5 h-3.5 shrink-0" /&gt;
      <span>You're offline — some features may be unavailable</span>
    </div>
  );
}
