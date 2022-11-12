import "./App.css";
import { BookingContextProvider } from "./context/BookingContext";
import { Routes } from "./routes";
function App() {
  return (
    <BookingContextProvider>
      <Routes />
    </BookingContextProvider>
  );
}

export default App;
