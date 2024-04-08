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
        return fetch(`http://127.0.0.1:8000/schemas?db_user=${user}&db_password=${password}&db_host=${host}&db_port=${port}&db_name=${database}`);
    } catch (err) {
        console.error('Error while fetching schemas', err);
        return new Response(null, { status: 400 });
    }

}
