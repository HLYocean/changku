import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import request from "api/axios.js";
import '../styles/Album.scss'
import "../../node_modules/video-react/dist/video-react.css";
import {Icon, Toast} from "antd-mobile";
import {BigPlayButton, Player} from "video-react";
function parseLink(str) {
    let arr = str.match(/\[a: href="[^\（]+" content="[^\（]+"\]/g);
    if (arr) {
        var Parsed = arr.map((element, index) => {
            var tmp = element.split(" ");
            tmp.shift();
            return tmp.map((str) => {
                var patt = /".+"/;
                if (patt.exec(str)) {
                    return patt.exec(str)[0].replace('"', "").replace('"', "");
                } else {
                    return 0;
                }
            });
        });
        var y = str.split(/\[a: href="[^\（]+" content="[^\（]+"\]/g);
        y.forEach((element, index) => {
            if (Parsed[index]) {
                y[index] = element + `<a href="${Parsed[index][0]}">${Parsed[index][1]}</a>`;
            }
        });
        return y.join();
    } else {
        return str;
    }
}

function cut(str) {
    let arr1 = str.match(/\[b: content=".+\]/);
    if (arr1) {
        return str.replace(/\[b: content="/g, '<strong>').replace('"]', '</strong>').replace('"]', "");
    }
    return str
}

export default function Album() {
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
    }, [params.id]);

    function loadingToast() {
        Toast.loading("Loading...", 1, () => {
        });
    }

    return (
        <div className="album">
            <Icon onClick={() => {
                window.history.back()
            }} className='icon' type="left" size={'lg'}/>
            {detail && <div className='title'>{detail.title}</div>}
            {detail && detail.format_content.map((content, index) => {
                switch (content.type) {
                    case "normal":
                        return (
                            <p
                                className='normal_title'
                                style={content.attr}
                                key={index}
                                dangerouslySetInnerHTML={{__html: cut(parseLink(content.content))}}
                            >
                            </p>
                        );
                    case "image":
                        return (
                            <img
                                key={index}
                                style={{maxWidth: "100%"}}
                                src={content.attr.src}
                                alt=""
                            />
                        );

                    case "title":
                        return <h5 key={index}>{content.content}</h5>;

                    case "video":
                        return (
                            <Player
                                key={index}
                                src={detail.content_video[content.attr.index].source_link}
                                poster={detail.content_video[content.attr.index].image}
                                preload='auto'
                                width='100%'
                            >
                                <BigPlayButton position="center"/>
                            </Player>
                        );
                }
            })}
        </div>
    );
}
