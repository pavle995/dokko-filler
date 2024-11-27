import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '~components/Layout/Layout';
import DocumentsList from '~pages/DocumentsList/DocumetsList';

function Root() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DocumentsList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default Root;
