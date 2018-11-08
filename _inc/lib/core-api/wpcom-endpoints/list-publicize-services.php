<?php

/**
 * Publicize: get available publicize connection services data.
 */
class WPCOM_REST_API_V2_Endpoint_List_Publicize_Services extends WP_REST_Controller {
	public function __construct() {
		$this->namespace = 'wpcom/v2';
		$this->rest_base = 'publicize/services';
	}

	public function register_routes() {
		register_rest_route( $this->namespace, '/' . $this->rest_base, array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_items' ),
				'permission_callback' => array( $this, 'get_items_permission_check' ),
			),
			'schema' => array( $this, 'get_public_item_schema' ),
		) );
	}

	public function get_item_schema() {
		$schema = array(
			'$schema' => 'http://json-schema.org/draft-04/schema#',
			'title' => 'jetpack-publicize-service',
			'type' => 'object',
			'properties' => array(
				'name' => array(
					'description' => __( 'Alphanumeric identifier for the Publicize Service', 'jetpack' ),
					'type' => 'string',
				),
				'label' => array(
					'description' => __( 'Human readable label for the Publicize Service', 'jetpack' ),
					'type' => 'string',
				),
				'url' => array(
					'description' => __( 'The URL used to connect to the Publicize Service', 'jetpack' ),
					'type' => 'string',
					'format' => 'uri',
				),
			),
		);

		return $this->add_additional_fields_schema( $schema );
	}

	/**
	 * Retrieve full list of available Publicize connection services
	 * send them as JSON encoded data.
	 *
	 * @see Publicize::get_available_service_data()
	 *
	 * @since 6.7.0
	 *
	 * @return string JSON encoded connection services data.
	 */
	public function get_items( $request ) {
		global $publicize;
		/**
		 * We need this because Publicize::get_available_service_data() uses `Jetpack_Keyring_Service_Helper`
		 * and `Jetpack_Keyring_Service_Helper` relies on `menu_page_url()`.
		 *
		 * We also need add_submenu_page(), as the URLs for connecting each service
		 * rely on the `sharing` menu subpage being present.
		 */
		include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

		// The `sharing` submenu page must exist for service connect URLs to be correct.
		add_submenu_page( 'options-general.php', '', '', 'manage_options', 'sharing', '__return_empty_string' );

		$services_data = $publicize->get_available_service_data();

		$services = array();
		foreach ( $services_data as $service_data ) {
			$services[] = $this->prepare_item_for_response( $service_data, $request );
		}

		$response = rest_ensure_response( $services );
		$response->header( 'X-WP-Total', count( $services ) );
		$response->header( 'X-WP-TotalPages', 1 );

		return $response;
	}

	function prepare_item_for_response( $service, $request ) {
		$fields = $this->get_fields_for_response( $request );

		$response_data = array();
		foreach ( $service as $field => $value ) {
			if ( in_array( $field, $fields, true ) ) {
				$response_data[$field] = $value;
			}
		}

		return $response_data;
	}

	/**
	 * Verify that user can access Publicize data
	 *
	 * @return true|WP_Error
	 */
	public function get_items_permission_check() {
		global $publicize;

		if ( $publicize->current_user_can_access_publicize_data() ) {
			return true;
		}

		return new WP_Error(
			'invalid_user_permission_publicize',
			Jetpack_Core_Json_Api_Endpoints::$user_permissions_error_msg,
			array( 'status' => Jetpack_Core_Json_Api_Endpoints::rest_authorization_required_code() )
		);
	}
}

wpcom_rest_api_v2_load_plugin( 'WPCOM_REST_API_V2_Endpoint_List_Publicize_Services' );
