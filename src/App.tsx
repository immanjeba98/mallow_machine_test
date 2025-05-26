import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Layout from "./layout";
import * as Pages from "./components/index";
import routers from "./routes/routes";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routers().map(({ component, path, auth, childrens = [] }) => {
            const LayoutComponent = Layout[component];
            if (!LayoutComponent) {
              console.error(`Layout component "${component}" not found.`);
              return null;
            }

            return (
              <Route
                key={path}
                path={path}
                element={auth ? <PrivateRoutes Layout={LayoutComponent} /> : <LayoutComponent />}
              >
                {childrens.map(({ component: ChildComponent, path: childPath }) => {
                  const PageComponent = Pages[ChildComponent];
                  if (!PageComponent) {
                    console.error(`Page component "${ChildComponent}" not found.`);
                    return null;
                  }

                  return (
                    <Route
                      key={childPath}
                      path={childPath}
                      element={<PageComponent />}
                    />
                  );
                })}
              </Route>
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;