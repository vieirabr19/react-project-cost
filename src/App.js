import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import About from './pages/about';
import Contact from './pages/contact';
import Home from './pages/home';
import Projects from './pages/projects';
import DetailProject from './pages/projects/detailProject';
import NewProject from './pages/projects/NewProject';

function App() {
  return (
    <Router>
      <Header />
      <div className="main">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/detailproject/:id" element={<DetailProject />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
