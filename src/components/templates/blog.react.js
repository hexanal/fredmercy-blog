import Layout from 'components/layouts/default'
import Header from 'components/ui/header'
import JumpTo from 'components/ui/jump-to'

/**
 * An example of a React component for the 'blog' template
 */

export default props => (
	<Layout>
		<div className="index index--list">
			<Header />
		</div>

		<JumpTo />

		<div className="index__list">

			{props.postsByMonth.map( archive => (

				<div className="index__month-archive">
					<h2
						id={ archive }
						className="heading index__month-year"
						aria-level="2"
						data-anchor={ archive }
						data-js="archive"
					>
						{ archive }
					</h2>

					<ul className="index__month-posts">
						{ archive.entries.map( entry => (
							<li className="index__item">
								<div className="index__meta">
									<span className="index__date">
										{ entry.meta.day }
									</span>
								</div>

								{ entry.meta.title && (
									<a
										className="index__link"
										href={ entry.meta.url }
										title={ entry.meta.description }
										data-js="entry"
									>
										{ entry.meta.title }
									</a>
								)}

								{ !entry.meta.title && (
									<a
										className="index__link"
										href={ entry.meta.url }
										title={ entry.meta.description }
										data-js="entry"
										aria-label={`Untitled entry for ${entry.meta.date }`}
									>
										<span aria-hidden="true">
											<em>Untitled</em><span className="index__extra"> entry for <em>{ entry.meta.date }</em></span>
										</span>
									</a>
								)}

							</li>
						)) }
					</ul>
				</div>

			)) }

		</div>
	</Layout>
)
