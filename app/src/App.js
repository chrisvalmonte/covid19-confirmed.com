import React from 'react';

import { Map } from './Map';
import { PageTemplate } from './PageTemplate';

import styles from './App.css'; // eslint-disable-line

function App() {
  return (
    <PageTemplate>
      <Map />
    </PageTemplate>
  );
}

export default App;
