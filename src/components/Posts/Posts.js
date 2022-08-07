import React, { useEffect } from "react";
import { useMemo, useState, useRef } from "react";
import axios from "axios";
import { Tiles } from "@rebass/layout";
import ElemCard from "../ElemCard/ElemCard";
import { useParams } from "react-router-dom";
import { QueryClientProvider, useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteCSRPage from "../InfinityTest/Inf";
import { Preloader } from "../Preloader/Preloader.js";
import "./index.css";

import { QueryClient, useQuery, useQueryClient } from "react-query";
import Iplayer from "../IPLayer/Iplayer";
import { OverAvatars } from "../OverAvatars/OverAvatars.js";

import Spinner from "react-bootstrap/Spinner";
import { Card, Tooltip, Container } from "react-bootstrap";
import Placeholder from "react-bootstrap/Placeholder";
import { useInView } from "react-intersection-observer";

const queryClient = new QueryClient();

function Get_all_length(pages) {
  let elems = 0;
  pages.forEach((e) => {
    elems += e.length;
  });
  return elems;
}

const Posts = ({ cookie, type }) => {
  const history = useParams();
  const [ploader, setploader] = useState(null);
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    `type_posts_${history.type.toString().split(":").join("")}`,
    async ({ pageParam = 0, meta }) =>
      await fetch(
        `https://tastediverus.herokuapp.com/api/get_data?offset=${pageParam}&count=12&type=${history.type
          .toString()
          .split(":")
          .join("")}&token=${cookie.cookie}`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) hasNextPage = false;
        if (lastPage) {
          return Get_all_length(pages);
        }
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div id="scrollableDiv">
      <OverAvatars
      cookie={cookie}
      />
      {status === "loading" ? (
        <Container
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spinner animation="border" />
        </Container>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Tiles width={[150, null, 150]}>
            {hasNextPage && data?.pages[0].length > 0 ? (
              data?.pages.map((page) => (
                <>
                  {page.map((item) => (
                    <ElemCard
                      history={history}
                      width={170}
                      key={item.id}
                      type_s={history.type.toString().split(":").join("")}
                      {...item}
                    />
                  ))}
                </>
              ))
            ) : (
              <div>Not found</div>
            )}
          </Tiles>
          <div>
          <Spinner ref={ref}
          animation="border" />
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
    </div>
  );

  /*       const [data,setData]  = useState([])
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
           );
    }*/
};

const Posts_ = ({ cookie, type }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts type={type} cookie={cookie} />
    </QueryClientProvider>
  );
};
export default Posts_;
