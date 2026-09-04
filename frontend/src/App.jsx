import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Browse from "./pages/Browse";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEditListing from "./pages/CreateEditListing";
import ListingDetails from "./pages/ListingDetails";
import MyListingsFavorites from "./pages/MyListingsFavorites";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listing/:id" element={<ListingDetails />} />

          <Route path="/listing/create" element={
            <ProtectedRoute><CreateEditListing /></ProtectedRoute>
          } />
          <Route path="/listing/edit/:id" element={
            <ProtectedRoute><CreateEditListing /></ProtectedRoute>
          } />
          <Route path="/my-listings" element={
            <ProtectedRoute><MyListingsFavorites /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;