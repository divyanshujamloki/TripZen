export default async function handler() {
  try {
    const res = await fetch('https://tripzenbackend.onrender.com/api/trips?limit=1');
    console.log(`Keep-alive ping: ${res.status}`);
    return new Response(JSON.stringify({ ok: res.ok, status: res.status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Keep-alive failed:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  schedule: '*/14 * * * *',
};
