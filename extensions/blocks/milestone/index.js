/**
 * External dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { ExternalLink, Path, Rect, SVG } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import edit from './edit';

export const name = 'milestone';

export const settings = {
	title: __( 'Milestone', 'jetpack' ),

	description: (
		<Fragment>
			<p>
				{ __(
					'Countdown',
					'jetpack'
				) }
			</p>
			<ExternalLink href="https://en.support.wordpress.com/markdown-quick-reference/">
				{ __( 'Support reference', 'jetpack' ) }
			</ExternalLink>
		</Fragment>
	),

	icon: (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208 128">
			<Rect
				width="198"
				height="118"
				x="5"
				y="5"
				ry="10"
				stroke="currentColor"
				strokeWidth="10"
				fill="none"
			/>
			<Path d="M30 98v-68h20l20 25 20-25h20v68h-20v-39l-20 25-20-25v39zM155 98l-30-33h20v-35h20v35h20z" />
		</SVG>
	),

	category: 'jetpack',

	keywords: [
		_x( 'countdown', 'block search term', 'jetpack' ),
		_x( 'timer', 'block search term', 'jetpack' ),
		_x( 'alert', 'block search term', 'jetpack' ),
	],

	attributes: {
		//The Markdown source is saved in the block content comments delimiter
		source: { type: 'string' },
	},

	supports: {
		html: false,
	},

	edit,

	save,
};
