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
	PreviewImage,
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
	img: '',
}

const AdminProducts = () => {
	const { currentUser } = useSelector((state) => state.user)

	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [formValues, setFormValues] = useState(INITIAL_FORM_STATE)
	const [editingId, setEditingId] = useState(null)
	const [selectedFile, setSelectedFile] = useState(null)
	const [preview, setPreview] = useState('')
	const [categoryFilter, setCategoryFilter] = useState('Todas')

	useEffect(() => {
		loadProducts()
	}, [])

	useEffect(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview)
		}
	}, [preview])

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
		const file = event.target.files?.[0]
		if (!file) {
			setSelectedFile(null)
			setPreview('')
			return
		}

		const objectUrl = URL.createObjectURL(file)
		setSelectedFile(file)
		setPreview(objectUrl)
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
		setSelectedFile(null)
		setPreview('')
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
			img: product.img ?? '',
		})
		setPreview(resolveImageSrc(product.img))
		setSelectedFile(null)
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

		if (selectedFile) {
			formData.append('image', selectedFile)
		} else if (formValues.img) {
			formData.append('img', formValues.img)
		}

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
									<img src={resolveImageSrc(product.img)} alt={product.title} />
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
							URL de imagen (opcional)
							<input
								type="text"
								name="img"
								value={formValues.img}
								onChange={handleChange}
								placeholder="https://"
							/>
						</label>

						<UploadField>
							<label>
								Subir archivo
								<input type="file" accept="image/*" onChange={handleFileChange} />
							</label>
							<small>Formatos permitidos: JPG, PNG, WEBP. Máximo 5MB.</small>
							{preview && <PreviewImage src={preview} alt="Vista previa" />}
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
