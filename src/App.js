import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import "./App.css";

const NavBar = React.lazy(() => import("./components/Navbar/Navbar"));
const IframePlayer = React.lazy(() =>
  import("./components/IframePlayer/IframePlayer")
);
const Login = React.lazy(() => import("./components/Login/Login"));
const Logout = React.lazy(() => import("./components/Logout/Logout"));
const Posts = React.lazy(() => import("./components/Posts/Posts"));
const SimPage_ = React.lazy(() => import("./components/simPage/simPage"));

const tdTypes = [
  { tdType: "a", title: "Авторы" },
  { tdType: "b", title: "Книги" },
  { tdType: "m", title: "Фильмы" },
  { tdType: "s", title: "Артисты" },
  { tdType: "p", title: "Подкасты" },
  { tdType: "h", title: "ТВ-шоу" },
  { tdType: "g", title: "Игры" },
];

function Home() {
  return <div>Home page</div>;
}

function App() {
  const [Type, setType] = useState();
  const [last_view, set_last_view] = useLocalStorage(
    "last_view",
    localStorage.getItem("last_view") || undefined
  );
  const [cookie, setcookie] = useLocalStorage(
    "cookie",
    localStorage.getItem("cookie") || undefined
  );
  return (
    <Router>
      <Container>
        <div className="App">
          <React.Suspense
            fallback={
              <Container>
                <Spinner animation="border" />
              </Container>
            }
          >
            <NavBar
              cookie={cookie}
              setcookie={setcookie}
              last_view={last_view}
              tdTypes={tdTypes}
              setType={setType}
            />
          </React.Suspense>

          <Routes>
            <Route
              path="/"
              exact="true"
              element={
                <React.Suspense
                  fallback={
                    <Container>
                      <Spinner animation="border" />
                    </Container>
                  }
                >
                  <Home />
                </React.Suspense>
              }
            />

            <Route
              path="/posts:type"
              exact="true"
              element={
                <React.Suspense
                  fallback={
                    <Container>
                      <Spinner animation="border" />
                    </Container>
                  }
                >
                  <Posts type={Type} cookie={cookie} />
                </React.Suspense>
              }
            />

            <Route
              path="/view/:type/:id/:title"
              exact="true"
              element={
                <React.Suspense
                  fallback={
                    <Container>
                      <Spinner animation="border" />
                    </Container>
                  }
                >
                  <IframePlayer />
                </React.Suspense>
              }
            />

            <Route
              path="/similar/:href_id/:id"
              exact="true"
              element={
                <React.Suspense
                  fallback={
                    <Container>
                      <Spinner animation="border" />
                    </Container>
                  }
                >
                  <SimPage_ type={Type} cookie={cookie} />
                </React.Suspense>
              }
            />

            <Route
              path="/login"
              exact="true"
              element={
                <React.Suspense
                  fallback={
                    <Container>
                      <Spinner animation="border" />
                    </Container>
                  }
                >
                  <Login setcookie={setcookie} />
                </React.Suspense>
              }
            />

            <Route
              path="/logout"
              exact="true"
              element={
                <React.Suspense
                  fallback={
                    <Container>
                      <Spinner animation="border" />
                    </Container>
                  }
                >
                  <Logout setcookie={setcookie} />
                </React.Suspense>
              }
            />
          </Routes>
        </div>
      </Container>
    </Router>
  );
}

export default App;
