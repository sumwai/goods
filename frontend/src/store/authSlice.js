// 认证状态管理
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, logout as logoutApi, getUserInfo as getUserInfoApi } from '../api/userApi';
import { setToken, removeToken, getToken } from '../utils/auth';

// 异步登录操作
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginApi(credentials);
      // 存储令牌
      if (data.token) {
        setToken(data.token);
      }
      return data;
    } catch (error) {
      // 处理登录错误
      return rejectWithValue(error.message || '登录失败');
    }
  }
);

// 异步登出操作
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const data = await logoutApi();
      // 移除令牌
      removeToken();
      return data;
    } catch (error) {
      // 处理登出错误
      // 即使API调用失败，也要清除本地令牌
      removeToken();
      return rejectWithValue(error.message || '登出失败');
    }
  }
);

// 异步获取用户信息
export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserInfoApi();
      return data;
    } catch (error) {
      // 处理获取用户信息错误
      return rejectWithValue(error.message || '获取用户信息失败');
    }
  }
);

// 初始状态
const initialState = {
  user: null,
  token: getToken(),
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// 创建authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 清除错误
    clearError: (state) => {
      state.error = null;
    },
    // 设置认证状态
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    // 更新用户信息
    updateUserInfo: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // 登录操作处理
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || getToken();
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // 登出操作处理
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // 获取用户信息操作处理
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // 如果获取用户信息失败，可能是令牌过期，清除认证状态
        state.isAuthenticated = false;
      });
  },
});

// 导出actions
export const { clearError, setAuthenticated, updateUserInfo } = authSlice.actions;

// 导出reducer
export default authSlice.reducer;
