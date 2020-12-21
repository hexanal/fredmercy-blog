<script>
/**
 * An example of a Vue component for the 'blog' template
 *
 * The .vue file would need to import:
 *
 * NOTE: I would split the component into multiple files though
 * `blog.js`, `blog.html`, `blog.scss`
 *
 */
import DefaultLayout from 'components/layouts/default'
import SiteHeader from 'components/ui/header'
import JumpTo from 'components/ui/jump-to'

// TODO the vue component wiring
</script>

<template>

	<default-layout>
		<div class="index index--list">
			<site-header></site-header>
		</div>

		<jump-to></jump-to>

		<div class="index__list">

			<div class="index__month-archive" v-each="archive in postsbyMonths">
				<h2
					className="heading index__month-year"
					aria-level="2"
					data-js="archive"
				>
					{ archive }
				</h2>

				<ul className="index__month-posts">
					<li className="index__item" v-each="entry in archive">
						<div className="index__meta">
							<span className="index__date">
								{ entry.meta.day }
							</span>
						</div>

						<a
							v-if="entry.meta.title"
							className="index__link"
							:href="entry.meta.url"
							:title="entry.meta.description"
							data-js="entry"
						>
							{ entry.meta.title }
						</a>

						<a
							v-if="!entry.meta.title"
							className="index__link"
							:href="entry.meta.url"
							:title="entry.meta.description"
							data-js="entry"
							:aria-label=" 'Untitled entry for ' + entry.meta.date "
						>
							<span aria-hidden="true">
								<em>Untitled</em><span className="index__extra"> entry for <em>{ entry.meta.date }</em></span>
							</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</default-layout>

</template>
