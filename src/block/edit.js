/* WordPress Dependencies */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { IconButton, PanelBody, ToggleControl, SelectControl, RangeControl, CustomSelectControl } = wp.components;
const { RichText, URLInput, ColorPalette, InspectorControls } = wp.editor;

export default function edit({attributes, setAttributes}) {
    const { prosValues, consValues, title, prosTitle, consTitle, buttonText, buttonUrl, buttonBackgroundColor, buttonIcon, iconPosition, buttonTextColor, boxBackgroundColor, buttonTarget, buttonRel, buttonSize, buttonShapeSize, borderWidth, boxBorder, borderColor, pluginStyle, titleTag, contentTitleTag, enableTitle, enableVerdict, verdictText, verdictFontSize, verdictColor, enableButton, iconSize } = attributes;

    // Box border type
    const boxBorderOptions = [
        { value: 'none', label: __( 'None', 'mightythemes-blocks' ) },
        { value: 'dotted', label: __( 'Dotted', 'mightythemes-blocks' ) },
        { value: 'solid', label: __( 'Solid', 'mightythemes-blocks' ) },
        { value: 'dashed', label: __( 'Dashed', 'mightythemes-blocks' ) },
    ];

    // Icon Options
    const options = [
        {
            name: 'None',
            key: null,
            style: { fontSize: '150%' },
        },
        {
            name: 'Menu',
            key: 'dashicons dashicons-menu',
            style: { fontSize: '150%' },
        },
        {
            name: 'Menu (Alt)',
            key: 'dashicons dashicons-menu-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Menu (Alt2)',
            key: 'dashicons dashicons-menu-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Menu (Alt3)',
            key: 'dashicons dashicons-menu-alt3',
            style: { fontSize: '150%' },
        },
        {
            name: 'Site',
            key: 'dashicons dashicons-admin-site',
            style: { fontSize: '150%' },
        },
        {
            name: 'Site (Alt)',
            key: 'dashicons dashicons-admin-site-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Site (Alt2)',
            key: 'dashicons dashicons-admin-site-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Site (Alt3)',
            key: 'dashicons dashicons-admin-site-alt3',
            style: { fontSize: '150%' },
        },
        {
            name: 'Dashboard',
            key: 'dashicons dashicons-dashboard',
            style: { fontSize: '150%' },
        },
        {
            name: 'Post',
            key: 'dashicons dashicons-admin-post',
            style: { fontSize: '150%' },
        },
        {
            name: 'Media',
            key: 'dashicons dashicons-admin-media',
            style: { fontSize: '150%' },
        },
        {
            name: 'Links',
            key: 'dashicons dashicons-admin-links',
            style: { fontSize: '150%' },
        },
        {
            name: 'Page',
            key: 'dashicons dashicons-admin-page',
            style: { fontSize: '150%' },
        },
        {
            name: 'Comments',
            key: 'dashicons dashicons-admin-comments',
            style: { fontSize: '150%' },
        },
        {
            name: 'Appearance',
            key: 'dashicons dashicons-admin-appearance',
            style: { fontSize: '150%' },
        },
        {
            name: 'Plugins',
            key: 'dashicons dashicons-admin-plugins',
            style: { fontSize: '150%' },
        },
        {
            name: 'Plugins Checked',
            key: 'dashicons dashicons-plugins-checked',
            style: { fontSize: '150%' },
        },
        {
            name: 'Users',
            key: 'dashicons dashicons-admin-users',
            style: { fontSize: '150%' },
        },
        {
            name: 'Tools',
            key: 'dashicons dashicons-admin-tools',
            style: { fontSize: '150%' },
        },
        {
            name: 'Settings',
            key: 'dashicons dashicons-admin-settings',
            style: { fontSize: '150%' },
        },
        {
            name: 'Network',
            key: 'dashicons dashicons-admin-network',
            style: { fontSize: '150%' },
        },
        {
            name: 'Home',
            key: 'dashicons dashicons-admin-home',
            style: { fontSize: '150%' },
        },
        {
            name: 'Generic',
            key: 'dashicons dashicons-admin-generic',
            style: { fontSize: '150%' },
        },
        {
            name: 'Collapse',
            key: 'dashicons dashicons-admin-collapse',
            style: { fontSize: '150%' },
        },
        {
            name: 'Filter',
            key: 'dashicons dashicons-filter',
            style: { fontSize: '150%' },
        },
        {
            name: 'Customizer',
            key: 'dashicons dashicons-admin-customizer',
            style: { fontSize: '150%' },
        },
        {
            name: 'Multisite',
            key: 'dashicons dashicons-admin-multisite',
            style: { fontSize: '150%' },
        },
        {
            name: 'Write Blog',
            key: 'dashicons dashicons-welcome-write-blog',
            style: { fontSize: '150%' },
        },
        {
            name: 'Add Page',
            key: 'dashicons dashicons-welcome-add-page',
            style: { fontSize: '150%' },
        },
        {
            name: 'View Site',
            key: 'dashicons dashicons-welcome-view-site',
            style: { fontSize: '150%' },
        },
        {
            name: 'Widgets And Menus',
            key: 'dashicons dashicons-welcome-widgets-menus',
            style: { fontSize: '150%' },
        },
        {
            name: 'Comments',
            key: 'dashicons dashicons-welcome-comments',
            style: { fontSize: '150%' },
        },
        {
            name: 'Learn More',
            key: 'dashicons dashicons-welcome-learn-more',
            style: { fontSize: '150%' },
        },
        {
            name: 'Aside',
            key: 'dashicons dashicons-format-aside',
            style: { fontSize: '150%' },
        },
        {
            name: 'Image',
            key: 'dashicons dashicons-format-image',
            style: { fontSize: '150%' },
        },
        {
            name: 'Gallery',
            key: 'dashicons dashicons-format-gallery',
            style: { fontSize: '150%' },
        },
        {
            name: 'Video',
            key: 'dashicons dashicons-format-video',
            style: { fontSize: '150%' },
        },
        {
            name: 'Status',
            key: 'dashicons dashicons-format-status',
            style: { fontSize: '150%' },
        },
        {
            name: 'Quote',
            key: 'dashicons dashicons-format-quote',
            style: { fontSize: '150%' },
        },
        {
            name: 'Chat',
            key: 'dashicons dashicons-format-chat',
            style: { fontSize: '150%' },
        },
        {
            name: 'Audio',
            key: 'dashicons dashicons-format-audio',
            style: { fontSize: '150%' },
        },
        {
            name: 'Camera',
            key: 'dashicons dashicons-camera',
            style: { fontSize: '150%' },
        },
        {
            name: 'Camera (Alt)',
            key: 'dashicons dashicons-camera-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Images (Alt)',
            key: 'dashicons dashicons-images-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Images (Alt 2)',
            key: 'dashicons dashicons-images-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Video (Alt)',
            key: 'dashicons dashicons-video-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Video (Alt 2)',
            key: 'dashicons dashicons-video-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Video (Alt 3)',
            key: 'dashicons dashicons-video-alt3',
            style: { fontSize: '150%' },
        },
        {
            name: 'Archive',
            key: 'dashicons dashicons-media-archive',
            style: { fontSize: '150%' },
        },
        {
            name: 'Audio',
            key: 'dashicons dashicons-media-audio',
            style: { fontSize: '150%' },
        },
        {
            name: 'Code',
            key: 'dashicons dashicons-media-code',
            style: { fontSize: '150%' },
        },
        {
            name: 'Default',
            key: 'dashicons dashicons-media-default',
            style: { fontSize: '150%' },
        },
        {
            name: 'Document',
            key: 'dashicons dashicons-media-document',
            style: { fontSize: '150%' },
        },
        {
            name: 'Interactive',
            key: 'dashicons dashicons-media-interactive',
            style: { fontSize: '150%' },
        },
        {
            name: 'Spreadsheet',
            key: 'dashicons dashicons-media-spreadsheet',
            style: { fontSize: '150%' },
        },
        {
            name: 'Text',
            key: 'dashicons dashicons-media-text',
            style: { fontSize: '150%' },
        },
        {
            name: 'Video',
            key: 'dashicons dashicons-media-video',
            style: { fontSize: '150%' },
        },
        {
            name: 'Audio Playlist',
            key: 'dashicons dashicons-playlist-audio',
            style: { fontSize: '150%' },
        },
        {
            name: 'Video Playlist',
            key: 'dashicons dashicons-playlist-video',
            style: { fontSize: '150%' },
        },
        {
            name: 'Play Player',
            key: 'dashicons dashicons-controls-play',
            style: { fontSize: '150%' },
        },
        {
            name: 'Player Pause',
            key: 'dashicons dashicons-controls-pause',
            style: { fontSize: '150%' },
        },
        {
            name: 'Player Forward',
            key: 'dashicons dashicons-controls-forward',
            style: { fontSize: '150%' },
        },
        {
            name: 'Player Skip Forward',
            key: 'dashicons dashicons-controls-skipforward',
            style: { fontSize: '150%' },
        },
        {
            name: 'Player Back',
            key: 'dashicons dashicons-controls-back',
            style: { fontSize: '150%' },
        },
        {
            name: 'Player Skip Back',
            key: 'dashicons dashicons-controls-skipback',
            style: { fontSize: '150%' },
        },
        {
            name: 'Player Repeat',
            key: 'dashicons dashicons-controls-repeat',
            style: { fontSize: '150%' },
        },
        {
            name: 'Player Volume On',
            key: 'dashicons dashicons-controls-volumeon',
            style: { fontSize: '150%' },
        },
        {
            name: 'Player Volume Off',
            key: 'dashicons dashicons-controls-volumeoff',
            style: { fontSize: '150%' },
        },
        {
            name: 'Crop',
            key: 'dashicons dashicons-image-crop',
            style: { fontSize: '150%' },
        },
        {
            name: 'Rotate',
            key: 'dashicons dashicons-image-rotate',
            style: { fontSize: '150%' },
        },
        {
            name: 'Rotate Left',
            key: 'dashicons dashicons-image-rotate-left',
            style: { fontSize: '150%' },
        },
        {
            name: 'Rotate Right',
            key: 'dashicons dashicons-image-rotate-right',
            style: { fontSize: '150%' },
        },
        {
            name: 'Flip Vertical',
            key: 'dashicons dashicons-image-flip-vertical',
            style: { fontSize: '150%' },
        },
        {
            name: 'Flip Horizontal',
            key: 'dashicons dashicons-image-flip-horizontal',
            style: { fontSize: '150%' },
        },
        {
            name: 'Filter',
            key: 'dashicons dashicons-image-filter',
            style: { fontSize: '150%' },
        },
        {
            name: 'Undo',
            key: 'dashicons dashicons-undo',
            style: { fontSize: '150%' },
        },
        {
            name: 'Redo',
            key: 'dashicons dashicons-redo',
            style: { fontSize: '150%' },
        },
        {
            name: 'Database Add',
            key: 'dashicons dashicons-database-add',
            style: { fontSize: '150%' },
        },
        {
            name: 'Database',
            key: 'dashicons dashicons-database',
            style: { fontSize: '150%' },
        },
        {
            name: 'Database Export',
            key: 'dashicons dashicons-database-export',
            style: { fontSize: '150%' },
        },
        {
            name: 'Database Import',
            key: 'dashicons dashicons-database-import',
            style: { fontSize: '150%' },
        },
        {
            name: 'Database Remove',
            key: 'dashicons dashicons-database-remove',
            style: { fontSize: '150%' },
        },
        {
            name: 'Database View',
            key: 'dashicons dashicons-database-view',
            style: { fontSize: '150%' },
        },
        {
            name: 'Align Full Width',
            key: 'dashicons dashicons-align-full-width',
            style: { fontSize: '150%' },
        },
        {
            name: 'Align Pull Left',
            key: 'dashicons dashicons-align-pull-left',
            style: { fontSize: '150%' },
        },
        {
            name: 'Align Pull Right',
            key: 'dashicons dashicons-align-pull-right',
            style: { fontSize: '150%' },
        },
        {
            name: 'Align Wide',
            key: 'dashicons dashicons-align-wide',
            style: { fontSize: '150%' },
        },
        {
            name: 'Block Default',
            key: 'dashicons dashicons-block-default',
            style: { fontSize: '150%' },
        },
        {
            name: 'Button',
            key: 'dashicons dashicons-button',
            style: { fontSize: '150%' },
        },
        {
            name: 'Cloud Saved',
            key: 'dashicons dashicons-cloud-saved',
            style: { fontSize: '150%' },
        },
        {
            name: 'Cloud Upload',
            key: 'dashicons dashicons-cloud-upload',
            style: { fontSize: '150%' },
        },
        {
            name: 'Columns',
            key: 'dashicons dashicons-columns',
            style: { fontSize: '150%' },
        },
        {
            name: 'Cover Image',
            key: 'dashicons dashicons-cover-image',
            style: { fontSize: '150%' },
        },
        {
            name: 'Ellipsis',
            key: 'dashicons dashicons-ellipsis',
            style: { fontSize: '150%' },
        },
        {
            name: 'Embed Audio',
            key: 'dashicons dashicons-embed-audio',
            style: { fontSize: '150%' },
        },
        {
            name: 'Embed Generic',
            key: 'dashicons dashicons-embed-generic',
            style: { fontSize: '150%' },
        },
        {
            name: 'Embed Photo',
            key: 'dashicons dashicons-embed-photo',
            style: { fontSize: '150%' },
        },
        {
            name: 'Embed Post',
            key: 'dashicons dashicons-embed-post',
            style: { fontSize: '150%' },
        },
        {
            name: 'Embed Video',
            key: 'dashicons dashicons-embed-video',
            style: { fontSize: '150%' },
        },
        {
            name: 'Exit',
            key: 'dashicons dashicons-exit',
            style: { fontSize: '150%' },
        },
        {
            name: 'Heading',
            key: 'dashicons dashicons-heading',
            style: { fontSize: '150%' },
        },
        {
            name: 'Html',
            key: 'dashicons dashicons-html',
            style: { fontSize: '150%' },
        },
        {
            name: 'Info Outline',
            key: 'dashicons dashicons-info-outline',
            style: { fontSize: '150%' },
        },
        {
            name: 'Insert',
            key: 'dashicons dashicons-insert',
            style: { fontSize: '150%' },
        },
        {
            name: 'Insert After',
            key: 'dashicons dashicons-insert-after',
            style: { fontSize: '150%' },
        },
        {
            name: 'Insert Before',
            key: 'dashicons dashicons-insert-before',
            style: { fontSize: '150%' },
        },
        {
            name: 'Remove',
            key: 'dashicons dashicons-remove',
            style: { fontSize: '150%' },
        },
        {
            name: 'Saved',
            key: 'dashicons dashicons-saved',
            style: { fontSize: '150%' },
        },
        {
            name: 'Shortcode',
            key: 'dashicons dashicons-shortcode',
            style: { fontSize: '150%' },
        },
        {
            name: 'Table Col After',
            key: 'dashicons dashicons-table-col-after',
            style: { fontSize: '150%' },
        },
        {
            name: 'Table Col Before',
            key: 'dashicons dashicons-table-col-before',
            style: { fontSize: '150%' },
        },
        {
            name: 'Table Col Delete',
            key: 'dashicons dashicons-table-col-delete',
            style: { fontSize: '150%' },
        },
        {
            name: 'Table Row After',
            key: 'dashicons dashicons-table-row-after',
            style: { fontSize: '150%' },
        },
        {
            name: 'Table Row Before',
            key: 'dashicons dashicons-table-row-before',
            style: { fontSize: '150%' },
        },
        {
            name: 'Table Row Delete',
            key: 'dashicons dashicons-table-row-delete',
            style: { fontSize: '150%' },
        },
        {
            name: 'Bold',
            key: 'dashicons dashicons-editor-bold',
            style: { fontSize: '150%' },
        },
        {
            name: 'Italic',
            key: 'dashicons dashicons-editor-italic',
            style: { fontSize: '150%' },
        },
        {
            name: 'Ul',
            key: 'dashicons dashicons-editor-ul',
            style: { fontSize: '150%' },
        },
        {
            name: 'Ol',
            key: 'dashicons dashicons-editor-ol',
            style: { fontSize: '150%' },
        },
        {
            name: 'Ol Rtl',
            key: 'dashicons dashicons-editor-ol-rtl',
            style: { fontSize: '150%' },
        },
        {
            name: 'Quote',
            key: 'dashicons dashicons-editor-quote',
            style: { fontSize: '150%' },
        },
        {
            name: 'Alignleft',
            key: 'dashicons dashicons-editor-alignleft',
            style: { fontSize: '150%' },
        },
        {
            name: 'Aligncenter',
            key: 'dashicons dashicons-editor-aligncenter',
            style: { fontSize: '150%' },
        },
        {
            name: 'Alignright',
            key: 'dashicons dashicons-editor-alignright',
            style: { fontSize: '150%' },
        },
        {
            name: 'Insertmore',
            key: 'dashicons dashicons-editor-insertmore',
            style: { fontSize: '150%' },
        },
        {
            name: 'Spellcheck',
            key: 'dashicons dashicons-editor-spellcheck',
            style: { fontSize: '150%' },
        },
        {
            name: 'Expand',
            key: 'dashicons dashicons-editor-expand',
            style: { fontSize: '150%' },
        },
        {
            name: 'Contract',
            key: 'dashicons dashicons-editor-contract',
            style: { fontSize: '150%' },
        },
        {
            name: 'Kitchen Sink',
            key: 'dashicons dashicons-editor-kitchensink',
            style: { fontSize: '150%' },
        },
        {
            name: 'Underline',
            key: 'dashicons dashicons-editor-underline',
            style: { fontSize: '150%' },
        },
        {
            name: 'Justify',
            key: 'dashicons dashicons-editor-justify',
            style: { fontSize: '150%' },
        },
        {
            name: 'Textcolor',
            key: 'dashicons dashicons-editor-textcolor',
            style: { fontSize: '150%' },
        },
        {
            name: 'Paste',
            key: 'dashicons dashicons-editor-paste-word',
            style: { fontSize: '150%' },
        },
        {
            name: 'Paste',
            key: 'dashicons dashicons-editor-paste-text',
            style: { fontSize: '150%' },
        },
        {
            name: 'Remove Formatting',
            key: 'dashicons dashicons-editor-removeformatting',
            style: { fontSize: '150%' },
        },
        {
            name: 'Video',
            key: 'dashicons dashicons-editor-video',
            style: { fontSize: '150%' },
        },
        {
            name: 'Custom Character',
            key: 'dashicons dashicons-editor-customchar',
            style: { fontSize: '150%' },
        },
        {
            name: 'Outdent',
            key: 'dashicons dashicons-editor-outdent',
            style: { fontSize: '150%' },
        },
        {
            name: 'Indent',
            key: 'dashicons dashicons-editor-indent',
            style: { fontSize: '150%' },
        },
        {
            name: 'Help',
            key: 'dashicons dashicons-editor-help',
            style: { fontSize: '150%' },
        },
        {
            name: 'Strikethrough',
            key: 'dashicons dashicons-editor-strikethrough',
            style: { fontSize: '150%' },
        },
        {
            name: 'Unlink',
            key: 'dashicons dashicons-editor-unlink',
            style: { fontSize: '150%' },
        },
        {
            name: 'Rtl',
            key: 'dashicons dashicons-editor-rtl',
            style: { fontSize: '150%' },
        },
        {
            name: 'Ltr',
            key: 'dashicons dashicons-editor-ltr',
            style: { fontSize: '150%' },
        },
        {
            name: 'Break',
            key: 'dashicons dashicons-editor-break',
            style: { fontSize: '150%' },
        },
        {
            name: 'Code',
            key: 'dashicons dashicons-editor-code',
            style: { fontSize: '150%' },
        },
        {
            name: 'Paragraph',
            key: 'dashicons dashicons-editor-paragraph',
            style: { fontSize: '150%' },
        },
        {
            name: 'Table',
            key: 'dashicons dashicons-editor-table',
            style: { fontSize: '150%' },
        },
        {
            name: 'Align Left',
            key: 'dashicons dashicons-align-left',
            style: { fontSize: '150%' },
        },
        {
            name: 'Align Right',
            key: 'dashicons dashicons-align-right',
            style: { fontSize: '150%' },
        },
        {
            name: 'Align Center',
            key: 'dashicons dashicons-align-center',
            style: { fontSize: '150%' },
        },
        {
            name: 'Align None',
            key: 'dashicons dashicons-align-none',
            style: { fontSize: '150%' },
        },
        {
            name: 'Lock',
            key: 'dashicons dashicons-lock',
            style: { fontSize: '150%' },
        },
        {
            name: 'Unlock',
            key: 'dashicons dashicons-unlock',
            style: { fontSize: '150%' },
        },
        {
            name: 'Calendar',
            key: 'dashicons dashicons-calendar',
            style: { fontSize: '150%' },
        },
        {
            name: 'Calendar',
            key: 'dashicons dashicons-calendar-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Visibility',
            key: 'dashicons dashicons-visibility',
            style: { fontSize: '150%' },
        },
        {
            name: 'Hidden',
            key: 'dashicons dashicons-hidden',
            style: { fontSize: '150%' },
        },
        {
            name: 'Post Status',
            key: 'dashicons dashicons-post-status',
            style: { fontSize: '150%' },
        },
        {
            name: 'Edit Pencil',
            key: 'dashicons dashicons-edit',
            style: { fontSize: '150%' },
        },
        {
            name: 'Trash Remove Delete',
            key: 'dashicons dashicons-trash',
            style: { fontSize: '150%' },
        },
        {
            name: 'Sticky',
            key: 'dashicons dashicons-sticky',
            style: { fontSize: '150%' },
        },
        {
            name: 'External',
            key: 'dashicons dashicons-external',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Up',
            key: 'dashicons dashicons-arrow-up',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Down',
            key: 'dashicons dashicons-arrow-down',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Right',
            key: 'dashicons dashicons-arrow-right',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Left',
            key: 'dashicons dashicons-arrow-left',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Up',
            key: 'dashicons dashicons-arrow-up-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Down',
            key: 'dashicons dashicons-arrow-down-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Right',
            key: 'dashicons dashicons-arrow-right-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Left',
            key: 'dashicons dashicons-arrow-left-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Up',
            key: 'dashicons dashicons-arrow-up-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Down',
            key: 'dashicons dashicons-arrow-down-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Right',
            key: 'dashicons dashicons-arrow-right-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Arrow-Left',
            key: 'dashicons dashicons-arrow-left-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Sort',
            key: 'dashicons dashicons-sort',
            style: { fontSize: '150%' },
        },
        {
            name: 'Left Right',
            key: 'dashicons dashicons-leftright',
            style: { fontSize: '150%' },
        },
        {
            name: 'Randomize Shuffle',
            key: 'dashicons dashicons-randomize',
            style: { fontSize: '150%' },
        },
        {
            name: 'List View',
            key: 'dashicons dashicons-list-view',
            style: { fontSize: '150%' },
        },
        {
            name: 'Excerpt View',
            key: 'dashicons dashicons-excerpt-view',
            style: { fontSize: '150%' },
        },
        {
            name: 'Grid View',
            key: 'dashicons dashicons-grid-view',
            style: { fontSize: '150%' },
        },
        {
            name: 'Move',
            key: 'dashicons dashicons-move',
            style: { fontSize: '150%' },
        },
        {
            name: 'Share',
            key: 'dashicons dashicons-share',
            style: { fontSize: '150%' },
        },
        {
            name: 'Share',
            key: 'dashicons dashicons-share-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Share',
            key: 'dashicons dashicons-share-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Rss',
            key: 'dashicons dashicons-rss',
            style: { fontSize: '150%' },
        },
        {
            name: 'Email',
            key: 'dashicons dashicons-email',
            style: { fontSize: '150%' },
        },
        {
            name: 'Email (Alt)',
            key: 'dashicons dashicons-email-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Email (Alt2)',
            key: 'dashicons dashicons-email-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Networking Social',
            key: 'dashicons dashicons-networking',
            style: { fontSize: '150%' },
        },
        {
            name: 'Amazon',
            key: 'dashicons dashicons-amazon',
            style: { fontSize: '150%' },
        },
        {
            name: 'Facebook Social',
            key: 'dashicons dashicons-facebook',
            style: { fontSize: '150%' },
        },
        {
            name: 'Facebook Social',
            key: 'dashicons dashicons-facebook-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Google Social',
            key: 'dashicons dashicons-google',
            style: { fontSize: '150%' },
        },
        {
            name: 'Instagram Social',
            key: 'dashicons dashicons-instagram',
            style: { fontSize: '150%' },
        },
        {
            name: 'Linkedin Social',
            key: 'dashicons dashicons-linkedin',
            style: { fontSize: '150%' },
        },
        {
            name: 'Pinterest Social',
            key: 'dashicons dashicons-pinterest',
            style: { fontSize: '150%' },
        },
        {
            name: 'Podio',
            key: 'dashicons dashicons-podio',
            style: { fontSize: '150%' },
        },
        {
            name: 'Reddit Social',
            key: 'dashicons dashicons-reddit',
            style: { fontSize: '150%' },
        },
        {
            name: 'Spotify Social',
            key: 'dashicons dashicons-spotify',
            style: { fontSize: '150%' },
        },
        {
            name: 'Twitch Social',
            key: 'dashicons dashicons-twitch',
            style: { fontSize: '150%' },
        },
        {
            name: 'Twitter Social',
            key: 'dashicons dashicons-twitter',
            style: { fontSize: '150%' },
        },
        {
            name: 'Twitter Social',
            key: 'dashicons dashicons-twitter-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Whatsapp Social',
            key: 'dashicons dashicons-whatsapp',
            style: { fontSize: '150%' },
        },
        {
            name: 'Xing',
            key: 'dashicons dashicons-xing',
            style: { fontSize: '150%' },
        },
        {
            name: 'Youtube Social',
            key: 'dashicons dashicons-youtube',
            style: { fontSize: '150%' },
        },
        {
            name: 'Hammer Development',
            key: 'dashicons dashicons-hammer',
            style: { fontSize: '150%' },
        },
        {
            name: 'Art Design',
            key: 'dashicons dashicons-art',
            style: { fontSize: '150%' },
        },
        {
            name: 'Migrate Migration',
            key: 'dashicons dashicons-migrate',
            style: { fontSize: '150%' },
        },
        {
            name: 'Performance',
            key: 'dashicons dashicons-performance',
            style: { fontSize: '150%' },
        },
        {
            name: 'Universal Access Accessibility',
            key: 'dashicons dashicons-universal-access',
            style: { fontSize: '150%' },
        },
        {
            name: 'Universal Access Accessibility',
            key: 'dashicons dashicons-universal-access-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Tickets',
            key: 'dashicons dashicons-tickets',
            style: { fontSize: '150%' },
        },
        {
            name: 'Nametag',
            key: 'dashicons dashicons-nametag',
            style: { fontSize: '150%' },
        },
        {
            name: 'Clipboard',
            key: 'dashicons dashicons-clipboard',
            style: { fontSize: '150%' },
        },
        {
            name: 'Heart',
            key: 'dashicons dashicons-heart',
            style: { fontSize: '150%' },
        },
        {
            name: 'Megaphone',
            key: 'dashicons dashicons-megaphone',
            style: { fontSize: '150%' },
        },
        {
            name: 'Schedule',
            key: 'dashicons dashicons-schedule',
            style: { fontSize: '150%' },
        },
        {
            name: 'Tide',
            key: 'dashicons dashicons-tide',
            style: { fontSize: '150%' },
        },
        {
            name: 'Rest Api',
            key: 'dashicons dashicons-rest-api',
            style: { fontSize: '150%' },
        },
        {
            name: 'Code Standards',
            key: 'dashicons dashicons-code-standards',
            style: { fontSize: '150%' },
        },
        {
            name: 'Activity',
            key: 'dashicons dashicons-buddicons-activity',
            style: { fontSize: '150%' },
        },
        {
            name: 'Bbpress Logo',
            key: 'dashicons dashicons-buddicons-bbpress-logo',
            style: { fontSize: '150%' },
        },
        {
            name: 'Buddypress Logo',
            key: 'dashicons dashicons-buddicons-buddypress-logo',
            style: { fontSize: '150%' },
        },
        {
            name: 'Community',
            key: 'dashicons dashicons-buddicons-community',
            style: { fontSize: '150%' },
        },
        {
            name: 'Forums',
            key: 'dashicons dashicons-buddicons-forums',
            style: { fontSize: '150%' },
        },
        {
            name: 'Friends',
            key: 'dashicons dashicons-buddicons-friends',
            style: { fontSize: '150%' },
        },
        {
            name: 'Groups',
            key: 'dashicons dashicons-buddicons-groups',
            style: { fontSize: '150%' },
        },
        {
            name: 'Private Message',
            key: 'dashicons dashicons-buddicons-pm',
            style: { fontSize: '150%' },
        },
        {
            name: 'Replies',
            key: 'dashicons dashicons-buddicons-replies',
            style: { fontSize: '150%' },
        },
        {
            name: 'Topics',
            key: 'dashicons dashicons-buddicons-topics',
            style: { fontSize: '150%' },
        },
        {
            name: 'Tracking',
            key: 'dashicons dashicons-buddicons-tracking',
            style: { fontSize: '150%' },
        },
        {
            name: 'Wordpress',
            key: 'dashicons dashicons-wordpress',
            style: { fontSize: '150%' },
        },
        {
            name: 'Wordpress',
            key: 'dashicons dashicons-wordpress-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Press This',
            key: 'dashicons dashicons-pressthis',
            style: { fontSize: '150%' },
        },
        {
            name: 'Update',
            key: 'dashicons dashicons-update',
            style: { fontSize: '150%' },
        },
        {
            name: 'Update (Alt)',
            key: 'dashicons dashicons-update-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Screenoptions',
            key: 'dashicons dashicons-screenoptions',
            style: { fontSize: '150%' },
        },
        {
            name: 'Info',
            key: 'dashicons dashicons-info',
            style: { fontSize: '150%' },
        },
        {
            name: 'Cart Shopping',
            key: 'dashicons dashicons-cart',
            style: { fontSize: '150%' },
        },
        {
            name: 'Feedback Form',
            key: 'dashicons dashicons-feedback',
            style: { fontSize: '150%' },
        },
        {
            name: 'Cloud',
            key: 'dashicons dashicons-cloud',
            style: { fontSize: '150%' },
        },
        {
            name: 'Translation Language',
            key: 'dashicons dashicons-translation',
            style: { fontSize: '150%' },
        },
        {
            name: 'Tag',
            key: 'dashicons dashicons-tag',
            style: { fontSize: '150%' },
        },
        {
            name: 'Category',
            key: 'dashicons dashicons-category',
            style: { fontSize: '150%' },
        },
        {
            name: 'Archive',
            key: 'dashicons dashicons-archive',
            style: { fontSize: '150%' },
        },
        {
            name: 'Tagcloud',
            key: 'dashicons dashicons-tagcloud',
            style: { fontSize: '150%' },
        },
        {
            name: 'Text',
            key: 'dashicons dashicons-text',
            style: { fontSize: '150%' },
        },
        {
            name: 'Bell',
            key: 'dashicons dashicons-bell',
            style: { fontSize: '150%' },
        },
        {
            name: 'Yes Check Checkmark',
            key: 'dashicons dashicons-yes',
            style: { fontSize: '150%' },
        },
        {
            name: 'Yes Check Checkmark (Alt)',
            key: 'dashicons dashicons-yes-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'No X',
            key: 'dashicons dashicons-no',
            style: { fontSize: '150%' },
        },
        {
            name: 'No X',
            key: 'dashicons dashicons-no-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Plus Add Increase',
            key: 'dashicons dashicons-plus',
            style: { fontSize: '150%' },
        },
        {
            name: 'Plus Add Increase',
            key: 'dashicons dashicons-plus-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Plus Add Increase',
            key: 'dashicons dashicons-plus-alt2',
            style: { fontSize: '150%' },
        },
        {
            name: 'Minus Decrease',
            key: 'dashicons dashicons-minus',
            style: { fontSize: '150%' },
        },
        {
            name: 'Dismiss',
            key: 'dashicons dashicons-dismiss',
            style: { fontSize: '150%' },
        },
        {
            name: 'Marker',
            key: 'dashicons dashicons-marker',
            style: { fontSize: '150%' },
        },
        {
            name: 'Filled Star',
            key: 'dashicons dashicons-star-filled',
            style: { fontSize: '150%' },
        },
        {
            name: 'Half Star',
            key: 'dashicons dashicons-star-half',
            style: { fontSize: '150%' },
        },
        {
            name: 'Empty Star',
            key: 'dashicons dashicons-star-empty',
            style: { fontSize: '150%' },
        },
        {
            name: 'Flag',
            key: 'dashicons dashicons-flag',
            style: { fontSize: '150%' },
        },
        {
            name: 'Warning',
            key: 'dashicons dashicons-warning',
            style: { fontSize: '150%' },
        },
        {
            name: 'Location Pin',
            key: 'dashicons dashicons-location',
            style: { fontSize: '150%' },
        },
        {
            name: 'Location',
            key: 'dashicons dashicons-location-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Vault Safe',
            key: 'dashicons dashicons-vault',
            style: { fontSize: '150%' },
        },
        {
            name: 'Shield',
            key: 'dashicons dashicons-shield',
            style: { fontSize: '150%' },
        },
        {
            name: 'Shield',
            key: 'dashicons dashicons-shield-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Sos Help',
            key: 'dashicons dashicons-sos',
            style: { fontSize: '150%' },
        },
        {
            name: 'Search',
            key: 'dashicons dashicons-search',
            style: { fontSize: '150%' },
        },
        {
            name: 'Slides',
            key: 'dashicons dashicons-slides',
            style: { fontSize: '150%' },
        },
        {
            name: 'Text Page',
            key: 'dashicons dashicons-text-page',
            style: { fontSize: '150%' },
        },
        {
            name: 'Analytics',
            key: 'dashicons dashicons-analytics',
            style: { fontSize: '150%' },
        },
        {
            name: 'Pie Chart',
            key: 'dashicons dashicons-chart-pie',
            style: { fontSize: '150%' },
        },
        {
            name: 'Bar Chart',
            key: 'dashicons dashicons-chart-bar',
            style: { fontSize: '150%' },
        },
        {
            name: 'Line Chart',
            key: 'dashicons dashicons-chart-line',
            style: { fontSize: '150%' },
        },
        {
            name: 'Area Chart',
            key: 'dashicons dashicons-chart-area',
            style: { fontSize: '150%' },
        },
        {
            name: 'Groups',
            key: 'dashicons dashicons-groups',
            style: { fontSize: '150%' },
        },
        {
            name: 'Businessman',
            key: 'dashicons dashicons-businessman',
            style: { fontSize: '150%' },
        },
        {
            name: 'Businesswoman',
            key: 'dashicons dashicons-businesswoman',
            style: { fontSize: '150%' },
        },
        {
            name: 'Businessperson',
            key: 'dashicons dashicons-businessperson',
            style: { fontSize: '150%' },
        },
        {
            name: 'Id',
            key: 'dashicons dashicons-id',
            style: { fontSize: '150%' },
        },
        {
            name: 'Id',
            key: 'dashicons dashicons-id-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Products',
            key: 'dashicons dashicons-products',
            style: { fontSize: '150%' },
        },
        {
            name: 'Awards',
            key: 'dashicons dashicons-awards',
            style: { fontSize: '150%' },
        },
        {
            name: 'Forms',
            key: 'dashicons dashicons-forms',
            style: { fontSize: '150%' },
        },
        {
            name: 'Testimonial',
            key: 'dashicons dashicons-testimonial',
            style: { fontSize: '150%' },
        },
        {
            name: 'Portfolio',
            key: 'dashicons dashicons-portfolio',
            style: { fontSize: '150%' },
        },
        {
            name: 'Book',
            key: 'dashicons dashicons-book',
            style: { fontSize: '150%' },
        },
        {
            name: 'Book',
            key: 'dashicons dashicons-book-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Download',
            key: 'dashicons dashicons-download',
            style: { fontSize: '150%' },
        },
        {
            name: 'Upload',
            key: 'dashicons dashicons-upload',
            style: { fontSize: '150%' },
        },
        {
            name: 'Backup',
            key: 'dashicons dashicons-backup',
            style: { fontSize: '150%' },
        },
        {
            name: 'Clock',
            key: 'dashicons dashicons-clock',
            style: { fontSize: '150%' },
        },
        {
            name: 'Lightbulb',
            key: 'dashicons dashicons-lightbulb',
            style: { fontSize: '150%' },
        },
        {
            name: 'Microphone Mic',
            key: 'dashicons dashicons-microphone',
            style: { fontSize: '150%' },
        },
        {
            name: 'Desktop Monitor',
            key: 'dashicons dashicons-desktop',
            style: { fontSize: '150%' },
        },
        {
            name: 'Laptop',
            key: 'dashicons dashicons-laptop',
            style: { fontSize: '150%' },
        },
        {
            name: 'Tablet Ipad',
            key: 'dashicons dashicons-tablet',
            style: { fontSize: '150%' },
        },
        {
            name: 'Smartphone Iphone',
            key: 'dashicons dashicons-smartphone',
            style: { fontSize: '150%' },
        },
        {
            name: 'Phone',
            key: 'dashicons dashicons-phone',
            style: { fontSize: '150%' },
        },
        {
            name: 'Index Card',
            key: 'dashicons dashicons-index-card',
            style: { fontSize: '150%' },
        },
        {
            name: 'Carrot Food Vendor',
            key: 'dashicons dashicons-carrot',
            style: { fontSize: '150%' },
        },
        {
            name: 'Building',
            key: 'dashicons dashicons-building',
            style: { fontSize: '150%' },
        },
        {
            name: 'Store',
            key: 'dashicons dashicons-store',
            style: { fontSize: '150%' },
        },
        {
            name: 'Album',
            key: 'dashicons dashicons-album',
            style: { fontSize: '150%' },
        },
        {
            name: 'Palm Tree',
            key: 'dashicons dashicons-palmtree',
            style: { fontSize: '150%' },
        },
        {
            name: 'Tickets (Alt)',
            key: 'dashicons dashicons-tickets-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Money',
            key: 'dashicons dashicons-money',
            style: { fontSize: '150%' },
        },
        {
            name: 'Money Alt',
            key: 'dashicons dashicons-money-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Smiley Smile',
            key: 'dashicons dashicons-smiley',
            style: { fontSize: '150%' },
        },
        {
            name: 'Thumbs Up',
            key: 'dashicons dashicons-thumbs-up',
            style: { fontSize: '150%' },
        },
        {
            name: 'Thumbs Down',
            key: 'dashicons dashicons-thumbs-down',
            style: { fontSize: '150%' },
        },
        {
            name: 'Layout',
            key: 'dashicons dashicons-layout',
            style: { fontSize: '150%' },
        },
        {
            name: 'Paperclip',
            key: 'dashicons dashicons-paperclip',
            style: { fontSize: '150%' },
        },
        {
            name: 'Color Picker',
            key: 'dashicons dashicons-color-picker',
            style: { fontSize: '150%' },
        },
        {
            name: 'Edit Large',
            key: 'dashicons dashicons-edit-large',
            style: { fontSize: '150%' },
        },
        {
            name: 'Edit Page',
            key: 'dashicons dashicons-edit-page',
            style: { fontSize: '150%' },
        },
        {
            name: 'Airplane',
            key: 'dashicons dashicons-airplane',
            style: { fontSize: '150%' },
        },
        {
            name: 'Bank',
            key: 'dashicons dashicons-bank',
            style: { fontSize: '150%' },
        },
        {
            name: 'Beer',
            key: 'dashicons dashicons-beer',
            style: { fontSize: '150%' },
        },
        {
            name: 'Calculator',
            key: 'dashicons dashicons-calculator',
            style: { fontSize: '150%' },
        },
        {
            name: 'Car',
            key: 'dashicons dashicons-car',
            style: { fontSize: '150%' },
        },
        {
            name: 'Coffee',
            key: 'dashicons dashicons-coffee',
            style: { fontSize: '150%' },
        },
        {
            name: 'Drumstick',
            key: 'dashicons dashicons-drumstick',
            style: { fontSize: '150%' },
        },
        {
            name: 'Food',
            key: 'dashicons dashicons-food',
            style: { fontSize: '150%' },
        },
        {
            name: 'Fullscreen Alt',
            key: 'dashicons dashicons-fullscreen-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Fullscreen Exit Alt',
            key: 'dashicons dashicons-fullscreen-exit-alt',
            style: { fontSize: '150%' },
        },
        {
            name: 'Games',
            key: 'dashicons dashicons-games',
            style: { fontSize: '150%' },
        },
        {
            name: 'Hourglass',
            key: 'dashicons dashicons-hourglass',
            style: { fontSize: '150%' },
        },
        {
            name: 'Open Folder',
            key: 'dashicons dashicons-open-folder',
            style: { fontSize: '150%' },
        },
        {
            name: 'Pdf',
            key: 'dashicons dashicons-pdf',
            style: { fontSize: '150%' },
        },
        {
            name: 'Pets',
            key: 'dashicons dashicons-pets',
            style: { fontSize: '150%' },
        },
        {
            name: 'Printer',
            key: 'dashicons dashicons-printer',
            style: { fontSize: '150%' },
        },
        {
            name: 'Privacy',
            key: 'dashicons dashicons-privacy',
            style: { fontSize: '150%' },
        },
        {
            name: 'Superhero',
            key: 'dashicons dashicons-superhero',
            style: { fontSize: '150%' },
        },
        {
            name: 'Superhero',
            key: 'dashicons dashicons-superhero-alt',
            style: { fontSize: '150%' },
        },
    ];

    const iconPositionOptions = [
        { value: 'wppc-icon-before', label: __( 'Before', 'mightythemes-blocks' ) },
        { value: 'wppc-icon-after', label: __( 'after', 'mightythemes-blocks' ) },
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

    function onChangeEnableTitle(changes) {
        setAttributes({
            enableTitle: !enableTitle
        })
    }

    function onChangeEnableVerdict(changes) {
        setAttributes({
            enableVerdict: !enableVerdict
        })
    }
    
    function onChangeEnableButton(changes) {
        setAttributes({
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

                <CustomSelectControl
                    label={ __( 'Choose Icon', 'mightythemes-blocks' ) }
                    options={ options }
                    onChange={ ( value ) => setAttributes( { buttonIcon: value.selectedItem.key } ) }
                />

                <SelectControl
                    label={ __( 'Icon Position', 'mightythemes-blocks' ) }
                    value={ iconPosition }
                    options={ iconPositionOptions.map( ({ value, label }) => ( {
                        value: value,
                        label: label,
                    } ) ) }
                    onChange={ content => setAttributes({ iconPosition: content }) }
                >
                </SelectControl>

                <br/>

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
                        value={ buttonIcon === null ? buttonText : `<span class="wppc-btn-icon ${buttonIcon}"></span> ${buttonText}` }
                        className={ `wp-btn ${iconPosition} ${buttonSize}`}
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