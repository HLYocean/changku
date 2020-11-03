import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";

import request from "api/axios.js";
import {Player, BigPlayButton} from 'video-react';
import {Toast} from "antd-mobile";
import {Icon} from 'antd-mobile';
import "styles/Play.scss";
import "../../node_modules/video-react/dist/video-react.css";

export default function Play() {
    const [detail, setDetail] = useState(null);
    let params = useParams();

    useEffect(() => {
        loadingToast();
        request
            .getDetailByPostId(params.id)
            .then((response) => {
                setDetail(response.data.data);
            })
            .finally(() => {
                Toast.hide();
            });
        // }
    }, [params.id]);

    function loadingToast() {
        Toast.loading("Loading...", 1, () => {
        });
    }

    return (
        <div className="play">
            {detail && (
                <>
                    <header>
                        <Icon onClick={() => {
                            window.history.back()
                        }} className='icon' type="left" size={'lg'}/>
                        <Player
                            src={detail.content_video[0].source_link}
                            poster={detail.content_video[0].image}
                            preload='auto'
                            width='100%'
                        >
                            <BigPlayButton position="center"/>
                        </Player>
                    </header>

                    <section>
                        <div className="info">
                            <h3>{detail.title}</h3>
                            {detail.cate.map((v, i) => (
                                <span key={i}>{v}</span>
                            ))}
                            <span style={{margin: '0 8px'}}>/</span>
                            <span
                                className="dur">{`${parseInt(detail.duration / 60) < 10 ? '0' + parseInt(detail.duration / 60) : parseInt(detail.duration / 60)}'${
                                detail.duration % 60 < 10 ? '0' + detail.duration % 60 : detail.duration % 60
                            }"`}</span>
                            <p>{detail.intro}</p>
                        </div>
                    </section>

                    {detail.relate_video.map((relate, i) => (
                        <section className="relate" key={i}>
                            <h3>
                                {relate.name} <span>more</span>
                            </h3>
                            <ul className="relate-list">
                                {relate.list.map((item) => (
                                    <Link to={`/play/${item.postid}`} key={item.postid}>
                                        <li className="relate-item">
                                            <div className="thumb">
                                                <img src={item.image} alt=""/>
                                                <span
                                                    className="duration">{`${parseInt(detail.duration / 60) < 10 ? '0' + parseInt(detail.duration / 60) : parseInt(detail.duration / 60)}'${
                                                    detail.duration % 60 < 10 ? '0' + detail.duration % 60 : detail.duration % 60
                                                }"`}</span>
                                            </div>
                                            <h5>{item.title}</h5>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </section>
                    ))}
                </>
            )}
        </div>
    );
}
