import React, {useEffect, useState} from 'react';
import '../styles/Backstage.scss'
import {Icon, Toast} from 'antd-mobile';
import request from "../api/axios";
import {HashRouter as Router, Route, Switch, Link, useHistory, useParams} from "react-router-dom";

export default function Backstage() {
    // https://app.vmovier.com/apiv3/backstage/getPostByCate?p=1&&size=10&&cateid=47
    const [nav, seNav] = useState(null);
    const [num, setNum] = useState('2');
    const [backDetailFromLocal, setBackDetailFromLocal] = useState(null)
    const [inProp, setInProp] = useState(true);
    let history = useHistory();
    let params = useParams();

    useEffect(() => {

        const options = {p: 1, size: 10};
        options.cateid = num;
        Toast.loading("Loading...", 1, () => {
        });
        // 先本地读取 导航
        const backstageFromLocal = window.localStorage.getItem("backstageFromLocal");
        if (backstageFromLocal && JSON.parse(backstageFromLocal).expire > Date.now()) {
            seNav(JSON.parse(backstageFromLocal).data);
        } else {
            request.getBackstage().then(res => {
                seNav(res.data.data)
                window.localStorage.setItem(
                    "backstageFromLocal",
                    JSON.stringify({
                        data: res.data.data,
                        expire: Date.now() + 5 * 60 * 60 * 1000,
                    })
                );
            })
        }

        // 先本地读取 内容
        const backDetailFromLocal = window.localStorage.getItem(
            "backDetailFromLocal-" + num
        );

        if (params.id) {
            setNum(params.id)
        }
        if (backDetailFromLocal && JSON.parse(backDetailFromLocal).expire > Date.now()) {
            setBackDetailFromLocal(JSON.parse(backDetailFromLocal).data);
            Toast.hide();
        } else {
            request.getBackstageDetail(options).then(res => {
                setBackDetailFromLocal(res.data.data)
                window.localStorage.setItem(
                    "backDetailFromLocal-" + num,
                    JSON.stringify({
                        data: res.data.data,
                        expire: Date.now() + 5 * 60 * 60 * 1000,
                    })
                );
            }).finally(() => {
                Toast.hide();
            })
        }

    }, [num]);

    return (
        <div className='backstage'>
            <header>
                <Link to='/cate'>
                    <Icon className='icon' type="left" size={'lg'}/>
                </Link>
                <h3 className='title'>幕后文章</h3>
            </header>

            <Router>
                <nav>
                    <ul>
                        {
                            nav && nav.map((item) => (
                                <Link key={item.cateid} to={`/backstage/${item.cateid}`}>
                                    <li className={params.id === item.cateid ? 'active' : null}
                                        onClick={() => {
                                            setNum(item.cateid);
                                            setInProp(true)
                                            // console.log(item.cateid)
                                            params.id = item.cateid
                                        }}>
                                        {item.catename}
                                    </li>
                                </Link>
                            ))
                        }
                    </ul>
                </nav>
                {/*<div className='list'>*/}
                {/*    {*/}
                {/*        backDetailFromLocal && backDetailFromLocal.map((item, index) => (*/}

                {/*            <div key={index} className='item' onClick={() => {*/}
                {/*                setInProp(!inProp)*/}
                {/*                history.push(`/backstagelist/${item.postid}?num=${num}`);*/}
                {/*            }}>*/}
                {/*                <img src={item.image} alt=""/>*/}
                {/*                <div className='text'>*/}
                {/*                    <h4>{item.title}</h4>*/}
                {/*                    <span><img*/}
                {/*                        src={require('../assets/images/movie_detail_bottom_share_icon.png')}*/}
                {/*                        alt=""/>{item.share_num}</span>*/}
                {/*                    <span><img src={require('../assets/images/my_stars_icon.png')}*/}
                {/*                               alt=""/>{item.like_num}</span>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</div>*/}

                <Switch>
                    {
                        nav && nav.map((item) => (
                            <Route key={item.cateid} path={`/backstage/${item.cateid}`}>

                                <div className='list_1'>
                                    {
                                        backDetailFromLocal && backDetailFromLocal.map((item, index) => (

                                            <div key={index} className='item' onClick={() => {
                                                history.push(`/backstagelist/${item.postid}?num=${num}`);
                                            }}>
                                                <img src={item.image} alt=""/>
                                                <div className='text'>
                                                    <h4>{item.title}</h4>
                                                    <span><img
                                                        src={require('../assets/images/movie_detail_bottom_share_icon.png')}
                                                        alt=""/>{item.share_num}</span>
                                                    <span><img
                                                        src={require('../assets/images/my_stars_icon.png')}
                                                        alt=""/>{item.like_num}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                            </Route>
                        ))
                    }
                </Switch>
            </Router>

        </div>
    )
}