import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* For Business Section 1 */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-300">For Business</h4>
                        <div className="flex flex-col space-y-2">
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                        </div>
                    </div>

                    {/* For Business Section 2 */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-300">For Business</h4>
                        <div className="flex flex-col space-y-2">
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                        </div>
                    </div>

                    {/* For Business Section 3 */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-300">For Business</h4>
                        <div className="flex flex-col space-y-2">
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                        </div>
                    </div>

                    {/* For Business Section 4 */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-300">For Business</h4>
                        <div className="flex flex-col space-y-2">
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                            <Link to="/employer" className="text-gray-400 hover:text-white transition-colors">
                                Employer
                            </Link>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-300">Coming soon on</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <img src="/src/assets/fbimg.png" alt="Facebook" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <img src="/src/assets/instaimg.png" alt="Instagram" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <img src="/src/assets/ximg.png" alt="Twitter" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <img src="/src/assets/linkedinimg.png" alt="LinkedIn" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-gray-700" />

                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-gray-400 text-sm">
                        @{new Date().getFullYear()} Projuncture. All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
                        <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                            Terms & Conditions
                        </Link>
                        <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                            Security
                        </Link>
                        <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                            Cookie Declaration
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}