import Link from '../../components/UI/Link/Link'

import {
	CustomImageStyled,
	FoundContainerStyled,
	FoundSubtitleStyled,
	FoundTextStyled,
	FoundTitleStyled,
} from './PageNotFoundStyles'

const PageNotFound = () => {
	return (
		<FoundContainerStyled>
			<FoundTextStyled>
				<FoundTitleStyled>
					<div>
						<CustomImageStyled src="/assets/404err.gif" alt="Logo" />
					</div>
				</FoundTitleStyled>
				<FoundSubtitleStyled>
					Lo sentimos, No se encontró esta página
				</FoundSubtitleStyled>
				<Link />
			</FoundTextStyled>
		</FoundContainerStyled>
	)
}

export default PageNotFound
