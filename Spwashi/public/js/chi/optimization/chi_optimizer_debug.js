//noinspection BadExpressionStatementJS
({
	baseUrl:        '../',
	out:            'o_chi_d.js',
	include:        [
		'jquery',
		'Promise',
		'backbone',
		'Sm',
		'Sm-Core-Core',
		'crossvent',
		'tooltipster',
		'select2',
		'inflection',
		'Sm/Entities/Abstraction/Garage',
		'require_config',
//----------------------------------------------
		'Sm/Extras/DraggableMixin',
		'Sm/Extras/Modal',
		'Sm/Extras/ViewAid',
		'SmHighlight'
//----------------------------------------------
	],
	excludeShallow: [
		'Sm-Core-SmView',
		//"Sm-Entities-Abstraction-Garage",
		"Sm-Entities-Abstraction-SmEntity",
		"Sm-Entities-Abstraction-Modal-ModalEdit",
		"Sm-Entities-Abstraction-Modal-AddRelationship",
		"Sm-Entities-Abstraction-templates-_template",

		"Sm-Entities-Section-Abstraction-Modal-ModalEdit",
		"Sm-Entities-Section-Abstraction-ModalDestroy",
		'Sm-Entities-Abstraction-mixins-SidebarModule',

		"Sm-Entities-Page-Garage",
		"Sm-Entities-Page-Meta",
		"Sm-Entities-Page-View",
		"Sm-Entities-Page-templates-_template",
		"Sm-Entities-Page-templates-standard",
//,
		"Sm-Entities-Collection-Meta",
		"Sm-Entities-Collection-View",
		"Sm-Entities-Collection-templates-_template",
		"Sm-Entities-Collection-templates-standard",
//,
		"Sm-Entities-Dictionary-Garage",
		"Sm-Entities-Dictionary-Meta",
		"Sm-Entities-Dictionary-MvCombo",
		"Sm-Entities-Dictionary-View",
		"Sm-Entities-Dictionary-Wrapper",
		"Sm-Entities-Dictionary-templates-_template",
		"Sm-Entities-Dictionary-templates-standard",
//,
		"Sm-Entities-Dimension-Meta",
		"Sm-Entities-Dimension-View",
		"Sm-Entities-Dimension-Wrapper",
		"Sm-Entities-Dimension-templates-_template",
		"Sm-Entities-Dimension-templates-standard",
//,
		"Sm-Entities-Section-Garage",
		"Sm-Entities-Section-Meta",
		"Sm-Entities-Section-Model",
		"Sm-Entities-Section-MvCombo",
		"Sm-Entities-Section-View",
		"Sm-Entities-Section-Wrapper",
		"Sm-Entities-Section-templates-_template",
		"Sm-Entities-Section-templates-standard",
		"Sm-Entities-Section-templates-definition",
		"Sm-Entities-Section-templates-image",
		"Sm-Entities-Section-Abstraction-Relationship-pivots_RelationshipIndex",
		"Sm-Entities-Section-Abstraction-Modal-ModalEdit",
//,
		"Sm-Entities-Concept-Meta",
		"Sm-Entities-Concept-View",
		"Sm-Entities-Concept-Wrapper",
		"Sm-Entities-Concept-templates-_template",
		"Sm-Entities-Concept-templates-standard"
	],
	paths:          {
		jquery:      '../vendor/jquery.min',
		tooltipster: '../vendor/jquery.tooltipster.min',
		select2:     '../vendor/select2',
		Promise:     '../std/Promise',
		SmHighlight: '../std/sm_highlight',
		backbone:    '../vendor/backbone',
		Cocktail:    '../vendor/Cocktail',
		underscore:  '../vendor/underscore',
		crossvent:   '../vendor/crossvent',
		inflection:  '../vendor/underscore.inflection',
		Emitter:     'abstraction/Emitter',
		Class:       'abstraction/Class',
		Sm:          'Sm',

		"Sm-Core-View":              "Sm/Core/View",
		"Sm-Core-Core":              "Sm/Core/Core",
		"Sm-Core-Identifier":        "Sm/Core/Identifier",
		"Sm-Core-Meta":              "Sm/Core/Meta",
		"Sm-Core-MvCombo":           "Sm/Core/MvCombo",
		"Sm-Core-MvWrapper":         "Sm/Core/MvWrapper",
		"Sm-Core-Relationship":      "Sm/Core/Relationship",
		"Sm-Core-RelationshipIndex": "Sm/Core/RelationshipIndex",
		"Sm-Core-SmModel":           "Sm/Core/SmModel",
		"Sm-Core-SmView":            "Sm/Core/SmView",
		"Sm-Core-util":              "Sm/Core/util",

		"Sm-Entities-Abstraction-SmEntity":              "Sm/Entities/Abstraction/SmEntity",
		"Sm-Entities-Abstraction-templates-_template":   "Sm/Entities/Abstraction/templates/_template",
		"Sm-Entities-Abstraction-Garage":                "Sm/Entities/Abstraction/Garage",
		"Sm-Entities-Abstraction-Modal-ModalEdit":       "Sm/Entities/Abstraction/Modal/ModalEdit",
		"Sm-Entities-Abstraction-Modal-ModalDestroy":    "Sm/Entities/Abstraction/Modal/ModalDestroy",
		"Sm-Entities-Abstraction-Modal-AddRelationship": "Sm/Entities/Abstraction/Modal/AddRelationship",

		"Sm-Entities-Page-Garage":                                               "Sm/Entities/Page/Garage",
		"Sm-Entities-Page-Meta":                                                 "Sm/Entities/Page/Meta",
		"Sm-Entities-Page-View":                                                 "Sm/Entities/Page/View",
		"Sm-Entities-Page-templates-_template":                                  "Sm/Entities/Page/templates/_template",
		"Sm-Entities-Page-templates-standard":                                   "Sm/Entities/Page/templates/standard",
//
		"Sm-Entities-Collection-Meta":                                           "Sm/Entities/Collection/Meta",
		"Sm-Entities-Collection-View":                                           "Sm/Entities/Collection/View",
		"Sm-Entities-Collection-templates-_template":                            "Sm/Entities/Collection/templates/_template",
		"Sm-Entities-Collection-templates-standard":                             "Sm/Entities/Collection/templates/standard",
//
		"Sm-Entities-Dictionary-Garage":                                         "Sm/Entities/Dictionary/Garage",
		"Sm-Entities-Dictionary-Meta":                                           "Sm/Entities/Dictionary/Meta",
		"Sm-Entities-Dictionary-MvCombo":                                        "Sm/Entities/Dictionary/MvCombo",
		"Sm-Entities-Dictionary-View":                                           "Sm/Entities/Dictionary/View",
		"Sm-Entities-Dictionary-Wrapper":                                        "Sm/Entities/Dictionary/Wrapper",
		"Sm-Entities-Dictionary-templates-_template":                            "Sm/Entities/Dictionary/templates/_template",
		"Sm-Entities-Dictionary-templates-standard":                             "Sm/Entities/Dictionary/templates/standard",
//
		"Sm-Entities-Dimension-Meta":                                            "Sm/Entities/Dimension/Meta",
		"Sm-Entities-Dimension-View":                                            "Sm/Entities/Dimension/View",
		"Sm-Entities-Dimension-Wrapper":                                         "Sm/Entities/Dimension/Wrapper",
		"Sm-Entities-Dimension-templates-_template":                             "Sm/Entities/Dimension/templates/_template",
		"Sm-Entities-Dimension-templates-standard":                              "Sm/Entities/Dimension/templates/standard",
//
		"Sm-Entities-Section-Garage":                                            "Sm/Entities/Section/Garage",
		"Sm-Entities-Section-Meta":                                              "Sm/Entities/Section/Meta",
		"Sm-Entities-Section-Model":                                             "Sm/Entities/Section/Model",
		"Sm-Entities-Section-MvCombo":                                           "Sm/Entities/Section/MvCombo",
		"Sm-Entities-Section-View":                                              "Sm/Entities/Section/View",
		"Sm-Entities-Section-Wrapper":                                           "Sm/Entities/Section/Wrapper",
		"Sm-Entities-Section-templates-_template":                               "Sm/Entities/Section/templates/_template",
		"Sm-Entities-Section-templates-standard":                                "Sm/Entities/Section/templates/standard",
		"Sm-Entities-Section-templates-definition":                              "Sm/Entities/Section/templates/definition",
		"Sm-Entities-Section-templates-image":                                   "Sm/Entities/Section/templates/image",
		"Sm-Entities-Section-Abstraction-Relationship-pivots_RelationshipIndex": "Sm/Entities/Section/Abstraction/Relationship/pivots_RelationshipIndex",
		"Sm-Entities-Section-Abstraction-Modal-ModalEdit":                       "Sm/Entities/Section/Abstraction/Modal/ModalEdit",
//
		"Sm-Entities-Concept-Meta":                                              "Sm/Entities/Concept/Meta",
		"Sm-Entities-Concept-View":                                              "Sm/Entities/Concept/View",
		"Sm-Entities-Concept-templates-_template":                               "Sm/Entities/Concept/templates/_template",
		"Sm-Entities-Concept-templates-standard":                                "Sm/Entities/Concept/templates/standard"

	}
});