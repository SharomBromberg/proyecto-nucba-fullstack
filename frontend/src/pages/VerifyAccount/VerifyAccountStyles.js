import styled from 'styled-components'
import { Form as FormikForm } from 'formik'

export const VerifyContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 2rem 1rem;
	gap: 1rem;

	h1 {
		font-size: 2rem;
	}

	p {
		max-width: 420px;
		color: rgba(255, 255, 255, 0.8);
	}
`

export const VerifyForm = styled(FormikForm)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	width: 100%;
	max-width: 420px;
	padding: 0 1rem;
`

export const HelperText = styled.p`
	font-size: 0.85rem;
	color: rgba(255, 255, 255, 0.65);
	margin: 0;
`

