<?php
/**
 * Created by PhpStorm.
 * User: philipp
 * Date: 16.08.17
 * Time: 12:55
 */

$user = '{"username":"philipp@xyz.de","inactive":false,"iscomp":false,"isConfigCompleted":false}';
$registerUserQuery = 'DB.User.register(' . $user . ',"passwort",DB.User.LoginOption.NO_LOGIN);';