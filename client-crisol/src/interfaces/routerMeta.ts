export interface IRouterMeta {
  name?: string;
  path: string;
  isShow: boolean;
  isAuth?: boolean;
  isCommon?: boolean;
  file?: string;
}

export type RouterMetaType = {
  [key: string]: IRouterMeta;
};

const routerMeta: RouterMetaType = {
  HomePage: {
    name: "Home",
    path: "/",
    isShow: true,
    isCommon: true,
  },
  LoginPage: {
    name: "Login",
    path: "/login",
    isShow: true,
    isAuth: false,
  },
  RegisterPage: {
    name: "Register",
    path: "/register",
    isShow: true,
    isAuth: false,
    file: 'Register'
  },
  ForgotPage: {
    name: "Forgot",
    path: "/forgot-password",
    isShow: true,
    isAuth: false,
    file: 'ForgotPage'
  },
  UserVerifyPage: {
    name: "UserVerify",
    path: "/verify", // ← Removido el "?"
    isShow: true,
    isAuth: false,
    file: 'UserVerifyPage'
  },
  ResetPassPage: {
    name: "ResetPass",
    path: "/reset-password", // ← Removido el "?"
    isShow: true,
    isAuth: false,
    file: "ResetPage"
  },
  ProfilePage: {
    name: "Profile",
    path: "/profile",
    isShow: true,
    isAuth: true,
    file: 'ProfilePage'
  },
  BlogPage: {
    name: "BlogPage",
    path: "/blog",
    isShow: true,
    isCommon: true,
    file: "BlogPage",
  },
  UserList: {
    name: "UserListPage",
    path: "/admin/userlist",
    isShow: true,
    isCommon: true,
    file: "UserListPage"
  },
  DashboardAdminPage: {
    name: "Admin",
    path: "/admin",
    isShow: true,
    isAuth: true,
    file: "admin/DashboardAdminPage",
  },
  DashboardUsersPage: {
    name: "AdminUsers",
    path: "/user",
    isShow: true,
    isAuth: true,
    file: "user/DashboardUsersPage",
  },
  List: {
    name: "ListBlog",
    path: "/blog/listblog",
    isShow: true,
    isAuth: true,
    file: "blog/ListBlog",
  },
  Comments: {
    name: "Comments",
    path: "/blog/comments",
    isShow: true,
    isAuth: true,
    file: "blog/Comments",
  },
  AddBlog: {
    name: "AddBlog",
    path: "/blog/addblog",
    isShow: true,
    isAuth: true,
    file: "blog/AddBlog",
  },
  AddNews: {
    name: "AddNews",
    path: "/news/add",
    isShow: true,
    isAuth: true,
    file: "news/AddNews",
  },
  ListNews: {
    name: "ListNews",
    path: "/news/list",
    isShow: true,
    isAuth: true,
    file: "ListNewsPage"
  }
};

export default routerMeta;