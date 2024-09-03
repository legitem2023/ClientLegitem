// components/Notification.js
import { useCartGlobalState } from 'components/context/ShoppingCartProvider';
import { useRouter } from 'next/navigation';
const Notification = ({ onClose }) => {
  const { notificationCount } = useCartGlobalState();
  const router = useRouter();
  if (notificationCount === 0) return null;
  return (
    <div className="Notification" onClick={()=>router.push('/Cart')} style={{'display':notificationCount < 1?'none':'flex'}}>
      {notificationCount}
    </div>
  );
};

export default Notification;
