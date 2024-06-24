import PageHeader from '../../components/Header/PageHeader'
import PageFooter from '../../components/Footer/PageFooter'
import PageBody from '../../components/Body/PageBody'

export default function Index() {
  return (
    <div className='Main'>
      <PageHeader />
      <PageBody />
      <PageFooter />
    </div>
  )
}
