import Link from 'next/link';
import Container from './ui/Container';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
            <Container className="flex justify-between items-center">
                <div className="pointer-events-auto">
                    <Link href="/" className="text-2xl font-bold tracking-widest text-white drop-shadow-md">
                        LENS<span className="text-red-500">CAPE</span>
                    </Link>
                </div>

                <div className="pointer-events-auto">
                    <Link
                        href="#reviews"
                        className="glass px-6 py-3 text-sm font-uppercase tracking-wider hover:bg-white/10 transition-colors text-white"
                    >
                        LEAVE A <span className="text-red-500">REVIEW</span>
                    </Link>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
