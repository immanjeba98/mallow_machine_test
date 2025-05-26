import { Navigate, Outlet } from "react-router-dom";
import { getStorage } from "../services/helperFunctions";
import { EXIST_LOCAL_STORAGE } from "../services/constants";


const PrivateRoutes = ({ Layout }: any) => {
      const token = getStorage(EXIST_LOCAL_STORAGE.AUTHTOKEN);
    // const token = false
    return token ? <Layout><Outlet /></Layout> : <Navigate to="/login" />;
};

export default PrivateRoutes;
