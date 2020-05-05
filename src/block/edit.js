/* WordPress Dependencies */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { IconButton, PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;
const { RichText, URLInput, ColorPalette, InspectorControls } = wp.blockEditor;

export default function edit({attributes, setAttributes}) {
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
        setAttributes({
            buttonTarget: ! buttonTarget
        })
    }

    function onChangeButtonRel(changes) {
        setAttributes({
            buttonRel: ! buttonRel
        })
    }

    function onChangeEnableTitle() {
        setAttributes({
            enableTitle: !enableTitle
        })
    }

    function onChangeEnableVerdict() {
        setAttributes({
            enableVerdict: !enableVerdict
        })
    }
    
    function onChangeEnableButton() {
        setAttributes({
            enableButton: !enableButton
        })
    }

    function updateTitle( value ) {
        console.log(value);
        setAttributes({
            title: value
        })
    }

    console.log(title);

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
                    onChange={ value => setAttributes({ titleTag: value }) }
                >
                </SelectControl>

                <SelectControl
                    label={ __( 'Content Title tag', 'mightythemes-blocks' ) }
                    value={ contentTitleTag }
                    options={ titleHeadingTags.map( ({ value, label }) => ( {
                        value: value,
                        label: label,
                    } ) ) }
                    onChange={ value => setAttributes({ contentTitleTag: value }) }
                >
                </SelectControl>

                <SelectControl
                    label={ __( 'Choose Style', 'mightythemes-blocks' ) }
                    value={ pluginStyle }
                    options={ stylingOptions.map( ({ value, label }) => ( {
                        value: value,
                        label: label,
                    } ) ) }
                    onChange={ value => setAttributes({ pluginStyle: value }) }
                >
                </SelectControl>
                
                <p>Background color:</p>
                <ColorPalette 
                    value={ boxBackgroundColor }
                    onChange={ ( color ) => setAttributes( { boxBackgroundColor: color } ) }
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
                    onChange={ ( value ) => setAttributes( { verdictFontSize: value } ) }
                    min={ 1 }
                    max={ 50 }
                    step={ 1 }
                />

                <p>Verdict color:</p>
                <ColorPalette
                    value={ verdictColor }
                    onChange={ ( color ) => setAttributes( { verdictColor: color } ) }
                    label={ __( 'Verdict Color', 'mightythemes-blocks' ) } 
                />

                <RangeControl
                    label={ __( 'Icon Font Size', 'mightythemes-blocks' ) }
                    value={ iconSize }
                    onChange={ ( value ) => setAttributes( { iconSize: value } ) }
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
                    onChange={ ( color ) => setAttributes( { buttonBackgroundColor: color } ) }
                    label={ __( 'Button Background Color', 'mightythemes-blocks' ) } 
                />
                
                <p>Button Text color:</p>
                <ColorPalette
                    value={ buttonTextColor }
                    onChange={ ( color ) => setAttributes( { buttonTextColor: color } ) }
                    label={ __( 'Button Text Color', 'mightythemes-blocks' ) } 
                />

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

                <p>Border Color:</p>
                <ColorPalette 
                    value={ borderColor }
                    onChange={ ( color ) => setAttributes( { borderColor: color } ) }
                    label={ __( 'Border Color', 'mightythemes-blocks' ) } 
                />
            </PanelBody>
            
        </InspectorControls>
        ,
        <div style={{ borderColor: borderColor, backgroundColor: boxBackgroundColor, borderStyle: boxBorder, borderWidth: borderWidth }} className={pluginStyle}>

            {enableTitle ?
                <RichText
                    tagName={ titleTag }
                    onChange={ value => setAttributes({ title: value }) }
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

            {enableVerdict ?
                <RichText
                    tagName="div"
                    style={{ fontSize: verdictFontSize, color: verdictColor }}
                    value={ verdictText }
                    onChange={ ( value ) => setAttributes( { verdictText: value } ) }
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
}