"use client";
import React, {useState} from 'react'
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SignupPage = () => {
    const newUser :user = {
        email:"",
        username:"",
        password:""
    }
    const [user, setUser] = useState(newUser);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    console.log("jsadgj", process.env.NEXT_PUBLIC_MONGO_URL, process.env.DB_HOST)

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("response onSignup", response);
            router.push("/login");
        } catch (error:any) {
            console.log("sign in failed", error.message)
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }   

    return (
        <div className='flex flex-col items-center justify-center'>
            <div><h1 className='text-center text-black text-2xl'>
                Signup
            </h1></div>
            <div className='my-8'>
                <label htmlFor="username">Username</label>
                <input id="username"
                    className=' border border-gray-500 border-spacing-1 rounded-sm bg-white shadow-sm max-w-md'
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({
                        ...user,
                        username:e.target.value
                    })}
                />
            </div>
            <div className='my-8'>
                <label htmlFor="email">Email</label>
                <input id="email"
                    className=' border border-gray-500 border-spacing-1 rounded-sm bg-white shadow-sm max-w-md'
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({
                        ...user,
                        email:e.target.value
                    })}
                />
            </div>
            <div className='my-8'>
                <label htmlFor="password">Password</label>
                <input id="password"
                    className='border border-gray-500 border-spacing-1 rounded-sm bg-white shadow-sm max-w-md'
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({
                        ...user,
                        password:e.target.value
                    })}
                />
            </div>
            <button className='rounded-md text-lg border-gray-500 bg-slate-500' onClick={onSignup}>Submit</button>
            <Link href="/login">Back to Login</Link>
        </div>
    )
}

export default SignupPage
