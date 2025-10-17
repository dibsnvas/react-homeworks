import SomethingList from "./components/SomethingList";

const data = [
  { id: 1, title: "React Basics", subtitle: "Hooks, JSX, components" },
  { id: 2, title: "Advanced React Patterns", subtitle: "Render props, HOC, composition" },
  { id: 3, title: "TypeScript with React", subtitle: "Props typing, generics" },
  { id: 4, title: "State Management", subtitle: "Redux, Zustand, Context" },
  { id: 5, title: "Testing React", subtitle: "RTL, Vitest/Jest" },
];

export default function App() {
  return <SomethingList items={data} />;
}
