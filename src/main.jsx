import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import authservice from './appwrite/auth.js';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home.jsx';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/login',
        element:(
            <authlayout  authencation={false}>
              <login/>
            </authlayout>
        )
      }
    ]

  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,

);
