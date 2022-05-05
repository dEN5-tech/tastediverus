import React from 'react';
import {useMemo, useState} from "react";
import axios from "axios";
import {Tiles} from "@rebass/layout";
import ElemCard from "../ElemCard/ElemCard";
import { useParams } from "react-router-dom";






const Posts = () => {
    const [data,setData]  = useState([])
    const [SearchDara,setSearchDara]  = useState()
    const history = useParams()
    useMemo(()=>{
        axios.get(`http://localhost:3001/api/get_data?offset=0&count=20&type=${history.type.toString().split(":").join("")}&token=${JSON.parse(localStorage.getItem('cookie')).cookie}`)
            .then(function (response) {
                return setData(response.data.data)
            })

    },[]);



    return (
        <div className="App">
            {data ?
                (
                    <Tiles width={[150, null, 150]}>
                    {data.map(item => {
                        return (<ElemCard
                        data_posts={setData}
                        history={history}
                        width={170}
                        key={item.id}

                        {...item} />)})}
                    </Tiles>
                ) :
                (
                    <div>Not found</div>
                )}
        </div>
    );
};


export default Posts;