import React, { useState } from "react";
import AdminHeader from "../Admin/AdminHeader";
import AdminSignUpRequest from "../Admin/AdminSignUpRequest";
import AdminUserDetail from "./AdminUserDetail";
import Admincontactus from "./Admincontactus";
import AdminDashboard from "../Admin/AdminDashboard";
import "./AdminMain.css";

const AdminMain = () => {
    const [dashboardVisible, setDashboardVisible] = useState(false);

    const toggleDashboard = () => {
        setDashboardVisible(!dashboardVisible);
    };

    return (
        <div className = "admin_main" >
            <AdminHeader toggleDashboard={toggleDashboard} /> {dashboardVisible && < AdminDashboard />}
            <div className = { `ease-in duration-700 flex items-center justify-center ${ dashboardVisible ? "shift-right" : "shift-left"}` } >
                <table className = "w-4/5">
                    <tr className = "" >
                        <AdminSignUpRequest />
                    </tr>
                    <tr>
                        <AdminUserDetail />
                    </tr>
                    <tr>
                        <Admincontactus />
                    </tr>
                </table >
                
            </div>
        </div >
    );
};

export default AdminMain;