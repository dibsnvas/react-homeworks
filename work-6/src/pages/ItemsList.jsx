import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchItems } from '../services/itemsService';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import PeopleList from '../components/PeopleList';

export default function ItemsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await searchItems(q);
        setPeople(data);
      } catch (err) {
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [q]);

  function handleSearchChange(e) {
    const value = e.target.value;
    if (value) setSearchParams({ q: value });
    else setSearchParams({});
  }

  return (
    <section>
      <h1>Star Wars Characters</h1>
      <p>Search by name using server-side filtering.</p>

      <input
        type="text"
        placeholder="Search..."
        value={q}
        onChange={handleSearchChange}
      />

      {loading && <Spinner />}
      <ErrorBox message={error} />

      {!loading && !error && people.length === 0 && (
        <p>No characters found.</p>
      )}

      <PeopleList items={people} />
    </section>
  );
}
