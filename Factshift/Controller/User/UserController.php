<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 6:29 PM
 */
namespace Factshift\Controller\User;

use Exception;
use Factshift\Controller\Abstraction\Controller;
use Factshift\Core\Factshift;
use Factshift\Entity\Model\UserModel;
use Factshift\Entity\Validation\UserValidator;
use Factshift\User\AppUser;
use Sm\Action\Abstraction\Action;
use Sm\Action\Exception\ActionException;
use Sm\Development\Log;
use Sm\Response\Http;
use Sm\Response\ResponseMessage;
use Sm\Security\XSS;
use Sm\View\View;

class UserController extends Controller {
    /** @var  View */
    public $view;
    
    public function home() {
        return $this->view->insertContentCreate('user/home.php')->setTitle('User Home');
    }
    
    public function dump() {
        ob_start();
        var_dump(Factshift::_()->IoC->session->getUser());
        $ret = ob_get_clean();
        return View::init($ret);
    }
    
    public function signup() {
        $error_messages = [ ];
        if (!empty($_POST)) {
            #---------------------------------------------
            $User = new AppUser;
            /** @var Action $Action */
            $Action = $User->initCreateActionAsVictim(null, $_POST);
            try {
                $Response = $Action->execute();
                if ($Response->getStatus()) {
                    $User->login();
                    Http::redirect(Factshift::_()->IoC->router->generate_url('user_home'));
                }
            } catch (ActionException $e) {
                $error_messages = $e->getResponse()->getErrors();
            } catch (\Exception $e) {
                Log::init($e)->log_it();
            }
        }
        /** @var View $content */
        $content = View::create('user/signup.php', [ 'post_data' => XSS::escape($_POST) ]);
        if (!empty($error_messages)) $content->addMessages($error_messages);
        return $this->view->insertContent($content)->setTitle('Sign Up');
    }
    
    public function login() {
        $content = View::create('user/login.php', [ 'post_data' => XSS::escape($_POST) ]);
        if (!empty($_POST)) {
            $alias     = $_POST['alias'] ?? null;
            $password  = $_POST['password'] ?? null;
            $Validator = UserValidator::init();
            try {
                $FailMessage = ResponseMessage::init(null, 'Username, Email, or Password not valid.');
                
                # If the password isn't valid anyway, don't even look for it
                if ($Validator->validate_password($password) !== true) throw new ActionException($FailMessage);
                
                # If the index that they've supplied is a valid email, search for email. Otherwise, search for an alias
                $index      =
                    filter_var($alias, FILTER_VALIDATE_EMAIL)
                        ? 'email'
                        : 'alias';
                $user_model = UserModel::find([ $index => $alias ]);
                if (!AppUser::passwords_are_equal($password, $user_model->password)) throw new ActionException($FailMessage);
                
                AppUser::initFromModel($user_model)->login();
                Http::redirect(Factshift::_()->IoC->router->generate_url('home'));
            } catch (ActionException $e) {
                $content->addMessages($e->getResponse()->getMessage());
            } catch (Exception $e) {
                Log::init($e)->log_it();
            }
        }
        return $this->view->insertContent($content)->setTitle('Login');
    }
    
    public function logout() {
        Factshift::_()->IoC->session->getUser()->logout();
        Http::redirect(Factshift::_()->IoC->router->generate_url('home'));
    }
    
}