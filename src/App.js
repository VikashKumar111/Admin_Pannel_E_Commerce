
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<Resetpassword />}  />
      </Routes>
    </Router>
  );
}

export default App;
