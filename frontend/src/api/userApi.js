// 用户API服务
import axiosInstance from './axiosInstance';

/**
 * 用户注册
 * @param {Object} data - 注册参数
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @param {string} data.email - 邮箱
 * @returns {Promise<Object>} 注册结果
 */
export const register = (data) => {
  return axiosInstance.post('/api/user/register', data);
};

/**
 * 用户登录
 * @param {Object} data - 登录参数
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise<Object>} 登录结果，包含令牌和用户信息
 */
export const login = (data) => {
  return axiosInstance.post('/api/user/login', data);
};

/**
 * 重置密码
 * @param {Object} data - 重置密码参数
 * @param {string} data.email - 邮箱
 * @returns {Promise<Object>} 重置密码结果
 */
export const resetPassword = (data) => {
  return axiosInstance.post('/api/user/password/reset', data);
};

/**
 * 用户登出
 * @returns {Promise<Object>} 登出结果
 */
export const logout = () => {
  return axiosInstance.post('/api/user/logout');
};

/**
 * 获取用户信息
 * @returns {Promise<Object>} 用户信息
 */
export const getUserInfo = () => {
  return axiosInstance.get('/api/user/info');
};

/**
 * 更新用户信息
 * @param {Object} data - 用户信息
 * @param {string} [data.username] - 用户名
 * @param {string} [data.email] - 邮箱
 * @param {string} [data.avatar] - 头像
 * @returns {Promise<Object>} 更新结果
 */
export const updateUserInfo = (data) => {
  return axiosInstance.put('/api/user/update', data);
};

/**
 * 修改密码
 * @param {Object} data - 修改密码参数
 * @param {string} data.oldPassword - 旧密码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise<Object>} 修改密码结果
 */
export const changePassword = (data) => {
  return axiosInstance.put('/api/user/password/update', data);
};
