import axios from 'axios';

const BASE_URL = 'https://';
const API_KEY = '632960624c626ff832bfcb96';
const URL = '.mockapi.io';
const PARAM = {
  todos: '/todos',
};

export const getTodosList = async () => {
  const { data } = await axios(`${BASE_URL}${API_KEY}${URL}${PARAM.todos}`);
  return data;
};

// export const postTodos = async todo => {
//   const data = await axios.post(
//     `${BASE_URL}${API_KEY}${URL}${PARAM.todos}`,
//     todo
//     {
//       headers: {
//         'Content-type': 'multipart/form-data',
//       },
//     }
//   );
//   return data;
// };

export const postTodos = async todo => {
  const { data } = await axios.post(
    `${BASE_URL}${API_KEY}${URL}${PARAM.todos}`,
    todo
  );
  return data;
};

export const dltTodo = async id => {
  const { data } = await axios.delete(
    `${BASE_URL}${API_KEY}${URL}${PARAM.todos}/${id}`
  );
  return data;
  // const res = await axios.delete(
  //   `${BASE_URL}${API_KEY}${URL}${PARAM.todos}/:${id}`
  // );
};
