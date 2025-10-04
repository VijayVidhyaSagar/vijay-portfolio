import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './components/HomeLayout'

// Lazy load page components
const Home = React.lazy(() => import('./pages/Home'));
const Ideas = React.lazy(() => import('./pages/Ideas'));
const About = React.lazy(() => import('./pages/About'));
const Skills = React.lazy(() => import('./pages/Skills'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Projects = React.lazy(() => import('./pages/Work'));

function App() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          {/* This is the default page shown at '/' */}
          <Route index element={<Home />} />
          <Route path='ideas' element={<Ideas />} />
          <Route path="about" element={<About />} />
          <Route path='skills' element={<Skills />} />
          <Route path='work' element={<Projects />} />
          <Route path='contact' element={<Contact />} />
          {/* You can add more routes here for skills, projects, etc. */}
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
