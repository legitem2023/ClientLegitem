import PageHeader from '../../../components/Header/PageHeader' 
import PageFooter from '../../../components/Footer/PageFooter'
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
