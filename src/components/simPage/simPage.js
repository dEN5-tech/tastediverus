import React, { useEffect } from 'react';
import { useMemo, useState } from "react";
import axios from "axios";
import { Tiles } from "@rebass/layout";
import ElemCard from "../ElemCard/ElemCard";
import { useParams } from "react-router-dom";
import { QueryClientProvider, useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteCSRPage from "../InfinityTest/Inf";
import { QueryClient, useQuery } from 'react-query'
import Iplayer from "../IPLayer/Iplayer";
import LazyLoad from 'react-lazyload';
import Spinner from 'react-bootstrap/Spinner';
import {useLocation} from 'react-router-dom';




const queryClient = new QueryClient()

function Get_all_length(pages) {
    let elems = 0
    pages.forEach(e => {
        elems += e.data.length
    })
    return elems
}


const SimPage = ({ cookie, type }) => {


    const loc = useLocation()
    const history = useParams()

    const { data, error, status, fetchNextPage, hasNextPage} = useInfiniteQuery(
        `data_cards_sim`,
        async ({ last_child = history.id, meta }) =>
            await fetch(
                `https://tastediverus.herokuapp.com/api/get_data_sim?title=${history.href_id}&type=&type_s=${loc.state.type}&last_child=${last_child}&offset=14&token=${cookie.cookie}`
            ).then((result) => result.json()), {

                getNextPageParam: (lastPage, pages) => {
                	console.log(lastPage, pages)
                    if (lastPage.data.length === 0) hasNextPage = false;
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
    }, [history])



    return (
        <div>
                {status === "success" && (
                    <InfiniteScroll key={Math.random().toString().split("0.").join("")}
                        dataLength={data?.pages.length * 20}
                                    hasMore={hasNextPage}
                                    next={fetchNextPage}
                    >

                        <Tiles width={[150, null, 150]}>
                            {hasNextPage ?
                            data?.pages.map((page) =>(
                                <>

                                    {page.data.map((item) => (
                                        <LazyLoad
                                        height={"auto"}
                                        key={item}
                                        offset={[-200, 0]}
                                        placeholder={<Spinner  animation={"border"} role={"status"} />}
                                        >
                                        <ElemCard
                                            history={history}
                                            width={170}
                                            key={item.id}
                                            type_s={loc.state.type}
                                            {...item} />
                                            </LazyLoad>
                                        
                                    ))}
                                </>
                            )) : <div>Not found</div>}
                        </Tiles>
                    </InfiniteScroll>
                )}
            </div>
    );
};


const SimPage_ = ({ cookie, type }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SimPage type={type} cookie={cookie}/>
        </QueryClientProvider>
    );
};
export default SimPage_;