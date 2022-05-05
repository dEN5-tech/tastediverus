import axios from "axios";


const GetElemsApi = () => {
    axios.get('http://localhost:3001/api/get_data?offset=12')
        .then(function (response) {
            return response.data
        })

};

export default GetElemsApi;