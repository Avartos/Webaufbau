import React, { useEffect, useState } from 'react';

import Forum from './forum';

const ForumList = () => {
    const [forums, setForums] = useState (); 

    
    const fetchForums = (handleAddAlert) => {
        const abortController = new AbortController();
        fetch('http://localhost:3001/api/forums', {
            signal: abortController.signal,
            headers: {
                "Content-Type": "application/json",
                accessToken: sessionStorage.getItem("accessToken"),
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw Error(
                    "Fehler beim Anzeigen der Foren! Bitte versuchen Sie es später erneut."
                );
            }
            return res.json();
        })
        .then((data) => {
            setForums(data);
            console.log(data);
          })
        .catch((error) => {
            if (error.name === "AbortError") {
              console.log("fetch abortet");
            } else {
              handleAddAlert("error", "Fehler", error.message);
            }
          });
        return () => console.log(abortController.abort()); 
    }

    useEffect(fetchForums, []);
 
        return ( 
            <React.Fragment>
                Hi

            </React.Fragment>
        );
    
}
 
export default ForumList;