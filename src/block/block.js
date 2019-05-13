	//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { IconButton, PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;
const { RichText, URLInput, ColorPalette, InspectorControls, PanelColorSettings } = wp.editor;

registerBlockType( 'tc/block-prosandcons', {
	title: __( 'Pros And Cons', 'mightythemes-blocks' ),
	description: __( 'Pros & Cons for your website.', 'mightythemes-blocks' ),
	icon: 'thumbs-up',
	category: 'mightythemes-blocks',
	keywords: [
		__( 'Pros And Cons' ),
		__( 'MightyThemes' ),
		__( 'Pros & Cons' ),
	],

	attributes: {
		title: {
			source: 'text',
			selector: '.wp-pros-cons-heading',
			default: 'Your Title here..'
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
			type: 'boolean',
			default: false
		},
		buttonSize: {
			type: 'string',
			default: 'wp-btn-md'
		},
		buttonShapeSize: {
			type: 'number',
			default: 18
		},
		boxBorder: {
			type: 'string',
			default: 'None'
		},
		borderColor: {
			type: 'string',
			default: '#28b914'
		},
		pluginStyle: {
			type: 'string',
			default: 'wp-pros-cons wppc-view1'
		},
		titleTag: {
			type: 'string',
			default: 'H3'
		},
		borderWidth: {
			type: 'number',
			default: 2
		},
		enableTitle: {
			type: 'boolean',
			default: false
		},
		enableButton: {
			type: 'boolean',
			default: false
		},
	},

	edit({attributes, setAttributes}) {
		const { prosValues, consValues, title, prosTitle, consTitle, buttonText, buttonUrl, buttonBackgroundColor, buttonTextColor, boxBackgroundColor, buttonTarget, buttonRel, buttonSize, buttonShapeSize, borderWidth, boxBorder, borderColor, pluginStyle, titleTag, enableTitle, enableButton } = attributes;

		// Box border type
		const boxBorderOptions = [
			{ value: 'none', label: __( 'None', 'mightythemes-blocks' ) },
			{ value: 'dotted', label: __( 'Dotted', 'mightythemes-blocks' ) },
			{ value: 'solid', label: __( 'Solid', 'mightythemes-blocks' ) },
			{ value: 'dashed', label: __( 'Dashed', 'mightythemes-blocks' ) },
		];

		// Styling options
		const stylingOptions = [
			{ value: 'wp-pros-cons wppc-view1', label: __( 'Style 1', 'mightythemes-blocks' ) },
			{ value: 'wp-pros-cons wppc-view2', label: __( 'Style 2', 'mightythemes-blocks' ) },
			{ value: 'wp-pros-cons wppc-view3', label: __( 'Style 3', 'mightythemes-blocks' ) },
		];

		// Title heading tag
		const titleHeadingTags = [
			{ value: 'h1', label: __( 'H1', 'mightythemes-blocks' ) },
			{ value: 'h2', label: __( 'H2', 'mightythemes-blocks' ) },
			{ value: 'h3', label: __( 'H3', 'mightythemes-blocks' ) },
			{ value: 'h4', label: __( 'H4', 'mightythemes-blocks' ) },
			{ value: 'h5', label: __( 'H5', 'mightythemes-blocks' ) },
			{ value: 'h6', label: __( 'H6', 'mightythemes-blocks' ) },
		];

		// Button size options
		const buttonSizeOptions = [
			{ value: 'wp-btn-sm', label: __( 'Small', 'mightythemes-blocks' ) },
			{ value: 'wp-btn-md', label: __( 'Medium', 'mightythemes-blocks' ) },
			{ value: 'wp-btn-lg', label: __( 'Large', 'mightythemes-blocks' ) },
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

		function onChangeButtonRel(changes) {
			setAttributes({
				buttonRel: ! buttonRel
			})
		}

		function onBorderColorChange(changes) {
			setAttributes({
				borderColor: changes
			})
		}

		function onChangeEnableTitle(changes) {
			setAttributes({
				enableTitle: !enableTitle
			})
		}
		
		function onChangeEnableButton(changes) {
			setAttributes({
				enableButton: !enableButton
			})
		}

		return ([
			<InspectorControls>

				<PanelBody title={ __( 'Formatting Options', 'mightythemes-blocks' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Enable Title', 'mightythemes-blocks' ) }
						checked={ enableTitle }
						onChange={ onChangeEnableTitle }
					>
					</ToggleControl>

					<SelectControl
						label={ __( 'WP Pros & Cons Style', 'mightythemes-blocks' ) }
						value={ pluginStyle }
						options={ stylingOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ value => setAttributes({ pluginStyle: value }) }
					>
					</SelectControl>

					<SelectControl
						label={ __( 'Title tag', 'mightythemes-blocks' ) }
						value={ titleTag }
						options={ titleHeadingTags.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ value => setAttributes({ titleTag: value }) }
					>
					</SelectControl>

					<PanelColorSettings
						title={ __( 'Background Color', 'mightythemes-blocks' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: boxBackgroundColor,
							onChange: onBackgroundColorChange,
							label: __( 'Background Color', 'mightythemes-block' ),
						} ] }
					>
					</PanelColorSettings>
				</PanelBody>

				<PanelBody title={ __( 'Button Options', 'mightythemes-blocks' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Enable Button', 'mightythemes-blocks' ) }
						checked={ enableButton }
						onChange={ onChangeEnableButton }
					>
					</ToggleControl>

					<ToggleControl
						label={ __( 'Open link in new window', 'mightythemes-blocks' ) }
						checked={ buttonTarget }
						onChange={ onChangeButtonTarget }
					>
					</ToggleControl>

					<ToggleControl
						label={ __( 'Activate NoFollow Rel Attribute', 'mightythemes-blocks' ) }
						checked={ buttonRel }
						onChange={ onChangeButtonRel }
					>
					</ToggleControl>

					<PanelColorSettings 
						title={ __( 'Button Background Color', 'mightythemes-blocks' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: buttonBackgroundColor,
							onChange: onButtonBackgroundChange,
							label: __( 'Button Background Color', 'mightythemes-block' ),
						} ] }
					>
					</PanelColorSettings>

					<PanelColorSettings 
						title={ __( 'Button Text Color', 'mightythemes-blocks' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: buttonTextColor,
							onChange: onButtonTextColorChange,
							label: __( 'Button Text Color', 'mightythemes-block' ),
						} ] }
					>
					</PanelColorSettings>

					<SelectControl
						label={ __( 'Button Size', 'mightythemes-blocks' ) }
						value={ buttonSize }
						options={ buttonSizeOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ value => setAttributes({ buttonSize: value }) }
					>
					</SelectControl>

					<RangeControl
						label={ __( 'Button Shape', 'mightythemes-blocks' ) }
						value={ buttonShapeSize }
						onChange={ ( value ) => setAttributes( { buttonShapeSize: value } ) }
						min={ 1 }
						max={ 50 }
						step={ 1 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Border Options', 'mightythemes-blocks' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Box Border Style', 'mightythemes-blocks' ) }
						value={ boxBorder }
						options={ boxBorderOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ content => setAttributes({ boxBorder: content }) }
					>
					</SelectControl>

					<RangeControl
						label={ __( 'Border Width', 'mightythemes-blocks' ) }
						value={ borderWidth }
						onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
						min={ 1 }
						max={ 20 }
						step={ 1 }
					/>

					<PanelColorSettings 
						title={ __( 'Border Color', 'mightythemes-blocks' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: borderColor,
							onChange: onBorderColorChange,
							label: __( 'Border Color', 'mightythemes-block' ),
						} ] }
					>
					</PanelColorSettings>
				</PanelBody>
				
			</InspectorControls>
			,
			<div style={{ borderColor: borderColor, backgroundColor: boxBackgroundColor, borderStyle: boxBorder, borderWidth: borderWidth }} className={pluginStyle}>

				{enableTitle ?
					<RichText
						tagName={ titleTag }
						onChange={ content => setAttributes({ title: content }) }
						value={ title }
						placeholder="Title goes here.."
						className="wp-pros-cons-heading"
					/>
					: 
					null
				}
				
				<div className="wppc-boxs">
					<div className="wppc-box pros-content">
						<div className="wppc-header">
							
							{pluginStyle === "wp-pros-cons wppc-view1" ?								
								<div className="wppc-box-symbol">
									<i className="far fa-thumbs-up"></i>
								</div>
								: 
								null
							}

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
							placeholder={ __( 'Pros goes here...', 'mightythemes-blocks' ) }
							keepPlaceholderOnFocus
							value={ prosValues }
							className="wp-pros-cons-list wp-pros-list"
							onChange={ ( value ) => setAttributes( { prosValues: value } ) }
						/>
					</div>
					<div className="wppc-box cons-content">	
						<div className="wppc-header">
							
							{pluginStyle === "wp-pros-cons wppc-view1" ?								
								<div className="wppc-box-symbol">
									<i className="far fa-thumbs-down"></i>
								</div>
								: 
								null
							}

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
							placeholder={ __( 'Cons goes here...', 'mightythemes-blocks' ) }
							keepPlaceholderOnFocus
							value={ consValues }
							formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
							className="wp-pros-cons-list wp-cons-list"
							onChange={ ( value ) => setAttributes( { consValues: value } ) }
						/>
					</div>
				</div>

				{enableButton ?								
					<div className="wppc-btn-wrapper">
						<RichText
							tagName="a"
							placeholder={ __( 'Button text...', 'mightythemes-blocks' ) }
							keepPlaceholderOnFocus
							value={ buttonText }
							className={ `wp-btn ${buttonSize}`}
							onChange={ (value) => setAttributes( { buttonText: value } ) }
							style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor, borderRadius: buttonShapeSize ? buttonShapeSize + 'px' : undefined }}
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
								label={ __( 'Apply', 'mightythemes-blocks' ) }
								type="submit"
							/>						
						</form>					
					</div>
					: 
					null
				}
				
			</div>
		]);
	},

	save({ attributes }) {
		
		const { prosValues, consValues, title, prosTitle, consTitle, buttonText, buttonUrl, buttonBackgroundColor, buttonTextColor, boxBackgroundColor, buttonTarget, buttonRel, buttonSize, buttonShapeSize, boxBorder, borderWidth, borderColor, pluginStyle, titleTag, enableTitle, enableButton } = attributes;
		
		return (
			<div style={{ borderColor: borderColor, backgroundColor: boxBackgroundColor, borderStyle: boxBorder, borderWidth: borderWidth }} className={pluginStyle}>
				{/* Pros&Cons Title */}
				{enableTitle ?								
					<RichText.Content
						tagName={ titleTag }
						className="wp-pros-cons-heading"
						value={ title }
					/>
					: 
					null
				}

				<div className="wppc-boxs">
					<div className="wppc-box pros-content">		
						<div className="wppc-header">
							
							{pluginStyle === "wp-pros-cons wppc-view1" ?								
								<div className="wppc-box-symbol">
									<i className="far fa-thumbs-up"></i>
								</div>							
								: 
								null
							}

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

							{pluginStyle === "wp-pros-cons wppc-view1" ?								
								<div className="wppc-box-symbol">
									<i className="far fa-thumbs-down"></i>
								</div>							
								: 
								null
							}

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
				
				{enableButton ?								
					<div className="wppc-btn-wrapper">							
						<a
							href={ buttonUrl ? buttonUrl : '#' }
							style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor, borderRadius: buttonShapeSize ? buttonShapeSize + 'px' : undefined }}
							rel={ buttonRel ? 'nofollow noopener noreferrer' : 'noopener noreferrer' }
							className={ `wp-btn ${buttonSize}`}
							target={ buttonTarget ? '_blank' : null }
						>
							<RichText.Content value={ buttonText } />
						</a>							
					</div>
					: 
					null
				}
			</div>
		);
	},
} );
