import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI;

declare global{
    var mongooseCache:{
        conn:typeof mongoose|null;
        promise:Promise<typeof mongoose>|null;
    }
}
//This upper code cache the connection not the data and prevent the creation of multiple connections to the db instead
//use the same connection or wait for the connection which is still in progress(promise) to finish instead of openingn 
//a new one.It's good enough for smaller or simpler apps but we will use connection pooling for larger or medium apps


let cached =global.mongooseCache;

if(!cached){
    cached=global.mongooseCache={conn:null,promise:null};
}

//In development Nextjs hard reload normally opens a new connection on every change in this function stores the connection 
//in a global cache so it doesn't keep opening new connections.
export const connectionToDatabase=async():Promise<typeof mongoose>=>{
    if(!MONGODB_URI) throw new Error('Error loading MONGODB_URI');

    if(cached.conn) return cached.conn; //If we have cached connection we will simply return it instead of creating a new one.

    if(!cached.promise){//cached.promise stores a promise for the ongoing connection if it doesn't exist means 
        //there is no connection in progress so we start a new connection 
        cached.promise=mongoose.connect(MONGODB_URI,{bufferCommands:false});//bufferCommands:true tells mongoose to 
        //queue any commands unitl the connection is ready.
    }

    try{
        cached.conn=await cached.promise;//await cached.promise waits for the connection to complete and then stores 
        //in cached.conn to reuse it in future requests.
        console.log(`Connected Database ${process.env.NODE_ENV}`);
        return cached.conn;
    }catch(err){
        cached.promise=null; //reset to null so that the next request can try connnecting again.
        throw err;
    }
}


