import { betterAuth } from "better-auth";
import { mongodbAdapter} from "better-auth/adapters/mongodb";
import { connectionToDatabase } from "@/database/mongoose";
import { nextCookies} from "better-auth/next-js";

let authInstance:ReturnType<typeof betterAuth> | null = null; //This is a singelton instance and it ensures that 
//we create only one instance which prevents multiple connection and improves performance.

export const getAuth = async() =>{
    if(authInstance) return authInstance;

    const mongoose = await connectionToDatabase();//These two lines helps us connect to MongoDb.
    const db=mongoose.connection.db;

    if(!db) throw new Error('MongoDb connection not found.');


    //authInstance :- “Hey Better Auth, here’s my database, my secret key, how I want email/password login to work,
    //and which plugins I want (like cookies). Please create the full authentication engine for me.”
    authInstance = betterAuth({
        database: mongodbAdapter(db),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        plugins: [nextCookies()],
    });

    //Purpose of authInstance:-

    // ~ Handles user sign-in/sign-up
    // ~ Manages sessions
    // ~ Validates tokens
    // ~ Integrates with your database
    // ~ Works with Next.js cookies

    return authInstance;
}

export const auth=await getAuth();