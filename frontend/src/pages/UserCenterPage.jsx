import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../store/authSlice';
import { Container, Box, Typography, Avatar, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { AccountCircle, Settings, ShoppingCart, Favorite, History, Logout } from '@mui/icons-material';

const UserCenterPage = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  // 获取用户信息
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // 分组列表数据
  const userGroupItems = [
    { icon: <ShoppingCart />, text: '我的订单', path: '/orders' },
    { icon: <Favorite />, text: '我的收藏', path: '/favorites' },
    { icon: <History />, text: '浏览历史', path: '/history' },
  ];

  const settingsGroupItems = [
    { icon: <Settings />, text: '账户设置', path: '/settings' },
    { icon: <Logout />, text: '退出登录', path: '/logout' },
  ];

  return (
    <Container maxWidth="sm" sx={{ padding: 0 }}>
      {/* 用户信息区域 */}
      <Box 
        sx={{
          bgcolor: '#f5f5f5',
          p: 3,
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ width: 80, height: 80, mr: 3 }}
            alt={user?.username || '用户头像'}
            src={user?.avatar || ''}
          >
            <AccountCircle fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              {user?.username || '未登录'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || '请登录'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 分组列表区域 */}
      <Box sx={{ mt: 2, bgcolor: 'white' }}>
        {/* 第一组：用户相关 */}
        <List sx={{ padding: 0 }}>
          <Typography variant="subtitle2" sx={{ p: 1.5, pl: 3, color: 'text.secondary', bgcolor: '#f5f5f5' }}>
            我的账户
          </Typography>
          {userGroupItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 3, pr: 3 }}>
                  <ListItemIcon sx={{ minWidth: 40, color: '#666' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
              {index < userGroupItems.length - 1 && <Divider sx={{ margin: 0 }} />}
            </React.Fragment>
          ))}
        </List>

        {/* 第二组：设置相关 */}
        <List sx={{ padding: 0, mt: 1 }}>
          <Typography variant="subtitle2" sx={{ p: 1.5, pl: 3, color: 'text.secondary', bgcolor: '#f5f5f5' }}>
            设置
          </Typography>
          {settingsGroupItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 3, pr: 3 }}>
                  <ListItemIcon sx={{ minWidth: 40, color: '#666' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
              {index < settingsGroupItems.length - 1 && <Divider sx={{ margin: 0 }} />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* 加载状态 */}
      {isLoading && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">加载中...</Typography>
        </Box>
      )}

      {/* 错误信息 */}
      {error && (
        <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
          <Typography variant="body1">{error}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default UserCenterPage;