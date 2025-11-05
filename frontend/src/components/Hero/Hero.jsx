import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { selectCategory } from '../../redux/categoriesSlice/categoriesSlice'
import { toast } from 'sonner'
import { categories } from '../../data/Categories'
import {
	CustomImageStyled,
	HeroContainerStyled,
	HeroFormStyled,
	CategoryContainerStyled,
	CategoryItemStyled,
	ContentContainerStyled, // Import the styled component for the video background
} from './HeroStyles'
import AnimatedText from '../UI/AnimatedText/AnimatedText'
import { StyledButton } from '../UI/Button/ButtonStyled'
import ImageBackground from '../UI/Background/Background'
import bgHero from '/assets/backgounds/headerBackground.png'

const Hero = ({ doScroll }) => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const dispatch = useDispatch()
	const containerRef = useRef(null)

	// Update selected index based on scroll direction
	const handleScroll = (direction) => {
		setSelectedIndex((prevIndex) => {
			if (direction === 'down') {
				return (prevIndex + 1) % categories.length
			} else {
				return (prevIndex - 1 + categories.length) % categories.length
			}
		})
	}

	// Infinite scrolling effect with mouse scroll or arrow keys
	useEffect(() => {
		const container = containerRef.current

		const handleWheel = (e) => {
			e.preventDefault() // Prevent page scrolling
			if (e.deltaY > 0) {
				handleScroll('down')
			} else {
				handleScroll('up')
			}
		}

		const handleKeyDown = (e) => {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault() // Prevent page scrolling
				if (e.key === 'ArrowDown') {
					handleScroll('down')
				} else if (e.key === 'ArrowUp') {
					handleScroll('up')
				}
			}
		}

		container.addEventListener('wheel', handleWheel)
		container.addEventListener('keydown', handleKeyDown)

		return () => {
			container.removeEventListener('wheel', handleWheel)
			container.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	// Handle click on adjacent categories to shift selection
	const handleCategoryClick = (index) => {
		if (index === 0) {
			handleScroll('up') // Clicked on top category
		} else if (index === 2) {
			handleScroll('down') // Clicked on bottom category
		}
	}

	const handlerSubmit = (e) => {
		e.preventDefault()
		if (categories[selectedIndex]) {
			dispatch(selectCategory(categories[selectedIndex].category))
			doScroll()
		} else {
			toast.error('Categoría no encontrada')
		}
	}

	// Select three categories around the selected index for infinite display
	const getDisplayedCategories = () => {
		const previousIndex =
			(selectedIndex - 1 + categories.length) % categories.length
		const nextIndex = (selectedIndex + 1) % categories.length
		return [
			categories[previousIndex],
			categories[selectedIndex],
			categories[nextIndex],
		]
	}

	return (
		<HeroContainerStyled ref={containerRef}>
			<ImageBackground src={bgHero} />
			<div>
				<HeroFormStyled onSubmit={handlerSubmit}>
					<h1 className="title">
						<AnimatedText text="¿Qué categoría estás buscando?" />
					</h1>
					<ContentContainerStyled>
						<CategoryContainerStyled ref={containerRef} tabIndex={0}>
							{getDisplayedCategories().map((category, index) => (
								<CategoryItemStyled
									key={category.id}
									$isSelected={index === 1} // Center item as selected
									onClick={() => handleCategoryClick(index)} // Handle click to change selection
								>
									<img src={category.img} alt={category.title} />
									<span>{category.title}</span>
								</CategoryItemStyled>
							))}
						</CategoryContainerStyled>
						<CustomImageStyled src="/assets/hero.jpg" alt="" />
					</ContentContainerStyled>

					<StyledButton type="submit" disabled={!categories[selectedIndex]}>
						Buscar
					</StyledButton>
				</HeroFormStyled>
			</div>
		</HeroContainerStyled>
	)
}

export default Hero
