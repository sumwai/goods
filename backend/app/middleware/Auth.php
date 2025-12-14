<?php
namespace app\middleware;

use app\common\JwtUtil;
use think\facade\Config;
use think\response\Json;

class Auth
{
    /**
     * 处理请求
     * @param \think\Request $request
     * @param \Closure $next
     * @return Json|mixed
     */
    public function handle($request, \Closure $next)
    {
        // 获取JWT令牌
        $token = JwtUtil::getTokenFromHeader(Config::get('jwt.token_prefix'));
        
        // 检查令牌是否存在
        if (!$token) {
            return json([
                'code' => 401,
                'message' => '未授权：缺少令牌',
                'data' => null
            ], 401);
        }
        
        // 验证JWT令牌
        $payload = JwtUtil::verifyToken($token);
        
        if (!$payload) {
            return json([
                'code' => 401,
                'message' => '未授权：令牌无效或已过期',
                'data' => null
            ], 401);
        }
        
        // 将用户信息存储到请求中
        $request->user = $payload;
        
        // 继续处理请求
        return $next($request);
    }
}