import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';
import { showError } from '../utils/errorHandler';

// 创建Axios实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 获取令牌并添加到请求头
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    showError('请求配置错误');
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 统一处理响应数据
    const { code, message, data } = response.data;
    if (code === 200) {
      // 请求成功，返回数据
      return data;
    } else {
      // 业务错误，抛出错误信息
      showError(message || '请求失败');
      const error = new Error(message || '请求失败');
      error.code = code;
      return Promise.reject(error);
    }
  },
  (error) => {
    // 处理HTTP错误
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      if (status === 401) {
        // 未授权，清除令牌并跳转到登录页
        removeToken();
        // 注意：这里不能直接使用useNavigate，因为不在组件中
        window.location.href = '/login';
        showError('登录已过期，请重新登录');
      } else {
        // 其他错误状态码
        const errorMessage = data?.message || `请求失败（${status}）`;
        showError(errorMessage);
      }
    } else if (error.request) {
      // 请求已发送但没有收到响应
      showError('网络请求失败，请检查网络连接');
    } else {
      // 请求配置错误
      showError('请求配置错误');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
