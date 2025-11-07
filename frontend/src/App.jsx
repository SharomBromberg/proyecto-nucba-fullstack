import Routes from './routes/Routes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from './redux/productsSlice/products.slice'

import Footer from './components/Footer/Footer'
import Layout from './components/Layout/Layout'
import Navbar from './components/Navbar/Navbar'
import { Toaster } from 'sonner'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <Layout>
        <Toaster richColors />
        <Navbar />
        <Routes />
        <Footer />
      </Layout>
    </>
  )
}

export default App
