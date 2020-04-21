<?php
/**
 * Plugin Name:  Mighty Pros & Cons
 * Plugin URI: https://mightythemes.com/products/mighty-pros-cons/
 * Description: Mighty Pros & Cons is a Gutenberg block which helps you to insert responsive Pros and Cons table within your blog post.
 * Author: Mighty Themes
 * Author URI: http://mightythemes.com
 * Version: 1.2.2
 * License: GPL2+
 * License URI: #
 *
 * @package MightyThemes Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MIGHTY_PROS_AND_CONS_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'MIGHTY_PROS_AND_CONS_PLG_URL', plugin_dir_url( __FILE__ ) );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
