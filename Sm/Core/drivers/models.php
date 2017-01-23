<?php
/**
 * User: Sam Washington
 * Date: 10/22/16
 * Time: 5:02 PM
 *
 * EXAMPLE FILE
 * returns an array of information about the Models that are going to be represented on the site
 */
return [
    'models' => [
        'Model'             => [
            'table'      => 'models',
            'properties' => [
                'id',
                'table_name',
                'class_name',
                'type_identifier',
                'type_table',
            ],
        ],
        'Entity'            => [
            'table'      => 'entities',
            'properties' => [
                'id',
                'name',
            ],
        ],
        'EntityPropertyMap' => [
            'table'      => 'entity_properties',
            'properties' => [
                'id',
                'entity_id',
                'property_id',
                'is_client_side',
                'can_api_get',
                'can_api_set',
            ],
        ],
        'PropertyType'      => [
            'table'      => 'property_types',
            'properties' => [
                'id',
                'alias',
            ],
            'values'     => [
                'number'  => 1,
                'integer' => 2,
                'array'   => 3,
                'enum'    => 4,
                'string'  => 5,
                'entity'  => 6,
                'boolean' => 7,
            ],
        ],
        'DisplayType'       => [
            'table'      => 'display_types',
            'properties' => [
                'id',
                'alias',
            ],
            'values'     => [
                'input'    => 1,
                'textbox'  => 2,
                'checkbox' => 3,
                'dropdown' => 4,
                'entity'   => 5,
            ],
        ],
        'Property'          => [
            'table'      => 'properties',
            'properties' => [
                'id',
                'property_name',
                'property_type',
                'display_type',
                'localization_code',
            ],
        ],
        'Localization'      => [
            'table' => 'localization',
            'properties' > [
                'id',
                'code',
                'locale_code',
            ],
        ],
    ],
];