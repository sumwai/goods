
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
// 导入错误处理工具
import './utils/errorHandler'
// 导入MUI样式
import '@mui/material/styles'
import '@mui/icons-material'

// 导入自定义组件
import Layout from './components/Layout'
// 导入页面组件
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

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

// 占位组件 - 用户中心
const UserCenterPage = () => {
  return (
    <div className="user-center-page">
      <h2>用户中心</h2>
      <p>用户中心内容将在此实现</p>
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

function App() {
  return (
    <Router>
      <div className="app-container">
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
      </div>
    </Router>
  )
}

export default App
