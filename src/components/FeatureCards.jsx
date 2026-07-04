import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './features.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        title: "Live Sighting Map",
        desc: "Tap anywhere on the globe to see what's been spotted nearby, in real time.",
        icon: (
            <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="17" r="7" stroke="#A855F7" strokeWidth="2" />
                <path d="M20 24 C20 30 20 34 20 36" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
                <circle cx="20" cy="17" r="2.5" fill="#A855F7" />
            </svg>
        ),
    },
    {
        title: "Species Explorer",
        desc: "From backyard regulars to rare migratory visitors, browse every species on record.",
        icon: (
            <svg viewBox="0 0 40 40" fill="none">
                <path d="M8 22C14 10 26 10 32 18C26 20 20 26 14 32C12 26 10 24 8 22Z" stroke="#A855F7" strokeWidth="2" strokeLinejoin="round" />
                <path d="M14 22L20 18" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Real-Time Data",
        desc: "Powered by the eBird API — observations update as birders log them worldwide.",
        icon: (
            <svg viewBox="0 0 40 40" fill="none">
                <path d="M6 20H14L17 10L22 30L26 20H34" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Regional Trends",
        desc: "See how populations shift and vary across different regions over time.",
        icon: (
            <svg viewBox="0 0 40 40" fill="none">
                <path d="M8 30V22M17 30V14M26 30V19M35 30V9" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
];

function FeatureCards() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const cards = sectionRef.current.querySelectorAll('.feature-card');

        gsap.fromTo(
            cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                },
            }
        );
    }, []);

    return (
        <section className="features-cnt" ref={sectionRef}>
            <h2 className="features-heading">Why Birdily</h2>

            <div className="features-grid">
                {features.map((f, i) => (
                    <div className="feature-card" key={i}>
                        <span className="feature-index">{String(i + 1).padStart(2, '0')}</span>
                        <div className="feature-icon-wrap">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                        <span className="feature-line"></span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeatureCards;