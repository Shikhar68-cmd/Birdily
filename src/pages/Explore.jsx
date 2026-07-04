import React, { useState } from 'react';
import Nav from '../components/Nav';
import MapCnt from '../components/MapCnt';
import BirdInfo from '../components/BirdInfo';

const Explore = () => {

    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div className='main'>
            <Nav setSelectedLocation={setSelectedLocation} />

            <MapCnt
                selectedLocation={selectedLocation}
            />

            <BirdInfo
                selectedLocation={selectedLocation}
            />
        </div>
    );
}

export default Explore;