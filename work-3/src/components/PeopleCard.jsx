import '../styles/peopleCard.css';


export default function PeopleCard({ person }) {
const { name, gender, birth_year, height, mass } = person;
return (
<li className="people-card">
<h3 className="people-card__title">{name}</h3>
<dl className="people-card__meta">
<div>
<dt>Gender</dt>
<dd>{gender}</dd>
</div>
<div>
<dt>Birth year</dt>
<dd>{birth_year}</dd>
</div>
<div>
<dt>Height</dt>
<dd>{height} cm</dd>
</div>
<div>
<dt>Mass</dt>
<dd>{mass} kg</dd>
</div>
</dl>
</li>
);
}