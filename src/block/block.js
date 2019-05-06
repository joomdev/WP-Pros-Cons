//  Import CSS.
import './style.scss';
import './editor.scss';
import { RawHTML } from '@wordpress/element';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { IconButton, PanelBody } = wp.components;
const { RichText, URLInput, ColorPalette, InspectorControls, PanelColorSettings } = wp.editor;

registerBlockType( 'tc/block-prosandcons', {
	title: __( 'Pros And Cons', 'themescamp-blocks' ),
	description: __( 'Pros & Cons for your website.', 'themescamp-blocks' ),
	icon: 'thumbs-up',
	category: 'common',
	keywords: [
		__( 'Pros And Cons' ),
		__( 'ThemesCamp' ),
		__( 'Pros & Cons' ),
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
		buttonBackgroundColor: {
			type: 'string',
			default: 'black',
		},
		buttonTextColor: {
			type: 'string',
			default: 'white',
		},
		
	},

	edit({attributes, setAttributes, className, focus}) {
		const { prosValues, consValues, title, buttonText, buttonUrl, buttonBackgroundColor, buttonTextColor } = attributes;

		function onButtonBackgroundChange(changes) {
			setAttributes({
				buttonBackgroundColor: changes
			})
		}

		function onButtonTextColorChange(changes) {
			setAttributes({
				buttonTextColor: changes
			})
		}

		return ([
			<InspectorControls>

				<PanelColorSettings 
					title={ __( 'Button Background Color', 'themescamp-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: buttonBackgroundColor,
						onChange: onButtonBackgroundChange,
						label: __( 'Button Background Color', 'themescamp-block' ),
					} ] }
				>
				</PanelColorSettings>

				<PanelColorSettings 
					title={ __( 'Button Color', 'themescamp-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: buttonTextColor,
						onChange: onButtonTextColorChange,
						label: __( 'Button Color', 'themescamp-block' ),
					} ] }
				>
				</PanelColorSettings>
				
			</InspectorControls>
			,
			<div className="wp-pros-cons">				
				<RichText
					tagName="h3"
					onChange={ content => setAttributes({ title: content }) }
					value={ title }
					placeholder="Title goes here.."
					className="wp-pros-cons-title"
				/>
				
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
									className="wpc_cons_list"
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
						style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
					/>
					
					<form
						key="form-link"
						onSubmit={ event => event.preventDefault() }
					>
						<ul class="list-inline">
							<li class="list-inline-item">
								<URLInput
									className="button-url btn-onclick-url"
									value={ buttonUrl }
									onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
								/>
							</li>
							<li class="list-inline-item">
								<IconButton
									icon="editor-break"
									label={ __( 'Apply', 'themescamp-blocks' ) }
									type="submit"
								/>
							</li>
						</ul>
					</form>
					
				</div>
			</div>
		]);
	},

	save({ attributes, className }) {
		
		const { prosValues, consValues, title, buttonText, buttonUrl, buttonBackgroundColor, buttonTextColor } = attributes;
		
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

				{
					buttonText && (
						<div className="wp-pros-cons-btn-wrap">							
							<a
								href={ buttonUrl }
								target='_blank'
								style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
								rel="#"
								className="cta-btn"
							>
								<RichText.Content
									value={ buttonText }
								/>
							</a>							
						</div>
					)
				}
			</div>
		);
	},
} );
