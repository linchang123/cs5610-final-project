import axios from "axios";
/**
 * By default axios does not support cookies.
 * To configure axios to include cookies in requests,
 * use axios.create() to create an instance of the library
 * that includes cookies for credentials.
 */
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

/**
 * The client function "signin" posts a credentials object containing
 * the username and password expected by the server.
 * If the credentials are found, the response should contain the logged in user.
 */
// 在 client.ts 的 signin 函数中添加更多日志
export const signin = async (credentials: any) => {
    console.log("开始登录请求，发送数据:", credentials);
    try {
        const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
        console.log("登录成功，响应:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("登录错误详情:", error);
        throw error;
    }
};

// signup client that posts the new user to the Web API.
export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

// function to retrieve account information from the server route
export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};

// client function that post to the signout route
export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};

export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
};

export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(USERS_API);
    return response.data;
};

export const findUsersByRole = async (role: string) => {
    const response = await
        axios.get(`${USERS_API}?role=${role}`);
    return response.data;
};

export const findUsersByPartialName = async (name: string) => {
    const response = await axios.get(`${USERS_API}?name=${name}`);
    return response.data;
};

export const findUserById = async (id: string) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};
export const deleteUser = async (userId: string) => {
    const response = await axios.delete(`${USERS_API}/${userId}`);
    return response.data;
};
export const createUser = async (user: any) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};
export const unenrollFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};