import { RouterProvider } from 'react-router-dom';
import '../src/App.css';
import { router } from "./Router";

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
