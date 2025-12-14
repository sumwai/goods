// 认证工具函数

// 从localStorage获取令牌
export const getToken = () => {
  return localStorage.getItem('token') || null;
};

// 存储令牌到localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// 从localStorage移除令牌
export const removeToken = () => {
  localStorage.removeItem('token');
};

// 检查用户是否已登录
export const isAuthenticated = () => {
  return !!getToken();
};
