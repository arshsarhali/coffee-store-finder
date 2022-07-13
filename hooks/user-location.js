import { useState } from "react"

const userLocation= ()=>{

    const [locationErrorMsg, setLocationErrorMsg] = useState('')

    const [latLong, setLatLong] = useState('')
    const [loadingLocation, setLoadingLocation] = useState(false)

const success= (position)=>{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`)
    setLocationErrorMsg("");
    setLoadingLocation(false)
}

const error = ()=>{
setLocationErrorMsg("Unable to Retrieve location")
setLoadingLocation(false)
}

const handleUserLocation = ()=>{
setLoadingLocation(true)
    if(!navigator.geolocation){
        setLocationErrorMsg("Geolocation is not supported by your browser")
        setLoadingLocation(false)
    } else{
        //status.textContent="locating..."
        navigator.geolocation.getCurrentPosition(success,error);
    }
}

return{ 
    latLong,
    handleUserLocation,
    locationErrorMsg,
    loadingLocation

};
}

export default userLocation;