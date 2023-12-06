"use client";
import React, {useState} from 'react'
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const newUser :user = {
        email:"",
        password:""
    }
    const [user, setUser] = useState(newUser);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            console.log("user", user)
            const response = await axios.post("/api/users/login", user);
            console.log("response onSignup", response);
            router.push("/profile");
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
                Login
            </h1></div>
            
            <div className='my-8'>
                <label htmlFor="email">Email</label>
                <input id="email"
                    className='border border-gray-500 border-spacing-1 rounded-sm bg-white shadow-sm max-w-md'
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
            <button className='rounded-md text-lg border-gray-500 bg-slate-500' onClick={onLogin}>Login</button>
            <Link href="/signup">Sign up for new user</Link>
        </div>
    )
}

export default LoginPage
