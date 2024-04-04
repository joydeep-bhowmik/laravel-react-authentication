import axios from "axios";
import { getCookie } from "@/lib/utils";
const token = getCookie("token");

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export default axios;
