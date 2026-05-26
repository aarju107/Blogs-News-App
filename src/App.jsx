import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Home from './pages/Home';
import ProtectedRoute from './ProtectedRoute';
import Blogs from './pages/Blogs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/blogs' element={<Blogs/>}/>
      </Routes>
    </Router>
  );
}

export default App;
