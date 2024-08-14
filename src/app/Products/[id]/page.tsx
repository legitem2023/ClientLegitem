import ProductView from 'components/ProductView/ProductView'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Index() {
  return (
    <div className='Main'>
        <ProductView/>
        <ToastContainer/>
    </div>
  )
}
