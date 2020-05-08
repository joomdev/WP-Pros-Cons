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
			)
		);
    }
    else {
		add_action( 'admin_notices', 'admin_notice_require_gutenberg' );
		return;
	}
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
