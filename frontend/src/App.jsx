import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
// import CreateEditListing from "./pages/CreateEditListing";
import ListingDetails from "./pages/ListingDetails";
import MyFavorites from "./pages/MyFavorites";
import MyListings from "./pages/MyListing";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import ListingForm from "./pages/ListingForm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listing/:id" element={<ListingDetails />} />

          <Route path="/listing/create" element={
            <ProtectedRoute><ListingForm /></ProtectedRoute>
          } />
          <Route path="/listing/edit/:id" element={
            <ProtectedRoute><ListingForm /></ProtectedRoute>
          } />
          <Route path="/myfavorites" element={
            <ProtectedRoute><MyFavorites /></ProtectedRoute>
          } />
          <Route path="/mylistings" element={
            <ProtectedRoute><MyListings /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;