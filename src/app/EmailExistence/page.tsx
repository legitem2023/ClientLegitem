import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CheckEmailForm from 'components/CheckEmailExistence/CheckEmailForm';

export default function Order() {
  return (
    <div className='Main'>
      <PageHeader/>
        <CheckEmailForm/>
        <ToastContainer/>
      <PageFooter/>
    </div>
  )
}
