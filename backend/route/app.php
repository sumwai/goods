<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\facade\Route;

// 基础路由
Route::get('think', function () {
    return 'hello,ThinkPHP6!';
});

Route::get('hello/:name', 'index/hello');

// 用户API路由组
Route::group('api/user', function () {
    // 注册和登录（无需认证）
    Route::post('register', 'user/register');
    Route::post('login', 'user/login');
    Route::post('password/reset', 'user/resetPassword');
    
    // 需要认证的路由
    Route::group(function () {
        Route::post('logout', 'user/logout');
        Route::get('info', 'user/info');
        Route::put('update', 'user/update');
        Route::put('password/update', 'user/changePassword');
    })->middleware('app\middleware\Auth');
});
