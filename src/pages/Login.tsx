import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { AuthLayout } from '@/components/ui/layout';
import { FormInput } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    }
    
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度不能少于6位';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        
        // Mock authentication
        if (formData.username === 'admin' && formData.password === 'password') {
          setIsAuthenticated(true);
          toast.success('登录成功！');
          navigate('/');
        } else {
          toast.error('用户名或密码错误');
        }
      }, 1500);
    }
  };

  return (
    <AuthLayout
      title="账户登录"
      description="欢迎回来，请登录您的账户"
      footerText="还没有账户？"
      footerLink={{ text: "立即注册", href: "/register" }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="用户名"
          icon="fa-user"
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          placeholder="请输入用户名"
          required
        />
        
        <FormInput
          label="密码"
          icon="fa-lock"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="请输入密码"
          required
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 dark:text-green-500 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              记住我
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors">
              忘记密码?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          loading={isLoading}
          loadingText="登录中..."
          icon="fa-arrow-right"
          className="w-full"
        >
          登录账户
        </Button>
      </form>
    </AuthLayout>
  );
}