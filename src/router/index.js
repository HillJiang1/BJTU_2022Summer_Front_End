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
            },
            {
                //老人录入人脸
                path:'/old_face',
                component:() =>import('../components/page/old/old_face.vue'),
                meta: { title: '老人录入人脸' }
            },
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
                //工作人员录入人脸
                path:'/w_face',
                component:() =>import('../components/page/worker/w_face.vue'),
                meta: { title: '工作人员录入人脸' }
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
                //志愿者录入人脸
                path:'/v_face',
                component:() =>import('../components/page/volunteer/v_face.vue'),
                meta: { title: '志愿者录入人脸' }
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
                                
            },
            {
                //查看房间监控
                path:'/room',
                component:() =>import('../components/page/positions/room.vue'),
                meta: { title: '实时查看房间监控' }
            },
            {
                //查看走廊监控
                path:'/corridor',
                component:() =>import('../components/page/positions/corridor.vue'),
                meta: { title: '实时查看走廊监控' }
            },
            {
                //查看院子监控
                path:'/yard',
                component:() =>import('../components/page/positions/yard.vue'),
                meta: { title: '实时查看院子监控' }
            },
            {
                //查看桌子监控
                path:'/desk',
                component:() =>import('../components/page/positions/desk.vue'),
                meta: { title: '实时查看桌子监控' }
            },
            {
                //查看桌子监控
                path:'/test',
                component:() =>import('../components/test.vue')
            },
            {
                //查看日历
                path:'/calendar',
                component:() =>import('../components/page/calendar.vue'),
                meta: { title: '查看日历' }
            },
            {
                //增添日历
                path:'/addCalendar',
                component:() =>import('../components/page/addCalendar.vue'),
                meta: { title: '增添日历' }
            },
        ]
    }
   
        
]
  
})
