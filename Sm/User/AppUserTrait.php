<?php
/**
 * User: Sam Washington
 * Date: 12/19/16
 * Time: 1:22 PM
 */

namespace Sm\User;


trait AppUserTrait {
    /**
     * @link http://stackoverflow.com/a/19189952
     * @return string
     */
    public function getIp() : string {
        return getenv('HTTP_CLIENT_IP') ?:
            getenv('HTTP_X_FORWARDED_FOR') ?:
                getenv('HTTP_X_FORWARDED') ?:
                    getenv('HTTP_FORWARDED_FOR') ?:
                        getenv('HTTP_FORWARDED') ?:
                            getenv('REMOTE_ADDR');
    }
    
}