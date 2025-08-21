import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ResourceConnection() {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = async () => {
    setIsConnecting(true);
    
    // 模拟对接过程
    setTimeout(() => {
      setIsConnecting(false);
      toast.success('资源对接成功！');
      navigate('/progress-tracking');
    }, 1500);
  };
  
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">资源对接</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">对接资源</h2>
        
        {/* 资源对接表单 */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            请选择您要对接的资源类型和具体资源，我们将为您匹配最合适的资源提供方。
          </p>
          
          {/* 资源选择界面 */}
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 cursor-pointer transition-colors">
              <h3 className="font-medium text-gray-900 dark:text-white">绿色能源资源包</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">包含太阳能、风能等可再生能源资源</p>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 cursor-pointer transition-colors">
              <h3 className="font-medium text-gray-900 dark:text-white">生态农业资源包</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">包含有机种植、生态养殖等农业资源</p>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 cursor-pointer transition-colors">
              <h3 className="font-medium text-gray-900 dark:text-white">环保技术资源包</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">包含污染治理、废物回收等环保技术</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-80"
          >
            {isConnecting ? (
              <>
                <i className="fa-spinner fa-spin mr-2"></i>
                对接中...
              </>
            ) : (
              <>
                开始对接
                <i className="fa-arrow-right ml-2"></i>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}