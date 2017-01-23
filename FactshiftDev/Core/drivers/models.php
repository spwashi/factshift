<?php
/**
 * User: Sam Washington
 * Date: 10/22/16
 * Time: 5:02 PM
 */
return [
    'models' => [
        'CollectionType'      => [
            'table'      => 'collection_types',
            'properties' => [ 'id', 'description', 'alias' ],
            'values'     => [
                'STANDARD' => 1,
            ],
        ],
        'DataType'            => [
            'table'      => 'data_types',
            'properties' => [ 'id', 'description', 'alias' ],
            'values'     => [ ],
        ],
        'DimensionRole'       => [
            'table'      => 'dimension_roles',
            'properties' => [ 'id', 'description', 'alias' ],
            'values'     => [
                'OVERVIEW'        => 1,
                'HISTORY_CULTURE' => 2,
                'METHODOLOGY'     => 3,
                'CONTEXT'         => 4,
                'DISCUSSION'      => 5,
                'META'            => 6,
            ],
        ],
        'RelationshipSubtype' => [
            'table'      => 'relationship_subtypes',
            'properties' => [ 'id', 'description', 'alias' ],
            'values'     => [
                'ELI5'            => 1,
                'THING_EXPLAINER' => 2,
                'IMAGE'           => 3,
                'VIDEO'           => 4,
                'AUDIO'           => 5,
                'TEXT'            => 6,
            ],
        ],
        'RelationshipType'    => [
            'table'         => 'relationship_types',
            'properties'    => [ 'id', 'description', 'alias' ],
            'values'        => [
                'CHILD'            => 1,
                'COMPOSITION'      => 2,
                'LOW_LEVEL'        => 3,
                'REPHRASE_CONTENT' => 4,
                'TOPICAL'          => 5,
            ],
            'display_names' => [
                #'REPHRASE_CONTENT' => 'pivot',
                #'HIGH_LEVEL'       => 'macro',
                #'LOW_LEVEL'        => 'micro'
            ],
        ],
        'SectionRole'         => [
            'table'      => 'section_roles',
            'properties' => [ 'id', 'description', 'alias' ],
            'values'     => [
                'definition'     => 1,
                'application'    => 2,
                'implementation' => 3,
                'terminology'    => 4,
                'representation' => 5,
                'example'        => 6,
                'alternative'    => 7,
                'nuance'         => 8,
            ],
        ],
        'SectionType'         => [
            'table'         => 'section_types',
            'properties'    => [ 'id', 'description', 'alias' ],
            'values'        => [
                'STANDARD' => 1,
                'IMAGE'    => 2,
                'VIDEO'    => 3,
                'AUDIO'    => 4,
                'TABLE'    => 6,
                'LIST'     => 7,
                'MIRROR'   => 8,
            ],
            'display_names' => [ 'mirror' => 'Embedded Entity' ],
        ],
        'UserType'            => [
            'client_side' => false,
            'table'       => 'user_types',
            'properties'  => [ 'id', 'description', 'alias' ],
            'values'      => [
                'standard'     => 1,
                'all_powerful' => 2,
            ],
        ],
        'RelationshipStatus'  => [
            'table'      => 'relationship_statuses',
            'properties' => [ 'id', 'alias', 'description' ],
            'values'     => [
                'confirmed' => 1,
                'pending'   => 2,
                'rejected'  => 3,
            ],
        ],
        'Status'              => [
            'table'      => 'statuses',
            'properties' => [ 'id', 'description', 'alias' ],
            'values'     => [
                'confirmed' => 1,
                'pending'   => 2,
                'rejected'  => 3,
            ],
        ],
        
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