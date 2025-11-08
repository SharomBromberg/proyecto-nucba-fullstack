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
		<div className="AppRoot">
			<Layout>
				<Toaster richColors />
				<Navbar />
				<main className="AppContent">
					<Routes />
				</main>
				<Footer />
			</Layout>
		</div>
	)
}

export default App
