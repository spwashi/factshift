//noinspection BadExpressionStatementJS

if (typeof FACTSHIFT_JS_URL === "undefined")var FACTSHIFT_JS_URL = "/resource/js/";
var ALPHA_URL = FACTSHIFT_JS_URL + "alpha/";
require.config(
    {
        paths: {
            jquery:      [
                // "https://code.jquery.com/jquery-2.2.4",
                FACTSHIFT_JS_URL + "vendor/jquery.min"
            ],
            Promise:     FACTSHIFT_JS_URL + "vendor/Promise",
            backbone:    FACTSHIFT_JS_URL + "vendor/backbone",
            Cocktail:    FACTSHIFT_JS_URL + "vendor/Cocktail",
            underscore:  FACTSHIFT_JS_URL + "vendor/underscore",
            crossvent:   FACTSHIFT_JS_URL + "vendor/crossvent",
            inflection:  FACTSHIFT_JS_URL + "vendor/underscore.inflection",
            tooltipster: FACTSHIFT_JS_URL + "vendor/jquery.tooltipster.min",
            select2:     FACTSHIFT_JS_URL + "vendor/select2",

            SmHighlight: FACTSHIFT_JS_URL + "legacy/sm_highlight",

            Class:   ALPHA_URL + "Sm/Abstraction/Class",
            Emitter: ALPHA_URL + "Sm/Abstraction/Emitter",
            Sm:      ALPHA_URL + "Sm",

            /////////////////
            "Sm-init":                ALPHA_URL + "Sm/init",
            "Sm-Core-Core":           ALPHA_URL + "Sm/Core/Core",
            "Sm-Core-Identifier":     ALPHA_URL + "Sm/Core/Identifier",
            "Sm-Core-ReferencePoint": ALPHA_URL + "Sm/Core/ReferencePoint",
            "Sm-Core-Meta":           ALPHA_URL + "Sm/Core/Meta",
            "Sm-Core-SmEntity":       ALPHA_URL + "Sm/Core/SmEntity",
            "Sm-Core-Util":           ALPHA_URL + "Sm/Core/Util",
            "Sm-Core-Wrapper":        ALPHA_URL + "Sm/Core/Wrapper",
            "Sm-urls-api":            ALPHA_URL + "Sm/urls/api",
            "Sm-urls-main":           ALPHA_URL + "Sm/urls/main",

            "Sm-Abstraction-Entity":                      ALPHA_URL + "Sm/Abstraction/Entity",
            "Sm-Abstraction-Emitter":                     ALPHA_URL + "Sm/Abstraction/Emitter",
            "Sm-Abstraction-Garage":                      ALPHA_URL + "Sm/Abstraction/Garage",
            "Sm-Abstraction-MapEntity":                   ALPHA_URL + "Sm/Abstraction/MapEntity",
            "Sm-Abstraction-Model":                       ALPHA_URL + "Sm/Abstraction/Model",
            "Sm-Abstraction-Relationship":                ALPHA_URL + "Sm/Abstraction/Relationship",
            "Sm-Abstraction-RelationshipIndex":           ALPHA_URL + "Sm/Abstraction/RelationshipIndex",
            "Sm-Abstraction-RelationshipIndex-_template": ALPHA_URL + "Sm/Abstraction/templates/relationshipindex_template",
            "Sm-Abstraction-Relationship-_template":      ALPHA_URL + "Sm/Abstraction/templates/relationship_template",
            "Sm-Abstraction-templates-_template":         ALPHA_URL + "Sm/Abstraction/templates/_template",

            "Sm-Abstraction-Editable":    ALPHA_URL + "Sm/Abstraction/Editable",
            "Sm-Abstraction-Stateful":    ALPHA_URL + "Sm/Abstraction/Stateful",
            "Sm-Abstraction-Selector":    ALPHA_URL + "Sm/Abstraction/Selector",
            "Sm-Abstraction-Permittable": ALPHA_URL + "Sm/Abstraction/Permittable",

            "Sm-Abstraction-Views-View":                  ALPHA_URL + "Sm/Abstraction/Views/View",
            "Sm-Abstraction-Views-EntityView":            ALPHA_URL + "Sm/Abstraction/Views/EntityView",
            "Sm-Abstraction-Views-RelationshipIndexView": ALPHA_URL + "Sm/Abstraction/Views/RelationshipIndexView",
            "Sm-Abstraction-Views-RelationshipView":      ALPHA_URL + "Sm/Abstraction/Views/RelationshipView",

            "Sm-Abstraction-Prompt-Prompt":                ALPHA_URL + "Sm/Abstraction/Prompt/Prompt",
            "Sm-Abstraction-Prompt-EditPrompt":            ALPHA_URL + "Sm/Abstraction/Prompt/EditPrompt",
            "Sm-Abstraction-Prompt-ModifyPrompt":          ALPHA_URL + "Sm/Abstraction/Prompt/ModifyPrompt",
            "Sm-Abstraction-Prompt-CreatePrompt":          ALPHA_URL + "Sm/Abstraction/Prompt/CreatePrompt",
            "Sm-Abstraction-Prompt-DestroyPrompt":         ALPHA_URL + "Sm/Abstraction/Prompt/DestroyPrompt",
            "Sm-Abstraction-Prompt-EditEntityPrompt":      ALPHA_URL + "Sm/Abstraction/Prompt/EditEntityPrompt",
            "Sm-Abstraction-Prompt-AddRelationshipPrompt": ALPHA_URL + "Sm/Abstraction/Prompt/AddRelationshipPrompt",

            "Sm-Abstraction-Action":               ALPHA_URL + "Sm/Abstraction/Action/Action",
            "Sm-Abstraction-Action-ReplaceAction": ALPHA_URL + "Sm/Abstraction/Action/ReplaceAction",

            "Sm-Abstraction-Modal-Modal": ALPHA_URL + "Sm/Abstraction/Modal/Modal",

            "Sm-Entities-Section-View":                ALPHA_URL + "Sm/Entities/Section/View",
            "Sm-Entities-Section-Meta":                ALPHA_URL + "Sm/Entities/Section/Meta",
            "Sm-Entities-Section-Wrapper":             ALPHA_URL + "Sm/Entities/Section/Wrapper",
            "Sm-Entities-Section-SectionEntity":       ALPHA_URL + "Sm/Entities/Section/SectionEntity",
            "Sm-Entities-Section-templates-_template": ALPHA_URL + "Sm/Entities/Section/templates/_template",

            "Sm-Entities-Page-View":       ALPHA_URL + "Sm/Entities/Page/View",
            "Sm-Entities-Page-PageEntity": ALPHA_URL + "Sm/Entities/Page/PageEntity",

            "Sm-Entities-Placeholder-View":                ALPHA_URL + "Sm/Entities/Placeholder/View",
            "Sm-Entities-Placeholder-templates-_template": ALPHA_URL + "Sm/Entities/Placeholder/templates/_template",
            "Sm-Entities-Placeholder-PlaceholderEntity":   ALPHA_URL + "Sm/Entities/Placeholder/PlaceholderEntity",

            "Sm-Entities-Dimension-View":            ALPHA_URL + "Sm/Entities/Dimension/View",
            "Sm-Entities-Dimension-DimensionEntity": ALPHA_URL + "Sm/Entities/Dimension/DimensionEntity"
            /////////////////
        }
    });