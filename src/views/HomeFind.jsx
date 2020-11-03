import React, {useState, useEffect} from "react";
import axios from "axios";
import {Carousel} from "antd-mobile";
import PostList from "components/PostList";
import '../styles/HomeFind.scss'
import {Toast} from "antd-mobile";

function loadingToast() {
    Toast.loading('Loading...', 1, () => {
    });
}

export default function HomeFind(props) {
    const [indexData, setIndexData] = useState(null);
    const [bannerHeight, setBannerHeight] = useState(100);

    useEffect(() => {
        loadingToast();
        props.setCurrentTap(0);
        const dataFromLocal = window.localStorage.getItem('dataFromLocal');
        if (dataFromLocal && JSON.parse(dataFromLocal).expire > Date.now()) {
            setIndexData(JSON.parse(dataFromLocal).data);
            Toast.hide();
        } else {
            axios
                .get("http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index")
                .then(function (response) {
                    console.log(response.data.data);
                    setIndexData(response.data.data);
                    window.localStorage.setItem('dataFromLocal', JSON.stringify({
                            data: response.data.data,
                            expire: Date.now() + 3 * 3600 * 1000
                        })
                    )
                    Toast.hide();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }, []);

    if (indexData) {
        return (
            <div className="home">
                <Carousel autoplay={true} infinite>
                    {indexData.banner.list.map((val) => (
                        <a
                            key={val.bannerid}
                            style={{
                                display: "inline-block",
                                width: "100%",
                                height: bannerHeight,
                            }}
                        >
                            <img
                                src={val.image}
                                style={{width: "100%", verticalAlign: "top"}}
                                onLoad={() => {
                                    window.dispatchEvent(new Event("resize"));
                                    setBannerHeight("auto");
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                <PostList posts={indexData.today}/>
                <PostList posts={indexData.hot}/>
                <PostList posts={indexData.album} col={true}/>
                <PostList posts={indexData.posts}/>
            </div>
        );
    }
    return <div className="home"/>;
}
