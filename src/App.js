import logo from './logo.svg';
import './App.css';
import Category from './components/Category';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from './components/Form';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Category></Category>}></Route>
          <Route path='/form' element={<Form></Form>}></Route>
        </Routes>
      </Router>
      
    
    </div>
  );
}

export default App;
