import axios from "axios";

const URL = "http://localhost:8080/api/empleados";

export const getEmpleados = () => axios.get(URL);
export const getEmpleadoById = (id) => axios.get(`${URL}/${id}`);
export const crearEmpleado = (empleado) => axios.post(URL, empleado);
export const actualizarEmpleado = (empleado) => axios.put(URL, empleado);
export const eliminarEmpleado = (id) => axios.delete(`${URL}/${id}`);
