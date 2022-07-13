import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner'
import Card from '../components/card/card'
import { fetchCoffeeStores} from '../lib/coffee-stores'
import userLocation from '../hooks/user-location'
import { useContext, useEffect, useState } from 'react'
import { ACTION_TYPES, StoreContext } from '../store/store.context'




export async function getStaticProps(){

  const coffeeStores = await fetchCoffeeStores();

  return{
    props:{coffeeStores},
  }
}

export default function Home(props) {

  const {handleUserLocation, locationErrorMsg, loadingLocation} = userLocation();



  const [coffeeStoresNearError, setCoffeeStoreNearError] = useState(null);

  const {dispatch, state} = useContext(StoreContext);

  const {coffeeStores, latLong} = state;

  console.log({latLong,locationErrorMsg})

  useEffect(() =>{
    async function setCoffeeStoresByLocation(){
if(latLong){
  try{
    const fetchedCoffeeStores = await fetchCoffeeStores(latLong,30);
    console.log(fetchedCoffeeStores)


    dispatch({
      type: ACTION_TYPES.SET_COFFEE_STORES,
      payload:{
        coffeeStores:fetchedCoffeeStores
      }
    } )
  } catch(err){
    console.log(err);
    setCoffeeStoreNearError(err.message)
  }
}

}
setCoffeeStoresByLocation();
  },[latLong])


  const handleOnBannerBtnClick=()=>{
    console.log("Hi from Banner Button")
    handleUserLocation();
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Browse Coffee Shops</title>
        <meta name="description" content="Browsae the coffee shops near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText= {loadingLocation ? 'loading...' : 'View stores nearby' } handleOnClick ={
          handleOnBannerBtnClick}/>

          { locationErrorMsg && <p> {locationErrorMsg} : something went wrong
         </p> }
         { coffeeStoresNearError && <p> {coffeeStoresNearError} : something went wrong
         </p> }

          <div className={styles.heroImage}>
     <Image src="/static/hero-image.png" width={700} height={400}/>
     </div>

     {coffeeStores.length>0 &&( <div className={styles.sectionWrapper}>
<h2 className={styles.heading2}>Stores near me</h2>

<div className={styles.cardLayout}>
{coffeeStores.map(coffeeStore=>(
     <Card className={styles.card} key={coffeeStore.id} name={coffeeStore.name} href={`/coffee-shop/${coffeeStore.id}`} imgUrl={coffeeStore.imgUrl ||'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}/>
)
)
}
     </div>
     </div>
)}


{props.coffeeStores.length>0 &&( <div className={styles.sectionWrapper}>
<h2 className={styles.heading2}>Vancouver Downtown Stores</h2>

<div className={styles.cardLayout}>
{props.coffeeStores.map(coffeeStore=>(
     <Card className={styles.card} key={coffeeStore.id} name={coffeeStore.name} href={`/coffee-shop/${coffeeStore.id}`} imgUrl={coffeeStore.imgUrl ||'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}/>
)
)
}
     </div>
     </div>
)}
      </main>

    </div>
  )
}
