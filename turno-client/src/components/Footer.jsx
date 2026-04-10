import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-auto w-full border-t-2 border-zinc-900 bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
                    
                    {/* Column 1: Vongola Brand/Mission Statement */}
                    <div className="md:col-span-2 lg:col-span-2 flex flex-col items-center text-center md:items-start md:text-left">
                        <p className="text-xl font-extrabold uppercase tracking-[0.28em] text-zinc-900">
                            The Winged Clam
                        </p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Vongola Famiglia
                        </p>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
                            The official, secure archive preserving the history, artifacts, 
                            combat techniques, and legacy of the Vongola Famiglia. 
                            Strictly confidential property of the 10th Generation.
                        </p>
                    </div>

                    {/* Column 2: Navigation Section */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">
                            Navigation
                        </h3>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link to="/" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/articles" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                                    Articles
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Follow Us Section (UPDATED TO TRIGGER 404) */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">
                            Follow Us
                        </h3>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                {/* Changed to <Link> pointing to a fake route */}
                                <Link to="/classified/facebook" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link to="/classified/instagram" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link to="/classified/youtube" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                                    Youtube
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright/Legal */}
                <div className="mt-12 border-t border-zinc-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500">
                        © {new Date().getFullYear()} Vongola Famiglia Archives. Classified 
                        as highly confidential (A-Class). All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-xs text-zinc-600">
                        <Link to="/privacy" className="hover:text-zinc-900 transition-colors">
                            Confidentiality Policy
                        </Link>
                        <Link to="/terms" className="hover:text-zinc-900 transition-colors">
                            Codes of Conduct
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;