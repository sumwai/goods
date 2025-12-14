// Redux Store配置
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// 配置Store
const store = configureStore({
  reducer: {
    auth: authReducer,
    // 未来可以添加其他reducer
    // product: productReducer,
    // order: orderReducer,
  },
  // 中间件配置
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 允许非序列化值（如Error对象）
      serializableCheck: {
        ignoredActions: ['auth/login/rejected', 'auth/logout/rejected', 'auth/fetchUserInfo/rejected'],
        ignoredPaths: ['auth.error'],
      },
    }),
  // 开发工具配置
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
