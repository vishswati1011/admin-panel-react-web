import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Pages and Components
import Home from "./pages/home/home";
import Navbar from "./components/navbar/navbar";
import Employee from "./pages/users/employees";
import Role from "./pages/roles/roles";
import Groups from "./pages/groups/groups";
import Permission from "./pages/permission/permission";
import Trash from "./pages/trash/trash";
import Resources from "./pages/resources/Resources";
import Shareme from "./pages/share/shareme";
import SideBar from "./components/sidebar/sidebar";
import Starred from "./pages/starred/starred";
// import Login from "./pages/login/login";
import Loader from "./loader";
import ProfileEdit from "./pages/profile/profileEdit";
import BottomNavbar from "./components/navbar/bottomNavbar";
import EditGroupModal from "./components/groupComponent/editGroupModal";
import ViewGroup from "./components/groupComponent/viewGroup";
import AddGroup from "./components/groupComponent/addGroupModal";
import { account } from "./utils/routes";
import { COOKIES_TOKEN } from "./redux/helper/urlHelper";
import Dashboard from "./pages/dashboard/dashboard";
// TOKEN
if (!COOKIES_TOKEN) {
  window.location.href = `https://${account}`;
}

const App = () => {
  return (
    <div className="App">
      <Router>
        {COOKIES_TOKEN ? (
          <>
            <div className="drive_main_section">
              <div className="navbar_div">
                <Navbar />
              </div>
              <div className="side_bar_div">
                <SideBar />
              </div>
              <div className="route_section_div">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Employee />} />
                  <Route exact path="/profile" element={<ProfileEdit />} />
                  <Route path="/roles" element={<Role />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/permissions" element={<Permission />} />
                  <Route path="/starred" element={<Starred />} />
                  <Route path="/trash" element={<Trash />} />
                  <Route path="/share-with-me" element={<Shareme />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/edit-group" element={<EditGroupModal />} />
                  <Route path="/view-group" element={<ViewGroup />} />
                  <Route path="/add-group" element={<AddGroup />} />
                </Routes>
                <div className="bottom_navbar">
                  <BottomNavbar />
                </div>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route exact path="/" element={<Loader />} />
            {/* <Route exact path="/" element={<Login />}></Route> */}
          </Routes>
        )}
      </Router>
    </div>
  );
};

export default App;
