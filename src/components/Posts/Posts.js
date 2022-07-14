import React, {useEffect} from 'react';
import {useMemo, useState} from "react";
import axios from "axios";
import {Tiles} from "@rebass/layout";
import ElemCard from "../ElemCard/ElemCard";
import { useParams } from "react-router-dom";
import {QueryClientProvider, useInfiniteQuery} from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteCSRPage from "../InfinityTest/Inf";
import { QueryClient, useQuery } from 'react-query'
import Iplayer from "../IPLayer/Iplayer";



const queryClient = new QueryClient()

function Get_all_length(pages){
    let elems = 0
    pages.forEach(e=>{
        elems+=e.data.length
    })
    return elems
}


const Posts = ({cookie,type}) => {


    const history = useParams()
    const { data,error, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
        "infiniteCharacters",
        async ({ pageParam = 0,meta }) =>
            await fetch(
                `https://tastediverus.herokuapp.com/api/get_data?offset=${pageParam}&count=20&type=${history.type.toString().split(":").join("")}&token=${cookie.cookie}`
            ).then((result) => result.json()),
        {

            getNextPageParam: (lastPage, pages) => {
                if (lastPage.data) {
                    return Get_all_length(pages)
                }
            }

        }
    );

    useEffect(() => {
        if (type) {
            console.log(type)
            fetchNextPage()
        }
    }, [type])



    return (
            <div>
                {status === "success" && (
                    <InfiniteScroll key={Math.random().toString().split("0.").join("")}
                        dataLength={data?.pages.length * 20}
                        loader={<h4>Loading...</h4>}
                                    hasMore={true}
                                    next={fetchNextPage}
                    >

                        <Tiles width={[150, null, 150]}>
                            {hasNextPage ?
                            data?.pages.map((page) =>(
                                <>

                                    {page.data.map((item) => (
                                        <ElemCard
                                            history={history}
                                            width={170}
                                            key={item.id}
                                            {...item} />
                                    ))}
                                </>
                            )) : <div>Not found</div>}
                        </Tiles>
                    </InfiniteScroll>
                )}
            </div>
    );
 /*







    const [data,setData]  = useState([])
    const [SearchDara,setSearchDara]  = useState()
    const history = useParams()
    useMemo(()=>{
        axios.get(`/api/get_data?offset=0&count=20&type=${history.type.toString().split(":").join("")}&token=${JSON.parse(localStorage.getItem('cookie')).cookie}`)
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
    );*/
};


const Posts_ = ({cookie,type}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Posts type={type} cookie={cookie}/>
        </QueryClientProvider>
    );
};
export default Posts_;