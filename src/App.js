import {
    BrowserRouter as Router,
    Route, Routes, NavLink, useParams, useNavigate, useHistory, Link,
    Navigate
} from "react-router-dom";
import './App.css';
import Posts from "./components/Posts/Posts";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import SimPage_ from "./components/simPage/simPage";
import {Button, Nav, Navbar} from "react-bootstrap";
import IframePlayer from "./components/IframePlayer/IframePlayer";
import SearchBar from "./components/SearchBar/SearchBar.js";
import {AvatarBar} from "./components/AvatarBar/AvatarBar.js";



import useLocalStorage from "use-local-storage";
import {useState} from "react";
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';



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
    const [last_view, set_last_view] = useLocalStorage("last_view", localStorage.getItem('last_view')||undefined);
    const [cookie, setcookie] = useLocalStorage("cookie", localStorage.getItem('cookie')||undefined);
    return (
        <Router>
            <div className="App">
                <Navbar style={{zIndex: "10000", padding: "0 5px"}}
                sticky="top" >
                    {/* "Link" in brand component since just redirect is needed */}
                    <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="vectorpaint.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            TasteDiveRus
          </Navbar.Brand>
        </Container>
<Form className="d-flex">
            <SearchBar/>
          </Form>
                    <Nav className="ml-auto">
                        

                        <Nav.Link as={NavLink} to="/" exact>
                            Home
                        </Nav.Link>

                            {cookie ? tdTypes.map((key,) => (
                                <Nav.Link

                                onClick={e=> {
                                    setType(e.target.href.split(/.*:/).join(""))
                                }} key={key.tdType} as={Link} to={`/posts:${key.tdType}`}>
                                    {key.title}
                                </Nav.Link>
                            )) : null}



                        <AvatarBar
                        cookie={cookie}   
                        setcookie={setcookie}
                        last_view={last_view}
                        >   
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

                        </AvatarBar>

                    </Nav>
                </Navbar>

                <Routes>
                        <Route
                        path="/"
                        exact="true"
                        element={<Home/>} />
                        
                        <Route
                        path="/posts:type"
                        exact="true"
                        element={<Posts type={Type} cookie={cookie}/>} />

                        <Route
                        path="/view/:type/:id/:title"
                        exact="true"
                        element={<IframePlayer/>} />

                        <Route
                        path="/similar/:href_id/:id"
                        exact="true"
                        element={<SimPage_ type={Type} cookie={cookie}/>} />

                        <Route
                        path="/login"
                        exact="true"
                        element={<Login setcookie={setcookie}/>} />

                        <Route
                        path="/logout"
                        exact="true"
                        element={<Logout setcookie={setcookie}/>} />
                </Routes>
            </div>
        </Router>
    );
}





export default App;
