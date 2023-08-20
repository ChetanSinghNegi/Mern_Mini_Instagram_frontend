import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import videoSrc from "./inkForBac.mp4";
// import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

// const Users = React.lazy(() => import("./user/pages/Users"));
// const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
// const MainNavigation = React.lazy(() =>
//   import("./shared/components/Navigation/MainNavigation")
// );
// const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
// const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
// const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div>
        <video className="video-background" autoPlay loop muted>
          <source src={videoSrc} type="video/mp4"></source>
        </video>

        <Router>
          <MainNavigation />
          <main>
            {/* <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense> */}
            {routes}
          </main>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
