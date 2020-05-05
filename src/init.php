<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function prosandcons_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'prosandcons-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'prosandcons-cgb-block-js', // Handle.
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
		'prosandcons-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
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


				'render_callback' => 'render_proscons_block',
			)
		);
    }
    else {
		add_action( 'admin_notices', 'admin_notice_require_gutenberg' );
		return;
	}
}

function render_proscons_block( $attributes ) {

	// echo '<pre>';
	// print_r($attributes);
	// echo '<pre>';
	// die();


	
	$block_content = "<div class='test'>" . $attributes['title'] . "</div>";
	
    // Return the frontend output for our block 
    return $block_content;
}

/**
 * Notice when Gutenberg Not found.
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
				'slug'  => 'mightythemes-blocks',
				'title' => __( 'MightyThemes Blocks', 'mightythemes-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'mightythemes_custom_category' );

// Hook: Block assets.
add_action( 'init', 'prosandcons_cgb_block_assets' );
