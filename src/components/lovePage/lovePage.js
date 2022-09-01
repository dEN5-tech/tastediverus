import { Tiles } from "@rebass/layout";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";
import { useLocation, useParams } from "react-router-dom";
import ElemCard from "../ElemCard/ElemCard";

const queryClient = new QueryClient();

function Get_all_length(pages) {
  let elems = 0;
  pages.forEach((e) => {
    elems += e.data.length;
  });
  return elems;
}

const lovePage = ({ cookie, type }) => {
  const fetchSimPosts = async ({ pageParam = history.id }) =>
    await fetch(
      `https://tastediverus.vercel.app/api/love_data?offset=${pageParam}&type=${loc.state.type}&token=${cookie.cookie}`
    ).then((e) => e.json());

  const loc = useLocation();
  const history = useParams();
  const [Fetched, setFetched] = useState(false);

  const { data, error, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    `sim_posts_${history.href_id}_${history.id}`,
    fetchSimPosts,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.length === 0) {
          setFetched(false);
        }
        if (lastPage.data) {
          return parseInt(lastPage.data.pop()?.id);
        }
      },
    }
  );

  useEffect(() => {
    if (status === "success") {
      setFetched(true);
    }
  }, [status]);

  return (
    <div>
      {status === "success" && (
        <InfiniteScroll
          key={Math.random().toString().split("0.").join("")}
          dataLength={data?.pages.length * 14}
          hasMore={hasNextPage}
          next={fetchNextPage}
        >
          <Tiles width={[150, null, 150]}>
            {Fetched ? (
              data?.pages.map((page) => (
                <>
                  {page.data.map((item) => (
                    <LazyLoad
                      height={"auto"}
                      key={item}
                      offset={[-200, 0]}
                      placeholder={
                        <Spinner animation={"border"} role={"status"} />
                      }
                    >
                      <ElemCard
                        history={history}
                        width={170}
                        key={item.id}
                        type_s={loc.state.type}
                        {...item}
                      />
                    </LazyLoad>
                  ))}
                </>
              ))
            ) : (
              <div>Not found</div>
            )}
          </Tiles>
        </InfiniteScroll>
      )}
    </div>
  );
};

const lovePage_ = ({ cookie, type }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <lovePage type={type} cookie={cookie} />
    </QueryClientProvider>
  );
};
export default lovePage_;
