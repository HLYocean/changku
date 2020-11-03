import React, {useEffect, useState} from 'react';
import '../styles/Search.scss'
import {SearchBar, Toast} from 'antd-mobile';
import {HashRouter as Router, Route, Switch, Link, useHistory} from "react-router-dom";
import request from '../api/axios'
import useQuery from "../hooks/useQuery";

export default function Search() {
    // https://app.vmovier.com/apiv3/search?kw=NEW+ERA
    let history = useHistory();
    let query = useQuery();

    const [hot, setHot] = useState(null);
    const [name, setName] = useState(null);
    const [detail, setDetail] = useState(null);
    const [value_1, setValue_1] = useState('');
    useEffect(() => {
        Toast.loading("Loading...", 1, () => {
        });
        const backstageHot = window.localStorage.getItem("backstageHot");
        if (backstageHot && JSON.parse(backstageHot).expire > Date.now()) {
            setHot(JSON.parse(backstageHot).data)
        } else {
            request.getHotSearch().then(res => {
                setHot(res.data.data.recommend_keywords)
                window.localStorage.setItem(
                    "backstageHot",
                    JSON.stringify({
                        data: res.data.data.recommend_keywords,
                        expire: Date.now() + 5 * 60 * 60 * 1000,
                    })
                );
            });
        }
        if (query.get('name')) {
            let n = '';
            n = name ? name : query.get('name');
            setValue_1(n);
            setName(n)
            request.getHotDetail(n).then(res => {
                setDetail(res.data.data.result.list);
                Toast.hide()
            })
        } else {
            if (name) {
                setValue_1(name)
                request.getHotDetail(name).then(res => {
                    setDetail(res.data.data.result.list);
                    Toast.hide()
                })
            }
        }

    }, [name])
    return (
        <div className='search'>
            <SearchBar
                className='value'
                value={value_1}
                placeholder="Search"
                onSubmit={value => {
                    setName(value);
                    history.push(`/search/4?name=${value}`);
                }}
                onClear={() => {
                    setValue_1("");
                    setName("");
                    history.push('/search/4');
                }}
                onChange={value => {
                    setValue_1(value);
                }}
                onCancel={() => {
                    history.push('/');
                }}
                showCancelButton
            />
            <Router>
                <div className='hot_search'>
                    <h3>
                        热
                        门
                        搜
                        索
                    </h3>
                    <ul>
                        {
                            hot && hot.map(item => (
                                <li className='hot_name' key={item.id}>
                                    <Link to={`/search/4?name=${item.kw}`} onClick={() => {
                                        setName(item.kw)
                                    }}>
                                        {item.kw}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <Switch>
                    {
                        hot && hot.map(item => (
                            <Route key={item.id} path={`/search/4`}>
                                <div className='hot_detail'>
                                    {
                                        detail && name && detail.map(item => (
                                            <div className='item' key={item.postid}>
                                                <Link to={`/play/${item.postid}`}>
                                                    <img src={item.image} alt=""/>
                                                </Link>
                                                <div className='time'>
                                                    <span>{item.cates[0].catename}</span>
                                                    <span>/</span>
                                                    <span>{`${parseInt(item.duration / 60) < 10 ? '0' + parseInt(item.duration / 60) : parseInt(item.duration / 60)}'${
                                                        item.duration % 60 < 10 ? '0' + item.duration % 60 : item.duration % 60
                                                    }"`}</span>
                                                </div>
                                                <div className='title'>{item.title}</div>
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