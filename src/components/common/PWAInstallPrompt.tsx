import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () =&gt; Promise&lt;void&gt;;
  userChoice: Promise&lt;{ outcome: 'accepted' | 'dismissed' }&gt;;
}

export default function PWAInstallPrompt() {
  const [installEvent, setInstallEvent] = useState&lt;BeforeInstallPromptEvent | null&gt;(null);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() =&gt; {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }
    if (localStorage.getItem('pwa-install-dismissed') === 'true') {
      setDismissed(true);
      return;
    }
    const handler = (e: Event) =&gt; {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () =&gt; setInstalled(true));
    return () =&gt; { window.removeEventListener('beforeinstallprompt', handler); };
  }, []);

  const handleInstall = async () =&gt; {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setInstallEvent(null);
  };

  const handleDismiss = () =&gt; {
    setDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (installed || dismissed || !installEvent) return null;

  return (
    <div>
      <div>
        <div>
          <span>F</span>
        </div>
        <div>
          <p>Install FPC</p>
          <p>
            Add to your home screen for a faster, app-like experience — no App Store needed.
          </p>
          <div>
            &lt;Button onClick={handleInstall} size="sm" className="h-8 text-xs gap-1.5"&gt;
              &lt;Download className="w-3.5 h-3.5" /&gt;
              Install
            &lt;/Button&gt;
            &lt;Button onClick={handleDismiss} variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground"&gt;
              Not now
            &lt;/Button&gt;
          </div>
        </div>
        &lt;button type="button" onClick={handleDismiss} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"&gt;
          &lt;X className="w-4 h-4" /&gt;
        &lt;/button&gt;
      </div>
    </div>
  );
}
