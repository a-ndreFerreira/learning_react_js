"use client"
import Image from "next/image";
import { useState } from "react";


export default function Owner({ avatar_url, name }) {
    const [show, setShow] = useState(false);
    return (
        <div>
            {show && (
                <>
                    <Image src={avatar_url} alt={name} width={55} height={55} />
                    <div>
                        <p>
                            Usuário: {name}
                        </p>
                    </div>
                </>
            )}
            <button type={'button'} onClick={() => setShow(!show)}>
                {show ? 'Ocultar nome' : 'Mostrar nome'}
            </button>
        </div>
    )
}
