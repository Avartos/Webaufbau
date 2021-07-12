import {useLocation} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {CircularProgress} from "@material-ui/core";

const SearchList = () => {
    let title = new URLSearchParams(useLocation().search).get("q");

    const [result, setResult] = useState([])
    const [isPending, setIsPending] = useState(true);


    const fetchSearchQuery = (query) => {
        //used to stop fetching when forcing reload
        const abortController = new AbortController();
        setIsPending(true);
        fetch(`http://localhost:3001/api/threads/search?q=`, {
            signal: abortController.signal,
            headers: {
                "Content-Type": "application/json",
                // undefined, if the user is not looged in
                accessToken: sessionStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error(
                        "Fehler beim Abrufen der Threads! Bitte versuchen Sie es später erneut."
                    );
                }
                return res.json();
            })
            .then((data) => {
                setResult(data);
                setIsPending(false);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("fetch abortet");
                } else {
                    setIsPending(false);
                }
            });
        return () => console.log(abortController.abort());
    };

    useEffect(() => {
        fetchSearchQuery(title)
    }, [])
    return (
        <div>
            {console.log(result)}
            {!isPending && (
                result.map((entry => {
                    return(
                        <React.Fragment>
                            <div>
                                {entry.title}
                            </div>
                            <div>
                                {entry.content}
                            </div>
                        </React.Fragment>
                    )
                }))
            )}
        </div>
    )
}
export default SearchList;