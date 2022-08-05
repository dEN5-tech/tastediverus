import React,
{
    useEffect
}
from 'react';
import
{
    useMemo,
    useState
}
from "react";
import axios from "axios";
import
{
    Tiles
}
from "@rebass/layout";
import ElemCard from "../ElemCard/ElemCard";
import
{
    useParams
}
from "react-router-dom";
import
{
    QueryClientProvider,
    useInfiniteQuery
}
from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteCSRPage from "../InfinityTest/Inf";
import {Preloader} from "../Preloader/Preloader.js"


import
{
    QueryClient,
    useQuery,
    useQueryClient
}
from 'react-query'
import Iplayer from "../IPLayer/Iplayer";
import LazyLoad from 'react-lazyload';
import Spinner from 'react-bootstrap/Spinner';
import {
    Card,
    Tooltip,
    Container
} from "react-bootstrap";
import Placeholder from 'react-bootstrap/Placeholder';


const queryClient = new QueryClient()

function Get_all_length(pages)
{
    let elems = 0
    pages.forEach(e =>
    {
        elems += e.length
    })
    return elems
}


const Posts = (
{
    cookie,
    type
}) =>
{



/*  const [dt,setdt] = useState([])*/
  const history = useParams()
  const [ploader,setploader] = useState(null)
/*  const queryClient = useQueryClient("images")
  queryClient.setQueryData('images', [])
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3001/getData')
      websocket.addEventListener('open', function (event) {
    websocket.send('Hello Server!');
});

// Наблюдает за сообщениями
websocket.addEventListener('message', function (event) {
   const data = JSON.parse(event.data)
   switch (data.method){
     case "getData":

     queryClient.setQueryData('images', (oldImages) => [
      ...oldImages,
      ,data.data
    ])
     setdt(queryClient.getQueryData('images'))
     return
   }
});


    return () => {
      websocket.close()
    }
  }, [queryClient])



return(
  <div>
      <Tiles width={[150, null, 150]}>
          {dt.map((elem)=> {
          return(
          <Card>
          <Card.Img src={elem?.dups[0].url} alt="Card image" />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
          </Card>)})}
      </Tiles>
  </div>
  )
*/


    const
    {
      isLoading,
        data,
        error,
        status,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        `type_posts_${history.type.toString().split(":").join("")}`,
        async (
            {
                pageParam = 0,
                meta
            }) =>
            await fetch(
                `https://tastediverus.herokuapp.com/api/get_data?offset=${pageParam}&count=20&type=${history.type.toString().split(":").join("")}&token=${cookie.cookie}`
            ).then((result) => result.json()),
            {

                getNextPageParam: (lastPage, pages) =>
                {
                    if (lastPage.length === 0) hasNextPage = false;
                    if (lastPage)
                    {
                        return Get_all_length(pages)
                    }
                }

            }
    );


    useEffect(() =>
    {
        if (type)
        {
            console.log(type)
            fetchNextPage()
        }
    }, [type])







    return (
        <div id="scrollableDiv">
        {status === "loading" ?

        <Container style={{
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0, 
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}
}>
        <Spinner animation="border" />
        </Container>

        : null}
        {status === "success" && (
                    <InfiniteScroll key={Math.random().toString().split("0.").join("")}
                        dataLength={data?.pages.length * 20}
                                    hasMore={hasNextPage}
                                    next={fetchNextPage}
                        scrollableTarget="scrollableDiv"
                    >

                        <Tiles width={[150, null, 150]}>
                            {hasNextPage && data?.pages[0].length>0  ?
                            data?.pages.map((page) =>(
                                <>

                                    {page.map((item) => (
                                        <LazyLoad
                                        height={"auto"}
                                        key={item.id}
                                        offset={[-200, 0]}
                                        placeholder={<Placeholder as="p" animation="glow"> <Placeholder xs={12} /> </Placeholder>}
                                        >
                                        <ElemCard
                                            history={history}
                                            width={170}
                                            key={item.id}
                                            type_s={history.type.toString().split(":").join("")}
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


const Posts_ = (
{
    cookie,
    type
}) =>
{
    return (
        <QueryClientProvider client={queryClient}>
            <Posts type={type} cookie={cookie}/>
        </QueryClientProvider>
    );
};
export default Posts_;