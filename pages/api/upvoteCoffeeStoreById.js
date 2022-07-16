import { table, findRecordByFilter, getMinifiedRecords } from "../../lib/airtable";

const upvoteCoffeeStoreById =async (req,res)=>{
if(req.method === "PUT"){

    try{
        const {id} =req.body
        if(id){
        const records = await findRecordByFilter(id);
        if(records.length !==0){

            const record = records[0];

            const calculateVoting = parseInt(record.voting)+parseInt(1)

            const updateRecord = await table.update([{
                id:record.recordId,
                fields:{
                    voting:calculateVoting
                }
            }])

            if(updateRecord){
                const minifiedRecord = getMinifiedRecords(updateRecord)
                res.json(minifiedRecord)
            }else{
                res.status(500).json({message:'Failed to update voting'})
            }
    }else{
        res.status(400).json({message:'Store does not exist'})
    }
}else{
    res.status(400).json({message:'Id is missing'})
}

    }catch(err){
        res.status(5090).json({message: "Error upvoting Coffee Store",err})
    }

}

}

export default upvoteCoffeeStoreById;