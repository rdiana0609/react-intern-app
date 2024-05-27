import React, { useEffect, useState } from 'react';
import { currentEnvironment } from '@constants';
import styles from './users.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

type Gender = 'female' | 'male' | '';

type User = {
  gender: Gender;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
};

const Users = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>('');
  const [pageToGet, setPageToGet] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);// Improved: Added loading state
  const [showFilters, setShowFilters] = useState<boolean>(false);// Improved: Added state to control filter visibility

  const getUsers = async (page: number, gender: Gender) => {
    setLoading(true);
    const genderQuery = gender ? `&gender=${gender}` : '';
    const result = await fetch(
      `${currentEnvironment.api.baseUrl}?results=5&page=${page}${genderQuery}`,
    );
    const data = await result.json();
    const usersResults = data.results as User[];

    setUsers((oldUsers) => (page === 1 ? usersResults : [...oldUsers, ...usersResults]));
    setLoading(false);// Improved: Set loading to false after fetch
  };

  useEffect(() => {
    getUsers(pageToGet, gender);
  }, [pageToGet, gender]);// Improved: Added gender to dependency array

  const handleFilterChange = (newGender: Gender) => {
    setGender(newGender);
    setPageToGet(1);// Improved: Reset page number when filter changes
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users</h1>
        
      </div>
      <div className={`${styles.tabContainer} ${showFilters ? styles.show : ''}`}>
        <button
          className={`${styles.tab} ${gender === '' ? styles.activeTab : ''}`}
          onClick={() => {
            handleFilterChange('');
            setShowFilters(false); //Improved: Close filters on selection
          }}
        >
          All
        </button>
        <button
          className={`${styles.tab} ${gender === 'female' ? styles.activeTab : ''}`}
          onClick={() => {
            handleFilterChange('female');
            setShowFilters(false); // Improved:Close filters on selection
          }}
        >
          Female
        </button>
        <button
          className={`${styles.tab} ${gender === 'male' ? styles.activeTab : ''}`}
          onClick={() => {
            handleFilterChange('male');
            setShowFilters(false); // Close filters on selection
          }}
        >
          Male
        </button>
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      {users.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.login.uuid}>
                <td>{user.name.first + ' ' + user.name.last}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <div className={styles.noUsers}>No users available</div>
      )}
      <button
        className={styles.loadButton}
        type="button"
        onClick={() => {
          setPageToGet((prev) => prev + 1);// Improved: Inrement page to get more users
        }}
        disabled={loading} // Improved: Disable button when loading
      >
        Load More
      </button>
    </div>
  );
};

export default Users;

// 1. The logo looks tiny on smaller devices.
// 2. TEC theme is not displayed on the app bar instead a green color is seen.
// 3. Users screen does not display any data.
// 4. Load more button style is not working.
// 5. Style issues are encountered on the page - style however you want.
// 6. Additional data is not displayed upon using "Load more" button.
// 7. Users are not filtered by gender and the list does not reset on change select.
// 8. No loading state is displayed when accessing "Users" component.
// 9. On home page user should be able to do the following actions with cards that contain
// 2 fields: Title and Description
//     - See all the cards already added
//     - Add a card
//     - Update a card
//     - Delete a card