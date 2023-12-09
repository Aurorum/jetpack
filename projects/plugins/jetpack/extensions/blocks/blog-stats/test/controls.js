import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogStatsInspectorControls } from '../controls';

describe( 'BlogStatsControls', () => {
	const defaultAttributes = {
		label: 'hits',
		statsOption: 'site',
	};

	const setAttributes = jest.fn();
	const defaultProps = {
		attributes: defaultAttributes,
		setAttributes,
	};

	beforeEach( () => {
		setAttributes.mockClear();
	} );

	describe( 'Inspector settings', () => {
		test( 'loads and displays settings', () => {
			render( <BlogStatsInspectorControls { ...defaultProps } /> );

			expect( screen.getByText( 'Settings' ) ).toBeInTheDocument();
			expect( screen.getByLabelText( 'My whole site' ) ).toBeInTheDocument();
			expect( screen.getByLabelText( 'This specific post' ) ).toBeInTheDocument();
		} );

		test( 'defaults stats selection to whole site', () => {
			render( <BlogStatsInspectorControls { ...defaultProps } /> );

			expect( screen.getByLabelText( 'My whole site' ) ).toBeChecked();
		} );

		test( 'selects stats selection to post', () => {
			const attributes = { statsOption: 'post' };
			render( <BlogStatsInspectorControls { ...{ ...defaultProps, attributes } } /> );

			expect( screen.getByLabelText( 'This specific post' ) ).toBeChecked();
		} );

		test( 'sets the statsOption attribute', async () => {
			const user = userEvent.setup();
			render( <BlogStatsInspectorControls { ...defaultProps } /> );
			await user.click( screen.getByLabelText( 'This specific post' ) );

			expect( setAttributes ).toHaveBeenCalledWith( { statsOption: 'post' } );
		} );
	} );
} );
