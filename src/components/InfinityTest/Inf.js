import { Tiles } from "@rebass/layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import ElemCard from "../ElemCard/ElemCard";

function Get_all_length(pages) {
  let elems = 0;
  pages.forEach((e) => {
    elems += e.data.length;
  });
  return elems;
}

function InfiniteCSRPage() {
  const history = useParams();
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteCharacters",
    async ({ pageParam = 0, meta }) =>
      await fetch(
        `https://tastediverus.vercel.app/api/get_data?offset=${pageParam}&count=20&type=h`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data) {
          return Get_all_length(pages);
        }
      },
    }
  );
  console.log(data);
  return (
    <div>
      <h1>
        Rick and Morty with React Query and Infinite Scroll - Client Side
        Rendered
      </h1>
      {status === "success" && (
        <InfiniteScroll
          dataLength={data?.pages.length * 20}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
        >
          <Tiles width={[150, null, 150]}>
            {data?.pages.map((page) => (
              <>
                {page.data.map((item) => (
                  <ElemCard
                    history={history}
                    width={170}
                    key={item.id}
                    {...item}
                  />
                ))}
              </>
            ))}
          </Tiles>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default InfiniteCSRPage;
