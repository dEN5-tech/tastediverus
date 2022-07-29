import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import {useLocation,useParams} from 'react-router-dom';

const SEARCH_URI = 'https://tastediverus.herokuapp.com/api/get_autocomplete';


const SearchBar = () => {
    const {type} = useParams()

      const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);


    fetch(`${SEARCH_URI}?type=${type}&query=${query}`).then((resp) => resp.json())
      .then(({ items }) => {
        setOptions(items.suggestions);
        setIsLoading(false);
      });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;
  const GetAvatar = (id) => `https://images.qloo.com/i/${id}-140x200-outside.jpg`;

  return (<div>
      
      {type ?     <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a Github user..."
      renderMenuItemChildren={(option) => (
        <>
          <img
            alt={option.title}
            src={GetAvatar(option.data.split("--")[1])}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span>{option.value}</span>
        </>
      )}
    /> : null}
</div>
  );
};

export default SearchBar;