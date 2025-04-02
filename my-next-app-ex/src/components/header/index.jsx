import Link from "next/link"
import styles from '@/components/header/header.module.css'

export default function Header() {
    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'Dashboard', path: '/dashboard' },
        { link: 'Contatos', path: '/contacts' },
        { link: 'Repositórios', path: '/repositories' },
    ]
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>
                    devRepos
                </h1>
            </div>
            <nav className={styles.nav}>
                {
                    navItems.map(({ link, path }) => (
                        <Link key={path} href={path} className={styles.link}>
                            {link}
                        </Link>
                    ))
                }
            </nav>
        </header>
    )
}
