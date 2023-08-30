import axios from "axios";

const USER_BASE_REST_API_URL = 'http://localhost:8080/user/list';

class UserDetailsService{
    getAllUsersList(){

        return axios.get(USER_BASE_REST_API_URL)
    }
}


export default new UserDetailsService();



