"use client"
import { useEffect, useState } from "react"

export default function Repositories() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const url = "https://api.github.com/users/devfraga/repos";
        function getData() {
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    setRepos(data);
                });

        }
        getData()
    }, [])
    return (
        <div>
            <h1>
                Repositorios
            </h1>
            <section>
                {repos.map((item) => (
                    <div key={item.id}>
                        <strong>Repositório:</strong> {item.name}
                        <br />
                        <i>
                            {item.full_name}
                        </i>
                        <br /><br />
                    </div>
                ))}
            </section>
        </div>
    )
}
