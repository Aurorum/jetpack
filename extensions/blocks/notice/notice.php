
<?php
/**
 * Notice Block
 *
 * @since 7.2.0
 *
 * @package Jetpack
 */
jetpack_register_block(
	'jetpack/notice',
	array(
		'render_callback' => 'jetpack_notice_block_render',
	)
);
