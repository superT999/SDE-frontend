export async function GET(
  request: Request
) {
    const { searchParams } = new URL(request.url);
    try {
        const user = searchParams.get('user')
        const password = searchParams.get('password')
        const host = searchParams.get('host')
        const port = searchParams.get('port')
        const database = searchParams.get('database')
        const schema = searchParams.get('schema')
        const page = searchParams.get('page')
        const per_page = searchParams.get('per_page')
        return fetch(`http://127.0.0.1:8000/tables?db_user=${user}&db_password=${password}&db_host=${host}&db_port=${port}&db_name=${database}&schema=${schema}&page=${page}&per_page=${per_page}`);
    } catch (err) {
        console.error('Error while fetching schemas', err);
        return new Response(null, { status: 400 });
    }

}
