import { Tiles } from "@rebass/layout";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Placeholder from "react-bootstrap/Placeholder";
import Spinner from "react-bootstrap/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";
import { useLocation, useParams } from "react-router-dom";

import importedComponent from "react-imported-component";

const ElemCard = importedComponent(() => import("../ElemCard/ElemCard"), {});

ElemCard.preload();

const queryClient = new QueryClient();

function Get_all_length(pages) {
  let elems = 0;
  pages.forEach((e) => {
    elems += e.data.length;
  });
  return elems;
}

const SimPage = ({ cookie, type }) => {
  const fetchSimPosts = async ({ pageParam = history.id }) =>
    await fetch(
      `https://tastediverus.herokuapp.com/api/get_sim_data?title=${history.href_id}&type=&type_s=${loc.state.type}&last_child=${pageParam}&offset=14&token=${cookie.cookie}`
    ).then((e) => e.json());

  const loc = useLocation();
  const history = useParams();
  const [Fetched, setFetched] = useState(false);

  const { data, error, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    `sim_posts_${history.href_id}_${history.id}`,
    fetchSimPosts,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) {
          setFetched(false);
        }
        if (lastPage) {
          console.log(parseInt(lastPage.pop()?.id));
          return parseInt(lastPage.pop()?.id);
        }
      },
    }
  );

  return (
    <div id="scrollableDiv">
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
      ) : null}
      {status === "success" && (
        <InfiniteScroll
          key={Math.random().toString().split("0.").join("")}
          dataLength={data?.pages.length * 14}
          hasMore={hasNextPage}
          next={fetchNextPage}
          scrollableTarget="scrollableDiv"
        >
          <Tiles width={[150, null, 150]}>
            {Fetched ? (
              data?.pages.map((page) => (
                <>
                  {page.map((item) => (
                    <LazyLoad
                      height={"auto"}
                      key={item}
                      placeholder={
                        <Placeholder as="p" animation="glow">
                          {" "}
                          <Placeholder xs={12} />{" "}
                        </Placeholder>
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

const SimPage_ = ({ cookie, type }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SimPage type={type} cookie={cookie} />
    </QueryClientProvider>
  );
};
export default SimPage_;
