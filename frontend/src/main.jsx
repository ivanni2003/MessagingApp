import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App'
import Profile from './views/Profile/Profile'
import Search from './views/Search/Search'
import Messages from './views/Messages/Messages'
import Posts from './views/Posts/Posts'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
     children: [
      { path: "profile", element: <Profile /> },
      { path: "search", element: <Search /> },
      { path: "messages", element: <Messages />},
      { path: "posts", element: <Posts />}
    ],
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
