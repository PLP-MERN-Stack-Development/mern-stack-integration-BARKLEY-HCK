import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useFetch(endpoint, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get(endpoint)
      .then(res => { if (mounted) setData(res.data); })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, deps); // eslint-disable-line
  return { data, loading, error };
}
