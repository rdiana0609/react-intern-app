import React, { useState, useEffect } from 'react';
import styles from './home.module.scss';


const useBase64Image = (path: string) => {
  const [base64, setBase64] = useState<string>('');

  useEffect(() => {
    fetch(path)
      .then(response => response.text())
      .then(data => setBase64(data));
  }, [path]);

  return base64;
};
type Card = {
  id: string;
  title: string;
  description: string;
};
const Home: React.FC = () => {
  const base64Image = useBase64Image('/background-image.txt'); 
  const base64bckg=useBase64Image('/backgroundbox.txt');
  const [cards, setCards] = useState<Card[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/cards.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const uniqueCards = data.map((card: Card, index: number) => ({
          ...card,
          id: `${card.id}-${index}`
        }));
        setCards(uniqueCards);
      } catch (error) {
        console.error('Error fetching the cards:', error);
        setError('Failed to load cards. Please try again later.');
      }
    };

    fetchCards();
  }, []);

  const handleAddOrUpdateCard = () => {
    if (!title.trim() || !description.trim()) {
      setError('Title and Description cannot be empty');
      return;
    }
    setError(null);

    if (editId !== null) {
      setCards(cards.map(card => card.id === editId ? { id: editId, title, description } : card));
      setEditId(null);
    } else {
      const newCard = { id: `${Date.now()}-${Math.random()}`, title, description };
      setCards([newCard, ...cards]);
    }

    setTitle('');
    setDescription('');
  };

  const handleEditCard = (id: string) => {
    const card = cards.find(card => card.id === id);
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setEditId(card.id);
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleToggleShowAll = () => {
    setShowAll(prevShowAll => !prevShowAll);
  };

  return (
    <div className={styles.home}  style={{ backgroundImage: `url(${base64bckg})`}}>
      <div className={styles.container}>
        <div className={styles['form-container']} >
          <h2>{editId !== null ? 'Edit Card' : 'Add New Card'}</h2>
          {error && <p className={styles.error}>{error}</p>}
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button onClick={handleAddOrUpdateCard}>
            <svg width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM4.5 8a.5.5 0 0 1 .5-.5H7v-2a.5.5 0 0 1 1 0v2h2a.5.5 0 0 1 0 1H8v2a.5.5 0 0 1-1 0V8H5a.5.5 0 0 1-.5-.5z"/>
            </svg>
            {editId !== null ? 'Update Card' : 'Add Card'}
          </button>
        </div>
        <div className={styles['cards-container']}>
          <h2>My Cards</h2>
          <div className={`${styles['card-list']} ${showAll ? styles.expanded : ''}`}>
            {(!showAll ? cards.slice(0, 3) : cards).map(card => (
              <div key={card.id} className={styles.card} style={{ backgroundImage: `url(${base64Image})` }}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <div className={styles['button-group']}>
                  <button className={styles.edit} onClick={() => handleEditCard(card.id)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDeleteCard(card.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {cards.length > 3 && (
            <button className={styles['see-all-button']} onClick={handleToggleShowAll}>
              {showAll ? 'Show Less' : 'See All'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
