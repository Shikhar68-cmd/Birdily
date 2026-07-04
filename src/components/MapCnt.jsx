import React, { useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "../redux/mapSlice";
import { fetchBirds } from "../redux/birdSlice";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});


function FlyToLocation({ selectedLocation }) {
    const map = useMap();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedLocation) return;

        map.flyTo(
            [selectedLocation.lat, selectedLocation.lng],
            12,
            {
                animate: true,
                duration: 1.5,
            }
        );

        dispatch(
            setCoordinates({
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
            })
        );
    }, [selectedLocation, map, dispatch]);

    return null;
}

// Handles clicking on the map
function MapClickHandler() {
    const dispatch = useDispatch();

    useMapEvents({
        click(e) {
            dispatch(
                setCoordinates({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                })
            );
        },
    });

    return null;
}

const MapCnt = ({ selectedLocation }) => {
    const dispatch = useDispatch();

    const { lat, lng } = useSelector((state) => state.map);
    const { birds } = useSelector((state) => state.birds);

    // Fetch birds whenever coordinates change
    useEffect(() => {
        if (!lat || !lng) return;

        dispatch(fetchBirds({ lat, lng }));
    }, [lat, lng, dispatch]);

    return (
        <div className="map-cnt">
            <MapContainer
                center={[28.6139, 77.2090]}
                zoom={10}
                scrollWheelZoom={true}
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "20px",
                }}
            >
                <TileLayer
                    attribution="© OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FlyToLocation selectedLocation={selectedLocation} />

                <MapClickHandler />

                {lat && lng && (
                    <Marker position={[lat, lng]}>
                        <Popup>Selected Location</Popup>
                    </Marker>
                )}

{birds.map((bird) => (
    <Marker
        key={bird.obsId}
        position={[bird.lat, bird.lng]}
    >
    <Popup className="bird-popup">
    <div className="bird-card">

        <img
            src={bird.image}
            alt={bird.comName}
            className="bird-image"
        />

        <div className="bird-body">

            <p className="bird-species">
                {bird.sciName}
            </p>

            <h2>{bird.comName}</h2>

            <div className="bird-meta">
                <p>{bird.locName}</p>
                <p>{bird.obsDt}</p>
                <p>{bird.howMany ?? "Unknown"} observed</p>
            </div>

        </div>

    </div>
    </Popup>
    </Marker>
))}
            </MapContainer>
        </div>
    );
};

export default MapCnt;