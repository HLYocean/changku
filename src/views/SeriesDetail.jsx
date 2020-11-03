import React, {useEffect, useState} from 'react';
import axios from 'axios'
import '../styles/SeriesDetail.scss'
import {Icon, Toast} from "antd-mobile";
import {useParams} from 'react-router-dom'
import {BigPlayButton, Player} from "video-react";

export default function SeriesDetail() {
    const [seriesdetail, setSeriesdetail] = useState(null);
    const detail = JSON.parse(window.localStorage.getItem('seriesList')).data

    let {id} = useParams();

    useEffect(() => {
        Toast.loading("Loading...", 1, () => {
        });

        // 先本地读取
        const seriesdetailFromLocal = window.localStorage.getItem(
            "seriesdetailFromLocal"
        );
        if (seriesdetailFromLocal && JSON.parse(seriesdetailFromLocal).expire > Date.now()) {
            setSeriesdetail(JSON.parse(seriesdetailFromLocal).data);
            Toast.hide();
        } else {
            axios.get('http://api.kele8.cn/agent/https://openapi-vtom.vmovier.com/v3/video/5F105853AF3E2?expand=resource&usage=xpc_web&appKey=61a2f329348b3bf77').then(res => {
                setSeriesdetail(res.data.data);
                window.localStorage.setItem(
                    "seriesdetailFromLocal",
                    JSON.stringify({
                        data: res.data.data,
                        expire: Date.now() + 5 * 60 * 60 * 1000,
                    }))
            })
            Toast.hide();
        }

    }, [])

    return (
        <div className='series_detail'>
            <header>
                <Icon onClick={() => {
                    window.history.back()
                }} className='icon' type="left" size={'lg'}/>
                <h1 className='title'>{detail[id].title}</h1>
            </header>
            {seriesdetail && <div className='play'>
                <Player
                    src={seriesdetail.resource.default.https_url}
                    poster={seriesdetail.video.cover}
                    preload='auto'
                    width='100%'
                >
                    <BigPlayButton position="center"/>
                </Player>
                <div className='introduction'>
                    <h2>{seriesdetail.video.title}</h2>
                    <div className='title'>{detail[id].title}</div>
                    <div className='week'>更新 : {detail[id].weekly}</div>
                    <div className='update'>集数 : 更新至{detail[id].update_to}集</div>
                    <div className='content'>{detail[id].content}</div>
                </div>
            </div>
            }
        </div>
    )

}