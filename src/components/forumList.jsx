import { ControlCameraOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import config from '../core/config';

import Forum from './forum';

const ForumList = ({handleAddAlert}) => {
    const [forums, setForums] = useState (); 

    const [isPending, setIsPending] = useState(true);

    
    const fetchForums = () => {
        const abortController = new AbortController();
        fetch(`${config.serverPath}/api/forums`, {
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
            setIsPending(false);
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
        const subscribeMethod = isSubscribed ? "DELETE" : "POST";
    
        fetch(`${config.serverPath}/api/forums/subscriptions/${id}`, {
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
            let updatedForums = forums;
            console.log(updatedForums);
            const index = updatedForums.findIndex((forum) => forum.forumsID === id);
            updatedForums[index].subscriptionUsersId = updatedForums[index]
              .subscriptionUsersId
              ? null
              : true;
            setForums([...updatedForums]);
          })
          .catch((error) => {
            handleAddAlert("error", "Fehler", error.message);
          });
      };

    useEffect(fetchForums, []);
 
    return ( 
        <React.Fragment>
            <div className="forumList">
            {!isPending &&
                forums &&          
                forums.map((forum) => {
                    console.log(forum)
                    return (
                        <Forum 
                            key={forum.forumsID}
                            id={forum.forumsID}
                            name={forum.name}
                            description={forum.description}
                            numberOfThreads={forum.numberOfThreads}
                            createdAt={forum.createdAt}
                            lastActivityFrom={forum.lastActivityFrom}
                            updatedAt={forum.updatedAt}
                            handleSubscribeForum={handleSubscribeForum}
                            subscriptionUsersId={forum.subscriptionUsersId}
                        />
                    );
            	})}
            </div>
        </React.Fragment>
    );
    
};
 
export default ForumList;