import React, { useState, useEffect } from "react";
import UserEntry from "./userEntry";

/**
 * This component lists all users in list form.
 * It is used for administrative purposes.
 */
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const fetchUsers = () => {
    fetch("http://localhost:3001/api/users/all", {
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setUsers(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //updates a single user and updates the users state
  const handleUpdateUserLogin = (userId, isAdmin, isEnabled) => {
    const loginObject = {
      userId: userId,
      isAdmin: isAdmin,
      isEnabled: isEnabled,
    };

    fetch(`http://localhost:3001/api/users/update/${userId}`, {
      method: "PUT",
      body: JSON.stringify(loginObject),
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("");
        }
        return res.json();
      })
      .then((data) => {
        const updatedUsers = users.map((user) => {
          if (user.id === data.userId) {
            user.isEnabled = data.isEnabled;
            user.isAdmin = data.isAdmin;
          }
          return user;
        });
        setUsers([...updatedUsers]);
      })
      .catch((error) => {
        setUsers([...users]);
      });
  };

  return (
    <div className="userList">
      <h2>Nutzer</h2>
      {!isPending && (
        <React.Fragment>
          <div className="row header">
            <span className="cell head">User ID</span>
            <span className="cell head">Username</span>
            <span className="cell head">Profilbild</span>
            <span className="cell head">Ist Admin</span>
            <span className="cell head">Ist Aktiviert</span>
          </div>
          {users.map((user) => {
            return (
              <UserEntry
                key={user.id}
                user={user}
                handleUpdateUserLogin={handleUpdateUserLogin}
              ></UserEntry>
            );
          })}
        </React.Fragment>
      )}
    </div>
  );
};

export default UserList;
