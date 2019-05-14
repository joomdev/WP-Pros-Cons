<?php
/**
 * Plugin Name:  Mighty Pros & Cons
 * Plugin URI: #
 * Description: Mighty Pros & Cons is a Gutenberg block which helps you to insert responsive Pros and Cons table within your blog post.
 * Author: Mighty Themes
 * Author URI: http://mightythemes.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: #
 *
 * @package MightyThemes Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
