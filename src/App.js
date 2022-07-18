import {
    BrowserRouter as Router,
    Route, Routes, NavLink, useParams, useNavigate, useHistory, Link
} from "react-router-dom";
import './App.css';
import Posts from "./components/Posts/Posts";
import Login from "./components/Login/Login";
import SimPage_ from "./components/simPage/simPage";
import {Button, Nav, Navbar} from "react-bootstrap";
import IframePlayer from "./components/IframePlayer/IframePlayer";

import useLocalStorage from "use-local-storage";
import {useState} from "react";



function Home() {
    return (<div>Home page</div>);
}



const tdTypes =  [
    {tdType:'a',title:"Авторы"},
    {tdType:'b',title:"Книги"},
    {tdType:'m',title:"Фильмы"},
    {tdType:'s',title:"Артисты"},
    {tdType:'p',title:"Подкасты"},
    {tdType:'h',title:"ТВ-шоу"},
    {tdType:'g',title:"Игры"}
]



function App() {

    const [Type,setType] = useState()
    const [cookie, setcookie] = useLocalStorage("cookie", localStorage.getItem('cookie')||undefined);
    return (
        <Router>
            <div className="App">
                <Navbar>
                    {/* "Link" in brand component since just redirect is needed */}
                    <Navbar.Brand as={NavLink} to="/">
                        Brand link
                    </Navbar.Brand>
                    <Nav>
                        {/* "NavLink" here since "active" class styling is needed */}
                        <Nav.Link as={NavLink} to="/" exact>
                            Home
                        </Nav.Link>

                            {cookie ? tdTypes.map((key,) => (
                                <Nav.Link onClick={e=> {
                                    setType(e.target.href.split(/.*:/).join(""))
                                }} key={key.tdType} as={Link} to={`/posts:${key.tdType}`}>
                                    {key.title}
                                </Nav.Link>
                            )) : null}


                        <Nav.Link onClick={e=>{
                            if(e.target.href.toString().includes("/logout"))
                                setcookie(undefined)
                        }}
                            as={NavLink} to={
                            cookie ? "/logout" : "/login"
                            }>
                            {
                                cookie ? "logout" : "login"
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Routes>
                        <Route path="/" exact="true" element={<Home/>} />
                        <Route path="/posts:type" exact="true" element={<Posts type={Type} cookie={cookie}/>} />
                        <Route path="/view/:type/:id" exact="true" element={<IframePlayer/>} />
                        <Route path="/similar/:href_id/:id" exact="true" element={<SimPage_ type={Type} cookie={cookie}/>} />
                        <Route path="/login" exact="true" element={<Login setcookie={setcookie}/>} />
                </Routes>
            </div>
        </Router>
    );
}




export default App;
