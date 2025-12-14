<?php
namespace app\model;

use think\Model;

class User extends Model
{
    // 定义表名
    protected $name = 'user';
    
    // 定义主键
    protected $pk = 'id';
    
    // 开启自动时间戳
    protected $autoWriteTimestamp = true;
    
    // 定义时间戳字段名
    protected $createTime = 'create_time';
    protected $updateTime = 'update_time';
    
    // 定义只读字段
    protected $readonly = ['id', 'create_time'];
    
    // 定义隐藏字段
    protected $hidden = ['password'];
    
    // 密码加密
    public function setPasswordAttr($value)
    {
        return password_hash($value, PASSWORD_DEFAULT);
    }
    
    // 密码验证
    public function checkPassword($password)
    {
        return password_verify($password, $this->password);
    }
    
    // 登录时间和IP更新
    public function loginSuccess($ip)
    {
        $this->last_login_time = date('Y-m-d H:i:s');
        $this->last_login_ip = $ip;
        $this->save();
    }
}