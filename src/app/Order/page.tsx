import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import PageOrder from 'components/Order/PageOrder'
export default function Order() {
  return (
    <div className='Main'>
      <PageHeader/>
        <PageOrder/>
      <PageFooter/>
    </div>
  )
}
