import React, { useState, useEffect } from 'react';
import Gallery from './pages/Gallery';
import Detail from './pages/Detail';
import ThemeToggle from './components/ThemeToggle';
import styles from './styles/App.module.css';

function App() {
  const [dark, setDark] = useState(() => {
    // Try to use system preference or localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [textId, setTextId] = useState(null);

  // Always sync <html> class on mount and when dark changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  // On mount, ensure <html> class matches localStorage/system
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', shouldBeDark);
    setDark(shouldBeDark);
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>
         Deutsch Text
        </h1>
        <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      </header>
      {textId ? (
        <Detail textId={textId} onBack={() => setTextId(null)} dark={dark} />
      ) : (
        <Gallery onSelectText={setTextId} dark={dark} />
      )}
    </div>
  );
}

export default App;
