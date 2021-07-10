import {useState, useEffect} from 'react';

const MyProfile = () => {
    
    const [isPending, setIsPending] = useState(true);
    const [user, setUser] = useState();

    const fetchUser = () => {
        //used to stop fetching when forcing reload
        const abortController = new AbortController();
        setIsPending(true);
        fetch(
          `http://localhost:3001/api/users/`,
          {
            signal: abortController.signal,
            headers: {
              "Content-Type": "application/json",
              'accessToken': sessionStorage.getItem('accessToken')
            },
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw Error("Could not fetch data for that resource!");
            }
            return res.json();
          })
          .then((data) => {
            setUser(data);
            console.log(data);
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
        fetchUser();
      }, []);

    return ( 
        <div className="myProfile">
            <div className="header">
                <span>Das ist dein Profil</span>
            </div>
            <div className="body">
                <span>Tehest</span>
            </div>
        </div>
     );
}
 
export default MyProfile;