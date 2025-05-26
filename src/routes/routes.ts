const routers = () => [
  {
    component: "AuthLayout",
    path: "/login",
    auth: false,
    childrens: [
      { component: "LoginPage", path: "", auth: false }, 
    ],
  },
  {
    component: "MainLayout",
    path: "/",
    auth: true,
    childrens: [
      { component: "MainPage", path: "", auth: true }, 
    ]
  },
];
export default routers;