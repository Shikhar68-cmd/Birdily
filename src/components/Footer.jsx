import "./footer.css";
import { Globe, Mail, Bird } from "lucide-react";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-top">

                <div className="footer-brand">
                    <div className="brand">
                        <Bird size={28} strokeWidth={2} />
                        <h2>Birdily</h2>
                    </div>

                    <p>
                        Explore birds around the world through live sightings,
                        species discovery and beautiful interactive maps.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Navigation</h3>

                    <a href="/">Home</a>
                    <a href="/explore">Explore</a>
                    <a target="_blank"
                        rel="noopener noreferrer" href="/about">About</a>
                </div>

                <div className="footer-social">
                    <h3>Connect</h3>

                    <a href="https://github.com/Shikhar68-cmd">
                        <Globe size={20} />
                        GitHub
                    </a>

                    <a href="mailto:sharma.shikhar.bly@gmail.com">
                        <Mail size={20} />
                        Email
                    </a>
                </div>

            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Birdily • Built with React & Leaflet
            </div>

        </footer>
    );
};

export default Footer;