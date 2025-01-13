import { useState, useEffect } from "react";
import StatsWithOverlay from "../components/StatOverlay";
import Sidebar from "../components/SideBar";
import { UserRound, Link, ChartColumnBig } from 'lucide-react';
import {jwtDecode} from "jwt-decode";

function Dashboard() {
    const [role, setRole] = useState("");
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decodedToken = jwtDecode(token); // Dekode token untuk mendapatkan role
            setRole(decodedToken.role); // Ambil role dari token dan set ke state
          } catch (error) {
            console.error("Token decoding error:", error);
          }
        }
        
    }, []);

    const handePageChange = (page) => {
        loadUsers(page);
    }
    
    return (
        <div>
            <div className="navbar">
                <Navbar label="Selamat Datang" />
            </div>

            
            <div className="stats ml-8 mr-8 mt-20">
                <div className="grid grid-cols-3 gap-0">
                    <div className="text-blue-sky ">
                        <StatsWithOverlay label="Pengguna" ikon={UserRound} jumlah="100" keterangan="Orang"/>
                    </div>
                    <div className="text-green">
                        <StatsWithOverlay label="URL" ikon={Link} jumlah="50" keterangan="Link"/>
                    </div>
                    <div className="text-oren ">
                        <StatsWithOverlay label="Pengunjung" ikon={ChartColumnBig} jumlah="231" keterangan="Pengunjung"/>
                    </div>
                </div>
            </div>
 

            <Sidebar role={role} />
            
        </div>
    );
}

export default Dashboard;
