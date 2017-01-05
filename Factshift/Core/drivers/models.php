<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 3:49 AM
 */
return [
    '_'        => [
        'relationships' => [
            '_dummies'    => [
                //The type of Entity that is being related to
                'entity_type'     => 'Dummy',
                //The singular index of these relationships
                'index_singular'  => 'dummy',
                //The textual representation of the relationship type, singular
                'name'            => 'Dummy',
                //The textual representation of the relationship type, plural
                'name_plural'     => 'Dummies',
                //The ID of the relationship type
                'id'              => null,
                //The entities that are linked in this relationship
                'linked_entities' => [ 'Dummy' => 'dummy_id', '[Entity]' => '[entity]_id' ],
            ],
            'children'    => [
                'entity_type'     => '[Entity]',
                'index_singular'  => 'child',
                'id'              => 1,
                'linked_entities' => [ 'primary_[entity]_id' => '[Entity]', 'secondary_[entity]_id' => '[Entity]' ],
            ],
            'micros'      => [
                'entity_type'     => '[Entity]',
                'index_singular'  => 'micro',
                'id'              => 3,
                'linked_entities' => [ 'primary_[entity]_id' => '[Entity]', 'secondary_[entity]_id' => '[Entity]' ],
            ],
            'composition' => [
                'entity_type'     => '[Entity]',
                'index_singular'  => 'composition',
                'id'              => 2,
                'linked_entities' => [ 'primary_[entity]_id' => '[Entity]', 'secondary_[entity]_id' => '[Entity]' ],
            ],
            'pivots'      => [
                'entity_type'     => '[Entity]',
                'index_singular'  => 'pivot',
                'id'              => 5,
                'linked_entities' => [ 'primary_[entity]_id' => '[Entity]', 'secondary_[entity]_id' => '[Entity]' ],
            ],
            
            'sections'     => [ 'entity_type' => 'Section' ],
            'users'        => [ 'entity_type' => 'User' ],
            'pages'        => [ 'entity_type' => 'Page' ],
            'universes'    => [ 'entity_type' => 'Universe' ],
            'collections'  => [ 'entity_type' => 'Collection' ],
            'dimensions'   => [ 'entity_type' => 'Dimension' ],
            'dictionaries' => [ 'entity_type' => 'Dictionary' ],
            'definitions'  => [ 'entity_type' => 'Definition' ],
            'concepts'     => [ 'entity_type' => 'Concept' ],
        ],
    ],
    'models'   => [
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
        
        '__nonexistent_model_1__' => [
            # only here to build queries
            'table'      => 'entities',
            'properties' => [ 'ent_id' ],
        ],
        
        'Section'    => [
            'prefix'          => 'sec_',
            'table'           => 'sections',
            'linked_entities' => [ 'user_id' => 'User' ],
            'properties'      => [
                'id'               => null,
                'title'            => '-',
                'subtitle'         => null,
                'content'          => '-',
                'content_location' => null,
                'ent_id'           => null,
                'user_id'          => null,
                'section_type'     => 1,
                'update_dt'        => null,
                'creation_dt'      => null,
            ],
        ],
        'Definition' => [
            'prefix'          => 'def_',
            'table'           => 'definitions',
            'linked_entities' => [ 'user_id' => 'User' ],
            'properties'      => [
                'id'          => null,
                'title'       => '-',
                'subtitle'    => null,
                'content'     => '-',
                'ent_id'      => null,
                'user_id'     => null,
                'update_dt'   => null,
                'creation_dt' => null,
            ],
        ],
        'Collection' => [
            'prefix'          => 'coll',
            'table'           => 'collections',
            'linked_entities' => [ 'user_id' => 'User' ],
            'properties'      => [
                'id'              => null,
                'user_id'         => null,
                'collection_type' => null,
                'title'           => null,
                'description'     => null,
                'ent_id'          => null,
                'update_dt'       => null,
                'creation_dt'     => null,
            ],
        ],
        'Concept'    => [
            'prefix'          => 'ccp_',
            'table'           => 'concepts',
            'linked_entities' => [ 'user_id' => 'User' ],
            'properties'      => [
                'id'          => null,
                'title'       => null,
                'alias'       => null,
                'subtitle'    => null,
                'description' => null,
                'ent_id'      => null,
                'directory'   => null,
                'user_id'     => null,
                'update_dt'   => null,
                'creation_dt' => null,
            ],
        ],
        'Universe'   => [
            'prefix'          => 'uni_',
            'table'           => 'universes',
            'linked_entities' => [ 'user_id' => 'User' ],
            'properties'      => [
                'id'          => null,
                'title'       => null,
                'alias'       => null,
                'subtitle'    => null,
                'description' => null,
                'ent_id'      => null,
                'directory'   => null,
                'user_id'     => null,
                'update_dt'   => null,
                'creation_dt' => null,
            ],
        ],
        'Page'       => [
            'prefix'          => 'page',
            'table'           => 'pages',
            'linked_entities' => [ 'user_id' => 'User' ],
            'properties'      => [
                'id'          => null,
                'title'       => null,
                'alias'       => null,
                'subtitle'    => null,
                'ent_id'      => null,
                'directory'   => null,
                'description' => null,
                'context'     => null,
                'user_id'     => null,
                'update_dt'   => null,
                'creation_dt' => null,
            ],
        ],
        'Dimension'  => [
            'prefix'          => 'dim_',
            'table'           => 'dimensions',
            'linked_entities' => [ 'user_id' => 'User' ],
            'properties'      => [
                'id'          => null,
                'user_id'     => null,
                'title'       => 'Overview',
                'description' => null,
                'ent_id'      => null,
                'update_dt'   => null,
                'creation_dt' => null,
            ],
        ],
        'User'       => [
            'prefix'     => 'usr_',
            'table'      => 'users',
            'properties' => [
                'id'          => null,
                'first_name'  => null,
                'last_name'   => null,
                'email'       => null,
                'alias'       => null,
                'ent_id'      => null,
                'password'    => null,
                'user_type'   => null,
                'status_id'   => null,
                'update_dt'   => null,
                'creation_dt' => null,
            
            ],
        ],
        'Dictionary' => [
            'table'           => 'dictionaries',
            'prefix'          => 'dic_',
            'linked_entities' => [ 'user_id' => 'User' ],
            'properties'      => [
                'id'          => null,
                'user_id'     => null,
                'title'       => null,
                'description' => null,
                'ent_id'      => null,
                'update_dt'   => null,
                'creation_dt' => null,
            ],
        ],
        
        'CollectionSectionMap' => [
            'table'           => 'collection_section_map',
            'linked_entities' => [ 'Collection', 'Section' ],
            'properties'      => [
                'id'            => null,
                'section_id'    => null,
                'collection_id' => null,
                'section_type'  => null,
                'section_role'  => null,
                'position'      => null,
                'update_dt'     => null,
                'creation_dt'   => null,
            ],
        ],
        'DictionarySectionMap' => [
            'table'           => 'dictionary_section_map',
            'linked_entities' => [ 'Dictionary', 'section_id' => 'Definition' ],
            'properties'      => [
                'id'            => null,
                'section_id'    => null,
                'dictionary_id' => null,
                'section_type'  => null,
                'section_role'  => null,
                'position'      => null,
                'update_dt'     => null,
                'creation_dt'   => null,
            ],
        ],
        'DimensionSectionMap'  => [
            'table'      => 'dimension_section_map',
            'properties' => [
                'id'           => null,
                'section_id'   => null,
                'dimension_id' => null,
                'section_type' => null,
                'section_role' => null,
                'position'     => null,
                'update_dt'    => null,
                'creation_dt'  => null,
            ],
        ],
        'PageDimensionMap'     => [
            'table'      => 'page_dimension_map',
            'properties' => [
                'id'             => null,
                'page_id'        => null,
                'dimension_id'   => null,
                'position'       => null,
                'update_dt'      => null,
                'creation_dt'    => null,
                'dimension_role' => null,
            ],
        ],
        'ConceptPageMap'       => [
            'table'      => 'concept_page_map',
            'properties' => [
                'id'                => null,
                'page_id'           => null,
                'description'       => null,
                'concept_id'        => null,
                'universe_id'       => null,
                'position'          => null,
                'update_dt'         => null,
                'creation_dt'       => null,
                'relationship_type' => null,
            ],
        ],
        'SectionSectionMap'    => [
            'table'      => 'section_section_map',
            'properties' => [
                'id'                   => null,
                'primary_section_id'   => null,
                'secondary_section_id' => null,
                'position'             => null,
                'relationship_type'    => null,
                'relationship_subtype' => null,
                'relationship_status'  => null,
                'user_id'              => null,
                'adopts_children'      => null,
                'update_dt'            => null,
                'creation_dt'          => null,
            ],
        ],
        'SectionConceptMap'    => [
            'table'      => 'section_concept_map',
            'properties' => [
                'id'          => null,
                'section_id'  => null,
                'concept_id'  => null,
                'update_dt'   => null,
                'position'    => null,
                'universe_id' => null,
                'creation_dt' => null,
            ],
        ],
        
        #'DimensionSectionPageMap' => [
        #    'table'      => 'section_dimension_page_map',
        #    'properties' => [
        #        'all'          => [
        #            'id',
        #            'section_id',
        #            'concept_id',
        #            'update_dt',
        #            'position',
        #            'universe_id',
        #            'creation_dt',
        #        ],
        #        'api_settable' => [
        #            'section_id',
        #            'concept_id',
        #            'position',
        #            'universe_id',
        #        ],
        #        'api_gettable' => '*',
        #    ],
        #],
    ],
    'entities' => [
        'Collection' => [
            'relationships' => [ 'sections', 'pages' ],
            'properties'    => [
                'api_settable' => [
                    'collection_type',
                    'title',
                    'description',
                ],
                'api_gettable' => '*',
            ],
        ],
        'Concept'    => [
            'relationships' => [ 'sections', 'pages', 'users', 'universes' ],
            'properties'    => [
                'api_settable' => [
                    'title',
                    'alias',
                    'subtitle',
                    'description',
                ],
                'api_gettable' => '*',
                'required'     => [
                    'title',
                    'alias',
                    'description',
                ],
            ],
        ],
        'Dictionary' => [
            'relationships' => [ 'pages', 'definitions', 'users' ],
            'properties'    => [
                'api_settable' => [
                    'title',
                    'description',
                ],
                'api_gettable' => '*',
            ],
        ],
        'Dimension'  => [
            'relationships' => [ 'sections', 'pages' ],
            'properties'    => [
                'api_settable' => [
                    'title',
                    'description',
                ],
                'api_gettable' => '*',
            ],
        ],
        'Page'       => [
            'relationships' => [ 'dimensions', 'concepts', 'users' ],
            'properties'    => [
                'api_settable' => [
                    'title',
                    'subtitle',
                    'description',
                ],
                'api_gettable' => '*',
            ],
        ],
        'Definition' => [
            'based_on'      => [ 'Section', 'Collection' ],
            'relationships' => [ 'dictionaries', ],
            'properties'    => [
                'all'          => [
                    'title',
                    'subtitle',
                    'alias',
                ],
                'api_settable' => '*',
                'api_gettable' => '*',
            ],
        ],
        'Section'    => [
            'relationships' => [
                'children',
                'micros',
                'composition',
                'pivots',
                'collections',
                'dimensions',
                'concepts',
                'users',
            ],
            'properties'    => [
                'display_types' => [
                    'content'     => [ 'type' => 'long' ],
                    'update_dt'   => [ 'name' => 'Last Updated', 'type' => 'datetime' ],
                    'creation_dt' => [ 'name' => 'Creation Date', 'type' => 'datetime' ],
                ],
                'api_settable'  => [
                    'title',
                    'subtitle',
                    'content',
                    'section_type',
                    'content_location',
                ],
                'api_gettable'  => '*',
            ],
            'types'         => [
                'standard' => [
                    'properties' => [
                        'title',
                        'subtitle',
                        'content',
                        'section_type',
                    ],
                ],
                'image'    => [
                    'properties' => [
                        'title',
                        'subtitle',
                        'content_location',
                        'section_type',
                    ],
                ],
                'video'    => [
                    'properties' => [
                        'title',
                        'subtitle',
                        'content_location',
                        'section_type',
                    ],
                ],
                'audio'    => [
                    'properties' => [
                        'title',
                        'subtitle',
                        'content_location',
                        'section_type',
                    ],
                ],
                'mirror'   => [
                    'properties' => [
                        'title',
                        'subtitle',
                        'content_location',
                        'section_type',
                    ],
                ],
            ],
        ],
        'Universe'   => [
            'relationships' => [ 'sections', 'pages', 'users', 'concepts' ],
            'properties'    => [
                'api_settable' => [
                    'title',
                    'alias',
                    'subtitle',
                    'description',
                ],
                'api_gettable' => '*',
                'required'     => [
                    'title',
                    'alias',
                ],
            ],
        ],
        'User'       => [
            'relationships' => [ 'sections', 'pages', 'concepts', 'universes', 'dictionaries' ],
            'properties'    => [
                'api_settable' => [
                    'first_name',
                    'last_name',
                    'email',
                ],
                'api_gettable' => [
                    'first_name',
                    'last_name',
                    'email',
                    'alias',
                    'update_dt',
                    'creation_dt',
                    'user_type',
                ],
            ],
        ],
        
        'Collection|Section'    => [
            'properties' => [
                'all'          => [
                    'section_id',
                    'collection_id',
                    'section_type',
                    'section_role',
                    'position',
                    'update_dt',
                    'creation_dt',
                ],
                'api_settable' => [
                    'section_id',
                    'dictionary_id',
                    'position',
                ],
            ],
        ],
        'Definition|Dictionary' => [
            'properties' => [
                'all'          => [
                    'section_id',
                    'dictionary_id',
                    'section_type',
                    'section_role',
                    'position',
                ],
                'api_settable' => [
                    'section_id',
                    'dictionary_id',
                    'position',
                ],
            ],
        ],
        'Dimension|Section'     => [
            'properties' => [
                'all'          => [
                    'section_id',
                    'dimension_id',
                    'section_type',
                    'section_role',
                    'position',
                ],
                'api_settable' => [
                    'section_id',
                    'dimension_id',
                    'section_type',
                    'section_role',
                    'position',
                ],
            ] ],
        'Dimension|Page'        => [
            'properties' => [
                'all'          => [
                    'page_id',
                    'dimension_id',
                    'position',
                    'dimension_role',
                ],
                'api_settable' => [
                    'page_id',
                    'dimension_id',
                    'position',
                    'dimension_role',
                ],
            ] ],
        'Concept|Page'          => [
            'properties' => [
                'all'          => [
                    'page_id',
                    'description',
                    'concept_id',
                    'universe_id',
                    'position',
                    'relationship_type',
                ],
                'api_settable' => [
                    'page_id',
                    'concept_id',
                    'position',
                    'universe_id',
                    'relationship_type',
                    'description',
                    'creation_dt',
                ],
            ],
        ],
        'Section|Section'       => [
            'properties' => [
                'all'           => [
                    'primary_section_id',
                    'secondary_section_id',
                    'position',
                    'relationship_type',
                    'relationship_subtype',
                    'relationship_status',
                    'user_id',
                    'adopts_children',
                ],
                'display_types' => [ ],
                'api_settable'  => [
                    'relationship_type',
                    'relationship_subtype',
                    'adopts_children',
                    'position',
                ],
            ],
        ],
        'Concept|Section'       => [
            'properties' => [
                'all'          => [
                    'section_id',
                    'concept_id',
                    'position',
                    'universe_id',
                ],
                'api_settable' => [
                    'section_id',
                    'concept_id',
                    'position',
                    'universe_id',
                ],
            ],
        ],
    ],
];