import axios from "axios";
import { Heart } from "react-bootstrap-icons";

export const LikeBtn = (params) => {
  function SetLike() {
    axios
      .get(`https://tastediverus.vercel.app/api/like`, {
        params: {
          id: `${params.id}`,
          year: `${params.year}`,
          title: `${params.title}`,
          type: `${params.type}`,
          token: `${JSON.parse(localStorage.getItem("cookie")).cookie}`,
        },
      })
      .then(() => {
        window.location.reload();
      });
  }
  return <Heart onClick={SetLike} />;
};
