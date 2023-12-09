import { useModuleStatus } from '@automattic/jetpack-shared-extension-utils';
import apiFetch from '@wordpress/api-fetch';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { BlogStatsInspectorControls } from './controls';
import { InactiveStatsPlaceholder } from './inactive-placeholder';

function BlogStatsEdit( { attributes, className, setAttributes } ) {
	const { isLoadingModules, isChangingStatus, isModuleActive, changeStatus } =
		useModuleStatus( 'stats' );
	const { label, statsOption } = attributes;
	const postId = useSelect( select => select( 'core/editor' ).getCurrentPostId(), [] );
	const [ statsData, setStatsData ] = useState( null );

	useEffect( () => {
		if ( isModuleActive ) {
			apiFetch( {
				path: `/wpcom/v2/blog-stats?post_id=${ postId }`,
			} ).then( response => {
				setStatsData( response );
			} );
		}
	}, [ postId, isModuleActive ] );

	if ( ! isModuleActive && ! isLoadingModules ) {
		return (
			<InactiveStatsPlaceholder
				className={ className }
				changeStatus={ changeStatus }
				isLoading={ isChangingStatus }
			/>
		);
	}

	return (
		<>
			<InspectorControls>
				<BlogStatsInspectorControls attributes={ attributes } setAttributes={ setAttributes } />
			</InspectorControls>

			<div className={ className }>
				{ isLoadingModules || statsData === null ? (
					<p className="loading-stats">{ __( 'Loading stats…', 'jetpack' ) }</p>
				) : (
					<p>
						<span>
							{ statsOption === 'post' ? statsData[ 'post-views' ] : statsData[ 'blog-views' ] }{ ' ' }
						</span>
						<RichText
							tagName="span"
							placeholder={ _x( 'hits', 'Number of views, plural', 'jetpack' ) }
							value={ label }
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
							onChange={ newLabel => setAttributes( { label: newLabel } ) }
						/>
					</p>
				) }
			</div>
		</>
	);
}

export default BlogStatsEdit;
