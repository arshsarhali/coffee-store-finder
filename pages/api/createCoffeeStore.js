import { getMinifiedRecords,table, findRecordByFilter } from "../../lib/airtable";


const createCoffeeStore = async (req,res)=>{
 if(req.method ==="POST"){

const {id,name,address,neighborhood,voting,imgUrl} = req.body;

    try{

        if(id){
            const records = await findRecordByFilter(id);
            if(records.length !==0){
            res.json(records)

    }else{

        if(name){
       const createRecords = await table.create([
            {
                fields:{
                    id,
                    name,
                    address,
                    neighborhood,
                    voting,
                    imgUrl
                }
            }
        ])

        const records = getMinifiedRecords(createRecords)

        res.json({message:"record created",records})

    }else{
        res.status(400).json({message: 'Id or name is missing'})
    }
}
}else{
    res.status(400).json({message: 'id is missing'})
}
    }catch(err){
    res.status(500).json({message:'Something went wrong while creating or finding store',err})
    }
}

}

export default createCoffeeStore;