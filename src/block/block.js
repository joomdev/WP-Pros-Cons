//  Import CSS.
import './style.scss';
import './editor.scss';
import { RawHTML } from '@wordpress/element';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { IconButton, PanelBody, ToggleControl, SelectControl } = wp.components;
const { RichText, URLInput, ColorPalette, InspectorControls, PanelColorSettings } = wp.editor;

registerBlockType( 'tc/block-prosandcons', {
	title: __( 'Pros And Cons', 'themescamp-blocks' ),
	description: __( 'Pros & Cons for your website.', 'themescamp-blocks' ),
	icon: 'thumbs-up',
	category: 'themescamp-blocks',
	keywords: [
		__( 'Pros And Cons' ),
		__( 'ThemesCamp' ),
		__( 'Pros & Cons' ),
	],

	attributes: {
		title: {
			source: 'text',
			selector: 'h3.wp-pros-cons-heading',
		},
		prosTitle: {
			source: 'text',
			default: 'Pros',
			selector: 'h4.pros-title',
		},
		consTitle: {
			source: 'text',
			default: 'Cons',
			selector: 'h4.cons-title',
        },
		prosValues: {
			type: 'array',
			selector: '.wp-pros-list',
			source: 'children',
		},
		consValues: {
			type: 'array',
			selector: '.wp-cons-list',
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
		boxBackgroundColor: {
			type: 'string',
			default: '#f9f9f9',
		},
		buttonTarget: {
			type: 'boolean',
			default: false
		},
		buttonRel: {
			type: 'string',
			default: 'Dofollow'
		},
		boxBorder: {
			type: 'string',
			default: 'None'
		},
		borderColor: {
			type: 'string',
			default: '#28b914'
		},
	},

	edit({attributes, setAttributes, className, focus}) {
		const { prosValues, consValues, title, prosTitle, consTitle, buttonText, buttonUrl, buttonBackgroundColor, buttonTextColor, boxBackgroundColor, buttonTarget, buttonRel, boxBorder, borderColor } = attributes;

		// Button Rel values
		const buttonRelOptions = [
			{ value: 'dofollow', label: __( 'Dofollow', 'themescamp-blocks' ) },
			{ value: 'nofollow', label: __( 'Nofollow', 'themescamp-blocks' ) },
			{ value: 'noreferrer', label: __( 'Noreferrer', 'themescamp-blocks' ) },
			{ value: 'noopener', label: __( 'Noopener', 'themescamp-blocks' ) },
			{ value: 'external', label: __( 'External', 'themescamp-blocks' ) },
			{ value: 'help', label: __( 'Help', 'themescamp-blocks' ) },
			{ value: 'alternate', label: __( 'Alternate', 'themescamp-blocks' ) },
			{ value: 'author', label: __( 'Author', 'themescamp-blocks' ) },
		];

		// Box border type
		const boxBorderOptions = [
			{ value: 'None', label: __( 'None', 'themescamp-blocks' ) },
			{ value: 'Dotted', label: __( 'Dotted', 'themescamp-blocks' ) },
			{ value: 'Solid', label: __( 'Solid', 'themescamp-blocks' ) },
			{ value: 'Dashed', label: __( 'Dashed', 'themescamp-blocks' ) },
		];

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
		
		function onBackgroundColorChange(changes) {
			setAttributes({
				boxBackgroundColor: changes
			})
		}

		function onChangeButtonTarget(changes) {
			setAttributes({
				buttonTarget: ! buttonTarget
			})
		}

		function onButtonRelChange(changes) {
			setAttributes({
				buttonRel: changes
			})
		}

		function onBorderColorChange(changes) {
			setAttributes({
				borderColor: changes
			})
		}

		return ([
			<InspectorControls>

				<ToggleControl
					label={ __( 'Open link in new window', 'themescamp-blocks' ) }
					checked={ buttonTarget }
					onChange={ onChangeButtonTarget }
				>
				</ToggleControl>

				<SelectControl
					label={ __( 'Button Rel Attribute', 'themescamp-blocks' ) }
					value={ buttonRel }
					options={ buttonRelOptions.map( ({ value, label }) => ( {
						value: value,
						label: label,
					} ) ) }
					onChange={ onButtonRelChange }
				>
				</SelectControl>

				<SelectControl
					label={ __( 'Box Border Style', 'themescamp-blocks' ) }
					value={ boxBorder }
					options={ boxBorderOptions.map( ({ value, label }) => ( {
						value: value,
						label: label,
					} ) ) }
					onChange={ content => setAttributes({ boxBorder: content }) }
				>
				</SelectControl>

				<PanelColorSettings 
					title={ __( 'Border Color', 'themescamp-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: borderColor,
						onChange: onBorderColorChange,
						label: __( 'Border Color', 'themescamp-block' ),
					} ] }
				>
				</PanelColorSettings>

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
					title={ __( 'Button Text Color', 'themescamp-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: buttonTextColor,
						onChange: onButtonTextColorChange,
						label: __( 'Button Text Color', 'themescamp-block' ),
					} ] }
				>
				</PanelColorSettings>

				<PanelColorSettings 
					title={ __( 'Background Color', 'themescamp-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: boxBackgroundColor,
						onChange: onBackgroundColorChange,
						label: __( 'Background Color', 'themescamp-block' ),
					} ] }
				>
				</PanelColorSettings>
				
			</InspectorControls>
			,
			<div style={{ borderColor: borderColor, backgroundColor: boxBackgroundColor, borderStyle: boxBorder }} className="wp-pros-cons wppc-view1">				
				<RichText
					tagName="h3"
					onChange={ content => setAttributes({ title: content }) }
					value={ title }
					placeholder="Title goes here.."
					className="wp-pros-cons-heading"
				/>
				
				<div className="wppc-boxs">
					<div className="wppc-box pros-content">
						<div className="wppc-header">
							<div className="wppc-box-symbol">
								<i className="far fa-thumbs-up"></i>
							</div>
							{/* Pros Title */}
							<RichText
								tagName="h4"
								className="wppc-content-title pros-title"
								value={ prosTitle }
								onChange={ value => setAttributes({ prosTitle: value }) }
								placeholder="Enter title here!"
							/>
						</div>
					
						{/* Here comes all the pros */}
						<RichText
							tagName="ul"
							multiline="li"
							placeholder={ __( 'Pros goes here...', 'themescamp-blocks' ) }
							keepPlaceholderOnFocus
							value={ prosValues }
							className="wp-pros-cons-list wp-pros-list"
							onChange={ ( value ) => setAttributes( { prosValues: value } ) }
						/>
					</div>
					<div className="wppc-box cons-content">	
						<div className="wppc-header">
							<div className="wppc-box-symbol">
								<i className="far fa-thumbs-down"></i>
							</div>
							{/* Cons Title */}
							<RichText
								tagName="h4"
								className="wppc-content-title cons-title"
								value={ consTitle }
								onChange={ ( value ) => setAttributes( { consTitle: value } ) }
								placeholder="Enter title here!"
							/>
						</div>

						{/* Here comes all the cons */}
						<RichText
							tagName="ul"
							multiline="li"
							placeholder={ __( 'Cons goes here...', 'themescamp-blocks' ) }
							keepPlaceholderOnFocus
							value={ consValues }
							formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
							className="wp-pros-cons-list wp-cons-list"
							onChange={ ( value ) => setAttributes( { consValues: value } ) }
						/>
					</div>
				</div>
				<div className="wppc-btn-wrapper">
					<RichText
						tagName="a"
						placeholder={ __( 'Button text...', 'themescamp-blocks' ) }
						keepPlaceholderOnFocus
						value={ buttonText }
						className='wp-btn'
						onChange={ (value) => setAttributes( { buttonText: value } ) }
						style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
					/>
					
					<form
						key="form-link"
						onSubmit={ event => event.preventDefault() }
					>							
						<URLInput
							className="button-url btn-onclick-url"
							style={{ display:'inline' }}
							value={ buttonUrl }
							onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
						/>
					
					
						<IconButton
							icon="editor-break"
							style={{ display:'inline' }}
							label={ __( 'Apply', 'themescamp-blocks' ) }
							type="submit"
						/>						
					</form>					
				</div>
			</div>
		]);
	},

	save({ attributes }) {
		
		const { prosValues, consValues, title, prosTitle, consTitle, buttonText, buttonUrl, buttonBackgroundColor, buttonTextColor, boxBackgroundColor, buttonTarget, buttonRel, boxBorder, borderColor } = attributes;
		
		return (
			<div style={{ borderColor: borderColor, backgroundColor: boxBackgroundColor, borderStyle: boxBorder }} className="wp-pros-cons wppc-view1">
				{/* Pros&Cons Title */}
				<RichText.Content
					tagName="h3"
					className="wp-pros-cons-heading"
					value={ title }
				/>

				<div className="wppc-boxs">
					<div className="wppc-box pros-content">		
						<div className="wppc-header">
							<div className="wppc-box-symbol">
								<i className="far fa-thumbs-up"></i>
							</div>
							{/* Pros title */}
							<RichText.Content
								tagName="h4"
								className="wppc-content-title pros-title"
								value={ prosTitle }
							/>
						</div>

						{/* Pros goes here */}
						<RichText.Content
							tagName="ul"
							className="wp-pros-cons-list wp-pros-list"
							value={ prosValues }
						/>						
					</div>
					<div className="wppc-box cons-content">	
						<div className="wppc-header">
							<div className="wppc-box-symbol">
								<i className="far fa-thumbs-down"></i>
							</div>
							{/* Cons title */}
							<RichText.Content
								tagName="h4"
								className="wppc-content-title cons-title"
								value={ consTitle }
							/>
						</div>

						{/* Cons goes here */}
						<RichText.Content
							tagName="ul"
							className="wp-pros-cons-list wp-cons-list"
							value={ consValues }
						/>
						
					</div>
				</div>

				{
					buttonText && (
						<div className="wppc-btn-wrapper">							
							<a
								href={ buttonUrl }
								style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
								rel={ buttonRel }
								className="wp-btn"
								target={ buttonTarget ? '_blank' : null }
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
