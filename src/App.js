import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import Posts from "./components/Posts/Posts";
import Login from "./components/Login/Login";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/posts:type" element={<Posts />} />
                {/*<Route path="/inftest:type" element={
                    <QueryClientProvider client={queryClient}>
                        <InfiniteCSRPage />
                    </QueryClientProvider>} />*/}
            </Routes>
        </BrowserRouter>
  );
}


export default App;
