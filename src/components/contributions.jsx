import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Contribution from './contribution';
import DescriptionThread from './descriptionThread';
import NewContributionForm from './createContribution';
import { useEffect } from 'react';
import ThreadHeader from './threadHeader';

const Contributions = ({ handleAddAlert }) => {
    const [contributions, setContributions] = useState([]);
    const [thread, setThread] = useState(null);
    const { threadId } = useParams("threadId");

    const fetchContributions = () => {
        const abortController = new AbortController();
        fetch(`http://localhost:3001/api/contributions/all/${threadId}`, {
            signal: abortController.signal,
            headers: {
                "Content-Type": "application/json",
                accessToken: sessionStorage.getItem("accessToken"),
            },
        })

            .then((res) => {
                if (!res.ok) {
                    throw Error(
                        "Fehler beim Abrufen der Contributions! Bitte versuchen sie es später erneut!"
                    );
                }
                return res.json();
            })
            .then((data) => {
                setContributions(data);
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
    };

    useEffect(fetchContributions, []);

    const fetchThreadHeader = () => {
        const abortController = new AbortController();
        fetch(`http://localhost:3001/api/threads/${threadId}`, {
            signal: abortController.signal,
            headers: {
                "Content-Type": "application/json",
                accessToken: sessionStorage.getItem("accessToken"),
            },
        })

            .then((res) => {
                if (!res.ok) {
                    throw Error(
                        "Fehler beim Abrufen der Contributions! Bitte versuchen sie es später erneut!"
                    );
                }
                return res.json();
            })
            .then((data) => {
                setThread(data);
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
    };

    useEffect(fetchThreadHeader, []);

    const handleAddContribution = (e, contributionText) => {
         e.preventDefault();

        let newContribution = {
            
            contributionText: contributionText,
            
        }

        fetch(`http://localhost:3001/api/contributions/${threadId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accessToken: sessionStorage.getItem("accessToken"),
            },
            body: JSON.stringify(newContribution),
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Das Formular konnte nicht abgeschickt werden.");
                }
                fetchContributions();
                handleAddAlert("success", "", "Ihr Beitrag wurde erfolgreich angelegt!");
            })
            .catch((error) => {
                handleAddAlert("error", "Fehler", error.message);
            });
    };



    /**
     * Fetch threads whenever the component has been mounted
     */
    // useEffect(() => {
    //     fetchThreads();
    //     fetchForum();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps


   // setContributions([...contributions, newContribution]);

    return (
        <div className="contributions">
            <React.Fragment>
               {thread && <ThreadHeader thread={
                    thread
                }
                    handleAddContribution={handleAddContribution}
                    handleAddAlert={handleAddAlert}
                /> }
                {/* <NewContributionForm handleSubmitForm={handleSubmitNewContribution} /> */}
                <div className="contributionsList">
                    {contributions.map((contribution, index) => {
                        return (
                            <Contribution
                                contribution={contribution}
                                key={index}
                            />
                        );
                    })}
                </div>
            </React.Fragment>
        </div>
    );
}

export default Contributions;
