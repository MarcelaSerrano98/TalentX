import axios from "axios";
const URL = "http://localhost:8080/api/nomina";

export const getNominas = () => axios.get(URL);
export const getNominaById = (id) => axios.get(`${URL}/${id}`);
export const crearNomina = (dto) => axios.post(URL, dto);
export const actualizarNomina = (dto) => axios.put(URL, dto);
export const eliminarNomina = (id) => axios.delete(`${URL}/${id}`);
