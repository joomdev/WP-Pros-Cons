/* WordPress Dependencies */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { IconButton, PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;
const { RichText, URLInput, ColorPalette, InspectorControls } = wp.blockEditor;

export default function edit( props ) {

    const { attributes, className, setAttributes } = props;

    const { prosValues, consValues, title, prosTitle, consTitle, buttonText, buttonUrl, buttonBackgroundColor, buttonTextColor, buttonHoverColor, buttonHoverTextColor, boxBackgroundColor, buttonTarget, buttonRel, buttonSize, buttonShapeSize, borderWidth, boxBorder, borderColor, pluginStyle, titleTag, contentTitleTag, enableTitle, enableVerdict, verdictText, verdictFontSize, verdictColor, enableButton, iconSize } = attributes;

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
                    value={ props.attributes.titleTag }
                    options={ titleHeadingTags.map( ({ value, label }) => ( {
                        value: value,
                        label: label,
                    } ) ) }
                    onChange={ value => props.setAttributes({ titleTag: value }) }
                >
                </SelectControl>

                <SelectControl
                    label={ __( 'Content Title tag', 'mightythemes-blocks' ) }
                    value={ props.attributes.contentTitleTag }
                    options={ titleHeadingTags.map( ({ value, label }) => ( {
                        value: value,
                        label: label,
                    } ) ) }
                    onChange={ value => props.setAttributes({ contentTitleTag: value }) }
                >
                </SelectControl>

                <SelectControl
                    label={ __( 'Choose Style', 'mightythemes-blocks' ) }
                    value={ props.attributes.pluginStyle }
                    options={ stylingOptions.map( ({ value, label }) => ( {
                        value: value,
                        label: label,
                    } ) ) }
                    onChange={ value => props.setAttributes({ pluginStyle: value }) }
                >
                </SelectControl>
                
                <p>Background color:</p>
                <ColorPalette 
                    value={ props.attributes.boxBackgroundColor }
                    onChange={ ( color ) => props.setAttributes({ boxBackgroundColor: color }) }
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
                    value={ props.attributes.verdictFontSize }
                    onChange={ ( value ) => props.setAttributes({ verdictFontSize: value }) }
                    min={ 1 }
                    max={ 50 }
                    step={ 1 }
                />

                <p>Verdict color:</p>
                <ColorPalette
                    value={ props.attributes.verdictColor }
                    onChange={ ( color ) => props.setAttributes({ verdictColor: color }) }
                    label={ __( 'Verdict Color', 'mightythemes-blocks' ) } 
                />

                <RangeControl
                    label={ __( 'Icon Font Size', 'mightythemes-blocks' ) }
                    value={ props.attributes.iconSize }
                    onChange={ ( value ) => props.setAttributes({ iconSize: value }) }
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

                <p>Button Background Color:</p>
                <ColorPalette
                    value={ props.attributes.buttonBackgroundColor }
                    onChange={ ( color ) => props.setAttributes({ buttonBackgroundColor: color }) }
                    label={ __( 'Button Background Color', 'mightythemes-blocks' ) } 
                />
                
                <p>Button Text Color:</p>
                <ColorPalette
                    value={ props.attributes.buttonTextColor }
                    onChange={ ( color ) => props.setAttributes({ buttonTextColor: color }) }
                    label={ __( 'Button Text Color', 'mightythemes-blocks' ) } 
                />

                <p>Button Hover Background Color:</p>
                <ColorPalette
                    value={ props.attributes.buttonHoverColor }
                    onChange={ ( color ) => props.setAttributes({ buttonHoverColor: color }) }
                    label={ __( 'Button Hover Background Color', 'mightythemes-blocks' ) } 
                />
                
                <p>Button Hover Text Color:</p>
                <ColorPalette
                    value={ props.attributes.buttonHoverTextColor }
                    onChange={ ( color ) => props.setAttributes({ buttonHoverTextColor: color }) }
                    label={ __( 'Button Hover Text Color', 'mightythemes-blocks' ) } 
                />

                <SelectControl
                    label={ __( 'Button Size', 'mightythemes-blocks' ) }
                    value={ props.attributes.buttonSize }
                    options={ buttonSizeOptions.map( ({ value, label }) => ( {
                        value: value,
                        label: label,
                    } ) ) }
                    onChange={ value => props.setAttributes({ buttonSize: value }) }
                >
                </SelectControl>

                <RangeControl
                    label={ __( 'Button Shape', 'mightythemes-blocks' ) }
                    value={ props.attributes.buttonShapeSize }
                    onChange={ ( value ) => props.setAttributes({ buttonShapeSize: value }) }
                    min={ 1 }
                    max={ 50 }
                    step={ 1 }
                />
            </PanelBody>

            <PanelBody title={ __( 'Border Options', 'mightythemes-blocks' ) } initialOpen={ false }>
                <SelectControl
                    label={ __( 'Box Border Style', 'mightythemes-blocks' ) }
                    value={ props.attributes.boxBorder }
                    options={ boxBorderOptions.map( ({ value, label }) => ( {
                        value: value,
                        label: label,
                    } ) ) }
                    onChange={ content => props.setAttributes({ boxBorder: content }) }
                >
                </SelectControl>

                <RangeControl
                    label={ __( 'Border Width', 'mightythemes-blocks' ) }
                    value={ props.attributes.borderWidth }
                    onChange={ ( value ) => props.setAttributes({ borderWidth: value }) }
                    min={ 1 }
                    max={ 20 }
                    step={ 1 }
                />

                <p>Border Color:</p>
                <ColorPalette 
                    value={ props.attributes.borderColor }
                    onChange={ ( color ) => props.setAttributes({ borderColor: color }) }
                    label={ __( 'Border Color', 'mightythemes-blocks' ) } 
                />
            </PanelBody>
            
        </InspectorControls>
        ,
        <div style={{ borderColor: borderColor, backgroundColor: boxBackgroundColor, borderStyle: boxBorder, borderWidth: borderWidth }} className={pluginStyle}>

            {enableTitle ?
                <RichText
                    tagName={ titleTag }
                    onChange={ value => props.setAttributes({ title: value }) }						
                    value={ props.attributes.title }
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
                            value={ props.attributes.prosTitle }
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
                        value={ props.attributes.prosValues }
                        className="wp-pros-cons-list wp-pros-list"
                        onChange={ ( value ) => props.setAttributes({ prosValues: value }) }
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
                            value={ props.attributes.consTitle }
                            onChange={ ( value ) => props.setAttributes({ consTitle: value }) }
                            placeholder="Enter title here!"
                        />
                    </div>

                    {/* Here comes all the cons */}
                    <RichText
                        tagName="ul"
                        multiline="li"
                        placeholder={ __( 'Cons goes here...', 'mightythemes-blocks' ) }
                        keepPlaceholderOnFocus
                        value={ props.attributes.consValues }
                        // formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
                        className="wp-pros-cons-list wp-cons-list"
                        onChange={ ( value ) => props.setAttributes({ consValues: value }) }
                    />
                </div>
            </div>

            {enableVerdict ?
                <RichText
                    tagName="div"
                    style={{ fontSize: verdictFontSize, color: verdictColor }}
                    value={ props.attributes.verdictText }
                    onChange={ ( value ) => props.setAttributes({ verdictText: value }) }
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
                        value={ props.attributes.buttonText }
                        className={ `wp-btn ${buttonSize}`}
                        onChange={ (value) => props.setAttributes({ buttonText: value }) }
                        style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor, borderRadius: buttonShapeSize ? buttonShapeSize + 'px' : undefined }}
                    />
                    
                    <form
                        key="form-link"
                        onSubmit={ event => event.preventDefault() }
                    >							
                        <URLInput
                            className="button-url btn-onclick-url"
                            style={{ display:'inline' }}
                            value={ props.attributes.buttonUrl }
                            onChange={ ( value ) => props.setAttributes({ buttonUrl: value }) }
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
}