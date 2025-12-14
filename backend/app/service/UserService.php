<?php
namespace app\service;

use app\model\User;
use app\common\JwtUtil;
use think\exception\ValidateException;

class UserService
{
    /**
     * 用户注册
     * @param array $data 注册数据
     * @return array
     */
    public function register(array $data): array
    {
        // 创建用户
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password'],
            'nickname' => $data['nickname'] ?? null,
        ]);
        
        // 生成JWT令牌
        $token = JwtUtil::generateToken([
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
        ]);
        
        return [
            'user' => $user->hidden(['password']),
            'token' => $token,
        ];
    }
    
    /**
     * 用户登录
     * @param string $username 用户名或邮箱
     * @param string $password 密码
     * @param string $ip 登录IP
     * @return array
     */
    public function login(string $username, string $password, string $ip): array
    {
        // 查找用户（支持用户名或邮箱登录）
        $user = User::where('username', $username)->find() ?? User::where('email', $username)->find();
        
        if (!$user) {
            throw new ValidateException('用户名或密码错误');
        }
        
        // 检查用户状态
        if ($user->status != 1) {
            throw new ValidateException('用户已被禁用');
        }
        
        // 验证密码
        if (!$user->checkPassword($password)) {
            throw new ValidateException('用户名或密码错误');
        }
        
        // 更新登录时间和IP
        $user->loginSuccess($ip);
        
        // 生成JWT令牌
        $token = JwtUtil::generateToken([
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
        ]);
        
        return [
            'user' => $user->hidden(['password']),
            'token' => $token,
        ];
    }
    
    /**
     * 获取用户信息
     * @param int $userId 用户ID
     * @return array
     */
    public function getUserInfo(int $userId): array
    {
        $user = User::find($userId);
        
        if (!$user) {
            throw new ValidateException('用户不存在');
        }
        
        return $user->hidden(['password'])->toArray();
    }
    
    /**
     * 更新用户信息
     * @param int $userId 用户ID
     * @param array $data 更新数据
     * @return array
     */
    public function updateUserInfo(int $userId, array $data): array
    {
        $user = User::find($userId);
        
        if (!$user) {
            throw new ValidateException('用户不存在');
        }
        
        // 更新用户信息
        $user->save($data);
        
        return $user->hidden(['password'])->toArray();
    }
    
    /**
     * 重置密码
     * @param string $email 邮箱
     * @param string $newPassword 新密码
     * @return bool
     */
    public function resetPassword(string $email, string $newPassword): bool
    {
        $user = User::where('email', $email)->find();
        
        if (!$user) {
            throw new ValidateException('邮箱不存在');
        }
        
        // 更新密码
        $user->password = $newPassword;
        $user->save();
        
        return true;
    }
    
    /**
     * 修改密码
     * @param int $userId 用户ID
     * @param string $oldPassword 旧密码
     * @param string $newPassword 新密码
     * @return bool
     */
    public function changePassword(int $userId, string $oldPassword, string $newPassword): bool
    {
        $user = User::find($userId);
        
        if (!$user) {
            throw new ValidateException('用户不存在');
        }
        
        // 验证旧密码
        if (!$user->checkPassword($oldPassword)) {
            throw new ValidateException('旧密码错误');
        }
        
        // 更新密码
        $user->password = $newPassword;
        $user->save();
        
        return true;
    }
    
    /**
     * 更新用户状态
     * @param int $userId 用户ID
     * @param int $status 状态值：0-禁用，1-启用
     * @return bool
     */
    public function updateStatus(int $userId, int $status): bool
    {
        $user = User::find($userId);
        
        if (!$user) {
            throw new ValidateException('用户不存在');
        }
        
        // 更新状态
        $user->status = $status;
        $user->save();
        
        return true;
    }
}