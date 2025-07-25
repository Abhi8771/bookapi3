import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import { useEffect, useState } from 'react';
import Logout from './components/Logout';
import axios from 'axios';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import AppNavbar from './components/AppNavbar';

axios.defaults.withCredentials = true;

function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
  axios.get('https://bookapi3-1.onrender.com/auth/verify')
    .then(res => {
      if (res.data.login) {
        setRole(res.data.role);
      } else {
        setRole('');
      }
      console.log(res);
    })
    .catch(err => console.log(err));
}, []);


  return (
    <BrowserRouter>
      <AppNavbar role={role} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books role={role} />} />
        <Route path='/login' element={<Login setRoleVar={setRole} />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addstudent' element={<AddStudent />} />
        <Route path='/logout' element={<Logout setRole={setRole} />} />
        <Route path='/addbook' element={<AddBook />} />
        <Route path='/book/:id' element={<EditBook />} />
        <Route path='/delete/:id' element={<DeleteBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
