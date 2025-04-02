import Link from "next/link";


export default function NotFound() {
    return (
        <div>
            <h1>
                Ops, página não encontrada...
            </h1>
            <div>
                <Link href={'/'}>
                    Voltar para o início.
                </Link>
            </div>
        </div>
    )
}
