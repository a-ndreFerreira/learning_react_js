"use client"

import Link from 'next/link'
import { useEffect } from 'react'

const Error = ({ error, reset }) => {
    useEffect(() => {
        console.log(error);
    }, [error])

    return (
        <div>
            <h1>
                Ops, algo deu errado...
            </h1>
            <div>
                <Link href={'/'}>
                    Voltar para o início.
                </Link>
            </div>
        </div>
    )
}

export default Error