import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async SeachTerm => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: SeachTerm,
          locale: 'pt_BR',
          location: 'porto alegre',
        },
      });

      setResults(response.data.businesses);
    } catch (err) {
      setErrorMessage('Something went wrong.');
    }
  };

  useEffect(() => {
    searchApi('');
  }, []);

  return [searchApi, results, errorMessage];
};
