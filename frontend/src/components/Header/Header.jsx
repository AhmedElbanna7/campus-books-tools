import './header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen } from "lucide-react";
function Header({ isAdmin }) {
    const { user,logout } = useAuth();
    const navigate = useNavigate();
    const linkClass = ({ isActive }) => (isActive ? 'active' : '');
    return (
        <header className="header">
            <div className='header_title'>
                <BookOpen size={22} className="cs-brand-icon" />
                <h2>CampusShare</h2>
            </div>
            {isAdmin ? (
                    <nav>
                        <NavLink to="/" className={linkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/admin" className={linkClass}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/mylistings" className={linkClass}>
                            My Items
                        </NavLink>
                        <NavLink to="/myfavorites" className={linkClass}>
                            Favorites
                        </NavLink>
                    </nav>
                ) : (
                    <nav>
                        <NavLink to="/" className={linkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/mylistings" className={linkClass}>
                            My Items
                        </NavLink>
                        <NavLink to="/myfavorites" className={linkClass}>
                            Favorites
                        </NavLink>
                    </nav>
                )}
                {user ? (
                    <div className="user-info">
                        <p className="user-greeting">Hello, {user.name}</p>
                        <button id="logoutBtn" onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="user-info">
                        <button id="loginBtn" onClick={() => (navigate("/login"))}>
                            Login
                        </button>
                        <button id="signupBtn" onClick={() => (navigate("/register"))}>
                            Sign up
                        </button>
                    </div>
                    
                )}
            </header>
        )
}
export default Header;