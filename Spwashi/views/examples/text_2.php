<?php
use Sm\Core\App;
use Sm\Model\ModelMeta;
$r   = require(App::_()->path . '/drivers/_models.php');
+Kint::dump(ModelMeta::_register($r));
Kint::dump(ModelMeta::dump());