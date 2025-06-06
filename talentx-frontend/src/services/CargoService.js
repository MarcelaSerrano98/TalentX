import axios from "axios";

const URL = "http://localhost:8080/api/cargos";

export const getCargos = () => axios.get(URL);
export const getCargoById = (id) => axios.get(`${URL}/${id}`);
export const crearCargo = (cargo) => axios.post(URL, cargo);
export const actualizarCargo = (cargo) => axios.put(URL, cargo);
export const eliminarCargo = (id) => axios.delete(`${URL}/${id}`);
