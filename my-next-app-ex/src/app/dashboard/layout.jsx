import Link from "next/link"

export const metadata = {
    title: "Painel de apresentação",
    description: "Apresentação dos repositórios do usuário",
    keywords: ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'NextJS'],
    openGraph: {
        title: 'Aprendendo Next JS',
        description: 'Web site criado com Next JS',
        images: ['https://img.freepik.com/vetores-gratis/fundo-de-onda-de-particula-gradiente_23-2150511960.jpg?t=st=1743551792~exp=1743555392~hmac=f24760916c798ea27fc707321346cfc9f759fdac0f0a8781b16f007290a76ec0&w=1380']
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noImageIndex: true,
        }
    }
};

export default function DashboardLayout({ children }) {
    const navItems = [
        { link: 'Settings', path: '/dashboard/settings' },
        { link: 'Registrar', path: '/dashboard/register' }
    ]
    return (
        <div>
            <h2>
                Header dashboard
            </h2>
            {
                navItems.map(({ link, path }) => (
                    <div key={path}>
                        <Link href={path}>
                            {link}
                        </Link>
                    </div>
                ))
            }
            {children}
        </div>
    )
}