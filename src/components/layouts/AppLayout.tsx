import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import { MessageCircle } from 'lucide-react';
import OfflineBanner from '@/components/common/OfflineBanner';

const tabTitles: Record&lt;string, string&gt; = {
  '/app/chats': 'FPC',
  '/app/calls': 'Calls',
  '/app/status': 'Status',
  '/app/settings': 'Settings',
};

interface Props { children: React.ReactNode; }

export default function AppLayout({ children }: Props) {
  const location = useLocation();
  const isChatRoom = location.pathname.match(/^\/app\/chats\/.+/);

  return (
    <div>
      &lt;OfflineBanner /&gt;
      {!isChatRoom && (
        <header>
          <div>
            &lt;MessageCircle className="w-6 h-6 text-white" /&gt;
            <h1>
              {tabTitles[location.pathname] || 'FPC'}
            </h1>
          </div>
        </header>
      )}
      &lt;main className="flex-1 min-h-0 overflow-hidden"&gt;
        <div>{children}</div>
      &lt;/main&gt;
      {!isChatRoom && &lt;BottomNav /&gt;}
    </div>
  );
}
