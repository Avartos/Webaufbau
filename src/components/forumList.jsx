import { ControlCameraOutlined } from '@material-ui/icons';
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

    const handleSubscribeForum = (id, isSubscribed) => {
    /*    const subscribeMethod = isSubscribed ? "DELETE" : "POST";
    
        fetch(`http://localhost:3001/api/forum/subscriptions/${id}`, {
          method: subscribeMethod,
          headers: {
            "Content-Type": "application/json",
            accessToken: sessionStorage.getItem("accessToken"),
          },
        })
          .then((req) => {
            if (!req.ok) {
              throw Error("Das Forum konnte nicht abonniert werden.");
            }
          })
          .catch((error) => {
            setError(error);
            handleAddAlert("error", "Fehler", error.message);
          });*/
      };

    useEffect(fetchForums, []);
 
    return ( 
        <React.Fragment>
            <div className="forumList">
            {          
                forums.map((forum) => {
                    return (
                        <Forum 
                            key={forum.id}
                            name={forum.name}
                            description={forum.description}
                            numberOfThreads={forum.numberOfThreads}
                            numberOfComments={forum.numberOfComments}
                            lastActivityFrom={forum.lastActivityFrom}
                            lastActivityAt={forum.lastActivityAt}
                            handleSubscribeForum={handleSubscribeForum}
                        />
                    );
            	})}
            </div>
        </React.Fragment>
    );
    
};
 
export default ForumList;