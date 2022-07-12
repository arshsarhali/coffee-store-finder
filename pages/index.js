import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner'
import Card from '../components/card/card'

import { fetchCoffeeStores } from '../lib/coffee-stores'



export async function getStaticProps(){

  const coffeeStores = await fetchCoffeeStores();

  return{
    props:{coffeeStores},
  }
}

export default function Home(props) {


  const handleOnBannerBtnClick=()=>{
    console.log("Hi from Banner Button")
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Browse Coffee Shops</title>
        <meta name="description" content="Browsae the coffee shops near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText= 'View stores nearby' handleOnClick ={
          handleOnBannerBtnClick}/>

          <div className={styles.heroImage}>
     <Image src="/static/hero-image.png" width={700} height={400}/>
     </div>
{props.coffeeStores.length>0 &&( <>
<h2 className={styles.heading2}>Vancouver Downtown Stores</h2>

<div className={styles.cardLayout}>
{props.coffeeStores.map(coffeeStore=>(
     <Card className={styles.card} key={coffeeStore.id} name={coffeeStore.name} href={`/coffee-shop/${coffeeStore.id}`} imgUrl={coffeeStore.imgUrl ||'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}/>
)
)
}
     </div>
     </>
)}
      </main>

    </div>
  )
}
