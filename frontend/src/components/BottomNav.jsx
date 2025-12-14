import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';

// 默认导航项配置
const defaultNavItems = [
  { route: '/', label: '首页', icon: <HomeIcon /> },
  { route: '/products', label: '商品', icon: <ShoppingCartIcon /> },
  { route: '/categories', label: '分类', icon: <CategoryIcon /> },
  { route: '/user', label: '我的', icon: <PersonIcon /> }
];

const BottomNav = ({ items = defaultNavItems, height = 64 }) => {
  const location = useLocation();
  const currentRoute = location.pathname;

  // 查找当前路由对应的导航项索引
  const findCurrentValue = () => {
    return items.find(item => item.route === currentRoute)?.route || currentRoute;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: height,
          zIndex: 1000
        }}
      >
        <BottomNavigation
          value={findCurrentValue()}
          sx={{ height: '100%' }}
          showLabels
        >
          {items.map((item) => (
            <BottomNavigationAction
              key={item.route}
              label={item.label}
              icon={item.icon}
              component={Link}
              to={item.route}
              value={item.route}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;