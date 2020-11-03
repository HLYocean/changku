import React from "react";
import "../styles/PostList.scss";
import {Link} from "react-router-dom";

import classNames from "classnames";

export default function PostList(props) {
    return (
        <section className={classNames("postlist", {col: props.col})}>
            <h1>{props.posts.selection_title}</h1>
            {props.posts.list.map((item) => (
                <Link to={`/play/${item.postid}`} key={item.postid}>
                    <div className="item">
                        <img src={item.image} alt=""/>
                        <div className="info">
                            {item.cates.map((cate) => (
                                <span key={cate.cateid}>{cate.catename}</span>
                            ))}
                            <span
                                className="dur">{`${parseInt(item.duration / 60) < 10 ? '0' + parseInt(item.duration / 60) : parseInt(item.duration / 60)}'${
                                item.duration % 60 < 10 ? '0' + item.duration % 60 : item.duration % 60
                            }"`}</span>
                            <h3>{item.title}</h3>
                        </div>
                    </div>
                </Link>
            ))}
        </section>

    );
}
