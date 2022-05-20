import { useEffect, useState } from 'react'
import { GET_FRIENDSHIPS_INVITATIONS } from 'src/graphql/queries';
import { useQuery } from "@apollo/client"

export const useFriendshipsInvitationsQuery = (query, variables) => {
    const { subscribeToMore, ...result } = useQuery(GET_FRIENDSHIPS_INVITATIONS);

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
