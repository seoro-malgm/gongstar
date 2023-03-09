import { createRouter, createWebHistory, RouterView } from "vue-router";
import beforeEach from "./beforeEach.js";
import LayoutDefault from "@/layouts/Default.vue";
import LayoutAdmin from "@/layouts/Admin.vue";
const routes = [
  {
    path: "/",
    component: LayoutDefault,
    children: [
      {
        // 메인
        path: "",
        name: "Main",
        component: () => import("@/pages/Main.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/pages/About.vue"),
      },
      {
        path: "history",
        name: "History",
        component: () => import("@/pages/History.vue"),
      },
      // {
      //   path: "professor",
      //   name: "Professor",
      //   component: () => import("@/pages/Professor.vue"),
      // },
      {
        path: "member",
        name: "Member",
        component: () => import("@/pages/Member.vue"),
      },
      {
        path: "project",
        children: [
          {
            path: "",
            name: "ProjectList",
            component: () => import("@/pages/Project/Index.vue"),
          },
          {
            path: ":id",
            name: "ProjectDetail",
            component: () => import("@/pages/Project/Detail.vue"),
          },
        ],
      },
      {
        path: "blog",
        children: [
          {
            path: "",
            name: "BlogList",
            component: () => import("@/pages/Blog/Index.vue"),
          },
          {
            path: ":id",
            name: "BlogDetail",
            component: () => import("@/pages/Blog/Detail.vue"),
          },
        ],
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/pages/Contact.vue"),
      },
      {
        path: "search",
        name: "SearchResult",
        component: () => import("@/pages/SearchResult.vue"),
      },
      {
        path: "admin",
        component: LayoutAdmin,
        children: [
          {
            path: "",
            name: "Admin",
            redirect: "/admin/project",
          },
          {
            path: "login",
            name: "AdminLogin",
            component: () => import("@/pages/Admin/Login.vue"),
            meta: {
              title: "로그인",
            },
          },
          {
            path: "project",
            name: "AdminProject",
            component: () => import("@/pages/Admin/Project.vue"),
            meta: {
              title: "프로젝트 관리",
            },
          },
          {
            path: "member",
            name: "AdminMember",
            component: () => import("@/pages/Admin/Member.vue"),
            meta: {
              title: "멤버 관리",
            },
          },
          {
            path: "history",
            name: "AdminHistory",
            component: () => import("@/pages/Admin/History.vue"),
            meta: {
              title: "연구실적 관리",
            },
          },
          {
            path: "blog",
            name: "AdminBlog",
            component: () => import("@/pages/Admin/Blog.vue"),
            meta: {
              title: "블로그 관리",
            },
          },
          {
            path: "write",
            name: "AdminWrite",
            component: () => import("@/pages/Admin/Write.vue"),
          },
          {
            path: "logout",
            name: "Logout",
            component: () => import("@/pages/Admin/Logout.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  /*  history: createWebHistory(process.env.BASE_URL), */
  history: createWebHistory(""),
  routes,
  scrollBehavior(to, from, savedPosition) {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    return savedPosition
      ? savedPosition
      : {
          top: 0,
        };
  },
});
// beforeEach 설정
router.beforeEach(beforeEach);
export default router;
