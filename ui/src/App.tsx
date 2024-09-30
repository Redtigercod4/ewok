import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Landing,
  StudentLogin,
  StudentPage,
  InstructorLogin,
  InstructorCreate,
  InstructorJoin,
  InstructorPage,
  Header,
  Help,
} from "./components";
import {
  useEquipmentContext,
  useEwokContext,
  useSatEnvContext,
} from "./context/EwokContext";
import { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import PrivateRoute from "./components/features/auth/PrivateRoute";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./useTheme";

function App() {
  const { socket } = useEwokContext();
  const { setEquipment } = useEquipmentContext();
  const { setSatEnv } = useSatEnvContext();

  const handleEquipmentUpdate = (update: any) => {
    setEquipment(update);
  };

  const handleSatEnvUpdate = (update: any) => {
    setSatEnv(update);
  };

  useEffect(() => {
    socket.on("equipment_patch", handleEquipmentUpdate);
    socket.on("equipment_post", handleEquipmentUpdate);
    socket.on("equipment_delete", handleEquipmentUpdate);
    socket.on("satEnv_patch", handleSatEnvUpdate);
    socket.on("satEnv_post", handleSatEnvUpdate);
    socket.on("satEnv_delete", handleSatEnvUpdate);
  }, [socket]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Landing />} />
          </Route>
          {/* <Route path="/" element={<Landing />} />
          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/instructorLogin" element={<InstructorLogin />} />
          <Route path="/instructorCreate" element={<InstructorCreate />} />
          <Route path="/instructorJoin" element={<InstructorJoin />} />
          <Route path="/instructor" element={<InstructorPage />} />
          <Route path="/help" element={<Help />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

/* 
  Palette
    #2e292b Dark Grey
    #222834 Dark Blue
    #393e47 Slate
    #768583 Grey
    #47281a Brown
    #e17f2e Orange
  
  Icon Family
    https://react-icons.github.io/react-icons/icons?name=tb
  
  
*/
