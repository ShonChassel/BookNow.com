import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import Single from "./pages/dashboard/single/Single";
import HomeDash from "./pages/dashboard/home/Home";
import { DarkModeContext } from "./context/dash/context/darkModeContext";
import { productInputs, userInputs } from "./formSource";
import New from "./pages/dashboard/new/New";
import NewHotel from "./pages/dashboard/newHotel/NewHotel";
import CheckoutSuccess from "./components/CheckoutSuccess/CheckoutSuccess";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  }


  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />


        <Route path="/dashboard">
            <Route index element={<ProtectedRoute><HomeDash /></ProtectedRoute>} />
            
            <Route path="users">
              <Route index element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>}
              />
            </Route>

            <Route path="hotels">
              <Route index element={<List columns={hotelColumns} />} />
              <Route path=":productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewHotel /></ProtectedRoute>}/>
            </Route>
            
            {/* <Route path="rooms">
              <Route index element={<List columns={roomColumns} />} />
              <Route path=":productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewRoom/></ProtectedRoute>}
              />
            </Route> */}

          </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
