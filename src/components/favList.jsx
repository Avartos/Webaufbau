

const FavList = (props) => {

    //state = {};

    return(
        <div className="wrapper-list">
            <ul> {props.className}
                {/*forEach list*/}
                {props.list.map((item) => {return (
                    <li>{item.forum}
                        <ul>
                            {/*forEach threads*/}
                            {item.threads.map((thread) => {return (
                                <li> {thread} </li>
                            );})}
                        </ul>
                    </li>
                );})}
            </ul>
        </div>
    );
}
export default FavList;
