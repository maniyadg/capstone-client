import logo from './logo.svg';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import '@fortawesome/free-solid-svg-icons';
import Materialize from 'materialize-css'
import Home from './Home';
import Login from './Login';
import Register from './Register';
import PortalLayout from './PortalLayout';
import Forget from './Forget';
import Resetpass from './Resetpass';
import Product from './Product';
import Createproduct from './Createproduct';
import EditProduct from './Editproduct';
import Viweproduct from './Viewproduct';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
  <Route path='/' element={< Home />}></Route>
  <Route path='/login' element={< Login />}></Route>
  <Route path='/register' element={< Register />}></Route>
  <Route path='/forget' element={< Forget />}></Route>
  <Route path='/admin/user/reset-password/:id/:token' element={< Resetpass />}></Route>
  <Route path='/portal' element={< PortalLayout />}>
  <Route path='product' element={< Product />}></Route>
  <Route path='dashboard' element={< Dashboard />}></Route>
  <Route path='create-product' element={< Createproduct />}></Route>
  <Route path='edit-product/:_id' element={< EditProduct />}></Route>
  <Route path='view-product/:_id' element={< Viweproduct />}></Route>
  </Route>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
