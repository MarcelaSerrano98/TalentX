import axios from "axios";

const URL = "http://localhost:8080/api/departamentos";

export const getDepartamentos = () => axios.get(URL);
export const getDepartamentoById = (id) => axios.get(`${URL}/${id}`);
export const crearDepartamento = (dto) => axios.post(URL, dto);
export const actualizarDepartamento = (dto) => axios.put(URL, dto);
export const eliminarDepartamento = (id) => axios.delete(`${URL}/${id}`);
