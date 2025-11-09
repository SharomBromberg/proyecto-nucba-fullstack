import { Routes as ReactDomRoutes, Route } from 'react-router-dom'

import Checkout from '../pages/Checkout/Checkout'
import Felicitaciones from '../pages/Felicitaciones/Felicitaciones'
import Home from '../pages/Home/Home'
import Login from '../pages//Login/Login'
import MisOrdenes from '../pages/MisOrdenes/MisOrdenes'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Register from '../pages/Register/Register'
import Resumen from '../pages/Resumen/Resumen'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import AdminRoute from '../components/ProtectedRoute/AdminRoute'
import AdminProducts from '../pages/AdminProducts/AdminProducts'
import VerifyAccount from '../pages/VerifyAccount/VerifyAccount'

function Routes() {
	return (
		<ReactDomRoutes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/verify" element={<VerifyAccount />} />
			<Route path="/mis-ordenes" element={<MisOrdenes />} />
			<Route path="/felicitaciones" element={<Felicitaciones />} />
			<Route path="/resumen/:orderId" element={<Resumen />} />
			<Route path="/producto/:productId" element={<ProductDetail />} />
			<Route
				path="/admin/productos"
				element={
					<AdminRoute>
						<AdminProducts />
					</AdminRoute>
				}
			/>

			<Route
				path="/checkout"
				element={
					<ProtectedRoute redirectTo={'/register'}>
						<Checkout />
					</ProtectedRoute>
				}
			/>

			<Route path="*" element={<PageNotFound />} />
		</ReactDomRoutes>
	)
}

export default Routes
