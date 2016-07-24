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
				'model_type'      => 'Dummy',
				//The singular index of these relationships
				'index_singular'  => 'dummy',
				//The textual representation of the relationship type, singular
				'name'            => 'Dummy',
				//The textual representation of the relationship type, plural
				'name_plural'     => '_Dummies',
				//The ID of the relationship type
				'id'              => null,
				//The primary key of the relationship - the one that /has/ the relationship. Done with respect to the entity that has the relationship (e.g. primary_[entity]_id or [entity]_id).
				//Flipped if the relationship is only reciprocal
				'primary_key'     => '[entity]_id',
				//The secondary key of the relationship. Opposite of the primary key.
				'secondary_key'   => 'dummy_id',
				//The entities that are linked in this relationship
				'linked_entities' => ['Dummy', 'Entity']
			],
			'children'    => [
				'model_type'      => '[Entity]',
				'index_singular'  => 'child',
				'id'              => 1,
				'primary_key'     => 'primary_[entity]_id',
				'secondary_key'   => 'secondary_[entity]_id',
				'linked_entities' => ['[Entity]', '[Entity]']
			],
			'micros'      => [
				'model_type'      => '[Entity]',
				'index_singular'  => 'micro',
				'id'              => 4,
				'primary_key'     => 'primary_[entity]_id',
				'secondary_key'   => 'secondary_[entity]_id',
				'linked_entities' => ['[Entity]', '[Entity]']
			],
			'composition' => [
				'model_type'      => '[Entity]',
				'index_singular'  => 'composition',
				'id'              => 2,
				'primary_key'     => 'primary_[entity]_id',
				'secondary_key'   => 'secondary_[entity]_id',
				'linked_entities' => ['[Entity]', '[Entity]']
			],
			'pivots'      => [
				'model_type'      => '[Entity]',
				'index_singular'  => 'pivot',
				'id'              => 5,
				'primary_key'     => 'primary_[entity]_id',
				'secondary_key'   => 'secondary_[entity]_id',
				'linked_entities' => ['[Entity]', '[Entity]']
			],
			'sections'    => ['model_type' => 'Section'],
			'users'       => ['model_type' => 'User'],
			'pages'       => ['model_type' => 'Page'],
			'collections' => ['model_type' => 'Collection'],
			'dimensions'  => ['model_type' => 'Dimension'],
			'concepts'    => ['model_type' => 'Concept'],
		]
	],
	'models' => [
		'Section'              => [
			'prefix'        => 'sec_',
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
						'users'
					]
				],
				'users'        => ['existent' => false],
				'dictionaries' => [
					'model_type' => 'Dictionary',
				],
			],
			'properties'    => [
				'all'          => [
					'id',
					'title'        => ' - ',
					'subtitle',
					'content'      => ' - ',
					'content_location',
					'ent_id',
					'words',
					'user_id',
					'has_title'    => false,
					'section_type' => 1,
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
		'Collection'           => [
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
		'Concept'              => [
			'prefix'        => 'ccp_',
			'table'         => 'concepts',
			'relationships' => [
				'_inherit' => ['_' => ['sections', 'pages']]
			],
			'properties'    => [
				'all'          => [
					'id',
					'title',
					'alias',
					'subtitle',
					'description',
					'ent_id',
					'directory',
					'user_id',
					'update_dt',
					'creation_dt'
					//                'namespace_id'
				],
				'api_settable' => [
					'title',
					'subtitle',
					'description',
				],
				'api_gettable' => '*'
			]
		],
		'Page'                 => [
			'prefix'        => 'page',
			'table'         => 'pages',
			'relationships' => [
				'_inherit' => ['_' => ['sections', 'dimensions', 'concepts', 'users']],
				'users'    => ['existent' => false],
			],
			'properties'    => [
				'all'          => [
					'id',
					'title',
					'alias',
					'subtitle',
					'ent_id',
					'directory',
					'description',
					'context',
					'redirect_url',
					'user_id',
					'update_dt',
					'creation_dt',
				],
				'api_settable' => [
					'title',
					'subtitle',
					'description',
				],
				'api_gettable' => '*'
			]
		],
		'Dimension'            => [
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
		'User'                 => [
			'prefix'        => 'usr_',
			'table'         => 'users',
			'relationships' => [
				'_inherit' => ['_' => ['sections', 'pages']]
			],
			'properties'    => [
				'all'          => [
					'id',
					'first_name',
					'last_name',
					'email',
					'alias',
					'ent_id',
					'password',
					'user_type',
					'status_id',
					'user_status_reason_id',
					'profile_image_id',
					'update_dt',
					'creation_dt',
				],
				'api_settable' => [
					'first_name',
					'last_name',
					'email',
					'alias',
				],
				'api_gettable' => [
					'first_name',
					'last_name',
					'email',
					'alias',
					'update_dt',
					'creation_dt',
					'user_type'
				]
			]
		],
		'Dictionary'           => [
			'table'         => 'dictionaries',
			'prefix'        => 'dic_',
			'relationships' => [
				'_inherit'    => ['_' => ['pages']],
				'definitions' => [
					'model_type'      => 'Section',
					'index_singular'  => 'definition',
					'secondary_key'   => 'section_id',
					'primary_key'     => 'dictionary_id',
					'linked_entities' => ['Dictionary', 'Section']
				],
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

		'CollectionSectionMap' => [
			'table'      => 'collection_section_map',
			'prefix'     => 'csm_',
			'properties' => [
				'all'          => [],
				'api_settable' => [],
				'api_gettable' => []
			]],
		'DictionarySectionMap' => [
			'table'      => 'dictionary_section_map',
			'prefix'     => 'dcsm',
			'properties' => [
				'all'          => [
					'id',
					'section_id',
					'dictionary_id',
					'section_type',
					'section_role',
					'position',
					'update_dt',
					'creation_dt',
				],
				'api_settable' => [
					'section_id',
					'dictionary_id',
					'section_type',
					'section_role',
					'position',
				],
				'api_gettable' => '*'
			]],
		'DimensionSectionMap'  => [
			'table'      => 'dimension_section_map',
			'prefix'     => 'dmsm',
			'properties' => [
				'all'          => [
					'id',
					'section_id',
					'dimension_id',
					'section_type',
					'section_role',
					'position',
					'update_dt',
					'creation_dt',
				],
				'api_settable' => [
					'section_id',
					'dimension_id',
					'section_type',
					'section_role',
					'position',
				],
				'api_gettable' => '*'
			]],
		'PageDimensionMap'     => [
			'table'      => 'page_dimension_map',
			'prefix'     => 'pdm_',
			'properties' => [
				'all'          => [
					'id',
					'page_id',
					'dimension_id',
					'position',
					'update_dt',
					'creation_dt',
					'dimension_role',
				],
				'api_settable' => [
					'page_id',
					'dimension_id',
					'position',
					'dimension_role',
				],
				'api_gettable' => '*'
			]],
		'ConceptPageMap'       => [
			'table'      => 'concept_page_map',
			'prefix'     => 'cpm_',
			'properties' => [
				'all'          => [
					'id',
					'page_id',
					'description',
					'concept_id',
					'universe_id',
					'position',
					'update_dt',
					'creation_dt',
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
				'api_gettable' => '*'
			]],
		'SectionUserMap'       => [
			'table'      => 'section_user_map',
			'alias_for'  => 'sections.user_id',
			'properties' => [
				'all'          => [
					'id',
					'user_id'
				],
				'api_settable' => [
					'id',
					'user_id'
				],
				'api_gettable' => '*'
			]
		],
		'PageUserMap'          => [
			'table'      => 'page_user_map',
			'alias_for'  => 'pages.user_id',
			'properties' => [
				'all'          => [
					'id',
					'user_id'
				],
				'api_settable' => [
					'id',
					'user_id'
				],
				'api_gettable' => '*'
			]
		],
		'SectionSectionMap'    => [
			'table'      => 'section_section_map',
			'prefix'     => 'ssm_',
			'properties' => [
				'all'          => [
					'id',
					'primary_section_id',
					'secondary_section_id',
					'position',
					'relationship_type',
					'relationship_subtype',
					'relationship_status',
					'user_id',
					'adopts_children',
					'update_dt',
					'creation_dt'
					//'universe_id'
				],
				'api_settable' => [
					'secondary_section_id',
					'relationship_type',
					'relationship_subtype',
					'primary_section_id',
					'position',
				],
				'api_gettable' => '*'
			]],
		'SectionConceptMap'    => [
			'table'      => 'section_concept_map',
			'prefix'     => 'scpm',
			'properties' => [
				'all'          => [
					'id',
					'section_id',
					'concept_id',
					'update_dt',
					'position',
					'universe_id',
					'creation_dt'
				],
				'api_settable' => [
					'section_id',
					'concept_id',
					'position',
					'universe_id',
				],
				'api_gettable' => '*'
			]],
	]
];
return $config;
