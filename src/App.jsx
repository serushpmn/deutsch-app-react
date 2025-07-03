import React, { useState } from 'react';
import Gallery from './pages/Gallery';
import Detail from './pages/Detail';
import ThemeToggle from './components/ThemeToggle';
import styles from './styles/App.module.css';

function App() {
  const [dark, setDark] = useState(false);
  const [textId, setTextId] = useState(null);
  const [dir, setDir] = useState('rtl'); // 'rtl' for Persian, 'ltr' for German

  React.useEffect(() => {
    document.body.className = dark ? 'dark' : '';
    document.body.dir = dir;
  }, [dark, dir]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          کتابخانه دوزبانه 🇩🇪 🇮🇷
        </h1>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={() => setDir(dir === 'rtl' ? 'ltr' : 'rtl')}>
            {dir === 'rtl' ? 'EN/DE' : 'FA'}
          </button>
          <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
        </div>
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
