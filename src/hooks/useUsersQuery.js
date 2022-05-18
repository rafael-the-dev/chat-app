import { useEffect, useState } from 'react'
import { GET_USERS } from 'src/graphql/queries';
import { useQuery } from "@apollo/client"

const useUsersQuery = (query, variables) => {
    const { subscribeToMore, ...result } = useQuery(GET_USERS);

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
  
    useEffect(() => {
        if(result.data) {
            setData(result.data);
        }
    }, [ result ]);
  
    return { data, loading, error };
};

export default useUsersQuery;