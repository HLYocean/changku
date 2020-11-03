import React, {useState, useEffect} from "react";
import request from "api/axios.js";

import {Flex, Toast} from "antd-mobile";
import "styles/HomeCate.scss";

import {Link} from "react-router-dom";

export default function HomeCate(props) {
    const [cateList, setCateList] = useState([]);

    useEffect(() => {
        Toast.loading("Loading...", 1, () => {
            // console.log("Load complete !!!");
        });

        props.setCurrentTap(1);

        // 先本地读取
        const cateListFromLocal = window.localStorage.getItem("cateList");
        // 本地有数据并且 没有过期
        if (cateListFromLocal && JSON.parse(cateListFromLocal).expire > Date.now()) {
            setCateList(JSON.parse(cateListFromLocal).data);
            Toast.hide();
        } else {
            request.getCateList().then((response) => {
                console.log(response.data.data);
                setCateList(response.data.data);
                window.localStorage.setItem(
                    "cateList",
                    JSON.stringify({
                        data: response.data.data,
                        expire: Date.now() + 2 * 60 * 60 * 1000,
                    })
                );
                Toast.hide();
            });
        }


    }, []);
    return (
        <div className="catelist">
            <Flex wrap="wrap">
                {cateList.map((cate, i) => (
                    <Link
                        key={i}
                        to={() => {
                            if (cate.cate_type === "0") {
                                return `/catelist?cateid=${cate.cateid}&name=${cate.catename}`;
                            } else {
                                switch (cate.tab.toLowerCase()) {
                                    case "hot":
                                        return `/catelist?tab=hot&name=${cate.catename}`;
                                    case "album":
                                        return `/catelist?tab=album&name=${cate.catename}`;
                                    case "series":
                                        return `/series?name=${cate.catename}`;
                                    case "backstage":
                                        return `/backstage/2?name=${cate.catename}`;
                                }
                            }
                        }}
                    >
                        <Flex.Item>
                            <img src={cate.icon} alt=""/>
                            <h3>{cate.catename}</h3>
                        </Flex.Item>
                    </Link>
                ))}
            </Flex>
        </div>
    );
}
