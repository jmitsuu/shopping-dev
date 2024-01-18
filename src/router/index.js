import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import Description from "../views/Descriptions.vue";
import Administrator from "../views/panel/Administrator.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import instance from "../http/getUrl";
import Show from "../views/clothes/Show.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        isAuth: false,
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/About.vue"),
      meta: {
        isAuth: false,
      },
    },
    
  
    {
      path: "/descricao/:id",
      name: "descricao",
      component: Description,
      meta: {
        isAuth: false,
      },
    },
    {
      path: "/clothes/",
      name: "vestuario2",
      component: Show,
      meta: {
        isAuth: false,
      },
    },
    {
      path: "/administrador/",
      name: "administrador",
      component: Administrator,
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/auth/acesso",
      name: "acesso",
      component: Login,
      meta: {
        isAuth: false,
      },
    },
    {
      path: "/auth/cadastrar",
      name: "cadastrar",
      component: Register,
      meta: {
        isAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.isAuth) {
    const user = JSON.parse(localStorage.getItem("credentials"));
    const { data } = await instance.get("/admin", {
      headers: {
        authorization: user.tokenLocal,
      },
    });

    const acess = data.find((i) => i.acess_level);
    if (acess.acess_level !== 3) {
      next("/login");
    }
  }
  next();
});

export default router;
