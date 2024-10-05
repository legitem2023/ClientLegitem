import PageHeader from '../../components/Partial/Header/PageHeader';
import PageFooter from '../../components/Partial/Footer/PageFooter';
import PageBody from '../../components/Products/ProductsBody';
import { Suspense } from 'react';
import Loading from 'components/Partial/LoadingAnimation/Loading';
export default function Index() {
  return (
    <Suspense fallback={<Loading/>}>
    <div className='Main'>
      <PageHeader />
      <PageBody />
      <PageFooter />
    </div>
    </Suspense>
  )
}
