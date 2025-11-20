// src/pages/ItemDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById } from '../services/itemsService';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await getItemById(id);
        if (!data) {
          setError('Not found');
        } else {
          setPerson(data);
        }
      } catch (err) {
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <section>
      <button onClick={() => navigate(-1)}>Back</button>

      {loading && <Spinner />}
      <ErrorBox message={error && error !== 'Not found' ? error : ''} />

      {!loading && error === 'Not found' && <p>Character not found.</p>}

      {!loading && !error && person && (
        <div className="person-details">
          <h1>{person.name}</h1>
          <p><strong>Birth year:</strong> {person.birth_year}</p>
          <p><strong>Gender:</strong> {person.gender}</p>
          <p><strong>Height:</strong> {person.height} cm</p>
          <p><strong>Mass:</strong> {person.mass} kg</p>
          <p><strong>Hair color:</strong> {person.hair_color}</p>
          <p><strong>Eye color:</strong> {person.eye_color}</p>
          <p><strong>Skin color:</strong> {person.skin_color}</p>
        </div>
      )}
    </section>
  );
}
