
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) =>{
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

export const fetchCoffeeStores = async() =>{

    

    const photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 30,
      });


      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization:process.env.FOURSQUARE_API_KEY,
        }
      };
      
      const res = await fetch(getUrlForCoffeeStores('49.28183267590302,-123.1167925275565','coffee','6'), options);
      
      const response =  await res.json()
        return await response.results
}