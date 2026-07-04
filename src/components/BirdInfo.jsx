import { useSelector } from "react-redux";
import { useEffect, useState } from "react";



const WIKI_THUMB = (name) =>
    `https://en.wikipedia.org/w/index.php?title=Special:Search&search=${encodeURIComponent(name)}&ns0=1`;

const BirdCard = ({ bird, isHero }) => {
    const imgSrc = `https://source.unsplash.com/featured/800x500?${encodeURIComponent(bird.comName + " bird")}`;
    

    if (isHero) {
        return (
            <div className="hero-card">
                <div className="hero-img-wrap">
                    <img
                        src={bird.image}
                        alt={bird.comName}
                        className="hero-img"
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                    <div className="hero-overlay">
                        <span className="hero-label">Latest Sighting</span>
                        <h2 className="hero-name">{bird.comName}</h2>
                        <p className="hero-sci">{bird.sciName}</p>
                        <div className="hero-meta">
                            <span>🕐 {bird.obsDt}</span>
                            <span>🔢 {bird.howMany ?? "Unknown"} spotted</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mini-card">
            <img
                src={bird.image || "/bird-placeholder.png"}
                alt={bird.comName}
                className="mini-img"
                onError={(e) => {
                    e.target.style.display = "none";
                }}
            />
            <div className="mini-info">
                <h4 className="mini-name">{bird.comName}</h4>
                <p className="mini-sci">{bird.sciName}</p>
                <div className="mini-meta">
                    <span>🕐 {bird.obsDt}</span>
                    <span>🔢 {bird.howMany ?? "Unknown"}</span>
                </div>
            </div>
        </div>
    );
};

const BirdInfo = ({selectedLocation}) => {
    const { birds, loading, error , hasSearched } = useSelector((state) => state.birds);

    useEffect(() => {
        if (!selectedLocation) return;
    
        // Fetch bird sightings
    }, [selectedLocation]);

    if (loading) {
        return (
            <div className="bird-info bird-info--state">
                <div className="state-icon">🔍</div>
                <p>Scanning the skies…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bird-info bird-info--state">
                <div className="state-icon">⚠️</div>
                <p>{error}</p>
            </div>
        );
    }

    if (!birds.length) {
        return (
            <div className="bird-info bird-info--state">
                <div className="state-icon">{hasSearched ? "🪹" : "🗺️"}</div>
                <p>{hasSearched ? "No birds spotted in this area." : "Click anywhere on the map to discover nearby birds."}</p>
            </div>
        );
    }

    const [hero, ...rest] = birds;

    return (
        <div className="bird-info">
            <p className="section-label">{birds.length} birds observed nearby</p>

            <BirdCard bird={hero} isHero />

            {rest.length > 0 && (
                <div className="mini-list">
                    {rest.map((bird, i) => (
                        <BirdCard key={i} bird={bird} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BirdInfo; 