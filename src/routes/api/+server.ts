import { error } from '@sveltejs/kit';

export async function GET(params: { url: { searchParams: URLSearchParams }}) {
  const url = params.url.searchParams.get('url')

  if (!url) throw error(400, 'missed url')

  try {
    const res = await fetch(`https://api.battlemon.com` + url);
    const data = await res.json();
    
    return new Response(JSON.stringify(data));
  } catch(e) {
    throw error(400, 'wrong url')
  }
}