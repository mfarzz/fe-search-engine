import auth from "../services/auth.service";

const useLogout = () => {
  const handleLogout = async () => {
    try {
      await auth.logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  return handleLogout;
};

export default useLogout;
