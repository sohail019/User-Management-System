import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${
          theme === "dark" ? "dark" : ""
        }bg-white text-black dark:bg-[#131314] dark:text-[#c4c7c5] h-screen`}>
      <Header />
      <div className="mt-8">
          <Outlet />
      </div>
    </div>
  );
}

export default App;
