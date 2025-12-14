// 错误处理工具

// 错误类型枚举
export const ERROR_TYPES = {
  NETWORK_ERROR: 'network_error',
  SERVER_ERROR: 'server_error',
  BUSINESS_ERROR: 'business_error',
  AUTH_ERROR: 'auth_error',
  VALIDATION_ERROR: 'validation_error',
};

// 错误提示队列
let errorQueue = [];
let isShowingError = false;

// 显示错误提示
const showErrorNotification = (message) => {
  // 创建错误提示元素
  const errorElement = document.createElement('div');
  errorElement.className = 'error-notification';
  errorElement.textContent = message;
  
  // 添加样式
  errorElement.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #f44336;
    color: white;
    padding: 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  `;
  
  // 添加到文档
  document.body.appendChild(errorElement);
  
  // 3秒后移除
  setTimeout(() => {
    errorElement.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(errorElement);
    }, 300);
  }, 3000);
};

// 处理错误队列
const processErrorQueue = () => {
  if (isShowingError || errorQueue.length === 0) {
    return;
  }
  
  isShowingError = true;
  const message = errorQueue.shift();
  
  showErrorNotification(message);
  
  setTimeout(() => {
    isShowingError = false;
    processErrorQueue();
  }, 3000);
};

// 全局错误处理函数
export const showError = (message) => {
  errorQueue.push(message);
  processErrorQueue();
};

// 错误类型判断
export const getErrorType = (error) => {
  if (!error.response) {
    return ERROR_TYPES.NETWORK_ERROR;
  }
  
  const { status } = error.response;
  
  if (status === 401) {
    return ERROR_TYPES.AUTH_ERROR;
  } else if (status === 422) {
    return ERROR_TYPES.VALIDATION_ERROR;
  } else if (status >= 500) {
    return ERROR_TYPES.SERVER_ERROR;
  } else {
    return ERROR_TYPES.BUSINESS_ERROR;
  }
};

// 统一错误处理
export const handleError = (error) => {
  const errorType = getErrorType(error);
  let errorMessage = '请求失败，请稍后重试';
  
  switch (errorType) {
    case ERROR_TYPES.NETWORK_ERROR:
      errorMessage = '网络连接失败，请检查网络设置';
      break;
    case ERROR_TYPES.SERVER_ERROR:
      errorMessage = '服务器内部错误，请稍后重试';
      break;
    case ERROR_TYPES.AUTH_ERROR:
      errorMessage = '登录已过期，请重新登录';
      break;
    case ERROR_TYPES.VALIDATION_ERROR:
      errorMessage = error.response?.data?.message || '请求参数错误';
      break;
    case ERROR_TYPES.BUSINESS_ERROR:
      errorMessage = error.response?.data?.message || '业务处理失败';
      break;
    default:
      errorMessage = error.message || '请求失败';
  }
  
  // 显示错误提示
  showError(errorMessage);
  
  // 返回错误对象，便于后续处理
  return {
    ...error,
    errorType,
    errorMessage,
  };
};

// 添加全局样式
const addGlobalStyles = () => {
  // 检查样式是否已存在
  if (document.getElementById('error-notification-styles')) {
    return;
  }
  
  // 创建样式元素
  const styleElement = document.createElement('style');
  styleElement.id = 'error-notification-styles';
  styleElement.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  
  // 添加到文档
  document.head.appendChild(styleElement);
};

// 初始化错误处理工具
addGlobalStyles();

// 将showError函数添加到全局对象，以便在非组件环境中使用
if (typeof window !== 'undefined') {
  window.showError = showError;
}
