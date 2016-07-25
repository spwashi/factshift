//noinspection BadExpressionStatementJS

var BASE_URL = "/resource/js/";
var CHI_URL  = BASE_URL + "chi/";
require.config({
	paths: {
		jquery:      BASE_URL + "vendor/jquery.min",
		Promise:     BASE_URL + "std/Promise",
		backbone:    BASE_URL + "vendor/backbone",
		Cocktail:    BASE_URL + "vendor/Cocktail",
		underscore:  BASE_URL + "vendor/underscore",
		crossvent:   BASE_URL + "vendor/crossvent",
		inflection:  BASE_URL + "vendor/underscore.inflection",
		tooltipster: BASE_URL + "vendor/jquery.tooltipster.min",
		select2:     BASE_URL + "vendor/select2",

		SmHighlight: BASE_URL + "std/sm_highlight",

		Class:   CHI_URL + "abstraction/Class",
		Emitter: CHI_URL + "abstraction/Emitter",
		Sm:      CHI_URL + "Sm",

		/////////////////
		"Sm-Core-View":                     CHI_URL + "Sm/Core/View",
		"Sm-Core-Core":                     CHI_URL + "Sm/Core/Core",
		"Sm-Core-Identifier":               CHI_URL + "Sm/Core/Identifier",
		"Sm-Core-Meta":                     CHI_URL + "Sm/Core/Meta",
		"Sm-Core-MvCombo":                  CHI_URL + "Sm/Core/MvCombo",
		"Sm-Core-MvWrapper":                CHI_URL + "Sm/Core/MvWrapper",
		"Sm-Core-Relationship":             CHI_URL + "Sm/Core/Relationship",
		"Sm-Core-RelationshipIndex":        CHI_URL + "Sm/Core/RelationshipIndex",
		"Sm-Core-SmModel":                  CHI_URL + "Sm/Core/SmModel",
		"Sm-Core-SmView":                   CHI_URL + "Sm/Core/SmView",
		"Sm-Core-util":                     CHI_URL + "Sm/Core/util",
		"Sm-Entities-Abstraction-SmEntity": CHI_URL + "Sm/Entities/Abstraction/SmEntity",

		/////////////////
		"Sm-Entities-Abstraction-Modal-ModalEdit":       CHI_URL + "Sm/Entities/Abstraction/Modal/ModalEdit",
		"Sm-Entities-Abstraction-Modal-AddRelationship": CHI_URL + "Sm/Entities/Abstraction/Modal/AddRelationship",
		"Sm-Entities-Abstraction-Modal-ModalDestroy":    CHI_URL + "Sm/Entities/Abstraction/Modal/ModalDestroy",
		"Sm-Entities-Abstraction-mixins-SidebarModule":  CHI_URL + "Sm/Entities/Abstraction/SidebarModule",
		"Sm-Entities-Abstraction-templates-_template":   CHI_URL + "Sm/Entities/Abstraction/templates/_template",
		"Sm-Entities-Abstraction-Garage":                CHI_URL + "Sm/Entities/Abstraction/Garage",

		"Sm-Entities-Page-Garage":                                               CHI_URL + "Sm/Entities/Page/Garage",
		"Sm-Entities-Page-Meta":                                                 CHI_URL + "Sm/Entities/Page/Meta",
		"Sm-Entities-Page-View":                                                 CHI_URL + "Sm/Entities/Page/View",
		"Sm-Entities-Page-templates-_template":                                  CHI_URL + "Sm/Entities/Page/templates/_template",
		"Sm-Entities-Page-templates-standard":                                   CHI_URL + "Sm/Entities/Page/templates/standard",
//
		"Sm-Entities-Collection-Meta":                                           CHI_URL + "Sm/Entities/Collection/Meta",
		"Sm-Entities-Collection-View":                                           CHI_URL + "Sm/Entities/Collection/View",
		"Sm-Entities-Collection-templates-_template":                            CHI_URL + "Sm/Entities/Collection/templates/_template",
		"Sm-Entities-Collection-templates-standard":                             CHI_URL + "Sm/Entities/Collection/templates/standard",
//
		"Sm-Entities-Dictionary-Garage":                                         CHI_URL + "Sm/Entities/Dictionary/Garage",
		"Sm-Entities-Dictionary-Meta":                                           CHI_URL + "Sm/Entities/Dictionary/Meta",
		"Sm-Entities-Dictionary-MvCombo":                                        CHI_URL + "Sm/Entities/Dictionary/MvCombo",
		"Sm-Entities-Dictionary-View":                                           CHI_URL + "Sm/Entities/Dictionary/View",
		"Sm-Entities-Dictionary-Wrapper":                                        CHI_URL + "Sm/Entities/Dictionary/Wrapper",
		"Sm-Entities-Dictionary-templates-_template":                            CHI_URL + "Sm/Entities/Dictionary/templates/_template",
		"Sm-Entities-Dictionary-templates-standard":                             CHI_URL + "Sm/Entities/Dictionary/templates/standard",
//
		"Sm-Entities-Dimension-Meta":                                            CHI_URL + "Sm/Entities/Dimension/Meta",
		"Sm-Entities-Dimension-View":                                            CHI_URL + "Sm/Entities/Dimension/View",
		"Sm-Entities-Dimension-Wrapper":                                         CHI_URL + "Sm/Entities/Dimension/Wrapper",
		"Sm-Entities-Dimension-templates-_template":                             CHI_URL + "Sm/Entities/Dimension/templates/_template",
		"Sm-Entities-Dimension-templates-standard":                              CHI_URL + "Sm/Entities/Dimension/templates/standard",
//
		"Sm-Entities-Section-Garage":                                            CHI_URL + "Sm/Entities/Section/Garage",
		"Sm-Entities-Section-Meta":                                              CHI_URL + "Sm/Entities/Section/Meta",
		"Sm-Entities-Section-Model":                                             CHI_URL + "Sm/Entities/Section/Model",
		"Sm-Entities-Section-MvCombo":                                           CHI_URL + "Sm/Entities/Section/MvCombo",
		"Sm-Entities-Section-View":                                              CHI_URL + "Sm/Entities/Section/View",
		"Sm-Entities-Section-Wrapper":                                           CHI_URL + "Sm/Entities/Section/Wrapper",
		"Sm-Entities-Section-templates-_template":                               CHI_URL + "Sm/Entities/Section/templates/_template",
		"Sm-Entities-Section-templates-standard":                                CHI_URL + "Sm/Entities/Section/templates/standard",
		"Sm-Entities-Section-templates-definition":                              CHI_URL + "Sm/Entities/Section/templates/definition",
		"Sm-Entities-Section-templates-image":                                   CHI_URL + "Sm/Entities/Section/templates/image",
		"Sm-Entities-Section-Abstraction-Relationship-pivots_RelationshipIndex": CHI_URL + "Sm/Entities/Section/Abstraction/Relationship/pivots_RelationshipIndex",
		"Sm-Entities-Section-Abstraction-Modal-ModalEdit":                       CHI_URL + "Sm/Entities/Section/Abstraction/Modal/ModalEdit",
//
		"Sm-Entities-Concept-Meta":                                              CHI_URL + "Sm/Entities/Concept/Meta",
		"Sm-Entities-Concept-View":                                              CHI_URL + "Sm/Entities/Concept/View",
		"Sm-Entities-Concept-Wrapper":                                           CHI_URL + "Sm/Entities/Concept/Wrapper",
		"Sm-Entities-Concept-templates-_template":                               CHI_URL + "Sm/Entities/Concept/templates/_template",
		"Sm-Entities-Concept-templates-standard":                                CHI_URL + "Sm/Entities/Concept/templates/standard"
	}
});