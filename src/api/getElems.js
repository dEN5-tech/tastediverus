import axios from "axios";

const GetElemsApi = () => {
  axios.get("/api/get_data?offset=12").then(function (response) {
    return response.data;
  });
};

export default GetElemsApi;
