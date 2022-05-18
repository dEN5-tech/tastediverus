import React from 'react';
import {useMemo, useState} from "react";
import axios from "axios";
import {Tiles} from "@rebass/layout";
import ElemCard from "../ElemCard/ElemCard";
import { useParams } from "react-router-dom";
import {QueryClientProvider, useInfiniteQuery} from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteCSRPage from "../InfinityTest/Inf";
import { QueryClient, useQuery } from 'react-query'

const queryClient = new QueryClient()

function Get_all_length(pages){
    let elems = 0
    pages.forEach(e=>{
        elems+=e.data.length
    })
    return elems
}




const Posts = () => {
    const history = useParams()
    const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
        "infiniteCharacters",
        async ({ pageParam = 0,meta }) =>
            await fetch(
                `/api/get_data?offset=${pageParam}&count=20&type=${history.type.toString().split(":").join("")}&token=${JSON.parse(localStorage.getItem('cookie')).cookie}`
            ).then((result) => result.json()),
        {

            getNextPageParam: (lastPage, pages) => {
                if (lastPage.data) {
                    return Get_all_length(pages)
                }
            },
        }
    );
    /*window.location.reload()*/
    return (
            <div>
                {status === "success" && data?.pages.data &&
                    <InfiniteScroll
                        dataLength={data?.pages.length * 20}
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        loader={<h4>Loading...</h4>}
                    >

                        <Tiles width={[150, null, 150]}>
                            {data?.pages.map((page) =>(
                                <>

                                    {page.data.map((item) => (
                                        <ElemCard
                                            history={history}
                                            width={170}
                                            key={item.id}

                                            {...item} />
                                    ))}
                                </>
                            ))}
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


const Posts_ = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Posts />
        </QueryClientProvider>
    );
};
export default Posts_;