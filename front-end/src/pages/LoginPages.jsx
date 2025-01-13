import { useEffect, useState } from "react";
import ButtonGreen from "../components/Button";
import Input from "../components/Input";
import Password from "../components/TogglePassword";
import { useNavigate } from "react-router-dom";
import auth from "../services/auth.service";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      navigate("/home");
    }
  }, [navigate, setIsAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await auth.login(username, password);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (err) {
      setError(err.error || err.message || "Failed to login");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("src/assets/bps.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay with blur */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        style={{ backdropFilter: "blur(10px)" }}
      ></div>

      {/* Form container */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-blue-premier bg-opacity-85 p-8 rounded-lg shadow-xl w-3/4 md:w-1/3"
      >
       
        
        <div className='flex items-center justify-center gap-6'>
            <img src="src/assets/logo.png" alt="" className="w-14 h-15 " />
            <h1 className="text-lg font-bold text-white max-w-96 mt-1">BADAN PUSAT STATISTIK PROVINSI SUMATERA BARAT</h1>
        </div>

        {error && (
          <div className="text-red-600 bg-red-100 p-2 rounded mb-4 ">
            {error}
          </div>
        )}

      
        <div className="mt-6">
          <Input
            id="username"
            label="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />
        </div>

        

        <div className="mt-4">
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="mt-8 flex justify-center">
          <ButtonGreen id="login" label="Login" type="submit" disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default Login;
