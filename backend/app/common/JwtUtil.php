<?php
namespace app\common;

use Firebase\JWT\JWT;
use think\facade\Config;
use think\Request;

class JwtUtil
{
    /**
     * 生成JWT令牌
     * @param array $payload JWT载荷
     * @return string
     */
    public static function generateToken(array $payload): string
    {
        $config = Config::get('jwt');
        
        // 设置JWT过期时间
        $payload['exp'] = time() + $config['expire'];
        $payload['iat'] = time();
        $payload['iss'] = $config['issuer'];
        $payload['aud'] = $config['audience'];
        $payload['sub'] = $config['subject'];
        
        // 生成JWT令牌
        return JWT::encode($payload, $config['secret'], $config['algorithm']);
    }
    
    /**
     * 验证JWT令牌
     * @param string $token JWT令牌
     * @return array|false
     */
    public static function verifyToken(string $token)
    {
        try {
            $config = Config::get('jwt');
            
            // 验证JWT令牌
            $decoded = JWT::decode($token, $config['secret'], [$config['algorithm']]);
            
            // 转换为数组
            return (array) $decoded;
        } catch (\Exception $e) {
            // 验证失败
            return false;
        }
    }
    
    /**
     * 解析JWT令牌（不验证签名）
     * @param string $token JWT令牌
     * @return array|false
     */
    public static function parseToken(string $token)
    {
        try {
            $config = Config::get('jwt');
            $decoded = JWT::decode($token, $config['secret'], [$config['algorithm']]);
            return (array) $decoded;
        } catch (\Exception $e) {
            return false;
        }
    }
    
    /**
     * 从请求头中获取JWT令牌
     * @param string $tokenPrefix 令牌前缀
     * @return string|null
     */
    public static function getTokenFromHeader(string $tokenPrefix = 'Bearer'): ?string
    {
        $header = request()->header('Authorization');
        
        if (!$header) {
            return null;
        }
        
        // 移除令牌前缀
        $token = str_replace($tokenPrefix . ' ', '', $header);
        
        return $token ?: null;
    }
}