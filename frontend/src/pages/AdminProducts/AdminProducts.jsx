import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import { categories } from '../../data/Categories'
import {
	createProductRequest,
	deleteProductRequest,
	fetchBackendProducts,
	updateProductRequest,
} from '../../axios/axios-products'
import { BASE_URL } from '../../utils/constants'
import {
	AdminContent,
	AdminHeader,
	AdminWrapper,
	CardActions,
	EmptyState,
	FormActions,
	FormPanel,
	FormTitle,
	InlineGroup,
	ProductCard,
	ProductList,
	ProductsHeader,
	ProductsPanel,
	ImagesPreviewGrid,
	PreviewThumb,
	StyledForm,
	UploadField,
} from './AdminProductsStyles'

const INITIAL_FORM_STATE = {
	title: '',
	description: '',
	price: '',
	category: categories[0]?.category ?? '',
	stock: '0',
	recommended: false,
	imageUrls: '',
}

const AdminProducts = () => {
	const { currentUser } = useSelector((state) => state.user)

	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [formValues, setFormValues] = useState(INITIAL_FORM_STATE)
	const [editingId, setEditingId] = useState(null)
	const [selectedFiles, setSelectedFiles] = useState([])
	const [filePreviews, setFilePreviews] = useState([])
	const [currentImages, setCurrentImages] = useState([])
	const [categoryFilter, setCategoryFilter] = useState('Todas')

	useEffect(() => {
		loadProducts()
	}, [])

	useEffect(() => {
		return () => {
			filePreviews.forEach((url) => URL.revokeObjectURL(url))
		}
	}, [filePreviews])

	const loadProducts = async () => {
		try {
			setLoading(true)
			const data = await fetchBackendProducts()
			setProducts(data)
		} catch (error) {
			console.error(error)
			toast.error('No pudimos cargar los productos del servidor')
		} finally {
			setLoading(false)
		}
	}

	const visibleProducts = useMemo(() => {
		if (categoryFilter === 'Todas') return products
		return products.filter((product) => product.category === categoryFilter)
	}, [products, categoryFilter])

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target
		setFormValues((prev) => ({
			...prev,
			[`${name}`]: type === 'checkbox' ? checked : value,
		}))
	}

	const handleFileChange = (event) => {
		const files = Array.from(event.target.files || [])
		if (!files.length) {
			setSelectedFiles([])
			setFilePreviews([])
			return
		}

		const previews = files.map((file) => URL.createObjectURL(file))
		setSelectedFiles(files)
		setFilePreviews(previews)
	}

	const handleRemoveExistingImage = (image) => {
		setCurrentImages((prev) => prev.filter((src) => src !== image))
	}

	const handleRemoveNewImage = (index) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
		setFilePreviews((prev) => prev.filter((_, i) => i !== index))
	}

	const parseManualUrls = (value = '') => {
		return value
			.split(/[\n,]/)
			.map((item) => item.trim())
			.filter(Boolean)
	}

	const resolveImageSrc = (imgPath) => {
		if (!imgPath) return '/assets/product-pictures/placeholder.png'
		if (imgPath.startsWith('http')) return imgPath
		const normalizedBase = BASE_URL.endsWith('/')
			? BASE_URL.slice(0, -1)
			: BASE_URL
		return `${normalizedBase}${imgPath}`
	}

	const resetForm = () => {
		setFormValues(INITIAL_FORM_STATE)
		setEditingId(null)
		setSelectedFiles([])
		setFilePreviews([])
		setCurrentImages([])
	}

	const handleEdit = (product) => {
		setEditingId(product._id)
		setFormValues({
			title: product.title ?? '',
			description: product.description ?? '',
			price: product.price?.toString() ?? '',
			category: product.category ?? categories[0]?.category ?? '',
			stock: product.stock?.toString() ?? '0',
			recommended: !!product.recommended,
			imageUrls: '',
		})
		setCurrentImages(product.images?.length ? [...product.images] : product.img ? [product.img] : [])
		setSelectedFiles([])
		setFilePreviews([])
	}

	const handleDelete = async (id) => {
		if (!currentUser?.token) {
			toast.error('Necesitas iniciar sesión para eliminar productos')
			return
		}

		const confirmed = window.confirm('¿Seguro que deseas eliminar este producto?')
		if (!confirmed) return

		try {
			await deleteProductRequest(id, currentUser.token)
			toast.success('Producto eliminado con éxito')
			if (editingId === id) {
				resetForm()
			}
			loadProducts()
		} catch (error) {
			console.error(error)
			toast.error('No pudimos eliminar el producto')
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!currentUser?.token) {
			toast.error('Necesitas iniciar sesión como administrador')
			return
		}

		if (!formValues.title || !formValues.description || !formValues.price) {
			toast.error('Completa los campos obligatorios')
			return
		}

		const formData = new FormData()
		formData.append('title', formValues.title)
		formData.append('description', formValues.description)
		formData.append('price', formValues.price)
		formData.append('category', formValues.category)
		formData.append('stock', formValues.stock)
		formData.append('recommended', formValues.recommended)

		selectedFiles.forEach((file) => formData.append('images', file))

		const manualUrls = parseManualUrls(formValues.imageUrls)
		if (manualUrls.length) {
			formData.append('imageUrls', JSON.stringify(manualUrls))
		}

		formData.append('existingImages', JSON.stringify(currentImages))

		try {
			setSaving(true)

			if (editingId) {
				await updateProductRequest(editingId, formData, currentUser.token)
				toast.success('Producto actualizado')
			} else {
				await createProductRequest(formData, currentUser.token)
				toast.success('Producto creado')
			}

			resetForm()
			loadProducts()
		} catch (error) {
			console.error(error)
			toast.error('No pudimos guardar el producto')
		} finally {
			setSaving(false)
		}
	}

	return (
		<AdminWrapper>
			<AdminHeader>
				<h1>Panel de productos</h1>
				<p>
					Agrega, edita o elimina productos para mantener tu catálogo actualizado. Todas
					las imágenes que subas se almacenan de forma segura en tu backend.
				</p>
			</AdminHeader>

			<AdminContent>
				<ProductsPanel>
					<ProductsHeader>
						<h2>Inventario</h2>
						<select
							value={categoryFilter}
							onChange={(event) => setCategoryFilter(event.target.value)}
						>
							<option value="Todas">Todas las categorías</option>
							{categories.map((category) => (
								<option key={category.id} value={category.category}>
									{category.title}
								</option>
							))}
						</select>
					</ProductsHeader>

					{loading ? (
						<EmptyState>
							<Loader />
							<p>Cargando productos...</p>
						</EmptyState>
					) : visibleProducts.length ? (
						<ProductList>
							{visibleProducts.map((product) => (
								<ProductCard key={product._id}>
									<img
										src={resolveImageSrc(
											product.images?.[0] || product.img
										)}
										alt={product.title}
									/>
									<div>
										<h3>{product.title}</h3>
										<span>
											{product.category} • Stock: {product.stock ?? 0} • $
											{product.price}
										</span>
									</div>
									<CardActions>
										<Button onClick={() => handleEdit(product)}>Editar</Button>
										<Button secondary onClick={() => handleDelete(product._id)}>
											Borrar
										</Button>
									</CardActions>
								</ProductCard>
							))}
						</ProductList>
					) : (
						<EmptyState>
							<p>No hay productos en esta categoría todavía</p>
						</EmptyState>
					)}
				</ProductsPanel>

				<FormPanel>
					<FormTitle>
						<h2>{editingId ? 'Editar producto' : 'Nuevo producto'}</h2>
						<span>{editingId ? 'Editando' : 'Creando'}</span>
					</FormTitle>

					<StyledForm onSubmit={handleSubmit}>
						<label>
							Título
							<input
								type="text"
								name="title"
								value={formValues.title}
								onChange={handleChange}
								placeholder="Ej: Nintendo Switch OLED"
							/>
						</label>

						<label>
							Descripción
							<textarea
								name="description"
								value={formValues.description}
								onChange={handleChange}
								placeholder="Describe los beneficios del producto"
							/>
						</label>

						<InlineGroup>
							<label>
								Precio
								<input
									type="number"
									name="price"
									min="0"
									value={formValues.price}
									onChange={handleChange}
								/>
							</label>
							<label>
								Stock
								<input
									type="number"
									name="stock"
									min="0"
									value={formValues.stock}
									onChange={handleChange}
								/>
							</label>
						</InlineGroup>

						<InlineGroup>
							<label>
								Categoría
								<select name="category" value={formValues.category} onChange={handleChange}>
									{categories.map((category) => (
										<option key={category.id} value={category.category}>
											{category.title}
										</option>
									))}
								</select>
							</label>

							<label>
								Recomendado
								<input
									type="checkbox"
									name="recommended"
									checked={formValues.recommended}
									onChange={handleChange}
								/>
							</label>
						</InlineGroup>

						<label>
							Imágenes por URL (opcional)
							<textarea
								name="imageUrls"
								value={formValues.imageUrls}
								onChange={handleChange}
								placeholder="https://ejemplo.com/imagen1.jpg, https://ejemplo.com/imagen2.png"
							/>
						</label>

						<UploadField>
							<label>
								Subir archivos
								<input type="file" accept="image/*" multiple onChange={handleFileChange} />
							</label>
							<small>Formatos permitidos: JPG, PNG, WEBP. Máximo 5MB.</small>

							{currentImages.length > 0 && (
								<>
									<small>Imágenes actuales</small>
									<ImagesPreviewGrid>
										{currentImages.map((image) => (
											<PreviewThumb key={image}>
												<img src={resolveImageSrc(image)} alt="Imagen actual" />
												<button
													type="button"
													onClick={() => handleRemoveExistingImage(image)}
													aria-label="Eliminar imagen actual"
												>
													×
												</button>
											</PreviewThumb>
										))}
									</ImagesPreviewGrid>
								</>
							)}

							{filePreviews.length > 0 && (
								<>
									<small>Nuevas imágenes seleccionadas</small>
									<ImagesPreviewGrid>
										{filePreviews.map((preview, index) => (
											<PreviewThumb key={preview}>
												<img src={preview} alt={`Nueva imagen ${index + 1}`} />
												<button
													type="button"
													onClick={() => handleRemoveNewImage(index)}
													aria-label="Eliminar imagen nueva"
												>
													×
												</button>
											</PreviewThumb>
										))}
									</ImagesPreviewGrid>
								</>
							)}
						</UploadField>

						<FormActions>
							<Button type="submit" disabled={saving}>
								{saving ? <Loader /> : editingId ? 'Actualizar' : 'Crear producto'}
							</Button>
							<Button type="button" secondary onClick={resetForm}>
								Limpiar
							</Button>
						</FormActions>
					</StyledForm>
				</FormPanel>
			</AdminContent>
		</AdminWrapper>
	)
}

export default AdminProducts
