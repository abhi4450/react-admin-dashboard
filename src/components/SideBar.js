import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { People, ChevronDown, ChevronUp, List } from "react-bootstrap-icons"; // Using List for hamburger icon

import "./SideBar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleStudentsMenu = () => setIsStudentsOpen(!isStudentsOpen);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="hamburger" onClick={toggleSidebar}>
        <List />
      </div>
      <nav>
        <ul>
          <li>
            <a href="#students" onClick={toggleStudentsMenu}>
              <People />
              {!isCollapsed && <span>Students</span>}
              <span className={`chevron-icon ${isCollapsed ? "hide" : ""}`}>
                {isStudentsOpen ? <ChevronUp /> : <ChevronDown />}
              </span>
            </a>
            {isStudentsOpen && (
              <ul className="submenu">
                <li>
                  <a>
                    {" "}
                    <NavLink to="/dashboard/students">All Students</NavLink>
                  </a>
                </li>
               
              </ul>
            )}
          </li>
         
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
