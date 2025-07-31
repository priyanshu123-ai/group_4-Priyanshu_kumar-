import mongoose from "mongoose";


const database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected Successfully")
        
    } catch (error) {
        console.log(error)

        
    }
}

export default database