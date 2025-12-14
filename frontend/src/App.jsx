import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
// 导入错误处理工具
import '../src/utils/errorHandler'

// 占位组件 - 登录页
const LoginPage = () => {
  return (
    <div className="login-page">
      <h2>登录页</h2>
      <p>登录功能将在此实现</p>
    </div>
  )
}

// 占位组件 - 首页
const HomePage = () => {
  return (
    <div className="home-page">
      <h2>首页</h2>
      <p>首页内容将在此实现</p>
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

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="app-container">
        {/* 导航栏 */}
        <nav className="app-nav">
          <div className="nav-logo">
            <h1>商品管理系统</h1>
          </div>
          <div className="nav-links">
            <Link to="/">首页</Link>
            <Link to="/login">登录</Link>
            <Link to="/user">用户中心</Link>
          </div>
        </nav>

        {/* 主内容区 */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserCenterPage />} />
          </Routes>
        </main>

        {/* 页脚 */}
        <footer className="app-footer">
          <p>商品管理系统 &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
