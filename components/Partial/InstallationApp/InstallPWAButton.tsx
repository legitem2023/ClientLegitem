import { useEffect, useState } from 'react';

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        } else {
          console.log('User dismissed the PWA installation');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return deferredPrompt ? (
    <button onClick={handleInstallClick} style={{ boxShadow:"0.5px 0.5px 3px #000",height:"50px",width:"150px",border:"none", borderRadius: '5px',padding: '10px',margin:"5px", backgroundColor: '#00a380', color: 'white',position: 'relative',right: '2px',zIndex:'9999999999' }}>
      Install App
    </button>
  ) :null;
};

export default InstallPWAButton;
