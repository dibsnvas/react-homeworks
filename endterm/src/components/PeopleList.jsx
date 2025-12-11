import '../styles/peopleList.css';
import PeopleCard from './PeopleCard';


export default function PeopleList({ items = [] }) {
return (
<ul className="people-list">
{items.map((p) => (
<PeopleCard key={p.name} person={p} />
))}
</ul>
);
}