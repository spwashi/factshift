<?php
/**
 * User: sam
 * Date: 6/4/15
 * Time: 10:41 PM
 */

namespace Factshift\Controller;

use Sm\Core\App;
use Sm\Database\Abstraction\Sql;
use Sm\Entity\Model\EntityMeta;
use Sm\Process\Process;
use Sm\View\View;

class Deploy {
    public function cl() {
        $f = fopen(BASE_PATH . 'Logs/log.txt', 'w');
        if (!$f) return false;
        fwrite($f, "cleared\n");
        fclose($f);
        return true;
    }
    
    public function m_d() {
        return EntityMeta::dump();
    }
    
    public function p() {
        $output = Process::create('deploy/print.php')->getOutput();
        /** @var $sql Sql */
        if (!App::_()->IoC->resolveSql($sql)) return [ false ];
        /** @var \Sm\Database\Connection $connection */
        $connection = App::_()->IoC->connection;
        $DBH        = $connection->getConnection();
        $connection->beginTransaction();
        $output_string = implode(";\n", str_replace(" ", '  ', $output));
        echo "<pre>{$output_string}</pre>";
        foreach ($output as $item) {
            $DBH->prepare($item)->execute();
        }
        $connection->commitTransaction();
        return View::init($output);
    }
}