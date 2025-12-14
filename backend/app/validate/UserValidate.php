<?php
namespace app\validate;

use think\Validate;

class UserValidate extends Validate
{
    // 定义验证规则
    protected $rule = [
        'username'      => 'require|length:3,50|unique:user',
        'email'         => 'require|email|unique:user',
        'password'      => 'require|length:6,20',
        'confirm_password' => 'require|confirm:password',
        'nickname'      => 'length:0,50',
        'avatar'        => 'url|length:0,255',
        'phone'         => 'mobile|unique:user',
        'status'        => 'in:0,1',
    ];
    
    // 定义错误信息
    protected $message = [
        'username.require'      => '用户名不能为空',
        'username.length'       => '用户名长度必须在3-50个字符之间',
        'username.unique'       => '用户名已存在',
        'email.require'         => '邮箱不能为空',
        'email.email'           => '邮箱格式不正确',
        'email.unique'          => '邮箱已存在',
        'password.require'      => '密码不能为空',
        'password.length'       => '密码长度必须在6-20个字符之间',
        'confirm_password.require' => '确认密码不能为空',
        'confirm_password.confirm' => '两次输入的密码不一致',
        'nickname.length'       => '昵称长度不能超过50个字符',
        'avatar.url'            => '头像URL格式不正确',
        'avatar.length'         => '头像URL长度不能超过255个字符',
        'phone.mobile'          => '手机号码格式不正确',
        'phone.unique'          => '手机号码已存在',
        'status.in'             => '状态值必须为0或1',
    ];
    
    // 定义验证场景
    protected $scene = [
        // 注册验证
        'register' => ['username', 'email', 'password', 'confirm_password'],
        // 登录验证
        'login' => ['username' => 'require|length:3,50', 'password' => 'require|length:6,20'],
        // 密码重置验证
        'reset_password' => ['email', 'password', 'confirm_password'],
        // 更新用户信息验证
        'update_info' => ['nickname', 'avatar', 'phone'],
        // 修改密码验证
        'change_password' => ['password', 'confirm_password'],
    ];
}