import React, { useEffect, useState } from "react";
import ButtonGreen from "../components/btnGreen";
import Input from "../components/input";
import Bps from "../components/bps";
import Password from "../components/togglePassword";
import { useNavigate } from "react-router-dom";
import auth from "../services/auth.service";

const Login = ({setIsAuthenticated}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      navigate('/home');
    }
  }, [navigate, setIsAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await auth.login(username, password);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (err) {
      setError(err.error || err.message || 'Failed to login');
      setPassword(prev=>({ ...prev, password: '' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 w-full h-full">
      <div className="mt-30"> 
        <img src="src/assets/bps2.jpg" alt="Login Illustration" className="h-30 w-full" />
      </div>
      
      <div>
        <form onSubmit={handleSubmit} className="inputLogin" id="login-form">
          <div className="flex flex-col bg-blue-premier border-xl shadow-sm rounded-lg md:p-5 mt-20 height-80 w-3/4 mr-3 ml-14">
            <div className="mt-3">
              <Bps />
            </div> 

            {error && (
              <div className="mx-5 mb-4 p-2 text-sm text-red-600 bg-red-100 rounded-md">
                {error}
              </div>
            )}

            {/* Input for username */}
            <div className="ml-5">
              <Input
                id="username"
                // label="Input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                required
              />
            </div>
              
            {/* Input for password */}
            <div className="mt-8 ml-5">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
                                            
            <div className="mt-10 mb-5 flex items-center justify-center">
              <ButtonGreen 
                id="login"
                label="Login" 
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
