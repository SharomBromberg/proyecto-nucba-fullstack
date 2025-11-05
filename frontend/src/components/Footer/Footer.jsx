import { Link } from 'react-router-dom'

import { FooterContainerStyled, LinksContainerStyled } from './FooterStyles'

const Footer = () => {
	return (
		<FooterContainerStyled>
			<LinksContainerStyled className="links">
				<Link to="/" style={{ paddingLeft: '2rem' }}></Link>
				<Link to="/" style={{ paddingLeft: '2rem' }}></Link>
				<Link to="/" style={{ paddingLeft: '2rem' }}>
					Contacto
				</Link>
			</LinksContainerStyled>
			<p>
				<span> </span>
			</p>
		</FooterContainerStyled>
	)
}

export default Footer
