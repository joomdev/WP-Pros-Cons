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
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
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
	register_block_type(
		'cgb/block-prosandcons', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'prosandcons-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'prosandcons-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'prosandcons-cgb-block-editor-css',
		)
	);

	// Load the FontAwesome icon library.
	wp_enqueue_style('mightythemes-blocks-fontawesome', '//use.fontawesome.com/releases/v5.8.1/css/all.css');
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

/**
 * Enqueue assets for backend editor
 */
function mightythemes_blocks_editor_assets() {
	// FontAwesome library.
	wp_enqueue_style('mightythemes-blocks-fontawesome', '//use.fontawesome.com/releases/v5.8.1/css/all.css');
}
add_action( 'enqueue_block_editor_assets', 'mightythemes_blocks_editor_assets' );


// Hook: Block assets.
add_action( 'init', 'prosandcons_cgb_block_assets' );
