import {useLocation} from 'react-router-dom'
import {useEffect} from 'react'

const SearchList = () => {
    let title = new URLSearchParams(useLocation().search);
    useEffect(() => {
        // title = new URLSearchParams(useLocation().search);
        console.log(title.get("q"))
    }, [])
    console.log(title)
    return (
        <div>
            {title}
        </div>
    )
}
export default SearchList;