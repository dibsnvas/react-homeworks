import { useState } from 'react';
import PeopleList from './components/PeopleList';


export default function App() {
const [people, setPeople] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');


async function handleLoad() {
try {
setLoading(true);
setError('');
// Fetch the first page of Star Wars characters
const res = await fetch('https://swapi.dev/api/people/?page=1');
if (!res.ok) throw new Error('Failed to fetch characters');
const data = await res.json();
setPeople(data.results || []);
} catch (e) {
setError(e.message || 'Unknown error');
} finally {
setLoading(false);
}
}


return (
<div style={{ maxWidth: 960, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
<h1 style={{ marginBottom: 12 }}>Star Wars — People</h1>
<p style={{ marginTop: 0, color: '#555' }}>Click the button to load characters from SWAPI and render them as a list of cards.</p>


<button onClick={handleLoad} disabled={loading} style={{
padding: '10px 16px',
borderRadius: 8,
border: '1px solid #ddd',
cursor: loading ? 'not-allowed' : 'pointer',
fontWeight: 600,
background: loading ? '#f2f2f2' : '#fff'
}}>
{loading ? 'Loading…' : 'Load'}
</button>


{error && (
<div role="alert" style={{ marginTop: 12, color: '#b00020' }}>{error}</div>
)}


{/* Pass data via props to the List component (which passes to Card) */}
<PeopleList items={people} />
</div>
);
}