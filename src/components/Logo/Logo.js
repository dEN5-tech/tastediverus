import React from 'react';
import  {Navbar} from "react-bootstrap"


export const Logo = ()=>{

		return (
			  <Navbar.Brand href="/">
            <img
              alt=""
              src="https://tastediverus.herokuapp.com/vectorpaint.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            TasteDiveRus
          </Navbar.Brand>
		)

}
