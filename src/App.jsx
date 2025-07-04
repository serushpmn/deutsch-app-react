import React, { useState } from 'react';
import Gallery from './pages/Gallery';
import Detail from './pages/Detail';
import styles from './styles/App.module.css';

function App() {
  const [textId, setTextId] = useState(null);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>
         Deutsch Text
        </h1>
      </header>
      {textId ? (
        <Detail textId={textId} onBack={() => setTextId(null)} />
      ) : (
        <Gallery onSelectText={setTextId} />
      )}
    </div>
  );
}

export default App;
