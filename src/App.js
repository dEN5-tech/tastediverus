import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React from "react";
import useLocalStorage from "use-local-storage";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    NavLink,
    useParams,
    useNavigate,
    useHistory,
    Link,
    Navigate,
} from "react-router-dom";

import { NavBar } from "./components/Navbar/Navbar.js";

import { Button, Nav, Navbar } from "react-bootstrap";

import { useState } from "react";

const IframePlayer = React.lazy(() =>
    import("./components/IframePlayer/IframePlayer")
);
const Login = React.lazy(() => import("./components/Login/Login"));
const Logout = React.lazy(() => import("./components/Logout/Logout"));
const Posts = React.lazy(() => import("./components/Posts/Posts"));
const SearchBar = React.lazy(() =>
    import("./components/SearchBar/SearchBar.js")
);
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
                    <NavBar
                        cookie={cookie}
                        setcookie={setcookie}
                        last_view={last_view}
                        tdTypes={tdTypes}
                        setType={setType}
                        SearchBar={SearchBar}
                    />

                    <Routes>
                        <Route
                            path="/"
                            exact="true"
                            element={
                                <React.Suspense>
                                    <Home />
                                </React.Suspense>
                            }
                        />

                        <Route
                            path="/posts:type"
                            exact="true"
                            element={
                                <React.Suspense>
                                    <Posts type={Type} cookie={cookie} />
                                </React.Suspense>
                            }
                        />

                        <Route
                            path="/view/:type/:id/:title"
                            exact="true"
                            element={
                                <React.Suspense>
                                    <IframePlayer />
                                </React.Suspense>
                            }
                        />

                        <Route
                            path="/similar/:href_id/:id"
                            exact="true"
                            element={
                                <React.Suspense>
                                    <SimPage_ type={Type} cookie={cookie} />
                                </React.Suspense>
                            }
                        />

                        <Route
                            path="/login"
                            exact="true"
                            element={
                                <React.Suspense>
                                    <Login setcookie={setcookie} />
                                </React.Suspense>
                            }
                        />

                        <Route
                            path="/logout"
                            exact="true"
                            element={
                                <React.Suspense>
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
