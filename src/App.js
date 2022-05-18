import {
    BrowserRouter as Router,
    Route, Routes, NavLink, useParams, useNavigate
} from "react-router-dom";
import './App.css';
import Posts from "./components/Posts/Posts";
import Login from "./components/Login/Login";
import {Nav, Navbar} from "react-bootstrap";
import ElemCard from "./components/ElemCard/ElemCard";




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
    const navigate = useNavigate();
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

                            {tdTypes.map((key,) => (
                                <Nav.Link  onClick={(e) => {
                                    e.preventDefault()
                                    navigate(`/posts:${key.tdType}`)
                                }} key={key.tdType} as={NavLink} >
                                    {key.title}
                                </Nav.Link>
                            ))}

                        <Nav.Link as={NavLink} to="/login">
                            One More
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Routes>
                        <Route path="/" exact="true" element={<Home/>} />
                    <Route path="/posts:type" exact="true" element={<Posts/>} />
                    <Route path="/login" exact="true" element={<Login/>} />
                </Routes>
            </div>
        </Router>
    );
}




export default App;
