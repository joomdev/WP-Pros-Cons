//  Import CSS.
import './style.scss';
import './editor.scss';
import { RawHTML } from '@wordpress/element';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Button, Dashicon, IconButton } = wp.components;
const { RichText, URLInput } = wp.editor;

registerBlockType( 'tc/block-prosandcons', {
	title: __( 'Pros And Cons' ),
	icon: 'thumbs-up',
	category: 'common',
	keywords: [
		__( 'Pros And Cons' ),
		__( 'ThemesCamp' ),
		__( 'Pros&Cons' ),
	],

	attributes: {
		title: {
			source: 'text',
			selector: 'h3.wpc-title'
		},
		prosValues: {
			type: 'array',
			selector: '.wpc_pros_list',
			source: 'children',
		},
		consValues: {
			type: 'array',
			selector: '.wpc_cons_list',
			source: 'children',
		},
		buttonText: {
			type: 'string',
		},
		buttonUrl: {
			type: 'string',
            source: 'attribute',
            selector: 'a',
            attribute: 'href',
		},
	},

	edit({attributes, setAttributes, onReplace, className}) {
		const { prosValues, consValues, title, buttonText, buttonUrl } = attributes;
		
		return (
			<div className="wp-pros-cons">
				<h3 className="wp-pros-cons-title">
					<RichText
						onChange={ content => setAttributes({ title: content }) }
						value={ title }
						placeholder="Title goes here.."
						className="heading"
					/>
				</h3>
				<div className="wp-pros-cons-sections">
					<div className="wp-pros-cons-col">
						<div className="pros-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-green">
									<i className="far fa-thumbs-up wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Pros</div>
								{/* Here comes all the pros */}
								<RichText
									tagName="ul"
									multiline="li"
									placeholder={ __( 'Pros goes here...', 'themescamp-blocks' ) }
									keepPlaceholderOnFocus
									value={ prosValues }
									formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
									className='wpc_pros_list'
									onChange={ ( value ) => setAttributes( { prosValues: value } ) }
								/>							
						</div>
					</div>
					<div className="wp-pros-cons-col">
						<div className="cons-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-red">
									<i className="far fa-thumbs-down wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Cons</div>
								{/* Here comes all the cons */}
								<RichText
									tagName="ul"
									multiline="li"
									placeholder={ __( 'Cons goes here...', 'themescamp-blocks' ) }
									keepPlaceholderOnFocus
									value={ consValues }
									formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
									className='wpc_cons_list'
									onChange={ ( value ) => setAttributes( { consValues: value } ) }
								/>							
						</div>
					</div>
				</div>
				<div className="wp-pros-cons-btn-wrap">
					<RichText
						tagName="a"
						placeholder={ __( 'Button text...', 'themescamp-blocks' ) }
						keepPlaceholderOnFocus
						value={ buttonText }
						className='cta-btn'
						onChange={ (value) => setAttributes( { buttonText: value } ) }
					/>
					
						<form
							key="form-link"
							className={ `blocks-button__inline-link`}
							onSubmit={ event => event.preventDefault() }
						>
							
							<URLInput
								className="button-url"
								value={ buttonUrl }
								onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
							/>
							<IconButton
								icon="editor-break"
								label={ __( 'Apply', 'themescamp-blocks' ) }
								type="submit"
							/>
						</form>
					
				</div>
			</div>
		);
	},

	save({ attributes }) {
		
		const { prosValues, consValues, title, buttonText, buttonUrl } = attributes;
		
		return (
			<div className="wp-pros-cons">
				<h3 className="wp-pros-cons-title wpc-title">
					<RawHTML>{ title }</RawHTML>
				</h3>
				<div className="wp-pros-cons-sections">
					<div className="wp-pros-cons-col">
						<div className="pros-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-green">
									<i className="far fa-thumbs-up wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Pros</div>
								<RichText.Content
									tagName="ul"
									// multiline="li"
									className="wpc_pros_list"
									value={ prosValues }
								/>
						</div>
					</div>
					<div className="wp-pros-cons-col">
						<div className="cons-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-red">
									<i className="far fa-thumbs-down wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Cons</div>
								<RichText.Content
									tagName="ul"
									// multiline="li"
									className="wpc_cons_list"
									value={ consValues }
								/>
						</div>
					</div>
				</div>
				<div className="wp-pros-cons-btn-wrap">
				{
					buttonText && ( 
					<a
						href={ buttonUrl }
						target="_blank"
						rel="#"
						className="cta-btn"
					>
						<RichText.Content
							value={ buttonText }
						/>
					</a>
					)
				}
				</div>
			</div>
		);
	},
} );
