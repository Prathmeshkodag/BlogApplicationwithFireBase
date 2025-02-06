
import { useRoutes } from 'react-router-dom';
import Login from './components/authontication/login/login';
import Signup from './components/authontication/singup/singup';
import Home from './components/home/home';
import { AuthContextProvider, useAuth } from './context/authcontext/authcontext';
import Header from './components/header/header';
import { Provider } from 'react-redux';
import store from './store/store';
import './assets/css/style.css';
import ViewBlog from './components/home/viewblog';

function App() {
  const {value}=useAuth();
  const routesArray = [
    {
      path: "*",
      element:value.userLoggedIn?<Home/>: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/singup",
      element: <Signup />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path:"/viewblog",
      element:<ViewBlog/>
    }
  ];
  let routesElement = useRoutes(routesArray);
  console.log(value.userLoggedIn)
  return (
    <div className="App">
      <Provider store={store}>
      
      <Header/>
      <div className='h-100'>{routesElement}</div>
      
      </Provider>
    </div>
  );
}

export default App;
