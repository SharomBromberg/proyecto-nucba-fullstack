import { Formik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'

import LoginInput from '../../components/UI/LoginInput/LoginInput'
import Submit from '../../components/UI/Submit/Submit'

import { Form, LoginContainerStyled, LoginEmailStyled } from './RegisterStyles'
import { registerInitialValues } from '../../formik/initialValues'
import { registerValidationSchema } from '../../formik/validationSchema'
import { createUser } from '../../axios/axios-user'
import useRedirect from '../../hooks/useRedirect'

const Register = () => {
	const { state } = useLocation()
	const navigate = useNavigate()
	useRedirect(state?.redirectedFromCheckout ? '/checkout' : '/')
	return (
		<LoginContainerStyled>
			<h1>Crea tu cuenta</h1>
			<Formik
				initialValues={registerInitialValues}
				validationSchema={registerValidationSchema}
				onSubmit={async (values, actions) => {
					const user = await createUser(
						values.name,
						values.email,
						values.password
					)
					actions.resetForm()
					if (user) {
						navigate('/verify', {
							state: {
								email: values.email,
								redirectedFromCheckout: state?.redirectedFromCheckout,
							},
						})
					}
				}}
			>
				<Form>
					<LoginInput name="name" type="text" placeholder="Nombre" />
					<LoginInput name="email" type="text" placeholder="Email" />
					<LoginInput name="password" type="password" placeholder="Password" />

					<LoginEmailStyled to="/login">
						<p>¿Ya tenes cuenta? Inicia sesión</p>
					</LoginEmailStyled>
					<Submit>Registrarte</Submit>
				</Form>
			</Formik>
		</LoginContainerStyled>
	)
}

export default Register
