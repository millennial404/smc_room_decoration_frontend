import { Routes, Route } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { OnlyAuth, OnlyUnAuth } from "./components/ProtectedRouteElement";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import { checkUserAuth } from "./hooks/checkUserAuth";
import { useAppDispatch } from "./hooks/hooks";

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route element={<OnlyAuth />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route element={<OnlyUnAuth />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
