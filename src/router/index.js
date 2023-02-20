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
        path: "professor",
        name: "Professor",
        component: () => import("@/pages/Professor.vue"),
      },
      {
        path: "member",
        name: "Member",
        component: () => import("@/pages/Member.vue"),
      },
      {
        path: "archive",
        children: [
          {
            path: "",
            name: "ArchiveList",
            component: () => import("@/pages/Archive/Index.vue"),
          },
          {
            path: ":id",
            name: "ArchiveDetail",
            component: () => import("@/pages/Archive/Detail.vue"),
          },
        ],
      },
      {
        path: "news",
        children: [
          {
            path: "",
            name: "NewsList",
            component: () => import("@/pages/News/Index.vue"),
          },
          {
            path: ":id",
            name: "NewsDetail",
            component: () => import("@/pages/News/Detail.vue"),
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
            redirect: "/admin/archive",
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
            path: "archive",
            name: "AdminArchive",
            component: () => import("@/pages/Admin/Archive.vue"),
            meta: {
              title: "아카이브 관리",
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
            path: "news",
            name: "AdminNews",
            component: () => import("@/pages/Admin/News.vue"),
            meta: {
              title: "뉴스 관리",
            },
          },
          {
            path: "write",
            name: "AdminArchiveWrite",
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
