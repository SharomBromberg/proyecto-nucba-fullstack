import { Formik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoginInput from '../../components/UI/LoginInput/LoginInput'
import Submit from '../../components/UI/Submit/Submit'
import {
	VerifyContainer,
	VerifyForm,
	HelperText,
} from './VerifyAccountStyles'
import {
	verifyInitialValues,
} from '../../formik/initialValues'
import { verifyValidationSchema } from '../../formik/validationSchema'
import { verifyAccountRequest } from '../../axios/axios-user'
import { setCurrentUser } from '../../redux/user/userSlice'

const VerifyAccount = () => {
	const { state } = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const emailFromState = state?.email ?? ''
	const redirectedFromCheckout = state?.redirectedFromCheckout ?? false

	return (
		<VerifyContainer>
			<h1>Verifica tu cuenta</h1>
			<p>
				Enviamos un código de verificación a tu correo. Ingrésalo para activar tu cuenta.
			</p>
			<Formik
				initialValues={{
					...verifyInitialValues,
					email: emailFromState,
				}}
				enableReinitialize
				validationSchema={verifyValidationSchema}
				onSubmit={async (values, actions) => {
					const verified = await verifyAccountRequest(
						values.email,
						values.code
					)

					if (verified) {
						dispatch(
							setCurrentUser({
								...verified.usuario,
								token: verified.token,
							})
						)
						actions.resetForm()
						navigate(redirectedFromCheckout ? '/checkout' : '/')
					}
				}}
			>
				<VerifyForm>
					<LoginInput name="email" type="email" placeholder="Email" />
					<LoginInput
						name="code"
						type="text"
						placeholder="Código de verificación"
					/>
					<HelperText>
						Si no recibiste el correo, revisa tu carpeta de spam o vuelve a registrarte para generar un nuevo código.
					</HelperText>
					<Submit>Verificar cuenta</Submit>
				</VerifyForm>
			</Formik>
		</VerifyContainer>
	)
}

export default VerifyAccount

