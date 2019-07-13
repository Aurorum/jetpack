<?php
/**
 * Customizations for the Full Site Editing plugin.
 *
 * Since we'll be trying to keep up with latest Gutenberg versions both on Simple and Atomic sites,
 * we need to ensure that some experimental functionality is not exposed yet.
 */

// Hide the experimental Widget Blocks section from the Customizer.
// This filter is added in https://github.com/WordPress/gutenberg/blob/cf1da64370c209b25bb005c44083097a6137a119/lib/customizer.php#L73
remove_action( 'customize_register', 'gutenberg_customize_register' );

// Remove some additional actions and filters that experimental Widget Blocks functionality adds.
remove_action( 'customize_update_gutenberg_widget_blocks', 'gutenberg_customize_update' );
remove_filter( 'widget_customizer_setting_args', 'filter_widget_customizer_setting_args' );
