import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import KandPage from "./pages/KandPage";
import VerseDetail from "./pages/ReadingPage";
import BookmarksPage from "./pages/BookmarksPage";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import AdminVerseManagement from "./pages/AdminVerseManagement";
import EditVersePage from "./pages/EditVersePage";
import AdminLogin from "./pages/AdminLogin";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import ReadingPage from "./pages/ReadingPage";


function App() {
  return (
    <BrowserRouter>
  <Routes>

    <Route path="/" element={<Home />} />

    <Route path="/kand/:name" element={<KandPage />} />

<Route
    path="/kand/:name/:id"
    element={<ReadingPage />}
/>

    <Route
      path="/bookmarks"
      element={<BookmarksPage />}
    />

    <Route
      path="/search"
      element={<SearchPage />}
    />

   <Route
  path="/admin"
  element={
    <RoleProtectedRoute allowedRoles={['ROLE_ADMIN']}>
      <AdminPage />
    </RoleProtectedRoute>
  }
/>

    <Route
  path="/admin/verses"
  element={
    <RoleProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_EDITOR']}>
      <AdminVerseManagement />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/admin/edit/:id"
  element={
    <RoleProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_EDITOR']}>
      <EditVersePage />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/admin-login"
  element={<AdminLogin />}
/>

<Route path="/dashboard" element={<Dashboard />} />

<Route path="/signup" element={<Signup />} />


  </Routes>
</BrowserRouter>
  );
}

export default App;