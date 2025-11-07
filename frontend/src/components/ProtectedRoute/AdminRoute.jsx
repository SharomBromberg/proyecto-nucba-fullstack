import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children, redirectTo = '/login' }) => {
	const { currentUser } = useSelector((state) => state.user)

	if (!currentUser) {
		return <Navigate to={redirectTo} />
	}

	if (currentUser.role !== 'admin') {
		return <Navigate to="/" />
	}

	return children
}

export default AdminRoute
