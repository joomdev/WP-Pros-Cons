//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

// Internal Dependencies
import edit from './edit';
import metadata from './attributes.json';
const { attributes } = metadata;

registerBlockType( 'mightythemes/block-prosandcons', {
	title: __( 'Mighty Pros & Cons', 'mightythemes-blocks' ),
	description: __( 'Mighty Pros & Cons is a Gutenberg block which helps you to insert responsive Pros and Cons table within your blog post.', 'mightythemes-blocks' ),
	icon: 'thumbs-up',
	category: 'mightythemes-blocks',
	keywords: [
		__( 'Mighty Pros & Cons' ),
		__( 'Pros And Cons' ),
		__( 'MightyThemes' ),
		__( 'Pros' ),
	],

	attributes,
	edit,
	save: function() {
		return null;
	},
} );
