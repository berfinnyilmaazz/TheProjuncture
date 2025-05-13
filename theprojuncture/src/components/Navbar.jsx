import { useEffect, useState } from 'react';
import logo from '/logo2.png';
import { FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import { useSelector } from 'react-redux';
import NotificationPanel from './NotificationPanel';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { user } = useSelector((state) => state.auth) || {};
    console.log(user);

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.trim() !== "") {
            navigate(`/search?q=${query.trim()}`);
            }
        }, 500); // 0.5 saniye sonra yönlendir

        return () => clearTimeout(timeout); // eskiyi iptal et
    }, [query]);

    const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
        navigate(`/search?q=${query.trim()}`);
        setQuery(""); // input temizlensin
        }
    };


    return (
        
        <nav className="bg-white shadow-md top-0 left-0 right-0 z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img 
                                src={logo} 
                                alt="Projuncture Logo" 
                                className="h-12 w-12 object-contain"
                            />
                            <span className="ml-2 text-xl font-semibold text-gray-900">
                                Projuncture
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
                        <div className="relative w-full">
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                //onKeyDown={handleSearch}
                                placeholder="Projuncture'da Arayın"
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <FiSearch className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <div className="flex gap-2 items-center">
                                <NotificationPanel />

                                <UserAvatar />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link 
                                    to="/log-in"
                                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                                >
                                    Giriş Yap
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            {isOpen ? (
                                <FiX className="w-6 h-6" />
                            ) : (
                                <FiMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search - Shown below header on mobile */}
                <div className="md:hidden py-2 px-2">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Projuncture'da Arayın"
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <FiSearch className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                    <Link
                        to="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                        Kategoriler
                    </Link>
                    <Link
                        to="/projects"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                        Projelerim
                    </Link>
                    {user ? (
                            <div className="flex gap-2 items-center">
                                <UserAvatar />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link 
                                    to="/log-in"
                                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                                >
                                    Giriş Yap
                                </Link>
                            </div>
                        )}
                </div>
            </div>
        </nav>
    );
}

