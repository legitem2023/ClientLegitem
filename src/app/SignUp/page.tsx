import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
// import LoginForm from 'components/Login/LoginForm'
import SignUpForm from 'components/SignUp/SignUp';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpPage() {
  return (
    <div className='Main'>
      <PageHeader/>
        <SignUpForm/>
        <ToastContainer/>
      <PageFooter/>
    </div>
  )
}
