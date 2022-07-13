import { useContext, useState } from "react"
import { ACTION_TYPES, StoreContext } from "../store/store.context"

const userLocation= ()=>{

    const [locationErrorMsg, setLocationErrorMsg] = useState('')

    const [loadingLocation, setLoadingLocation] = useState(false)

    const {dispatch} = useContext(StoreContext)

const success= (position)=>{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;


    dispatch(
        {
            type:ACTION_TYPES.SET_LAT_LONG,
            payload: {latLong:`${latitude},${longitude}`}
        }
    )
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
        navigator.geolocation.getCurrentPosition(success,error);
    }
}

return{ 
    handleUserLocation,
    locationErrorMsg,
    loadingLocation

};
}

export default userLocation;