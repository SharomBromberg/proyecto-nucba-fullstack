import { useNavigate } from 'react-router-dom'

import Button from '../../components/UI/Button/Button'

import {
	ContainerInfoStyled,
	CustomImageStyled,
	PatternStyled,
	TextStyled,
	TitleStyled,
} from './FelicitacionesStyled'

const Felicitaciones = () => {
	const navigate = useNavigate()
	return (
		<div>
			<TextStyled>
				<div>
					<CustomImageStyled src="/assets/icons/sucess.png" alt="Logo" />
				</div>
				<ContainerInfoStyled>
					<TitleStyled>¡Felicitaciones!</TitleStyled>
					<p>Pedido realizado con éxito</p>
				</ContainerInfoStyled>
				<Button onClick={() => navigate('/mis-ordenes')}>Volver</Button>
			</TextStyled>
			<PatternStyled />
		</div>
	)
}

export default Felicitaciones
