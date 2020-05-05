//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { IconButton, PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;
const { RichText, URLInput, ColorPalette, InspectorControls } = wp.blockEditor;

// Internal Dependencies
// import edit from './edit';
// import save from './save';
// import metadata from './attributes.json';

// const { attributes } = metadata;

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

	attributes: {
        title: {
            source: "text",
            selector: ".wp-pros-cons-heading",
            default: "Your Title here.."
        },
        prosTitle: {
            source: "text",
            default: "Pros",
            selector: "h4.pros-title"
        },
        consTitle: {
            source: "text",
            default: "Cons",
            selector: "h4.cons-title"
        },
        prosValues: {
            type: "array",
            selector: ".wp-pros-list",
            source: "children"
        },
        consValues: {
            type: "array",
            selector: ".wp-cons-list",
            source: "children"
        },
        buttonText: {
            type: "string",
            default: "Button text here..",
            selector: ".wp-btn"
        },
        buttonUrl: {
            type: "string",
            source: "attribute",
            selector: "a",
            attribute: "href"
        },
        buttonBackgroundColor: {
            type: "string",
            default: "black"
        },
        buttonTextColor: {
            type: "string",
            default: "white"
        },
        boxBackgroundColor: {
            type: "string",
            default: "#f9f9f9"
        },
        buttonTarget: {
            type: "boolean",
            default: false
        },
        buttonRel: {
            type: "boolean",
            default: false
        },
        buttonSize: {
            type: "string",
            default: "wp-btn-md"
        },
        buttonShapeSize: {
            type: "number",
            default: 18
        },
        boxBorder: {
            type: "string",
            default: "None"
        },
        borderColor: {
            type: "string",
            default: "#28b914"
        },
        pluginStyle: {
            type: "string",
            default: "wp-pros-cons wppc-view1"
        },
        titleTag: {
            type: "string",
            default: "h3"
        },
        contentTitleTag: {
            type: "string",
            default: "h4"
        },
        borderWidth: {
            type: "number",
            default: 2
        },
        enableTitle: {
            type: "boolean",
            default: false
        },
        enableVerdict: {
            type: "boolean",
            default: false
        },
        verdictText: {
            source: "text",
            selector: "div.wppc-verdict-wrapper"
        },
        verdictFontSize: {
            type: "number",
            default: 18
        },
        verdictColor: {
            type: "string",
            default: "black"
        },
        enableButton: {
            type: "boolean",
            default: false
        },
        iconSize: {
            type: "number",
            default: 30
        }
	},
	
	edit: props => {
		const { attributes, className, setAttributes } = props;

		const { prosValues, consValues, title, prosTitle, consTitle, buttonText, buttonUrl, buttonBackgroundColor, buttonTextColor, boxBackgroundColor, buttonTarget, buttonRel, buttonSize, buttonShapeSize, borderWidth, boxBorder, borderColor, pluginStyle, titleTag, contentTitleTag, enableTitle, enableVerdict, verdictText, verdictFontSize, verdictColor, enableButton, iconSize } = attributes;

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
			{ value: 'p', label: __( 'p', 'mightythemes-blocks' ) },
			{ value: 'span', label: __( 'span', 'mightythemes-blocks' ) },
		];
	
		// Button size options
		const buttonSizeOptions = [
			{ value: 'wp-btn-sm', label: __( 'Small', 'mightythemes-blocks' ) },
			{ value: 'wp-btn-md', label: __( 'Medium', 'mightythemes-blocks' ) },
			{ value: 'wp-btn-lg', label: __( 'Large', 'mightythemes-blocks' ) },
		];
	
		function onChangeButtonTarget(changes) {
			props.setAttributes({
				buttonTarget: ! buttonTarget
			})
		}
	
		function onChangeButtonRel(changes) {
			props.setAttributes({
				buttonRel: ! buttonRel
			})
		}
	
		function onChangeEnableTitle() {
			props.setAttributes({
				enableTitle: !enableTitle
			})
		}
	
		function onChangeEnableVerdict() {
			props.setAttributes({
				enableVerdict: !enableVerdict
			})
		}
		
		function onChangeEnableButton() {
			props.setAttributes({
				enableButton: !enableButton
			})
		}
	
		function updateTitle( value ) {
			console.log(value);
			props.setAttributes({
				title: value
			})
		}

		return ([
			<InspectorControls>
	
				<PanelBody title={ __( 'Formatting Options', 'mightythemes-blocks' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Enable Title', 'mightythemes-blocks' ) }
						checked={ enableTitle }
						onChange={ onChangeEnableTitle }
					>
					</ToggleControl>
	
					<SelectControl
						label={ __( 'Title tag', 'mightythemes-blocks' ) }
						value={ titleTag }
						options={ titleHeadingTags.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ value => props.setAttributes({ titleTag: value }) }
					>
					</SelectControl>
	
					<SelectControl
						label={ __( 'Content Title tag', 'mightythemes-blocks' ) }
						value={ contentTitleTag }
						options={ titleHeadingTags.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ value => props.setAttributes({ contentTitleTag: value }) }
					>
					</SelectControl>
	
					<SelectControl
						label={ __( 'Choose Style', 'mightythemes-blocks' ) }
						value={ pluginStyle }
						options={ stylingOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ value => props.setAttributes({ pluginStyle: value }) }
					>
					</SelectControl>
					
					<p>Background color:</p>
					<ColorPalette 
						value={ boxBackgroundColor }
						onChange={ ( color ) => props.setAttributes( { boxBackgroundColor: color } ) }
						label={ __( 'Background Color', 'mightythemes-blocks' ) } 
					/>
	
					<ToggleControl
						label={ __( 'Enable Verdict Text', 'mightythemes-blocks' ) }
						checked={ enableVerdict }
						onChange={ onChangeEnableVerdict }
					>
					</ToggleControl>
	
					<RangeControl
						label={ __( 'Verdict Font Size', 'mightythemes-blocks' ) }
						value={ verdictFontSize }
						onChange={ ( value ) => props.setAttributes( { verdictFontSize: value } ) }
						min={ 1 }
						max={ 50 }
						step={ 1 }
					/>
	
					<p>Verdict color:</p>
					<ColorPalette
						value={ verdictColor }
						onChange={ ( color ) => props.setAttributes( { verdictColor: color } ) }
						label={ __( 'Verdict Color', 'mightythemes-blocks' ) } 
					/>
	
					<RangeControl
						label={ __( 'Icon Font Size', 'mightythemes-blocks' ) }
						value={ iconSize }
						onChange={ ( value ) => props.setAttributes( { iconSize: value } ) }
						min={ 1 }
						max={ 100 }
						step={ 1 }
					/>
					
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
	
					<p>Button Background color:</p>
					<ColorPalette
						value={ buttonBackgroundColor }
						onChange={ ( color ) => props.setAttributes( { buttonBackgroundColor: color } ) }
						label={ __( 'Button Background Color', 'mightythemes-blocks' ) } 
					/>
					
					<p>Button Text color:</p>
					<ColorPalette
						value={ buttonTextColor }
						onChange={ ( color ) => props.setAttributes( { buttonTextColor: color } ) }
						label={ __( 'Button Text Color', 'mightythemes-blocks' ) } 
					/>
	
					<SelectControl
						label={ __( 'Button Size', 'mightythemes-blocks' ) }
						value={ buttonSize }
						options={ buttonSizeOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ value => props.setAttributes({ buttonSize: value }) }
					>
					</SelectControl>
	
					<RangeControl
						label={ __( 'Button Shape', 'mightythemes-blocks' ) }
						value={ buttonShapeSize }
						onChange={ ( value ) => props.setAttributes( { buttonShapeSize: value } ) }
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
						onChange={ content => props.setAttributes({ boxBorder: content }) }
					>
					</SelectControl>
	
					<RangeControl
						label={ __( 'Border Width', 'mightythemes-blocks' ) }
						value={ borderWidth }
						onChange={ ( value ) => props.setAttributes( { borderWidth: value } ) }
						min={ 1 }
						max={ 20 }
						step={ 1 }
					/>
	
					<p>Border Color:</p>
					<ColorPalette 
						value={ borderColor }
						onChange={ ( color ) => props.setAttributes( { borderColor: color } ) }
						label={ __( 'Border Color', 'mightythemes-blocks' ) } 
					/>
				</PanelBody>
				
			</InspectorControls>
			,
			<div style={{ borderColor: borderColor, backgroundColor: boxBackgroundColor, borderStyle: boxBorder, borderWidth: borderWidth }} className={pluginStyle}>
	
				{enableTitle ?
					<RichText
						tagName={ titleTag }
						// onChange={ value => props.setAttributes({ title: value }) }
						onChange={ function( title ) {
							console.log(title);
							props.setAttributes({ title: title });
						} }
						value={ attributes.title }
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
									<img style={{ width: iconSize }} src={prosandcons.baseUrl + "assets/icons/thumbs-up-regular.svg"} />
								</div>
								: 
								null
							}
	
							{/* Pros Title */}
							<RichText
								tagName={ contentTitleTag }
								className="wppc-content-title pros-title"
								value={ prosTitle }
								onChange={ value => props.setAttributes({ prosTitle: value }) }
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
							onChange={ ( value ) => props.setAttributes( { prosValues: value } ) }
						/>
					</div>
					<div className="wppc-box cons-content">	
						<div className="wppc-header">
							
							{pluginStyle === "wp-pros-cons wppc-view1" ?								
								<div className="wppc-box-symbol">
									<img style={{ width: iconSize }} src={prosandcons.baseUrl + "assets/icons/thumbs-down-regular.svg"} />
								</div>
								: 
								null
							}
	
							{/* Cons Title */}
							<RichText
								tagName={ contentTitleTag }
								className="wppc-content-title cons-title"
								value={ consTitle }
								onChange={ ( value ) => props.setAttributes( { consTitle: value } ) }
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
							// formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
							className="wp-pros-cons-list wp-cons-list"
							onChange={ ( value ) => props.setAttributes( { consValues: value } ) }
						/>
					</div>
				</div>
	
				{enableVerdict ?
					<RichText
						tagName="div"
						style={{ fontSize: verdictFontSize, color: verdictColor }}
						value={ verdictText }
						onChange={ ( value ) => props.setAttributes( { verdictText: value } ) }
						placeholder="Enter verdict here!"
						className="wppc-verdict-wrapper"
					/>
					: 
					null
				}
	
				{enableButton ?								
					<div className="wppc-btn-wrapper">
						<RichText
							tagName="a"
							placeholder={ __( 'Button text...', 'mightythemes-blocks' ) }
							keepPlaceholderOnFocus
							value={ buttonText }
							className={ `wp-btn ${buttonSize}`}
							onChange={ (value) => props.setAttributes( { buttonText: value } ) }
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
								onChange={ ( value ) => props.setAttributes( { buttonUrl: value } ) }
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
	
	save: function() {
		return null;
	},
} );
