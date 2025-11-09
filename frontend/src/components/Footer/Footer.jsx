import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

import {
	FooterContainerStyled,
	FooterInnerStyled,
	BrandingStyled,
	SocialLinksStyled,
	SocialLinkStyled,
	ContactLinkStyled,
} from './FooterStyles'

const SOCIAL_LINKS = [
	{
		id: 'whatsapp',
		href: 'https://wa.me/573248240343',
		label: 'WhatsApp',
		icon: <FaWhatsapp />,
	},
	{
		id: 'instagram',
		href: 'https://www.instagram.com/',
		label: 'Instagram',
		icon: <FaInstagram />,
	},
	{
		id: 'facebook',
		href: 'https://www.facebook.com/',
		label: 'Facebook',
		icon: <FaFacebookF />,
	},
]

const Footer = () => {
	const year = new Date().getFullYear()

	return (
		<FooterContainerStyled>
			<FooterInnerStyled>
				<BrandingStyled>
					<p>Tescsisman · {year}</p>
					<ContactLinkStyled
						href="https://wa.me/573248240343"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaWhatsapp />
						<span>+57 324 824 0343</span>
					</ContactLinkStyled>
				</BrandingStyled>
				<SocialLinksStyled>
					{SOCIAL_LINKS.map(({ id, href, label, icon }) => (
						<SocialLinkStyled
							key={id}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Ir a ${label}`}
						>
							{icon}
						</SocialLinkStyled>
					))}
				</SocialLinksStyled>
			</FooterInnerStyled>
		</FooterContainerStyled>
	)
}

export default Footer
