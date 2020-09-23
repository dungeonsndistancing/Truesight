import Vue from 'vue'
import Router from 'vue-router'
//import Login from './components/Login'
Vue.use(Router)

const routes = [
    {
      path: '/characters',
      name: 'characters',
      component: () => import('./views/Characters.vue'),
      meta: {requiresAuth: true}  
    },
    {
        path: '/charactercreator',
        name: ' charactercreator',
        component: () => import('./views/CharacterCreator.vue'),
        meta: {requiresAuth:true}
    },
    {
      path:'/charsheet/:char/:page',
      name: 'charsheet',
      component: () => import('./views/Charsheet.vue'),
      props:true,
      meta: {requiresAuth:true}
    },
    { path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./views/Register.vue')
    },
    {
        path: '/403',
        name: 'notAuthorized',
        component: () => import('./views/Forbidden.vue')
    },
    {
        path: '/items',
        name: 'items',
        component: () => import('./views/Items.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: '/newitem',
        name: 'itemcreator',
        component: () => import('./views/ItemCreator.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: '/edititem/:item',
        name: 'itemeditor',
        props: true,
        component: () => import('./views/ItemEditor.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: '/newspell',
        name: 'test',
        component: () => import('./views/SpellCreator.vue'),
        meta:{requiresAuth:true}
    },
    {
        path:'/editspell/:spell',
        name:' spelleditor',
        props:true,
        component: () => import('./views/SpellEditor.vue')
    },
    {
        path: '/spells',
        name: 'spells',
        component: () => import('./views/Spells.vue'),
        meta: {requiresAuth:true}
    },
    {
        path: '/*',
        name: 'default',
        component: () => import('./views/NotFound.vue')
    }
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(localStorage.getItem("token") == null) {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        if(localStorage.getItem("token") != null) {
            if(to.path === '/' || to.path === '/register') {
                next({path:'/characters'})
            }else{
                next()
            }
        }
        next()
    }
})

export default router