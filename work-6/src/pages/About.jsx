export default function About() {
  return (
    <section>
      <h1>About This Project</h1>
      <p>
        This is a simple React application created as part of a learning course.
        It allows users to browse and search for characters from the 
        Star Wars universe.
      </p>

      <h2>Technologies Used:</h2>
      <ul>
        <li>React</li>
        <li>React Router (for navigation)</li>
        <li>CSS (for styling)</li>
      </ul>

      <h2>Data Source</h2>
      <p>
        All data is provided by the <strong>Star Wars API (SWAPI)</strong>.
      </p>
      <p>
        You can learn more about it at <a href="https://swapi.dev/" target="_blank" rel="noopener noreferrer">swapi.dev</a>.
      </p>

      <h2>Author</h2>
      <p>
        Created by [Твое Имя] — 
        <a href="https://github.com/dibsnvas" target="_blank" rel="noopener noreferrer">
          My GitHub Profile
        </a>
      </p>
    </section>
  );
}