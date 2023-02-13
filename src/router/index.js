import { createRouter, createWebHistory, RouterView } from "vue-router";
import beforeEach from "./beforeEach.js";
import LayoutDefault from "@/layouts/Default.vue";
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
        path: "members",
        name: "Members",
        component: () => import("@/pages/Members.vue"),
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
        children: [
          {
            path: "",
            name: "AdminIndex",
            component: () => import("@/pages/Admin/Index.vue"),
          },
          {
            path: "write",
            name: "AdminArchiveWrite",
            component: () => import("@/pages/Admin/Write.vue"),
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
