import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const {axios,setToken} = useAppContext();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/admin/login',{email,password})
      if(data.success) {
        setToken(data.token)
        localStorage.setItem('token',data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100 px-4'>
      <div className='w-full max-w-md p-8 bg-white border border-gray-200 shadow-lg rounded-xl'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            <span className='text-primary'>Admin</span> Login
          </h1>
          <p className='text-gray-500 mt-2 text-sm'>Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='you@example.com'
              value={email}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='••••••••'
              value={password}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200'
            />
          </div>

          <button
            type='submit'
            className='w-full py-2 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition duration-200 shadow-sm'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
