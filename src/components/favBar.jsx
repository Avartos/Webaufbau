import React, {useState} from "react";
import FavList from "./favList";
import { ReactComponent as SplatIcon} from "../assets/icons/splat.svg";


const FavBar = () => {

    const favorite = useState(
        [
            {forum:"Forumtitle 1"           , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Senf macht spaß"        , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Vogelfreunde Erfurt"    , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Kochen mit Zimt"        , threads:["Threadtitle 1", "Threadtitle 2"]}
        ]
    );

    const popular = useState(
        [
            {forum:"Forumtitle 1"           , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Fußball"                , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Schwimmen"              , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Erfurt"                 , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"FH-Erfurt"              , threads:["Threadtitle 1", "Threadtitle 2"]}
        ]
    )

    const latest = useState(
        [
            {forum:"Forumtitle 1"           , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"BUGA22"                 , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Fragen zu REACT"        , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Schützenverein Erfurt"  , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Ein neues Forum"        , threads:["Threadtitle 1", "Threadtitle 2"]}
        ]
    )



        return(
            <div className="favBar">
                <div>
                    <SplatIcon/>
                    <FavList className="favorite" key="favorite" list={favorite}/>
                </div>
                <FavList className="popular" key="popular" list={popular}/>
                <FavList className="latest" key="latest" list={latest}/>
            </div>
        );
    };

export default FavBar;