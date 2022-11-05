import "./App.css";
import { BoatBooking } from "./components/BoatBooking";
import { BookingContextProvider } from "./context/BookingContext";
import { Routes } from "./routes";
function App() {
  return (
    <BookingContextProvider>
      <BoatBooking />
      <Routes />
    </BookingContextProvider>
  );
}

export default App;
