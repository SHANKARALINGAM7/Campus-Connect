import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../Component/User/UserSidebar'; // Ensure you have Sidebar imported
import './App.css';
import UserCreate from '../Component/Auth/UserCreate';
import Login from '../Component/Auth/Login';
import CreateCollege from '../Component/Auth/CreateCollege';
import Home from '../Component/User/Home';
import Search from '../Component/User/Search';
import Profile from '../Component/User/Profile';
import LogOut from '../Component/User/LogOut';
import NewPost from '../Component/College/NewPost';
import ClgHome from '../Component/College/ClgHome';
import ClgSearch from '../Component/College/ClgSearch';
import ClgProfile from '../Component/College/ClgProfile';
import ClgLogOut from '../Component/College/ClgLogOut';
import AboutUs from '../Component/Auth/AboutUs';

function App() {
  const location = useLocation();
  
  // Define paths where Sidebar should be hidden
  const noSidebarPaths = ['/user-signup', '/login', '/college-signup', '/aboutUs','/*'];
  const showSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Conditionally render Sidebar based on current path */}
      {showSidebar && <Sidebar />}

      {/* Dynamic content on the right with scroll */}
      <div 
        style={{
          marginLeft: showSidebar ? '400px' : '0',  // Adjust margin based on Sidebar visibility
          width: showSidebar ? 'calc(100% - 400px)' : '100%',  // Adjust width based on Sidebar visibility
          padding: '20px',
          overflowY: 'auto', 
          height: '100vh', 
        }}
      >
        <Routes>
          <Route path="/user-signup" element={<UserCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/college-signup" element={<CreateCollege />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/college/newpost" element={<NewPost />} />
          <Route path="/college/home" element={<ClgHome />} />
          <Route path="/college/search" element={<ClgSearch />} />
          <Route path="/college/profile" element={<ClgProfile />} />
          <Route path="/college/logout" element={<ClgLogOut />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
