import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/productsSlice/products.slice'
import { addToCart } from '../../redux/cart/cartSlice'
import { formatPrice, resolveImageSrc } from '../../utils'
import Button from '../../components/UI/Button/Button'
import {
	DetailWrapper,
	DetailContent,
	Gallery,
	GalleryControls,
	Thumbnails,
	DetailInfo,
	DetailPrice,
	DetailButtons,
} from './ProductDetailStyles'
import { toast } from 'sonner'

const ProductDetail = () => {
	const { productId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { products } = useSelector((state) => state.products)

	const product = products.find((item) => String(item._id || item.id) === productId)

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchProducts())
		}
	}, [dispatch, products.length])

	useEffect(() => {
		if (products.length && !product) {
			navigate('/')
		}
	}, [product, products.length, navigate])

	const galleryImages = useMemo(() => {
		const images = product?.images?.length ? product.images : [product?.img]
		const resolved = images?.map(resolveImageSrc).filter(Boolean) ?? []
		return resolved.length ? resolved : ['/assets/product-pictures/placeholder.png']
	}, [product])

	const [currentSlide, setCurrentSlide] = useState(0)

	useEffect(() => {
		setCurrentSlide(0)
	}, [productId])

	if (!product) {
		return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Cargando producto...</p>
	}

	const description = product.description || product.desc || ''

	const handleAddToCart = () => {
		dispatch(addToCart({ ...product, desc: description, img: galleryImages[0] }))
		toast.success('Producto agregado al carrito')
	}

	const handlePrev = () => {
		setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
	}

	const handleNext = () => {
		setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
	}

	return (
		<DetailWrapper>
			<DetailContent>
				<div>
					<Gallery>
						<img src={galleryImages[currentSlide]} alt={product.title} />
						{galleryImages.length > 1 && (
							<GalleryControls>
								<button onClick={handlePrev} aria-label="Anterior">‹</button>
								<button onClick={handleNext} aria-label="Siguiente">›</button>
							</GalleryControls>
						)}
					</Gallery>
					{galleryImages.length > 1 && (
						<Thumbnails>
							{galleryImages.map((image, index) => (
								<img
									key={image}
									src={image}
									alt={`${product.title} ${index + 1}`}
									className={currentSlide === index ? 'active' : ''}
									onClick={() => setCurrentSlide(index)}
								/>
							))}
						</Thumbnails>
					)}
				</div>
				<DetailInfo>
					<div>
						<h1>{product.title}</h1>
						<p>{description}</p>
					</div>
					<DetailPrice>{formatPrice(product.price)}</DetailPrice>
					<DetailButtons>
						<Button onClick={handleAddToCart}>Agregar al carrito</Button>
						<Button secondary onClick={() => navigate('/')}>
							Volver al inicio
						</Button>
					</DetailButtons>
				</DetailInfo>
			</DetailContent>
		</DetailWrapper>
	)
}

export default ProductDetail
