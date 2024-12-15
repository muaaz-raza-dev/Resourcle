import mongoose from 'mongoose';
export const dbConnection = async ()=>{
    try {
    const uri:string = process.env.db as string;
        await mongoose.connect(uri,{dbName:"resource"})
        console.log('Mongo server is connected successfuly!')
    }
    catch(err){
        console.log('An error ocurred while connection with mongodb',err)
    }
}