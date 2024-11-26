import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '~components/Layout/Layout';

function Root() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Hello World</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default Root;
