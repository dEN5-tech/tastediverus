import { useMemo, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import Badge from "react-bootstrap/Badge";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./index.css";

import { Input } from "@rebass/forms";
import { Menu, useItem } from "react-bootstrap-typeahead";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Figure from "react-bootstrap/Figure";

const axios = require("axios");

const SEARCH_URI = "https://tastediverus.herokuapp.com/api/get_autocomplete";

export default function SearchBar() {
  const params = useParams();
  const navigate = useNavigate();
  const loc = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [ValInput, setValInput] = useState("");

  useMemo(() => {
    if (loc.hash.includes("#search")) {
      const query = loc.hash.replace("#search=", "");
      axios.get(`${SEARCH_URI}?type=h&query=${query}`).then((resp) => {
        setOptions(resp.data);
        setIsLoading(false);
        setIsOpen(true);
      });
    }
  }, []);

  const handleSearch = (query, type) => {
    setIsLoading(true);
    console.log(type.split("/posts:")[1]);
    axios
      .get(`${SEARCH_URI}?type=${type.split("/posts:")[1]}&query=${query}`)
      .then((resp) => {
        setOptions(resp.data);
        setIsLoading(false);
        setIsOpen(true);
      });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;
  const GetAvatar = (id) =>
    `https://images.qloo.com/i/${id}-140x200-outside.jpg`;

  const DropdownItem = (props) => <Dropdown.Item {...useItem(props)} />;
  return (
    <div id={"searchBar"}>
      {!loc.pathname.includes("view") ? (
        <AsyncTypeahead
          filterBy={filterBy}
          id="async-example"
          open={IsOpen}
          isLoading={isLoading}
          minLength={3}
          searchText={"Идет поиск..."}
          labelKey={"title"}
          onSearch={(e) => handleSearch(e, loc.pathname)}
          positionFixed={true}
          onChange={(e) => {
            if (!loc.pathname.includes("view")) {
              navigate(`/view/${e[0].type}/${e[0].kinopoisk_id}/${e[0].title}`);
            }
          }}
          options={options}
          align={"justify"}
          delay={4}
          placeholder="Найти..."
          style={{ overflow: "visible" }}
          useCache={false}
          renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
            <Input
              onChange={(e) => setValInput(e.target.value)}
              value={ValInput}
              {...inputProps}
              ref={(input) => {
                inputRef(input);
                referenceElementRef(input);
              }}
            />
          )}
          renderMenu={(results, menuProps) => (
            <Container>
              <button id={"closeButton"} onClick={() => setIsOpen(false)}>
                x
              </button>
              <Menu id={"searchDropdownMenu"} {...menuProps}>
                {results.map((option, position) => (
                  <DropdownItem option={option} position={position}>
                    <Container id={"outerRenderContainer"}>
                      <Figure>
                        {option.rating ? (
                          <div id={"ratingContainer"}>
                            <Badge id={"ratingBadge"} bg="success">
                              {option.rating}
                            </Badge>
                          </div>
                        ) : null}
                        <Figure.Image
                          width={171}
                          alt=""
                          src={GetAvatar(option.data.split("--")[1])}
                        />
                        <Figure.Caption>
                          <span id={"title"} style={{ whiteSpace: "initial" }}>
                            {option.title}
                            {option.disambiguation
                              ? ` (${option.disambiguation})`
                              : null}
                          </span>
                        </Figure.Caption>
                      </Figure>
                    </Container>
                    <hr />
                  </DropdownItem>
                ))}
              </Menu>
            </Container>
          )}
        />
      ) : null}
    </div>
  );
}
