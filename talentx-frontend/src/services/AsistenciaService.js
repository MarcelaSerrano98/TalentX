import axios from "axios";
const URL = "http://localhost:8080/api/asistencias";

export const getAsistencias = () => axios.get(URL);
export const getAsistenciaById = (id) => axios.get(`${URL}/${id}`);
export const crearAsistencia = (dto) => axios.post(URL, dto);
export const actualizarAsistencia = (dto) => axios.put(URL, dto);
export const eliminarAsistencia = (id) => axios.delete(`${URL}/${id}`);
