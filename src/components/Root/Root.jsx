import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '~components/Layout/Layout';
import AboutPage from '~pages/AboutPage/AboutPage';
import DocumentsList from '~pages/DocumentsList/DocumetsList';

function Root() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DocumentsList />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default Root;
