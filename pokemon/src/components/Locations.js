import React, {useState, useEffect} from 'react'
import { useAtom } from 'jotai';
import state from './AtomStates';
import LocationDetail from './LocationDetail';

export default function Locations() {

const [locationsList, setlocationsList] = useState([]);

const [selectedLocation, setselectedLocation] = useState({});
const [locationDisplay, setlocationDisplay] = useState(false);

const openLocation =({target}) => {
    setselectedLocation(parseInt(target.id));
    setlocationDisplay(true);
  }

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/location')
        .then(response => response.json())
        .then(data => {setlocationsList(data.results)})
      }, [])

  return ( locationDisplay?  <LocationDetail locationsList={locationsList} selectedLocation={selectedLocation}/>:
    <div className='locationsMap'>
    {locationsList.map((loc, index) => <button key={loc.name} id={index+1} className={`btn${index+1}`}onClick={openLocation}>{loc.name}</button>)}
   </div>
  )
}
