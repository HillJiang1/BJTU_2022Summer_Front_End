import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import register from '../components/register.vue'
import home from '../components/common/home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    //登录界面
    {
      path: '/',
      name: 'login',
      component: login
    },
    //注册界面
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
        path:'/home',
        component:home,
        children: [
            {
              // 老人列表
              path: '/oldMen',
              component: () => import('../components/page/oldMen.vue'),
              meta: { title: '老人列表' }
            },
            {
                //添加老人
                path:'/addOld',
                component:() =>import('../components/page/addOld.vue'),
                meta: { title: '添加老人' }
            }
            ,
            {
                //查看具体老人信息
                path:'/concreteOld',
                component:() =>import('../components/page/d_old_mes.vue'),
                meta: { title: '查看老人信息' }
            },
            {
                //突发情况记录
                path:'/emergency',
                component:() =>import('../components/page/emergency.vue'),
                meta:{title:'摔倒老人记录'}

            },
            {
                //管理员信息
                path:'/managerInfo',
                component:() =>import('../components/page/managerInfo.vue'),
                meta:{title:'管理员信息'}
            },
            {
                //确认密码
                path:'/confirmPwd',
                component:() =>import('../components/page/confirm_pwd.vue'),
                meta:{title:'确认密码'}
            },
            {
                //更改密码
                path:'/changePwd',
                component:() =>import('../components/page/change_pwd.vue'),
                meta:{title:'更改密码'}
            }
        ]
    }
   
        
]
  
})
