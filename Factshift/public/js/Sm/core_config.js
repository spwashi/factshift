/**
 * Created by Sam Washington on 1/22/17.
 */
if (typeof APP_JS_URL === "undefined")var APP_JS_URL = "/resource/js/";
var SM_URL = APP_JS_URL + "Sm/";
require.config(
    {
        paths: {
            jquery:      [
                // "https://code.jquery.com/jquery-2.2.4",
                APP_JS_URL + "vendor/jquery.min"
            ],
            Promise:     APP_JS_URL + "vendor/Promise",
            backbone:    APP_JS_URL + "vendor/backbone",
            Cocktail:    APP_JS_URL + "vendor/Cocktail",
            underscore:  APP_JS_URL + "vendor/underscore",
            crossvent:   APP_JS_URL + "vendor/crossvent",
            inflection:  APP_JS_URL + "vendor/underscore.inflection",
            tooltipster: APP_JS_URL + "vendor/jquery.tooltipster.min",
            select2:     APP_JS_URL + "vendor/select2",

            SmHighlight: APP_JS_URL + "legacy/sm_highlight",

            Class:   SM_URL + "Abstraction/Class",
            Emitter: SM_URL + "Abstraction/Emitter",
            Sm:      SM_URL + "Sm",

            /////////////////
            "Sm-init":                SM_URL + "init",
            "Sm-Core-Core":           SM_URL + "Core/Core",
            "Sm-Core-Identifier":     SM_URL + "Core/Identifier",
            "Sm-Core-ReferencePoint": SM_URL + "Core/ReferencePoint",
            "Sm-Core-Meta":           SM_URL + "Core/Meta",
            "Sm-Core-SmEntity":       SM_URL + "Core/SmEntity",
            "Sm-Core-Util":           SM_URL + "Core/Util",
            "Sm-Core-Wrapper":        SM_URL + "Core/Wrapper",
            "Sm-urls-api":            SM_URL + "urls/api",
            "Sm-urls-main":           SM_URL + "urls/main",

            "Sm-Abstraction-Entity":                      SM_URL + "Abstraction/Entity",
            "Sm-Abstraction-Emitter":                     SM_URL + "Abstraction/Emitter",
            "Sm-Abstraction-Garage":                      SM_URL + "Abstraction/Garage",
            "Sm-Abstraction-MapEntity":                   SM_URL + "Abstraction/MapEntity",
            "Sm-Abstraction-Model":                       SM_URL + "Abstraction/Model",
            "Sm-Abstraction-Relationship":                SM_URL + "Abstraction/Relationship",
            "Sm-Abstraction-RelationshipIndex":           SM_URL + "Abstraction/RelationshipIndex",
            "Sm-Abstraction-RelationshipIndex-_template": SM_URL + "Abstraction/templates/relationshipindex_template",
            "Sm-Abstraction-Relationship-_template":      SM_URL + "Abstraction/templates/relationship_template",
            "Sm-Abstraction-templates-_template":         SM_URL + "Abstraction/templates/_template",

            "Sm-Abstraction-Editable":    SM_URL + "Abstraction/Editable",
            "Sm-Abstraction-Stateful":    SM_URL + "Abstraction/Stateful",
            "Sm-Abstraction-Selector":    SM_URL + "Abstraction/Selector",
            "Sm-Abstraction-Permittable": SM_URL + "Abstraction/Permittable",

            "Sm-Abstraction-Views-View":                  SM_URL + "Abstraction/Views/View",
            "Sm-Abstraction-Views-EntityView":            SM_URL + "Abstraction/Views/EntityView",
            "Sm-Abstraction-Views-RelationshipIndexView": SM_URL + "Abstraction/Views/RelationshipIndexView",
            "Sm-Abstraction-Views-RelationshipView":      SM_URL + "Abstraction/Views/RelationshipView",

            "Sm-Abstraction-Prompt-Prompt":                SM_URL + "Abstraction/Prompt/Prompt",
            "Sm-Abstraction-Prompt-EditPrompt":            SM_URL + "Abstraction/Prompt/EditPrompt",
            "Sm-Abstraction-Prompt-ModifyPrompt":          SM_URL + "Abstraction/Prompt/ModifyPrompt",
            "Sm-Abstraction-Prompt-CreatePrompt":          SM_URL + "Abstraction/Prompt/CreatePrompt",
            "Sm-Abstraction-Prompt-DestroyPrompt":         SM_URL + "Abstraction/Prompt/DestroyPrompt",
            "Sm-Abstraction-Prompt-EditEntityPrompt":      SM_URL + "Abstraction/Prompt/EditEntityPrompt",
            "Sm-Abstraction-Prompt-AddRelationshipPrompt": SM_URL + "Abstraction/Prompt/AddRelationshipPrompt",

            "Sm-Abstraction-Action":               SM_URL + "Abstraction/Action/Action",
            "Sm-Abstraction-Action-ReplaceAction": SM_URL + "Abstraction/Action/ReplaceAction",

            "Sm-Abstraction-Modal-Modal": SM_URL + "Abstraction/Modal/Modal",

            "Sm-Entities-Placeholder-View":                SM_URL + "Entities/Placeholder/View",
            "Sm-Entities-Placeholder-templates-_template": SM_URL + "Entities/Placeholder/templates/_template",
            "Sm-Entities-Placeholder-PlaceholderEntity":   SM_URL + "Entities/Placeholder/PlaceholderEntity"
        }
    }
);