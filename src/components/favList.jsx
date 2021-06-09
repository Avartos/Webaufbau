

const FavList = (props) => {

    //state = {};

    return(
        <div className="wrapper-list">
            <ul> {props.className}
                <li>
                    {props.forum}
                    <ul>
                        <li>{props.threads}</li>
                        <li>{props.threads}</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
export default FavList;
