import CardProducto from './CardProducto'
import Button from '../UI/Button/Button'
import { ProductosContainer } from './CardsProductosStyles'
import { ButtonContainerStyled } from '../../pages/Home/HomeStyles'
import { useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'
import { INITIAL_LIMIT } from '../../utils'
import { Products as LocalProducts, TotalProducts as LocalTotalProducts } from '../../data/Products'

const CardsProductos = () => {
	const [limit, setLimit] = useState(INITIAL_LIMIT)
	const { groupedProducts, totalProducts } = useSelector((state) => state.products)
	const { selectedCategory } = useSelector((state) => state.categories)

	const hasRemoteProducts = Object.keys(groupedProducts).length > 0
	const sourceProducts = hasRemoteProducts ? groupedProducts : LocalProducts
	const totalItems = hasRemoteProducts ? totalProducts : LocalTotalProducts

	const productsByCategory = useMemo(() => {
		if (selectedCategory) {
			return {
				[selectedCategory]: sourceProducts[selectedCategory] || [],
			}
		}
		return sourceProducts
	}, [selectedCategory, sourceProducts])

	useEffect(() => {
		setLimit(INITIAL_LIMIT)
	}, [selectedCategory])

	let renderedCount = 0

	return (
		<>
			<ProductosContainer>
				{Object.entries(productsByCategory).map(([category, items = []]) =>
					items.map((item, index) => {
						const shouldRender = selectedCategory || renderedCount < limit

						if (!shouldRender) {
							return null
						}

						renderedCount += 1

						const key = item._id || item.id || `${category}-${index}`
						return <CardProducto key={key} {...item} productId={item._id || item.id} />
					})
				)}
			</ProductosContainer>

			{!selectedCategory && totalItems > INITIAL_LIMIT && (
				<ButtonContainerStyled>
					<Button
						onClick={() => setLimit((prevLimit) => Math.max(INITIAL_LIMIT, prevLimit - INITIAL_LIMIT))}
						secondary="true"
						disabled={limit <= INITIAL_LIMIT}
					>
						<span>Ver menos</span>
					</Button>
					<Button
						onClick={() => setLimit((prevLimit) => prevLimit + INITIAL_LIMIT)}
						disabled={limit >= totalItems}
					>
						Ver más
					</Button>
				</ButtonContainerStyled>
			)}
		</>
	)
}

export default CardsProductos
