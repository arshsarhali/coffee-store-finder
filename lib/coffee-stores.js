
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) =>{
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}


const getListOfCoffeePhotos =async ()=>{
    const photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 16,
      });

      const unSplashResults = photos.response.results
      return unSplashResults.map((result)=> result.urls["small"]);
}

export const fetchCoffeeStores = async() =>{

    const photos = await getListOfCoffeePhotos();
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization:process.env.FOURSQUARE_API_KEY,
        }
      };
      
      const res = await fetch(getUrlForCoffeeStores('49.28183267590302,-123.1167925275565','coffee','6'), options);
      
      const response =  await res.json()
        return await response.results.map((result,index)=>{

            const neighborhood =  result.location.neighborhood;
       
            return {
                id: result.fsq_id,
                address:result.location.address,
                name:result.name,
                neighborhood:neighborhood===undefined ? '' : neighborhood[0] ,
                imgUrl:photos.length > 0 ? photos[index] : null
            }
        })
}