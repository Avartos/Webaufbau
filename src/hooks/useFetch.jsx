import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        fetch(url, {signal: abortController.signal})
            .then(res => {
                if(!res.ok) {
                    throw Error('Could not fetch data for that resource!');
                }
                return res.json();
            })
            .then ((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((error) => {
                if(error.name === 'AbortError') {
                    console.log('fetch abortet');
                } else {
                    setError(error.message);
                    setIsPending(false);
                }
            });
            return () => console.log(abortController.abort());
    }, [url]);

    return {
        data, isPending, error
    };
}

export default useFetch;