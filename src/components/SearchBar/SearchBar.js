import React, { useState,useEffect,useRef } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import {useLocation,useParams} from 'react-router-dom';
import
{
    useNavigate
}
from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image'

import ListGroup from 'react-bootstrap/ListGroup';
import {LikeBtn} from "../ActionsBtns/LikeBtn.js"




const axios = require("axios");

const SEARCH_URI = 'https://tastediverus.herokuapp.com/api/get_autocomplete';


const SearchBar = () => {
    const params = useParams()
    const navigate = useNavigate()
    const loc = useLocation()
    const refInput = useRef()

      const [isLoading, setIsLoading] = useState(false);
      const [IsOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);


    useEffect(()=>{
        if(loc.hash.includes("#search")){
            const query = loc.hash.replace("#search=","")
            axios.get(`${SEARCH_URI}?type=h&query=${query}`).then((resp) => {
            setOptions(resp.data);
            setIsLoading(false);
            setIsOpen(true);
    })
        }

    },[])



  const handleSearch = (query,type) => {
    setIsLoading(true);
    console.log(type.split("/posts:")[1])
    axios.get(`${SEARCH_URI}?type=${type.split("/posts:")[1]}&query=${query}`).then((resp) => {
        setOptions(resp.data);
        setIsLoading(false);
        setIsOpen(true);
    })
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;
  const GetAvatar = (id) => `https://images.qloo.com/i/${id}-140x200-outside.jpg`;



  return (
        <div
        style={{width:"65vh"}}>
        {!loc.pathname.includes("view") ?     <AsyncTypeahead
      ref={refInput}
      filterBy={filterBy}
      id="async-example"
      open={IsOpen}
      isLoading={isLoading}
      minLength={3}
      searchText={"Идет поиск..."}
      labelKey={"title"}
      onSearch={(e)=>handleSearch(e,loc.pathname)}

      onChange={(e)=>{
          if(!loc.pathname.includes("view"))
              {
                  navigate(`/view/${e[0].type}/${e[0].kinopoisk_id}/${e[0].title}`)
              }

      }}
      options={options}
      align={"justify"}
      delay={4}
      placeholder="Найти контент..."
      renderMenuItemChildren={(option) => (
        <>
        <div>
          <Image
            alt={option.title}
            src={GetAvatar(option.data.split("--")[1])}
            rounded
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span>{option.title}</span> {option.rating ? <Badge bg="success">{option.rating}</Badge> : null} 
        </div>
        </>
      )}
    /> : null} 
  </div>



  );
};

export default SearchBar;