import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import cls from 'classnames'

import { fetchCoffeeStores } from "../../lib/coffee-stores";

import styles from '../../styles/coffeeStore.module.css'
import Image from "next/image";

export async function getStaticProps({params}){

    const coffeeStores = await fetchCoffeeStores();

    return{
        props:{
            coffeeStore:coffeeStores.find(
                (coffeeStore)=>{
                    return coffeeStore.fsq_id.toString()===params.id;
                }
            )
        }
    }
}

export async function getStaticPaths(){
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) =>{
        return{
            params:{
                id:coffeeStore.fsq_id.toString(),
        }   }
    }


    )
    return{
        paths, fallback:true
    }
}

const CoffeeStore =(props)=>{
   const router = useRouter();
   const {id} = router.query;

   if (router.isFallback){
    return <div>Loading....</div>
   }

   const {location,name,imgUrl}= props.coffeeStore

   const handleUpVoteButton= ()=>{
    console.log("Upvoted")
   }
   
    return (
       
    <div className={styles.layout}>
     <Head>

<title>{name}</title>
</Head>

<div className={styles.container}>
<div className={styles.col1}>
<div className={styles.backToHomeLink}>
    <Link href='/'><a>Back To Home</a></Link>
    </div>
    <div className={styles.nameWrapper}>
    <p className={styles.name}>{name}</p>
    </div>

    <Image src={imgUrl ||'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'} width={600} height={360} className={styles.storeImg} alt={name}/>
    </div>

<div className={cls("glass",styles.col2)}>
<div className={styles.iconWrapper}>
<Image src='/static/icon/places.svg' width={24} height={24}/>
    <p className={styles.text
    }>{location.address}</p>
</div>

<div className={styles.iconWrapper}>
<Image src='/static/icon/nearMe.svg' width={24} height={24}/>
    <p className={styles.text
    }>{location.neighborhood[0]}</p>
</div>

<div className={styles.iconWrapper}>
<Image src='/static/icon/star.svg' width={24} height={24}/>
    <p className={styles.text
    }>1</p>
</div>

<button className={styles.upvoteButton} onClick={handleUpVoteButton}>Up vote!</button>
    
    </div>

    </div>
    </div>
)
    }

export default CoffeeStore;