import PageHeader from '../../../components/Header/PageHeader' 
import PageFooter from '../../../components/Footer/PageFooter'
import LoginForm from 'components/Login/LoginForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Order() {
  return (
    <div className='Main'>
      <PageHeader/>
        <LoginForm/>
        <ToastContainer/>
      <PageFooter/>
    </div>
  )
}
