  const [books, setBooks] = useState([]);
   const [loading, setLoading] = useState(false);
 
   useEffect(() => {
     setLoading(true);
     axios
       .get('http://localhost:5555/books') // Ensure this matches the backend's URL
       .then((response) => {
         setBooks(response.data.data);
         setLoading(false);
       })
       .catch((error) => {
         console.error(error);
         setLoading(false);
       });
   }, []); 
 
 
 {/* Main Content */}
  <main style={styles.main}>
  <h2 style={styles.sectionTitle}>Welcome to BookVerse</h2>
  <p style={styles.description}>
    Explore our collection of books, add your favorites to the wishlist, and manage your cart.
  </p>

  {/* Book List */}
  {loading ? (
    <p>Loading books...</p>
  ) : (
    <div style={styles.bookList}>
      {books.map((book) => (
        <div key={book._id} style={styles.bookCard}>
          <img
            src="https://via.placeholder.com/150"
            alt="Book Cover"
            style={styles.bookImage}
          />
          <h3 style={styles.bookTitle}>{book.title}</h3>
          <p style={styles.bookAuthor}>{book.author}</p>
          <button style={styles.addToCartButton}>Add to Cart</button>
        </div>
      ))}
    </div>
  )}
</main>