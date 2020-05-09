import React, {useContext} from "react";
import "./Sidebar.css";
import AppContext from "../../Contexts/AppContext";
import SidebarSubmenu from "./SidebarSubmenu/SidebarSubmenu";
import SchoolContext from "../../Contexts/SchoolContext";
import HttpClient from "../../Services/HttpClient";
import Dropdown from "../Dropdown/Dropdown";
import SidebarLink from "./SidebarLink/SidebarLink";

export default function () {
    const {logout, schools, setSchools, activeSchool, setActiveSchool} = useContext(AppContext);

    const handleLogout = () => logout();

    const schoolItems = [
        {
            title: 'My Schools',
            to: '/schools/my'
        },
        {
            title: 'Create School',
            to: '/schools/create'
        }
    ]

    const selectSchool = async school => {
        if (school._id === activeSchool._id) return;

        const data = {
            schoolId: school._id
        };

        await HttpClient().post("/api/school/change-active-school", data);
        setActiveSchool(school);
    };

    const dropdownSchools = schools.map(school => {
        return {
            text: school.title,
            onClick: () => selectSchool(school)
        }
    });

    return (
        <div className={"side-drawer"}>
            <div className="sidebar__account">
                <h1 className="sidebar__account-name mb-1">Skolify</h1>
            </div>
            <ul className="sidebar__nav flex--grow">
                <SidebarSubmenu title='Schools' items={schoolItems}/>
            </ul>
            <div className="sidebar__bottom" onClick={handleLogout}>Logout</div>
        </div>
    )
}
