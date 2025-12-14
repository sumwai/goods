<?php
namespace app\middleware;

class Cors
{
    public function handle($request, \Closure $next)
    {
        $response = $next($request);
        $origin = $request->header('Origin', '*');
        
        $response->header([
            'Access-Control-Allow-Origin' => $origin,
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Allow-Credentials' => 'true'
        ]);
        
        if ($request->method() == 'OPTIONS') {
            $response->code(200);
            return $response;
        }
        
        return $response;
    }
}