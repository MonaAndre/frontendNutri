import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { UserProvider } from './contexts/UserProvider';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
