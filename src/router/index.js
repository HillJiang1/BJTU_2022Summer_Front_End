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
              component: () => import('../components/page/old/oldMen.vue'),
              meta: { title: '老人列表' }
            },
            {
                //添加老人
                path:'/addOld',
                component:() =>import('../components/page/old/addOld.vue'),
                meta: { title: '添加老人' }
            }
            ,
            {
                //查看具体老人信息
                path:'/concreteOld',
                component:() =>import('../components/page/old/d_old_mes.vue'),
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
            },
            {
                // 老人统计分析图
                path:'/oldImage',
                component:() =>import('../components/page/old/oldImage.vue'),
                meta:{title:'老人统计分析图'}
            },
            {
                //显示全部工作人员
                path:'/workers',
                component:() =>import('../components/page/worker/workers.vue'),
                meta:{title:'全部工作人员信息'}
            },
            {
                //添加工作人员
                path:'/addWorker',
                component:() =>import('../components/page/worker/addWorker.vue'),
                meta: { title: '添加工作人员' }
            },
            {
                // 工作人员统计分析图
                path:'/workerImage',
                component:() =>import('../components/page/worker/workerImage.vue'),
                meta:{title:'工作人员分析图'}
            },
            ,
            {
                //查看具体工作人员信息
                path:'/concreteWorker',
                component:() =>import('../components/page/worker/concreteWorker.vue'),
                meta: { title: '查看工作人员信息' }
            },
            {
                //显示全部志愿者
                path:'/volunteers',
                component:() =>import('../components/page/volunteer/volunteers.vue'),
                meta:{title:'全部志愿者信息'}
            },
            {
                //添加志愿者
                path:'/addVolunteer',
                component:() =>import('../components/page/volunteer/addVolunteer.vue'),
                meta: { title: '添加志愿者' }
            },
            {
                // 义工统计分析图
                path:'/volunteerImage',
                component:() =>import('../components/page/volunteer/volunteerImage.vue'),
                meta:{title:'义工分析图'}
            },
            ,
            {
                //查看具体志愿者信息
                path:'/concreteVolunteer',
                component:() =>import('../components/page/volunteer/concreteVolunteer.vue'),
                meta: { title: '查看志愿者信息' }
            },
            {
                                path:'/managerInfo',
                                component:() =>import('../components/page/managerInfo.vue'),
                                meta: { title: '查看管理员信息' }
                                
                            }
        ]
    }
   
        
]
  
})
