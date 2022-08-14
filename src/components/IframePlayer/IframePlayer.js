import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation, useParams } from "react-router-dom";
import "./index.css";

import axios from "axios";

import Container from "react-bootstrap/Container";

import IframeResizer from "iframe-resizer-react";
import useLocalStorage from "use-local-storage";

const IframePlayer = () => {
  const [last_view, set_last_view] = useLocalStorage(
    "last_view",
    localStorage.getItem("last_view") || undefined
  );
  const params = useParams();
  const loc = useLocation();
  const [IframeData, setIframeData] = useState({});
  const [UrlIframe, setUrlIframe] = useState(false);

  useEffect(() => {
    if (loc?.state) {
      setUrlIframe(loc.state);
    }
    if (last_view?.kinopoisk_id === params.id) {
      setUrlIframe(last_view.iframe_data);
    }
    if (params.type === "s") {
      setIframeData({
        id: params.id,
        type: params.type,
      });
    } else {
      axios
        .get(
          `https://tastediverus.herokuapp.com/api/AhoyAgregator?kinopoisk=${params.id}`
        )
        .then((e) => {
          setIframeData(e.data.data);
          document.title = `tastediverus | просмотр | ${params.title}`;
        });
    }
  }, []);

  return (
    <Container id={"main-container"}>
      {IframeData !== {} ? (
        <Container>
          <ListGroup id={"iframes-byId"} horizontal>
            {Object.keys(IframeData).map((elem, index) => {
              if (Object.keys(IframeData[elem])[0])
                return (
                  <ListGroup.Item
                    key={`${IframeData[elem].translate} (${IframeData[elem].quality})`}
                    action
                    id={`iframe-select-${index}`}
                    onClick={(e) => {
                      localStorage.setItem(
                        "last_view",
                        JSON.stringify({
                          iframe_data: UrlIframe,
                          title: params.title,
                          kinopoisk_id: params.id,
                          type: params.type,
                        })
                      );
                      setUrlIframe({
                        ...IframeData[elem],
                        title: params.title,
                      });
                    }}
                  >
                    {`${elem} (${
                      IframeData[elem].translate || IframeData[elem].quality
                    })`}
                  </ListGroup.Item>
                );
            })}
          </ListGroup>
        </Container>
      ) : null}
      {params.type == "s" ? (
        <IframeResizer
          onClick={(e) => {
            e.stopPropogation();
          }}
          src={`https://music.yandex.ru/iframe/#artist/${IframeData.id}`}
          frameborder="0"
        ></IframeResizer>
      ) : null}

      {["h", "m"].includes(params.type) ? (
        <Container id={"iframe-container"}>
          <IframeResizer
            onClick={(e) => {
              e.stopPropogation();
            }}
            id={"iframe"}
            allow="fullscreen"
            src={UrlIframe.iframe}
          />
          {!UrlIframe ? (
            <div id={"heading-div"}>
              <h1 style={{ color: "white" }}>Выберите плеер</h1>
            </div>
          ) : null}
        </Container>
      ) : null}
    </Container>
  );
};

export default IframePlayer;
