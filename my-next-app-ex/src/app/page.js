import Owner from "@/components/owner";

async function getData() {
  const url = "https://api.github.com/users/a-ndreFerreira/repos";
  const response = await fetch(url, { next: { revalidate: 60 } });
  return response.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <div>
      <h1>
        Pagina Home
      </h1>
      <h2>
        Meus Repositórios
      </h2>

      <div>
        {data.map(({ id, name, full_name, owner }) => (
          <div key={id}>
            <strong>Repositório:</strong> {name}
            <br />
            <i>
              {full_name}
            </i>
            <Owner avatar_url={owner?.avatar_url} name={owner?.login} />

            <hr /> <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
