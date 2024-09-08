import Nav from "./Nav";
import Setting from "./Setting";
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Setting />
    </ThemeProvider>
  );
}

export default App;
