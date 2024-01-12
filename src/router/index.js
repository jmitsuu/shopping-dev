import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Masculino from "../views/vestuario/Masculino.vue"
import Feminino from "../views/vestuario/Feminino.vue"
import Joias from "../views/acessorios/Joias.vue"
import Eletronicos from "../views/informatica/Eletronicos.vue"
import Description from "../views/Descriptions.vue";
import Administrator from "../views/panel/Administrator.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import instance from '../http/getUrl';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        isAuth:false
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue'),
      meta:{
        isAuth:false
      }
    },
    {
      path: '/vestuario/masculino',
      name: 'masculino',
      component: Masculino,
      meta:{
        isAuth:false
      }
    },
    {
      path: '/vestuario/feminino',
      name: 'feminino',
      component: Feminino,
      meta:{
        isAuth:false
      }
    }
    ,
    // {
    //   path: '/acessorios/joias',
    //   name: 'joias',
    //   component: Joias,
    //   meta:{
    //     isAuth:false
    //   }
    // },
    // {
    //   path: '/informatica/eletronicos',
    //   name: 'eletronicos',
    //   component: Eletronicos,
    //   meta:{
    //     isAuth:false
    //   }
    // }
    ,
    {
      path: '/descricao/:id',
      name: 'descricao',
      component:  Description,
      meta:{
        isAuth:false
      }
    }
    ,
    {
      path: '/administrador/',
      name: 'administrador',
      component: Administrator,
      meta:{
        isAuth:true
      }
    }
    ,
    {
      path: '/auth/acesso',
      name: 'acesso',
      component: Login,
      meta:{
        isAuth:false
      }
    }
    ,
    {
      path: '/auth/cadastrar',
      name: 'cadastrar',
      component: Register,
      meta:{
        isAuth:false
      }
    }
  ]
})

router.beforeEach( async (to, from, next) =>{
  if(to.meta.isAuth){
    const user = JSON.parse(localStorage.getItem('credentials'));
    const {data} = await instance.get('/admin',{
      headers:{
        'authorization': user.tokenLocal
      }
    });
 
    if(data.userAcess !== 3){
      next('/login')
    }
  }
  next()
})

export default router
