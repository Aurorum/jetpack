<?php
/**
 * Milestone Block.
 *
 * @since 7.1.0
 *
 * @package Jetpack
 */
jetpack_register_block(
	'jetpack/milestone',
	array(
		'render_callback' => 'jetpack_milestone_block_load_assets',
	)
);
/**
 * Milestone block registration/dependency declaration.
 *
 * @param array  $attr    Array containing the milestone block attributes.
 * @param string $content String containing the milestone block content.
 *
 * @return string
 */
function jetpack_milestone_block_load_assets( $attr, $content ) {
	Jetpack_Gutenberg::load_assets_as_required( 'milestone' );
	return $content;
}
