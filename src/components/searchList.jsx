import {Link, useLocation} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {CircularProgress} from "@material-ui/core";
import config from '../core/config';

const SearchList = (props) => {
    let title = new URLSearchParams(useLocation().search).get("q");
    const [result, setResult] = useState([]);

    useEffect(() => {
        setResult([...props.searchThreadResults, ...props.searchForumResults])

    },[props])

    return (
        <div>
            {console.log(result)}
            {
                result.map((entry => {
                    return(
                        <React.Fragment>
                                <Link to={`${entry.link}`} className="searchList">
                                            <div className="flag">
                                                {entry.flag}
                                            </div>
                                            <div className="title">
                                                {entry.title}
                                            </div>
                                </Link>
                        </React.Fragment>)
                }))
            }
        </div>
    )
}
export default SearchList;