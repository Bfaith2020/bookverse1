import React from 'react';

const MainSection = () => {
  return (
    <main style={styles.main}>
      <h2 style={styles.sectionTitle}>Trending Books</h2>
      <p style={styles.description}>Explore the most popular books of the season!</p>
      {/* Add book list or other content here */}
    </main>
  );
};

const styles = {
  main: {
    flex: 1,
    padding: '20px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1rem',
    marginBottom: '20px',
  },
};

export default MainSection;
