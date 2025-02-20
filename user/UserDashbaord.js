import { Outlet } from 'react-router-dom';
import Sidebar from './components_/Sidebar';


function UserDashboard() {
  return (

      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <main className="mt-16 bg-gray-50 min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>

  );
}

export default UserDashboard;