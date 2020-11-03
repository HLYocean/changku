import React, {useEffect, useState} from 'react'
import '../styles/Seriers.scss'
import request from "api/axios.js";
import {Icon, Toast} from "antd-mobile";
import {Link} from "react-router-dom";

import useQuery from "hooks/useQuery";

export default function Series() {
    const [series, setSeries] = useState(null);
    let query = useQuery();
    // console.log(query.get('name'))
    useEffect(() => {
        Toast.loading("Loading...", 1, () => {
        });

        // 先本地读取
        const seriesFromLocal = window.localStorage.getItem(
            "seriesList"
        );
        // 本地有数据并且 没有过期
        if (seriesFromLocal && JSON.parse(seriesFromLocal).expire > Date.now()) {
            setSeries(JSON.parse(seriesFromLocal).data);
            Toast.hide();
        } else {
            request.getSeries().then((response) => {
                // console.log(response.data.data);
                setSeries(response.data.data);

                window.localStorage.setItem(
                    "seriesList",
                    JSON.stringify({
                        data: response.data.data,
                        expire: Date.now() + 5 * 60 * 60 * 1000,
                    }))
            });
            Toast.hide();
        }
    }, []);
    return (
        <div className='series'>
            <header>
                <Icon onClick={() => {
                    window.history.back()
                }} className='icon' type="left" size={'lg'}/>
                <h1 className='title'>{query.get('name')}</h1>
            </header>
            {
                series && (
                    <div>
                        {
                            series.map((item, i) => (
                                <div key={item.seriesid}>
                                    <Link to={`/seriesdetail/${i}`}>
                                        <img src={item.image} alt=""/>
                                    </Link>
                                    <div className='text'>
                                        <h3>{item.title}</h3>
                                        <div className='update'>已更新至{item.update_to}集&nbsp; {item.follower_num}人已经订阅
                                        </div>
                                        <div className='content'>{item.content}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

