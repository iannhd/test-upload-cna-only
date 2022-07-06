import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link"




export default function ErrorPage() {
    const [seconds, setShowSeconds] = useState(5)
    const router = useRouter();

    function timerFunction() {
        router.push('/')
    }

    useEffect(() => {
        setTimeout(() => {
            console.log('test');
            setShowSeconds(seconds--)
            timerFunction()
        },5000)
    })

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