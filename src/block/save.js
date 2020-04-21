/* WordPress Dependencies */
const { RichText } = wp.editor;

export default function save({ attributes }) {
		
    const { prosValues, consValues, title, prosTitle, consTitle, buttonText, buttonUrl, buttonBackgroundColor, buttonTextColor, boxBackgroundColor, buttonTarget, buttonRel, buttonSize, buttonShapeSize, boxBorder, borderWidth, borderColor, pluginStyle, titleTag, contentTitleTag, enableTitle, enableButton } = attributes;
    
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
                                <img src={prosandcons.baseUrl + "assets/icons/thumbs-up-regular.svg"} />
                            </div>
                            : 
                            null
                        }

                        {/* Pros title */}
                        <RichText.Content
                            tagName={ contentTitleTag }
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
                                <img src={prosandcons.baseUrl + "assets/icons/thumbs-down-regular.svg"} />
                            </div>
                            : 
                            null
                        }

                        {/* Cons title */}
                        <RichText.Content
                            tagName={ contentTitleTag }
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
}