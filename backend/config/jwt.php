<?php
return [
    // JWT密钥
    'secret' => env('jwt.secret', 'your-secret-key-here'),
    
    // JWT过期时间（单位：秒）
    'expire' => env('jwt.expire', 3600),
    
    // JWT刷新时间（单位：秒）
    'refresh_expire' => env('jwt.refresh_expire', 86400),
    
    // JWT算法
    'algorithm' => env('jwt.algorithm', 'HS256'),
    
    // JWT发行人
    'issuer' => env('jwt.issuer', 'thinkphp'),
    
    // JWT受众
    'audience' => env('jwt.audience', 'thinkphp'),
    
    // JWT主题
    'subject' => env('jwt.subject', 'user'),
    
    // JWT令牌前缀
    'token_prefix' => env('jwt.token_prefix', 'Bearer'),
];