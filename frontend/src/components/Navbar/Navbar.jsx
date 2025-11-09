import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiHome, FiMenu, FiSettings, FiUser, FiX } from 'react-icons/fi'
import CartIcon from './CartIcon/CartIcon'
import ModalCart from './ModalCart/ModalCart'
import ModalUser from './ModalUser/ModalUser'
import {
	BrandLinkStyled,
	BrandTitleStyled,
	CartNavStyled,
	CustomImageStyled,
	HamburgerButton,
	LinkContainerStyled,
	LinksContainerStyled,
	MenuOverlayStyled,
	NavbarContainerStyled,
	NavbarContentStyled,
	NavActionsStyled,
	NavLinksGroupStyled,
	SpanStyled,
	UserContainerStyled,
	UserNavStyled,
} from './NavbarStyles'
import { toggleMenuHidden } from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const menuRef = useRef(null)
	const toggleButtonRef = useRef(null)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 640)
		}
		window.addEventListener('resize', handleResize)
		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (!isMobile && isMobileMenuOpen) {
			setIsMobileMenuOpen(false)
		}
	}, [isMobile, isMobileMenuOpen])

	useEffect(() => {
		if (!isMobileMenuOpen) return

		const handleOutsideClick = (event) => {
			const menuNode = menuRef.current
			const buttonNode = toggleButtonRef.current

			if (
				menuNode?.contains(event.target) ||
				buttonNode?.contains(event.target)
			) {
				return
			}
			setIsMobileMenuOpen(false)
		}

		document.addEventListener('mousedown', handleOutsideClick)
		document.addEventListener('touchstart', handleOutsideClick)

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
			document.removeEventListener('touchstart', handleOutsideClick)
		}
	}, [isMobileMenuOpen])

	const { currentUser } = useSelector((state) => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userDisplayName = currentUser?.name ?? currentUser?.nombre
	const handleToggleMenu = () => setIsMobileMenuOpen((prev) => !prev)
	const handleMenuItemClick = () => {
		if (isMobile) {
			setIsMobileMenuOpen(false)
		}
	}
	const shouldShowLinks = isMobile ? isMobileMenuOpen : true

	return (
		<NavbarContainerStyled>
			<ModalCart />
			<ModalUser />
			{isMobile && isMobileMenuOpen && (
				<MenuOverlayStyled onClick={() => setIsMobileMenuOpen(false)} />
			)}
			<NavbarContentStyled>
				<BrandLinkStyled to="/">
					<CustomImageStyled src="/assets/logo.png" alt="Logo" />
					<BrandTitleStyled>Tecsisman</BrandTitleStyled>
				</BrandLinkStyled>
				{isMobile && (
					<HamburgerButton
						ref={toggleButtonRef}
						type="button"
						onClick={handleToggleMenu}
						aria-label="Abrir menu"
					>
						{isMobileMenuOpen ? <FiX /> : <FiMenu />}
					</HamburgerButton>
				)}
				<LinksContainerStyled
					ref={menuRef}
					$isMobile={isMobile}
					$isOpen={shouldShowLinks}
				>
					<NavLinksGroupStyled>
						<motion.div whileTap={{ scale: 0.97 }}>
							<Link to="/" onClick={handleMenuItemClick}>
								<LinkContainerStyled>
									<FiHome color="c8a2ff" />
								</LinkContainerStyled>
								Home
							</Link>
						</motion.div>
						{currentUser?.role === 'admin' && (
							<motion.div whileTap={{ scale: 0.97 }}>
								<Link to="/admin/productos" onClick={handleMenuItemClick}>
									<LinkContainerStyled>
										<FiSettings color="c8a2ff" />
									</LinkContainerStyled>
									Admin
								</Link>
							</motion.div>
						)}
					</NavLinksGroupStyled>

					<NavActionsStyled>
						<CartNavStyled onClick={handleMenuItemClick}>
							<CartIcon />
						</CartNavStyled>

						<UserNavStyled>
							<UserContainerStyled
								onClick={() => {
									handleMenuItemClick()
									currentUser
										? dispatch(toggleMenuHidden())
										: navigate('/register')
								}}
							>
								<SpanStyled>
									{currentUser ? `${userDisplayName}` : 'Inicia Sesion'}
								</SpanStyled>
								<FiUser color="c8a2ff" />
							</UserContainerStyled>
						</UserNavStyled>
					</NavActionsStyled>
				</LinksContainerStyled>
			</NavbarContentStyled>
		</NavbarContainerStyled>
	)
}

export default Navbar
