import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import Profile from './views/ProfileView/ProfileView'
import Search from './views/SearchView/SearchView'
import Messages from './views/MessageView/MessageView'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
     children: [
      { path: "profile", element: <Profile /> },
      { path: "search", element: <Search /> },
      { path: "messages", element: <Messages />}
    ],
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
