import { Card, Tooltip, Container } from "react-bootstrap";
import "./index.css";
import React, { useEffect, useState } from "react";

import axios from "axios";

export const OverAvatars = ({ cookie }) => {
    const [AvatarData, setAvatarData] = useState([]);
    const [Status, setStatus] = useState(false);
    useEffect(() => {
        axios
            .get(
                `https://tastediverus.herokuapp.com/api/get_recommended_users?offset=0&count=20&token=${cookie.cookie}`
            )
            .then((result) => {
                setAvatarData(result.data)
                setStatus(true);
            });
        
    }, []);

    return (
        <Container>
            <div className="c-profile__list">
                {Status
                    ? AvatarData.map((item, i) => (
                          <a
                              className="c-profile"
                              username={`${item.username}\n${item.match_tp}`}
                              style={{
                                  "--posOffset": `-${
                                      AvatarData.length * 1.5 -
                                      AvatarData.length * 0.50
                                  }px`,
                                  "--Size":"1.2",
                                  backgroundImage: `url(${item.poster})`,
                                  "--AvaSizeW": `${AvatarData.length * 1.8}px`,
                                  "--AvaSizeH": `${AvatarData.length * 3.5}px`,
                              }}
                          />
                      ))
                    : null}
            </div>
        </Container>
    );
};
