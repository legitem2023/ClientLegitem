import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import LoginForm from 'components/Login/LoginForm'
export default function Order() {
  return (
    <div className='Main'>
      <PageHeader/>
        <LoginForm/>
      <PageFooter/>
    </div>
  )
}
