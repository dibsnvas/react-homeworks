import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function RootLayout() {
  return (
    <div className="app-root">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
