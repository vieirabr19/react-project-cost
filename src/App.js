import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './core/header';
import About from './pages/about';
import Contact from './pages/contact';
import DetailProject from './pages/detailProject';
import Home from './pages/home';
import NewProject from './pages/newProject';
import Projects from './pages/projects';

function App() {
  return (
    <Router>
      <Header />
      <div className="main">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/detailproject/:id" element={<DetailProject />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
