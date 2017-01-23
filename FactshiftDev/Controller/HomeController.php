<?php
/**
 * User: Sam Washington
 * Date: 1/21/17
 * Time: 7:11 PM
 */

namespace FactshiftDev\Controller;


use Factshift\Core\Factshift;
use FactshiftDev\Core\FactshiftDev;
use Sm\Database\Sql;
use Sm\Process\Process;
use Sm\View\View;

class HomeController extends \Factshift\Controller\HomeController {
    public function index() {
        $View = $this->View;
        $View->setTitle('Development Access Suite')->insertContentCreate('dev/index.php');
        return $View;
    }
    public function get_log() {
        return View::init('<pre>' . file_get_contents(BASE_PATH . 'Logs/log.txt') . '</pre>');
    }
    public function cl() {
        $f = fopen(BASE_PATH . 'Logs/log.txt', 'w');
        if (!$f) return false;
        fwrite($f, "");
        fclose($f);
        return true;
    }
    private function _execute_sql_init(array  $output) {
        $result = [ ];
        /** @var $sql Sql */
        if (!FactshiftDev::_()->IoC->resolveSql($sql)) return [ false ];
        /** @var \Sm\Database\Connection $connection */
        $connection = FactshiftDev::_()->IoC->connection;
        $DBH        = $connection->getConnection();
        $connection->beginTransaction();
        $output_string = implode(";\n", str_replace(" ", '  ', $output));
        foreach ($output as $item) {
            $result[] = $DBH->prepare($item)->execute();
        }
        $connection->commitTransaction();
        return $result;
    }
    public function me_sql_d() {
        $output = Process::create('deploy/print.php')->getOutput();
        return View::init($output);
    }
    public function m_d() {
        return Factshift::_()->IoC->EntityMeta->dump();
    }
}