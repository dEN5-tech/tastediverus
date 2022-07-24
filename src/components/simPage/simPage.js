import React, { useEffect } from 'react';
import { useMemo, useState } from "react";
import axios from "axios";
import { Tiles } from "@rebass/layout";
import ElemCard from "../ElemCard/ElemCard";
import { useParams } from "react-router-dom";
import { QueryClientProvider, useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteCSRPage from "../InfinityTest/Inf";
import { QueryClient, useQuery   } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
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




	const fetchSimPosts = async ({pageParam=history.id}) => await fetch(`https://tastediverus.herokuapp.com/api/get_data_sim?title=${history.href_id}&type=&type_s=${loc.state.type}&last_child=${pageParam}&offset=14&token=${cookie.cookie}`).then((e)=>e.json())
    


    const loc = useLocation()
    const history = useParams()
    const [Fetched, setFetched] = useState(false)

    const { data, error, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
        `sim_posts_${history.href_id}_${history.id}`,fetchSimPosts, {

                getNextPageParam: (lastPage, pages) => {
                    if (lastPage.data.length === 0) {
                    	setFetched(false)
                    };
                    if (lastPage.data) {
                        return parseInt(lastPage.data.pop()?.id)
                    }
                }

            }
    );




	useEffect(()=>{
		if(status === "success"){
			setFetched(true)
		}

	},[status])

    return (
        <div>
                {status === "success" && (
                    <InfiniteScroll key={Math.random().toString().split("0.").join("")}
                        dataLength={data?.pages.length * 14}
                                    hasMore={hasNextPage}
                                    next={fetchNextPage}
                    >

                        <Tiles width={[150, null, 150]}>
                            {Fetched ?
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