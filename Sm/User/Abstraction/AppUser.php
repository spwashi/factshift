<?php
/**
 * User: Sam Washington
 * Date: 12/19/16
 * Time: 12:37 PM
 */

namespace Sm\User\Abstraction;


interface AppUser {
    public function login();
    public function logout();
    
    public function getIp():string;
    public function isLoggedIn():bool;
    public function getAccessPoint():string;
    public function setAccessPoint($route_name_or_uri);
}