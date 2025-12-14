
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import './App.css'
// 导入错误处理工具
import './utils/errorHandler'
// 导入MUI样式
import '@mui/material/styles'
// 只导入实际使用的图标，而不是整个图标库
import { AccountCircle, Settings, ShoppingCart, Favorite, History, Logout } from '@mui/icons-material'

// 导入自定义组件
import Layout from './components/Layout'
// 实现路由懒加载
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const UserCenterPage = lazy(() => import('./pages/UserCenterPage'))

// 占位组件 - 首页
const HomePage = () => {
  return (
    <div className="home-page">
      <h2>首页</h2>
      <p>首页内容将在此实现</p>
    </div>
  )
}

// 占位组件 - 商品列表页
const ProductsPage = () => {
  return (
    <div className="products-page">
      <h2>商品列表</h2>
      <p>商品列表内容将在此实现</p>
    </div>
  )
}

// 占位组件 - 分类页
const CategoriesPage = () => {
  return (
    <div className="categories-page">
      <h2>商品分类</h2>
      <p>商品分类内容将在此实现</p>
    </div>
  )
}

// 占位组件 - 订单详情页
const OrderDetailPage = () => {
  return (
    <div className="order-detail-page">
      <h2>订单详情</h2>
      <p>订单详情内容将在此实现</p>
    </div>
  )
}

// 占位组件 - 商品详情页
const ProductDetailPage = () => {
  return (
    <div className="product-detail-page">
      <h2>商品详情</h2>
      <p>商品详情内容将在此实现</p>
    </div>
  )
}

// 404页面组件
const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h2>404 - 页面未找到</h2>
      <p>您访问的页面不存在</p>
      <p>请检查您输入的网址是否正确，或返回首页</p>
    </div>
  )
}

// 加载指示器组件
const LoadingIndicator = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px',
      color: '#666'
    }}>
      加载中...
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={<LoadingIndicator />}>
          <Routes>
            {/* 特殊页面 - 不使用Layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/order/:id" element={<OrderDetailPage />} />
            <Route path="/setting" element={<ProductDetailPage />} />
            
            {/* 主页面 - 使用Layout，显示底部导航 */}
            <Route element={<Layout headerTitle="商品管理系统" />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/user" element={<UserCenterPage />} />
            </Route>
            
            {/* 404页面 - 匹配所有未定义的路由 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
