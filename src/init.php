<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 */
function prosandcons_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'prosandcons-cgb-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' ),
		null
	);

	// Register block editor script for backend.
	wp_register_script(
		'prosandcons-cgb-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		true // footer?
	);

	wp_localize_script(
		'prosandcons-cgb-block-js',
		'prosandcons',
		array(
			'baseUrl' => MIGHTY_PROS_AND_CONS_PLG_URL,
		)
	);

	// Register block editor styles for backend.
	wp_register_style(
		'prosandcons-cgb-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 */
	if ( function_exists('has_blocks') ) {
        register_block_type(
			'mightythemes/block-prosandcons', array(
				// Enqueue blocks.style.build.css on both frontend & backend.
				'style'         => 'prosandcons-cgb-style-css',
				// Enqueue blocks.build.js in the editor only.
				'editor_script' => 'prosandcons-cgb-block-js',
				// Enqueue blocks.editor.build.css in the editor only.
				'editor_style'  => 'prosandcons-cgb-block-editor-css',
				// Enables Dynamic Block
				'render_callback' => 'render_proscons_block',
			)
		);
    }
    else {
		add_action( 'admin_notices', 'admin_notice_require_gutenberg' );
		return;
	}
}

/**
 * Renders the dynamic block at frond-end
 *
 */
function render_proscons_block( $attributes ) {

	$defaults = [
        "title" => isset( $attributes['title'] ) ? $attributes['title'] : "Your Title here..",
        "prosTitle" => isset( $attributes['prosTitle'] ) ? $attributes['prosTitle'] : "Pros",
        "consTitle" => isset( $attributes['consTitle'] ) ? $attributes['consTitle'] : "Cons",
        "prosValues" => isset( $attributes['prosValues'] ) ? $attributes['prosValues'] : "",
        "consValues" => isset( $attributes['consValues'] ) ? $attributes['consValues'] : "",
        "buttonText" => isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : "Button text here..",
        "buttonUrl" => isset( $attributes['buttonUrl'] ) ? $attributes['buttonUrl'] : "#",
        "buttonBackgroundColor" => isset( $attributes['buttonBackgroundColor'] ) ? $attributes['buttonBackgroundColor'] : "black",
        "buttonTextColor" => isset( $attributes['buttonTextColor'] ) ? $attributes['buttonTextColor'] : "white",
        "buttonHoverColor" => isset( $attributes['buttonHoverColor'] ) ? $attributes['buttonHoverColor'] : $attributes['buttonBackgroundColor'],
        "buttonHoverTextColor" => isset( $attributes['buttonHoverTextColor'] ) ? $attributes['buttonHoverTextColor'] : $attributes['buttonTextColor'],
        "boxBackgroundColor" => isset( $attributes['boxBackgroundColor'] ) ? $attributes['boxBackgroundColor'] : "#f9f9f9",
        "buttonTarget" => isset( $attributes['buttonTarget'] ) ? $attributes['buttonTarget'] : false,
        "buttonRel" => isset( $attributes['buttonRel'] ) ? $attributes['buttonRel'] : false,
        "buttonSize" => isset( $attributes['buttonSize'] ) ? $attributes['buttonSize'] : "wp-btn-md",
        "buttonShapeSize" => isset( $attributes['buttonShapeSize'] ) ? $attributes['buttonShapeSize'] : 18,
        "boxBorder" => isset( $attributes['boxBorder'] ) ? $attributes['boxBorder'] : "none",
        "borderColor" => isset( $attributes['borderColor'] ) ? $attributes['borderColor'] : "#28b914",
        "pluginStyle" => isset( $attributes['pluginStyle'] ) ? $attributes['pluginStyle'] : "wp-pros-cons wppc-view1",
        "titleTag" => isset( $attributes['titleTag'] ) ? $attributes['titleTag'] : "h3",
        "contentTitleTag" => isset( $attributes['contentTitleTag'] ) ? $attributes['contentTitleTag'] : "h4",
        "borderWidth" => isset( $attributes['borderWidth'] ) ? $attributes['borderWidth'] : 2,
        "enableTitle" => isset( $attributes['enableTitle'] ) ? $attributes['enableTitle'] : false,
        "enableVerdict" => isset( $attributes['enableVerdict'] ) ? $attributes['enableVerdict'] : false,
        "verdictText" => isset( $attributes['verdictText'] ) ? $attributes['verdictText'] : "",
        "verdictFontSize" => isset( $attributes['verdictFontSize'] ) ? $attributes['verdictFontSize'] : 18,
        "verdictColor" => isset( $attributes['verdictColor'] ) ? $attributes['verdictColor'] : "black",
        "enableButton" => isset( $attributes['enableButton'] ) ? $attributes['enableButton'] : false,
        "iconSize" => isset( $attributes['iconSize'] ) ? $attributes['iconSize'] : 30,
	];

	ob_start();
	?>
	<div style="border-color: <?php echo $defaults['borderColor'] ?>; background-color: <?php echo $defaults['boxBackgroundColor'] ?>; border-style: <?php echo $defaults['boxBorder'] ?>; border-width: <?php echo $defaults['borderWidth'] . "px" ?>;" class="<?php echo $defaults['pluginStyle']; ?>">

		<?php if( $defaults['enableTitle'] ) { ?>
			<<?php echo $defaults['titleTag']; ?> class="wp-pros-cons-heading"> <?php echo $defaults['title'] ?> </<?php echo $defaults['titleTag'] ?>>
		<?php } ?>

		<div class="wppc-boxs">
			<div class="wppc-box pros-content">		
				<div class="wppc-header">

					<?php if( $defaults['pluginStyle'] === "wp-pros-cons wppc-view1" ) { ?>
						<div class="wppc-box-symbol">
							<img style="width: <?php echo $defaults['iconSize'] . "px" ?>;" src="<?php echo MIGHTY_PROS_AND_CONS_PLG_URL . "assets/icons/thumbs-up-regular.svg"; ?>" />
						</div>
					<?php } ?>

					<!-- Pros title -->
					<<?php echo $defaults['contentTitleTag'] ?> class="wppc-content-title pros-title"> 
						<?php echo $defaults['prosTitle'] ?> 
					</<?php echo $defaults['contentTitleTag'] ?>>
				</div>

				<!-- Pros goes here -->
				<ul class="wp-pros-cons-list wp-pros-list"> 
					<?php echo $defaults['prosValues'] ?> 
				</ul>
			</div>
			<div class="wppc-box cons-content">	
				<div class="wppc-header">

					<?php if( $defaults['pluginStyle'] === "wp-pros-cons wppc-view1" ) { ?>
						<div class="wppc-box-symbol">
							<img style="width: <?php echo $defaults['iconSize'] . "px" ?>;" src="<?php echo MIGHTY_PROS_AND_CONS_PLG_URL . "assets/icons/thumbs-down-regular.svg"; ?>" />
						</div>
					<?php } ?>

					<!-- Cons title -->
					<<?php echo $defaults['contentTitleTag'] ?> class="wppc-content-title cons-title"> 
						<?php echo $defaults['consTitle'] ?> 
					</<?php echo $defaults['contentTitleTag'] ?>>
				</div>

				<!-- Cons goes here -->
				<ul class="wp-pros-cons-list wp-cons-list"> 
					<?php echo $defaults['consValues'] ?> 
				</ul>
				
			</div>
		</div>

		<?php if( $defaults['enableVerdict'] ) { ?>
			<div class="wppc-verdict-wrapper" style="font-size: <?php echo $defaults['verdictFontSize'] . "px" ?>; color: <?php echo $defaults['verdictColor'] ?>;">
				<?php echo $defaults['verdictText'] ?>
			</div>
		<?php } ?>

		<?php if( $defaults['enableButton'] ) { ?>
			<div class="wppc-btn-wrapper" style="font-size: <?php echo $defaults['verdictFontSize'] . "px" ?>; color: <?php echo $defaults['verdictColor'] ?>;">
				<a
					href="<?php echo $defaults['buttonUrl'] ?>"
					style="border-radius: <?php echo $defaults['buttonShapeSize'] . "px" ?>;"
					rel="<?php echo $defaults['buttonRel'] ? 'nofollow noopener noreferrer' : 'noopener noreferrer' ?>"
					class="wp-btn <?php echo $defaults['buttonSize'] ?>"
					target="<?php echo $defaults['buttonTarget'] ? '_blank' : '' ?>"
				>
					<?php echo $defaults['buttonText'] ?>
				</a>
			</div>
		<?php } ?>
	</div>
	<style>
	.wp-btn { color: <?php echo $defaults['buttonTextColor'] ?>; background-color: <?php echo $defaults['buttonBackgroundColor'] ?>; }
	.wp-btn:hover { color: <?php echo $defaults['buttonHoverTextColor'] ?>; background-color: <?php echo $defaults['buttonHoverColor'] ?>; }
	</style>
	<?php
	return ob_get_clean();
}

