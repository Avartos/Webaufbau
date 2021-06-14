import { ReactComponent as SplatIcon} from "../assets/icons/splat.svg";


const FavList = (props) => {

    //state = {};

    return(
        <div className="wrapper-list">
            <ul>
                <div className="title">
                    <SplatIcon/>
                    {props.className}
                </div>
                {/*forEach list*/}
                {props.list.map((item) => {return (
                    <li className="forum"><span>{item.forum}</span><input type="checkbox" className="checkbox"/>
                        <ul>
                            {/*forEach threads*/}
                            {item.threads.map((thread) => {return (
                                <li className="thread"> {thread} </li>
                            );})}
                        </ul>
                    </li>
                );})}
            </ul>
        </div>
    );
}
export default FavList;
