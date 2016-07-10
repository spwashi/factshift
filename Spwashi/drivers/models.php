<?php
/**
 * User: Sam Washington
 * Date: 9/30/15
 * Time: 12:16 AM
 */

return [
	'tables' => [
		'_meta'                  => [
			'namespace'        => "\\Spwashi\\Model\\",
			'main_integer_key' => 'id',
			'main_string_key'  => 'ent_id',
		],
		'collections'            => [
			'class'         => 'Collection',
			'prefix'        => 'coll',
			'properties'    => [
				'id',
				'user_id',
				'collection_type',
				'title',
				'description',
				'ent_id',
				'update_dt',
				'creation_dt',
			],
			'api_settable'  => [
				'collection_type',
				'title',
				'description',
			],
			'relationships' => [
				'sections' => [
					'_meta' => [
						'_table' => 'collection_section_map',
					],
				],
				'pages'    => [
					'_meta' => [
						'_table' => 'page_collection_map',
					],
				],
			],
		],
		'collection_types'       => [
			'readonly'   => true,
			'class'      => "Type\\CollectionType",
			'prefix'     => 'ct__',
			'properties' => [
				'id',
				'name',
				'description',
				'update_dt',
				'creation_dt',
			],
			'values'     => [
				1 => 'standard',
				2 => 'dictionary',
				3 => 'dimension',
			],
		],
		'concepts'               => [
			'class'         => 'Concept',
			'prefix'        => 'ccp_',
			'api_settable'  => [
				'title',
				'subtitle',
				'description',
			],
			'properties'    => [
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
			'relationships' => [
				'sections' => [
					'_meta' => [
						'_table' => 'section_concept_map',
					],
				],
			],
		],
		'collection_section_map' => [
			'class'        => "Map\\CollectionSectionMap",
			'map_type'     => 'Collection|Section',
			'prefix'       => 'scm_',
			'properties'   => [
				'id',
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
				'collection_id',
				'section_type',
				'section_role',
				'position',
			],
			'mapped'       => [
				'collections',
				'sections',
			],
		],
		'dictionaries'           => [
			'class'         => 'Dictionary',
			'prefix'        => 'dic_',
			'properties'    => [
				'id',
				'user_id',
				'title',
				'description',
				'ent_id',
				'update_dt',
				'creation_dt',
			],
			'api_settable'  => [
				'title',
				'description',
			],
			'relationships' => [
				'sections' => [
					'_meta' => [
						'_table' => 'dictionary_section_map',
					],
				],
			],
		],
		'dictionary_section_map' => [
			'class'        => "Map\\DictionarySectionMap",
			'map_type'     => 'Dictionary|Section',
			'prefix'       => 'dcsm',
			'properties'   => [
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
			'mapped'       => [
				'dictionaries',
				'sections',
			],
		],
		'dimension_section_map'  => [
			'class'        => "Map\\DimensionSectionMap",
			'map_type'     => 'Dimension|Section',
			'prefix'       => 'dmsm',
			'properties'   => [
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
			'mapped'       => [
				'dimensions',
				'sections',
			],
		],
		'dimensions'             => [
			'class'         => 'Dimension',
			'prefix'        => 'dim_',
			'properties'    => [
				'id',
				'user_id',
				'title',
				'description',
				'ent_id',
				'update_dt',
				'creation_dt',
			],
			'api_settable'  => [
				'title',
				'description',
			],
			'relationships' => [
				'sections' => [
					'_meta' => [
						'_table' => 'dimension_section_map',
					],
				],
				'pages'    => [
					'_meta' => [
						'_table' => 'page_collection_map',
					],
				],
			],
		],
		'pages'                  => [
			'class'         => 'Page',
			'prefix'        => 'page',
			'properties'    => [
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
			'api_settable'  => [
				'title',
				'subtitle',
				'description',
			],
			'relationships' => [
				'users',
				'dimensions' => [
					'_meta' => [
						'_table' => 'page_dimension_map',
					],
				],
				'concepts'   => [
					'_meta' => [
						'_table' => 'concept_page_map',
					],
				],
				'universes'  => [
					'_meta' => [
						'_table' => 'universe_page_map',
					],
				],
			],
		],

		'page_dimension_map'     => [
			'class'        => "Map\\PageDimensionMap",
			'map_type'     => 'Page|Dimension',
			'prefix'       => 'pdm_',
			'api_settable' => [
				'page_id',
				'dimension_id',
				'position',
				'dimension_role',
			],
			'properties'   => [
				'id',
				'page_id',
				'dimension_id',
				'position',
				'update_dt',
				'creation_dt',
				'dimension_role',
			],
			'mapped'       => [
				'pages',
				'dimensions',
			],
		],
		'concept_page_map'       => [
			'class'        => "Map\\ConceptPageMap",
			'map_type'     => 'Concept|Page',
			'prefix'       => 'cpm_',
			'api_settable' => [
				'page_id',
				'concept_id',
				'position',
				'universe_id',
				'relationship_type',
				'description',
				'creation_dt',
			],
			'properties'   => [
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
			'mapped'       => [
				'concepts',
				'pages',
			],
		],
		'sections'               => [
			'class'         => 'Section',
			'prefix'        => 'sec_',
			'properties'    => [
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
			'api_settable'  => [
				'title',
				'subtitle',
				'content',
				'section_type',
				'has_title',
				'content_location',
				'words',
			],
			'relationships' => [
				'sections'     => [
					'_meta' => [
						'_key'   => 'secondary_section_id',
						'_table' => 'section_section_map',
						'_ids'   => ['primary_section_id', 'secondary_section_id'],
					],
				],
				'pages',
				'collections'  => [
					'_meta' => [
						'_key'   => 'collection_id',
						'_table' => 'collection_section_map',
						'_ids'   => ['section_id', 'collection_id'],
					],
				],
				'dictionaries' => [
					'_meta' => [
						'_key'   => 'dictionary_id',
						'_table' => 'dictionary_section_map',
						'_ids'   => ['section_id', 'dictionary_id'],
					],
				],
				'dimensions'   => [
					'_meta' => [
						'_key'   => 'dimension_id',
						'_table' => 'dimension_section_map',
						'_ids'   => ['section_id', 'dimension_id'],
					],
				],
				'words',
				'users',
				'concepts',
				'tags',
				'flairs',

			],
		],
		'section_user_map'       => [
			'class'        => "Map\\SectionUserMap",
			'existent'     => false,
			'alias_for'    => 'sections',
			'map_type'     => 'Section|User',
			'prefix'       => null,
			'ids'          => ['id', 'user_id'],
			'properties'   => [
				'id',
				'user_id'
			],
			'mapped'       => [
				'sections',
				'users'
			],
			'api_settable' => [],
		],
		'user_section_map'       => [
			'class'        => "Map\\SectionUserMap",
			'existent'     => false,
			'alias_for'    => 'sections',
			'map_type'     => 'Section|User',
			'prefix'       => null,
			'ids'          => ['id', 'user_id'],
			'properties'   => [
				'id',
				'user_id'
			],
			'mapped'       => [
				'sections',
				'users'
			],
			'api_settable' => [],
		],
		'section_section_map'    => [
			'class'        => "Map\\SectionSectionMap",
			'map_type'     => 'Section|Section',
			'prefix'       => 'ssm_',
			'properties'   => [
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
			'mapped'       => [
				'sections',
			],
			'api_settable' => [
				'secondary_section_id',
				'relationship_type',
				'relationship_subtype',
				'primary_section_id',
				'position',
			],
		],
		'section_concept_map'    => [
			'class'        => "Map\\SectionConceptMap",
			'map_type'     => 'Section|Concept',
			'prefix'       => 'scpm',
			'properties'   => [
				'id',
				'section_id',
				'concept_id',
				'update_dt',
				'position',
				'universe_id',
				'creation_dt'
			],
			'mapped'       => [
				'sections',
				'concepts'
			],
			'api_settable' => [
				'section_id',
				'concept_id',
				'position',
				'universe_id',
			],
		],
		'section_types'          => [
			'readonly'   => true,
			'class'      => "Type\\SectionType",
			'prefix'     => 'st__',
			'properties' => [
				'id',
				'name',
				'description',
				'update_dt',
				'creation_dt',
			],
			'values'     => [
				1 => 'standard',
				2 => 'image',
				3 => 'video',
				4 => 'audio',
				5 => 'definition',
				6 => 'table',
				7 => 'list',
				8 => 'mirror',
			],
		],
		'section_word_map'       => [
			'class'      => "Map\\SectionWordMap",
			'map_type'   => 'Section|Word',
			'prefix'     => 'swm_',
			'properties' => [
				'id',
				'section_id',
				'word_id',
				'update_dt',
				'creation_dt'
				//'universe_id'
			],
			'mapped'     => [
				'sections',
				'words',
			],
		],
		'tags'                   => [
			'class'         => 'Tag',
			'prefix'        => 'tag_',
			'properties'    => [
				'name',
				'alias',
				'ent_id',
				'description',
				'user_id',
				'page_id',
				'update_dt',
				'creation_dt',
			],
			'relationships' => [],
		],
		'universes'              => [
			'class'         => 'Universe',
			'prefix'        => 'uni_',
			'properties'    => [
				'id',
				'title',
				'alias',
				'subtitle',
				'directory',
				'description',
				'ent_id',
				'user_id',
				'update_dt',
				'creation_dt',
			],
			'relationships' => [
				'pages',
				'users',
				'concepts',
			],
		],
		'users'                  => [
			'class'         => 'User',
			'prefix'        => 'usr_',
			'properties'    => [
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
			'relationships' => [
				'sections',
				'groups'         => [
					'_meta' => [
						'_table' => 'user_group_map',
					],
				],
				'group_settings' => [
					'_meta' => [
						'_table' => 'user_group_setting_map',
					],
				],
				'settings'       => [
					'_meta' => [
						'_table' => 'user_setting_map',
					],
				],
				'users'          => [
					'_meta' => [
						'_table' => 'user_user_map',
						'_ids'   => ['primary_user_id', 'secondary_user_id'],
					],
				],
			],
		],
		'words'                  => [
			'class'         => 'Word',
			'prefix'        => 'word',
			'properties'    => [
				'id',
				'title',
				'subtitle',
				'update_dt',
				'section_id',
				'creation_dt',
				'description',
			],
			'relationships' => [],
		],
	],
];