/**
 * Notice for Gutenberg Not found.
 */
function admin_notice_require_gutenberg() {
	if ( isset( $_GET['activate'] ) ) {
		unset( $_GET['activate'] );
	}

	$message = sprintf(
		/* translators: 1: Plugin name 2: Gutenberg 3. Gutenberg Plugin URL */
		esc_html__( '%1$s requires %2$s You can update your WordPress or install %3$s.', 'mighty' ),
		'<strong>' . esc_html__( 'Mighty Pros & Cons', 'mighty' ) . '</strong>',
		'<strong>' . esc_html__( 'Gutenberg Editor', 'mighty' ) . '</strong>.<br><br>',
		'<a target="_blank" rel="noopener" href="https://wordpress.org/plugins/gutenberg/">' . esc_html__( 'Gutenberg Editor', 'mighty' ) . '</a>'
	);

	printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );
}

/**
 * Creates new `MightyThemes Blocks` block category.
 */
function mightythemes_custom_category( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => isset( $attributes['enableTitle'] ) ? $attributes['enableTitle'] : 'mightythemes-blocks',
				'title' => isset( $attributes['enableTitle'] ) ? $attributes['enableTitle'] : __( 'MightyThemes Blocks', 'mightythemes-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'mightythemes_custom_category' );

// Hook: Block assets.
add_action( 'init', 'prosandcons_cgb_block_assets' );
