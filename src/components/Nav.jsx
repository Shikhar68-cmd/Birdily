import React, { useEffect, useState } from "react";
import { searchLocations } from "../api/locationapi";


const Nav = ({setSelectedLocation}) => {
    const [search, setSearch] = useState("");
    const [locations, setLocations] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(false);

    useEffect(() => {
        if (selectedPlace) return;
    
        if (search.trim().length < 2) {
            setLocations([]);
            return;
        }
    
        const timer = setTimeout(async () => {
            try {
                const data = await searchLocations(search);
                setLocations(data);
            } catch (err) {
                console.error(err);
            }
        }, 400);
    
        return () => clearTimeout(timer);
    }, [search, selectedPlace]);

    return (
        <div className="navcnt">
            <div
                className="nav-logo"
                onClick={() => (window.location.href = "/")}
            >
                Birdily
            </div>

            <div className="search-box">
                <input

                    type="text"
                    placeholder="Search a location..."
                    value={search}
                    onChange={(e) => {setSearch(e.target.value)
                        setSelectedPlace(false);
                    }
                }
                    
                />


                {locations.length > 0 && (
                    <div className="search-results">
                        {locations.map((place) => (
                            <div
                                key={place.place_id}
                                className="search-item"

                                onClick={() => {
                                    setSelectedPlace(true);

                                    setSearch(place.formatted);
                                    setLocations([]);

                                    setSelectedLocation({
                                        name: place.formatted,
                                        lat: place.lat,
                                        lng: place.lon,
                                    });
                                }}
                            >
                                {place.formatted}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nav;