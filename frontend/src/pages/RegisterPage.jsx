import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper, Alert } from '@mui/material';
import { register } from '../store/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 表单验证
    const errors = {};
    
    // 验证密码是否匹配
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = '两次输入的密码不一致';
    }
    
    // 设置错误信息
    setFormErrors(errors);
    
    // 如果有错误，不提交表单
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    // 提交所有表单数据，包括确认密码
    dispatch(register(formData))
      .unwrap()
      .then(() => {
        // 注册成功后跳转到登录页
        navigate('/login');
      })
      .catch(() => {
        // 错误已在authSlice中处理
      });
  };
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            用户注册
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="用户名"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="邮箱"
              type="email"
              id="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="确认密码"
              type="password"
              id="confirm_password"
              autoComplete="new-password"
              value={formData.confirm_password}
              onChange={handleChange}
              error={!!formErrors.confirm_password}
              helperText={formErrors.confirm_password}
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? '注册中...' : '注册'}
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography variant="body2">
                已有账号？ <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>立即登录</Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;