import yoda from "../assets/yoda.webp";
export default function Home() {
  return (
    <section className="home">
      <h1>Star Wars Explorer</h1>
      <p>
        Browse Star Wars characters, search them by name and see detailed info.
      </p>

      <img
        className="yoda"
        src={yoda}
        alt="Yoda"
      />
    </section>
  );
}