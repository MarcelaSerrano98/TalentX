import axios from "axios";
const URL = "http://localhost:8080/api/usuarios";

export const getUsuarios = () => axios.get(URL);
export const getUsuarioById = (id) => axios.get(`${URL}/${id}`);
export const crearUsuario = (usuario) => axios.post(URL, usuario);
export const actualizarUsuario = (usuario) => axios.put(URL, usuario);
export const eliminarUsuario = (id) => axios.delete(`${URL}/${id}`);
