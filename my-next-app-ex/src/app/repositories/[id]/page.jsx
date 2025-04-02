

export default async function RepositoriesId({ params }) {
    const { id } = await params;
    return (
        <div>RepositoriesId {id}</div>
    )
}
