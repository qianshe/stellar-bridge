import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { AuthLayout } from '@/components/ui/layout';
import { FormInput } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (formData.username.trim().length < 3 || formData.username.trim().length > 20) {
      newErrors.username = '用户名长度必须在3-20个字符之间';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度不能少于6位';
    } else if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      newErrors.password = '密码必须包含字母和数字';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '请阅读并同意服务条款';
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
        toast.success('注册成功！');
        setIsAuthenticated(true);
        navigate('/');
      }, 1500);
    }
  };

  return (
    <AuthLayout
      title="创建账户"
      description="填写以下信息注册新账户"
      footerText="已有账户？"
      footerLink={{ text: "返回登录", href: "/login" }}
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
          label="邮箱地址"
          icon="fa-envelope"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="请输入邮箱地址"
          required
        />
        
        <FormInput
          label="设置密码"
          icon="fa-lock"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="请设置密码"
          helperText="密码必须包含字母和数字，至少6位字符"
          required
        />
        
        <FormInput
          label="确认密码"
          icon="fa-lock"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="请确认密码"
          required
        />
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 dark:text-green-500 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeTerms" className="font-medium text-gray-700 dark:text-gray-300">
              我同意
            </label>
            <a href="#" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">服务条款</a>
            <span className="text-gray-700 dark:text-gray-300">和</span>
            <a href="#" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">隐私政策</a>
          </div>
        </div>
        {errors.agreeTerms && (
          <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>
        )}
        
        <Button
          type="submit"
          loading={isLoading}
          loadingText="创建中..."
          icon="fa-user-plus"
          className="w-full"
        >
          创建账户
        </Button>
      </form>
    </AuthLayout>
  );
}