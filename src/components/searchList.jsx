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
                            <div className="searchList">
                                <Link to={`${entry.link}`}>
                                    <div>
                                        {entry.title}
                                    </div>
                                </Link>
                            </div>
                        </React.Fragment>)
                }))
            }
        </div>
    )
}
export default SearchList;