import React, { useEffect } from "react";

export default function HomeMe(props) {
    useEffect(() => {
        props.setCurrentTap(2);
    }, []);
    return <div>me</div>;
}
