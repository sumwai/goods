import React from 'react';
import { AppBar, Toolbar, Container, Box, Typography, IconButton } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from './BottomNav';

// 需要隐藏底部导航的路由白名单
const hideNavRoutes = ['/login', '/register', '/product/:id', '/order/:id', '/setting'];

const Layout = ({ 
  headerTitle = '商品管理系统', 
  bottomNavItems, 
  showBackButton = false,
  onBackClick 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoute = location.pathname;

  // 判断是否显示底部导航
  const shouldShowBottomNav = () => {
    return !hideNavRoutes.some(route => {
      const regex = new RegExp(route.replace(/:\w+/g, '[\\w-]+'));
      return regex.test(currentRoute);
    });
  };

  // 处理返回按钮点击
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 顶部Header */}
      <AppBar position="fixed" elevation={2}>
        <Toolbar sx={{ minHeight: 56 }}>
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={handleBackClick}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {headerTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 主内容区 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 7, // 顶部padding，适配AppBar高度
          pb: shouldShowBottomNav() ? 8 : 2, // 底部padding，适配BottomNav高度
          bgcolor: '#f5f5f5',
          minHeight: 'calc(100vh - 56px)',
        }}
      >
        <Container maxWidth="sm" sx={{ bgcolor: 'white', minHeight: '100%', p: 2, borderRadius: 0 }}>
          <Outlet />
        </Container>
      </Box>

      {/* 底部导航 */}
      {shouldShowBottomNav() && <BottomNav items={bottomNavItems} />}
    </Box>
  );
};

export default Layout;