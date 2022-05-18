import {
    BrowserRouter as Router,
    Route, Routes, NavLink, useParams, useNavigate, useHistory
} from "react-router-dom";
import './App.css';
import Posts from "./components/Posts/Posts";
import Login from "./components/Login/Login";
import {Button, Nav, Navbar} from "react-bootstrap";
import ElemCard from "./components/ElemCard/ElemCard";

import useLocalStorage from "use-local-storage";



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
                                <Nav.Link onClick={(e)=>console.log(e)} key={key.tdType} as={Button} to={`/posts:${key.tdType}`}>
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
                    <Route path="/posts:type" exact="true" element={<Posts cookie={cookie}/>} />
                    <Route path="/login" exact="true" element={<Login setcookie={setcookie}/>} />
                </Routes>
            </div>
        </Router>
    );
}




export default App;
