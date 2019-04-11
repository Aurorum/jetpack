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

