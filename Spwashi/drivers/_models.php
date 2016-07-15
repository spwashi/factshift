<?php
/**
 * User: Sam Washington
 * Date: 7/14/16
 * Time: 9:05 PM
 */
$config = [
	'_'      => [
		'relationship_types'    => [
			'children'    => 1,
			'composition' => 2,
			'micros'      => 4,
			'pivots'      => 5
		],
		'relationship_subtypes' => [
			'eli5'            => 1,
			'thing_explainer' => 2,
			'image'           => 3,
			'video'           => 4,
			'audio'           => 5,
			'text'            => 6
		],
		'relationships'         => [
			'_dummies'    => [
				//The type of Entity that is being related to
				'model_type'         => 'Dummy',
				//The singular index of these relationships
				'index_singular'     => 'dummy',
				//The textual representation of the relationship type, singular
				'name'               => 'Dummy',
				//The textual representation of the relationship type, plural
				'name_plural'        => '_Dummies',
				//The ID of the relationship type
				'id'                 => null,
				//The primary key of the relationship - the one that /has/ the relationship. Done with respect to the entity that has the relationship (e.g. primary_[entity]_id or [entity]_id).
				//Flipped if the relationship is only reciprocal
				'primary_key'        => '[entity]_id',
				//The secondary key of the relationship. Opposite of the primary key.
				'secondary_key'      => 'dummy_id',
				//Whether or not this relationship type is only had reciprocally (e.g. "section" has no "sections" index, but that is the relationship type that it is in every other relationship.
				//todo consider automating/removing?
				'is_only_reciprocal' => false,
				//The entities that are linked in this relationship
				'linked_entities'    => ['Dummy', 'Entity']
			],
			'children'    => [
				'model_type'         => '[Entity]',
				'index_singular'     => 'child',
				'id'                 => 1,
				'primary_key'        => 'primary_[entity]_id',
				'secondary_key'      => 'secondary_[entity]_id',
				'is_only_reciprocal' => false,
				'linked_entities'    => ['[Entity]', '[Entity]']
			],
			'micros'      => [
				'model_type'         => '[Entity]',
				'index_singular'     => 'micro',
				'id'                 => 4,
				'primary_key'        => 'primary_[entity]_id',
				'secondary_key'      => 'secondary_[entity]_id',
				'is_only_reciprocal' => false,
				'linked_entities'    => ['[Entity]', '[Entity]']
			],
			'composition' => [
				'model_type'         => '[Entity]',
				'index_singular'     => 'composition',
				'id'                 => 2,
				'primary_key'        => 'primary_[entity]_id',
				'secondary_key'      => 'secondary_[entity]_id',
				'is_only_reciprocal' => false,
				'linked_entities'    => ['[Entity]', '[Entity]']
			],
			'pivots'      => [
				'model_type'         => '[Entity]',
				'index_singular'     => 'pivot',
				'id'                 => 5,
				'primary_key'        => 'primary_[entity]_id',
				'secondary_key'      => 'secondary_[entity]_id',
				'is_only_reciprocal' => false,
				'linked_entities'    => ['[Entity]', '[Entity]']
			],
			'sections'    => ['_standard' => true, 'model_type' => 'Section', 'is_only_reciprocal' => false],
			'pages'       => ['_standard' => true, 'model_type' => 'Page', 'is_only_reciprocal' => false],
			'collections' => ['_standard' => true, 'model_type' => 'Collection', 'is_only_reciprocal' => false],
			'dimensions'  => ['_standard' => true, 'model_type' => 'Dimension', 'is_only_reciprocal' => false],
			'concepts'    => ['_standard' => true, 'model_type' => 'Concept', 'is_only_reciprocal' => false],
		]
	],
	'models' => [
		'Section'    => [
			'prefix'        => '_sec',
			'table'         => 'sections',
			'relationships' => [
				'_inherit'     => [
					'_' => [
						'children',
						'micros',
						'composition',
						'pivots',
						'pages',
						'collections',
						'dimensions',
						'concepts',
					]
				],
				'sections'     => ['_standard' => true, 'model_type' => ['Collection', 'Dimension', 'Concept'], 'is_only_reciprocal' => true],

				'dictionaries' => [
					'_standard'          => true,
					'model_type'         => 'Dictionary',
					'is_only_reciprocal' => false,
				],
				'definitions'  => [
					'model_type'         => 'Dictionary',
					'index_singular'     => 'definition',
					'secondary_key'      => 'dictionary_id',
					'primary_key'        => 'section_id',
					'is_only_reciprocal' => true,
					'linked_entities'    => ['Section', 'Dictionary']
				],
			],
			'properties'    => [
				'all'          => [
					'id',
					'title',
					'subtitle',
					'content',
					'content_location',
					'ent_id',
					'words',
					'user_id',
					'has_title',
					'section_type',
					'update_dt',
					'creation_dt',
				],
				'api_settable' => [
					'title',
					'subtitle',
					'content',
					'section_type',
					'has_title',
					'content_location',
					'words',
				],
				'api_gettable' => '*'
			]
		],
		'Collection' => [
			'prefix'        => 'coll',
			'table'         => 'collections',
			'relationships' => [
				'_inherit' => ['_' => ['sections', 'pages']]
			],
			'properties'    => [
				'all'          => [
					'id',
					'user_id',
					'collection_type',
					'title',
					'description',
					'ent_id',
					'update_dt',
					'creation_dt',
				],
				'api_settable' => [
					'collection_type',
					'title',
					'description',
				],
				'api_gettable' => '*'
			]
		],
		'Concept'    => [
			'prefix'        => 'ccp_',
			'table'         => 'concepts',
			'relationships' => [
				'_inherit' => ['_' => ['sections', 'pages']]
			],
			'properties'    => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]
		],
		'Page'       => [
			'prefix'        => 'page',
			'table'         => 'pages',
			'relationships' => [
				'_inherit' => ['_' => ['sections', 'pages']]
			],
			'properties'    => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]
		],
		'Dimension'  => [
			'prefix'        => 'dim_',
			'table'         => 'dimensions',
			'relationships' => [
				'_inherit' => ['_' => ['sections', 'pages']]
			],
			'properties'    => [
				'all'          => [
					'id',
					'user_id',
					'title',
					'description',
					'ent_id',
					'update_dt',
					'creation_dt',
				],
				'api_settable' => [
					'title',
					'description',
				],
				'api_gettable' => '*'
			]
		],
		'Dictionary' => [
			'table'         => 'dictionaries',
			'relationships' => [
				'_inherit' => ['_' => ['sections', 'pages']]
			],
			'properties'    => [
				'all'          => [
					'id',
					'user_id',
					'title',
					'description',
					'ent_id',
					'update_dt',
					'creation_dt',
				],
				'api_settable' => [
					'title',
					'description',
				],
				'api_gettable' => '*'
			]
		],
	],
	'maps'   => [
		'CollectionSectionMap' => [
			'table_name'      => 'collection_section_map',
			'linked_entities' => ['Collection', 'Section'],
			'prefix'          => 'csm_',
			'properties'      => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
		'DictionarySectionMap' => [
			'table_name'      => 'dictionary_section_map',
			'linked_entities' => ['Dictionary', 'Section'],
			'prefix'          => 'dcsm',
			'properties'      => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
		'DimensionSectionMap'  => [
			'table_name'      => 'dimension_section_map',
			'linked_entities' => ['Dimension', 'Section'],
			'prefix'          => 'dmsm',
			'properties'      => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
		'PageDimensionMap'     => [
			'table_name'      => 'page_dimension_map',
			'linked_entities' => ['Page', 'Dimension'],
			'prefix'          => 'pdm_',
			'properties'      => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
		'ConceptPageMap'       => [
			'table_name'      => 'concept_page_map',
			'linked_entities' => ['Concept', 'Page'],
			'prefix'          => 'cpm_',
			'properties'      => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
		'SectionUserMap'       => [
			'table_name'      => 'section_user_map',
			'linked_entities' => ['Section', 'User'],
			'prefix'          => false,
			'properties'      => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
		'UserSectionMap'       => [
			'table_name'      => 'user_section_map',
			'linked_entities' => ['User', 'Section'],
			'prefix'          => false,
			'properties'      => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
		'SectionSectionMap'    => [
			'table_name'      => 'section_section_map',
			'linked_entities' => ['Section', 'Section'],
			'prefix'          => '____',
			'properties'      => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
		'SectionConceptMap'    => [
			'table_name'      => 'section_concept_map',
			'linked_entities' => ['Section', 'Concept'],
			'prefix'          => '____',
			'properties'      => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
	]
];
return $config;
