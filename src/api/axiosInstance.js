import axios from "axios";
import { Bounce, toast } from "react-toastify";

const dispatchAxiosError = (message) =>{
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
}

const dispatchAxiosSuccess = (message) =>{
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
}


const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => {
    console.log(response);
    if (response.config.method !== 'get' && response.config.method !== 'options'){
      dispatchAxiosSuccess("La operación se completo con éxito")
    }
    return response
  },
  error => {
    
    switch (error?.response?.status) {
      case 401:
        dispatchAxiosError("Debe iniciar sesión primero")
        localStorage.removeItem('token');
        window.location.href = '/login'
        break;
      case 403:
        dispatchAxiosError("Su cuenta no tiene el rol necesario para ingresar a esta función")
        break;
        
      case 500:
        dispatchAxiosError("Error en el servidor")
        break;
    
      default:
        dispatchAxiosError(error?.response?.data?.error?.message || error?.response?.data?.error)
        break;
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;