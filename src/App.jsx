import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { BackToTop, RouteTitle, ScrollToTop, WhatsAppFab } from './components/shared';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ResearchPublication from './pages/ResearchPublication';
import ResearchCollaboration from './pages/ResearchCollaboration';
import ResearchSupport from './pages/ResearchSupport';
import Internships from './pages/Internships';
import Courses from './pages/Courses';
import ResearchAreas from './pages/ResearchAreas';
import { ForFaculty, ForStudents, ForScholars, ForInstitutions } from './pages/Audiences';
import FaqPage from './pages/FaqPage';
import Contact from './pages/Contact';
import Enquire from './pages/Enquire';
import { PrivacyPolicy, Terms, RefundPolicy, ResearchEthics, AuthorshipPolicy, Disclaimer } from './pages/Policies';
import NotFound from './pages/NotFound';

const App = () => (
  <Router>
    <RouteTitle />
    <ScrollToTop />
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/research-publication" element={<ResearchPublication />} />
          <Route path="/services/research-collaboration" element={<ResearchCollaboration />} />
          <Route path="/services/research-support" element={<ResearchSupport />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/research-areas" element={<ResearchAreas />} />
          <Route path="/for-faculty" element={<ForFaculty />} />
          <Route path="/for-students" element={<ForStudents />} />
          <Route path="/for-research-scholars" element={<ForScholars />} />
          <Route path="/for-institutions" element={<ForInstitutions />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enquire" element={<Enquire />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/research-ethics" element={<ResearchEthics />} />
          <Route path="/authorship-policy" element={<AuthorshipPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
      <BackToTop />
    </div>
  </Router>
);

export default App;
