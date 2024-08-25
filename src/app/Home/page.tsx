import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import HomeBody from '../../../components/Home/HomeBody'

export default function Index() {
  return (
    <div className='Main'>
      <PageHeader/>
        <HomeBody/>
      <PageFooter/>
    </div>
  )
}
