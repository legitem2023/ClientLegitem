import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ForgotPasswordForm from 'components/ForgotPassword/ForgotPasswordForm';

export default function Order() {
  return (
    <div className='Main'>
      <PageHeader/>
        <ForgotPasswordForm/>
        <ToastContainer/>
      <PageFooter/>
    </div>
  )
}
