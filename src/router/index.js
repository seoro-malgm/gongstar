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
      // 프로젝트
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
        path: "insight",
        children: [
          {
            path: "",
            name: "InsightList",
            component: () => import("@/pages/Insight/Index.vue"),
          },
          {
            path: ":id",
            name: "InsightDetail",
            component: () => import("@/pages/Insight/Detail.vue"),
          },
        ],
      },
      // 연락하기
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/pages/Contact.vue"),
      },
      // 어드민
      {
        path: "admin",
        component: LayoutAdmin,
        children: [
          {
            path: "",
            name: "Admin",
            redirect: "/admin/insights",
          },
          {
            path: "login",
            name: "AdminLogin",
            component: () => import("@/pages/Admin/Login.vue"),
            meta: {
              title: "로그인",
            },
          },
          // {
          //   path: "insights",
          //   name: "AdminInsights",
          //   component: () => import("@/pages/Admin/Insights.vue"),
          //   meta: {
          //     title: "인사이트 관리",
          //   },
          // },
          // {
          //   path: "member",
          //   name: "AdminMember",
          //   component: () => import("@/pages/Admin/Member.vue"),
          //   meta: {
          //     title: "멤버 관리",
          //   },
          // },
          // {
          //   path: "write",
          //   name: "AdminWrite",
          //   component: () => import("@/pages/Admin/Write.vue"),
          // },
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
