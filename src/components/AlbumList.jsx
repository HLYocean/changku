import React from "react";
import "../styles/AlbumList.scss";
import {Link} from "react-router-dom";
import useQuery from "hooks/useQuery";
import classNames from "classnames";

// https://app.vmovier.com/apiv3/post/view?postid=59628
export default function AlbumList(props) {
    let query = useQuery();

    function name(strname) {
        switch (strname) {
            case '专题':
                return /album/;
            default :
                return /play/;
        }
    }

    return (
        <section className={classNames("albumList")}>
            <h1>{props.children}</h1>
            {props.lists.map((item) => (
                < Link to={`${name(query.get('name'))}${item.postid}`} key={item.postid}>
                    <div className="item">
                        <img src={item.image} alt=""/>
                        <div className="info">
                            <span>{props.children}</span>
                            <h3>{item.title}</h3>
                            <h5>{item.app_fu_title}</h5>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
}
