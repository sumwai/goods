<?php
namespace app\controller;

use app\BaseController;
use app\service\UserService;
use app\validate\UserValidate;
use think\exception\ValidateException;
use think\response\Json;

class User extends BaseController
{
    protected $userService;
    
    /**
     * 构造方法
     * @param UserService $userService
     * @param \think\App $app
     */
    public function __construct(UserService $userService, \think\App $app)
    {
        parent::__construct($app);
        $this->userService = $userService;
    }
    
    /**
     * 用户注册
     * @return Json
     */
    public function register(): Json
    {
        $data = $this->request->post();
        
        try {
            // 验证数据
            $this->validate($data, 'app\\validate\\UserValidate.register');
            
            // 注册用户
            $result = $this->userService->register($data);
            
            return json([
                'code' => 200,
                'message' => '注册成功',
                'data' => $result
            ]);
        } catch (ValidateException $e) {
            return json([
                'code' => 400,
                'message' => $e->getMessage(),
                'data' => null
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'message' => '注册失败：' . $e->getMessage(),
                'data' => null
            ]);
        }
    }
    
    /**
     * 用户登录
     * @return Json
     */
    public function login(): Json
    {
        $data = $this->request->post();
        
        try {
            // 验证数据
            $this->validate($data, 'app\\validate\\UserValidate.login');
            
            // 登录用户
            $result = $this->userService->login(
                $data['username'],
                $data['password'],
                $this->request->ip()
            );
            
            return json([
                'code' => 200,
                'message' => '登录成功',
                'data' => $result
            ]);
        } catch (ValidateException $e) {
            return json([
                'code' => 400,
                'message' => $e->getMessage(),
                'data' => null
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'message' => '登录失败：' . $e->getMessage(),
                'data' => null
            ]);
        }
    }
    
    /**
     * 获取用户信息
     * @return Json
     */
    public function info(): Json
    {
        try {
            // 获取用户ID
            $userId = $this->request->user['id'];
            
            // 获取用户信息
            $user = $this->userService->getUserInfo($userId);
            
            return json([
                'code' => 200,
                'message' => '获取成功',
                'data' => $user
            ]);
        } catch (ValidateException $e) {
            return json([
                'code' => 400,
                'message' => $e->getMessage(),
                'data' => null
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'message' => '获取失败：' . $e->getMessage(),
                'data' => null
            ]);
        }
    }
    
    /**
     * 更新用户信息
     * @return Json
     */
    public function update(): Json
    {
        $data = $this->request->put();
        
        try {
            // 验证数据
            $this->validate($data, 'app\\validate\\UserValidate.update_info');
            
            // 获取用户ID
            $userId = $this->request->user['id'];
            
            // 更新用户信息
            $user = $this->userService->updateUserInfo($userId, $data);
            
            return json([
                'code' => 200,
                'message' => '更新成功',
                'data' => $user
            ]);
        } catch (ValidateException $e) {
            return json([
                'code' => 400,
                'message' => $e->getMessage(),
                'data' => null
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'message' => '更新失败：' . $e->getMessage(),
                'data' => null
            ]);
        }
    }
    
    /**
     * 重置密码
     * @return Json
     */
    public function resetPassword(): Json
    {
        $data = $this->request->post();
        
        try {
            // 验证数据
            $this->validate($data, 'app\\validate\\UserValidate.reset_password');
            
            // 重置密码
            $this->userService->resetPassword($data['email'], $data['password']);
            
            return json([
                'code' => 200,
                'message' => '密码重置成功',
                'data' => null
            ]);
        } catch (ValidateException $e) {
            return json([
                'code' => 400,
                'message' => $e->getMessage(),
                'data' => null
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'message' => '密码重置失败：' . $e->getMessage(),
                'data' => null
            ]);
        }
    }
    
    /**
     * 修改密码
     * @return Json
     */
    public function changePassword(): Json
    {
        $data = $this->request->put();
        
        try {
            // 验证数据
            $this->validate($data, 'app\\validate\\UserValidate.change_password');
            
            // 获取用户ID
            $userId = $this->request->user['id'];
            
            // 修改密码
            $this->userService->changePassword($userId, $data['old_password'], $data['password']);
            
            return json([
                'code' => 200,
                'message' => '密码修改成功',
                'data' => null
            ]);
        } catch (ValidateException $e) {
            return json([
                'code' => 400,
                'message' => $e->getMessage(),
                'data' => null
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'message' => '密码修改失败：' . $e->getMessage(),
                'data' => null
            ]);
        }
    }
    
    /**
     * 用户退出
     * @return Json
     */
    public function logout(): Json
    {
        // JWT是无状态的，退出只需客户端删除令牌即可
        return json([
            'code' => 200,
            'message' => '退出成功',
            'data' => null
        ]);
    }
}