import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link"
import { auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth"





export default function ErrorPage() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);


    function timerFunction() {
        let token = sessionStorage.getItem('token')
        if(token){
            console.log("masuk user");
            router.push('/home-page')
        } else {
            console.log("bukan user");
            router.push('/')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            timerFunction()
            console.log('test');
            if(loading)return
        },5000)
    },[])

    return (
        <>
        <div className="errorSection">
            <h1>404 PAGE NOT FOUND</h1>
            <h1>We&apos;ll Be Redirect To Home Page in 5 Seconds</h1>
            <Link href="/">
            <a>Click Here To Go Back Home</a>
            </Link>
        </div>
        </>
    )
}