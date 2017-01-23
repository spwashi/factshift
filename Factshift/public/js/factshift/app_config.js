/**
 * Created by Sam Washington on 1/22/17.
 */
/**
 * Created by Sam Washington on 1/22/17.
 */
if (typeof APP_JS_URL === "undefined")var APP_JS_URL = "/resource/js/";
var FACTSHIFT_APP_URL = APP_JS_URL + "factshift/";
require.config(
    {
        paths: {
            "Sm-Entities-Section-View":                FACTSHIFT_APP_URL + "Entities/Section/View",
            "Sm-Entities-Section-Meta":                FACTSHIFT_APP_URL + "Entities/Section/Meta",
            "Sm-Entities-Section-Wrapper":             FACTSHIFT_APP_URL + "Entities/Section/Wrapper",
            "Sm-Entities-Section-SectionEntity":       FACTSHIFT_APP_URL + "Entities/Section/SectionEntity",
            "Sm-Entities-Section-templates-_template": FACTSHIFT_APP_URL + "Entities/Section/templates/_template",

            "Sm-Entities-Page-View":       FACTSHIFT_APP_URL + "Entities/Page/View",
            "Sm-Entities-Page-PageEntity": FACTSHIFT_APP_URL + "Entities/Page/PageEntity",

            "Sm-Entities-Dimension-View":            FACTSHIFT_APP_URL + "Entities/Dimension/View",
            "Sm-Entities-Dimension-DimensionEntity": FACTSHIFT_APP_URL + "Entities/Dimension/DimensionEntity"
        }
    }
);