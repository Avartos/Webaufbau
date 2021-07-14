import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Contribution from "./contribution";
import DescriptionThread from "./descriptionThread";
import NewContributionForm from "./createContribution";
import { useEffect } from "react";
import ThreadHeader from "./threadHeader";

const Contributions = ({ handleAddAlert, handleUpdateFavbar }) => {
    const [contributions, setContributions] = useState([]);
    const [thread, setThread] = useState(null);
    const { threadId } = useParams("threadId");
    const history = useHistory();

    const [visible, setVisible] = useState(false);

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
                setContributions([...data]);
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
                if(data.length === 0) {
                    throw Error('Der gesuchte Thread existiert nicht!');
                }
                setThread(data);
                console.log(data);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("fetch abortet");
                } else {
                    handleAddAlert("error", "Fehler", error.message);
                    history.push('/404');
                }
            });
        return () => console.log(abortController.abort());
    };

    useEffect(fetchThreadHeader, []);

    const handleAddContribution = async (e, contributionText, currentUser) => {
        e.preventDefault();
        const text = (currentUser)?`@${currentUser} ${contributionText}`:contributionText;

        let newContribution = {
            contributionText: text,
        };

        const response = await fetch(`http://localhost:3001/api/contributions/${threadId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accessToken: sessionStorage.getItem("accessToken"),
            },
            body: JSON.stringify(newContribution),
        });

        if (!response.ok) {
            return handleAddAlert("error", "Fehler", "Das Formular konnte nicht abgeschickt werden.");
        }
        fetchContributions();
        handleAddAlert(
            "success",
            "",
            "Ihr Beitrag wurde erfolgreich angelegt!"
        );
        // .then((res) => {
        //     if (!res.ok) {
        //         throw Error("Das Formular konnte nicht abgeschickt werden.");
        //     }
        //     fetchContributions();
        //     handleAddAlert(
        //         "success",
        //         "",
        //         "Ihr Beitrag wurde erfolgreich angelegt!"
        //     );
        // })
        // .catch((error) => {
        //     handleAddAlert("error", "Fehler", error.message);
        // });
    };

    const handleRate = (rate, contributionId) => {
        const newRate = { rating: rate };

        fetch(`http://localhost:3001/api/ratings/${contributionId}`, {
            method: 'POST', body: JSON.stringify(newRate),
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
                fetchContributions();
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("fetch abortet");
                } else {
                    handleAddAlert("error", "Fehler", error.message);
                }
            });

    }

    /**
     * Fetch threads whenever the component has been mounted
     */
    // useEffect(() => {
    //     fetchThreads();
    //     fetchForum();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // setContributions([...contributions, newContribution]);

    const openForm = (event) => {
        event.preventDefault();
        setVisible(true)
    }

    return (
        <div className="contributions">
            <React.Fragment>
                {thread && thread.length > 0 && (
                    <ThreadHeader
                        thread={thread}
                        handleAddContribution={handleAddContribution}
                        handleAddAlert={handleAddAlert}
                        handleUpdateFavbar={handleUpdateFavbar}
                        fetchThreadHeader={fetchThreadHeader}
                    />
                )}
                {/* <NewContributionForm handleSubmitForm={handleSubmitNewContribution} /> */}
                <div className="contributionsList">
                    {contributions.map((contribution, index) => {
                        return <Contribution handleAddAlert={handleAddAlert} handleSubmitContribution={handleAddContribution} threadId={threadId} contribution={contribution} key={index} handleRate={handleRate} />;
                    })}
                </div>
            </React.Fragment>
        </div>
    );
};

export default Contributions;
