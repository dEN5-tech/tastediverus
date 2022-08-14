import { Tiles } from "@rebass/layout";
import { useEffect, useState } from "react";

import { QueryClientProvider, useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import "./index.css";

import { QueryClient } from "react-query";

import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import importedComponent from "react-imported-component";
import { useInView } from "react-intersection-observer";
import OverAvatars from "../OverAvatars/OverAvatars";

const ElemCard = importedComponent(() => import("../ElemCard/ElemCard"), {});

ElemCard.preload();

const queryClient = new QueryClient();

function Get_all_length(pages) {
  let elems = 0;
  pages.forEach((e) => {
    elems += e.length;
  });
  return elems;
}

const genres = [
  {
    tag: "urn:tag:genre:action",
    title: "Action",
  },
  {
    tag: "urn:tag:genre:adventure",
    title: "Adventure",
  },
  {
    tag: "urn:tag:genre:animation",
    title: "Animation",
  },
  {
    tag: "urn:tag:genre:biography",
    title: "Biography",
  },
  {
    tag: "urn:tag:genre:comedy",
    title: "Comedy",
  },
  {
    tag: "urn:tag:genre:crime",
    title: "Crime",
  },
  {
    tag: "urn:tag:genre:documentary",
    title: "Documentary",
  },
  {
    tag: "urn:tag:genre:drama",
    title: "Drama",
  },
  {
    tag: "urn:tag:genre:family",
    title: "Family",
  },
  {
    tag: "urn:tag:genre:fantasy",
    title: "Fantasy",
  },
  {
    tag: "urn:tag:genre:history",
    title: "History",
  },
  {
    tag: "urn:tag:genre:horror",
    title: "Horror",
  },
  {
    tag: "urn:tag:genre:music",
    title: "Music",
  },
  {
    tag: "urn:tag:genre:musical",
    title: "Musical",
  },
  {
    tag: "urn:tag:genre:mystery",
    title: "Mystery",
  },
  {
    tag: "urn:tag:genre:romance",
    title: "Romance",
  },
  {
    tag: "urn:tag:genre:sci_fi",
    title: "Sci-Fi",
  },
  {
    tag: "urn:tag:genre:short",
    title: "Short",
  },
  {
    tag: "urn:tag:genre:sport",
    title: "Sport",
  },
  {
    tag: "urn:tag:genre:thriller",
    title: "Thriller",
  },
  {
    tag: "urn:tag:genre:war",
    title: "War",
  },
  {
    tag: "urn:tag:genre:western",
    title: "Western",
  },
];

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
          return pages.length * 12;
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
      <OverAvatars cookie={cookie} />
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
            <Spinner ref={ref} animation="border" />
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
