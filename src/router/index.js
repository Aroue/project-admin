import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/Container'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {},
      component: () => import('../view/user/login'),
    },
    {
      path: '/',
      name: 'Container',
      component: Container,
      children: [

        {
          path: '/user/user-list',
          name: 'userList',
          meta: {},
          component: () => import('../view/user'),
        },
        {
          path: '/user/add-user',
          name: 'addUser',
          meta: {},
          component: () => import('../view/user/addUser'),
        },
        {
          path: '/user/edit-user/:id',
          name: 'editUser',
          meta: {},
          component: () => import('../view/user/editUser'),
        },
        {
          path: '/dept/dept-list',
          name: 'deptList',
          meta: {},
          component: () => import('../view/dept'),
        },
        {
          path: '/dept/add-dept',
          name: 'addDept',
          meta: {},
          component: () => import('../view/dept/addDept'),
        },
        {
          path: '/dept/edit-dept/:id',
          name: 'editDept',
          meta: {},
          component: () => import('../view/dept/editDept'),
        },
        {
          path: '/job/job-list',
          name: 'jobList',
          meta: {},
          component: () => import('../view/job'),
        },
        {
          path: '/job/add-job',
          name: 'addJob',
          meta: {},
          component: () => import('../view/job/addJob'),
        },
        {
          path: '/job/edit-job/:id',
          name: 'editJob',
          meta: {},
          component: () => import('../view/job/editJob'),
        },
        {
          path: '/notice/notice-list',
          name: 'noticeList',
          meta: {},
          component: () => import('../view/notice'),
        },
        {
          path: '/notice/add-notice',
          name: 'addNotice',
          meta: {},
          component: () => import('../view/notice/addNotice'),
        },
        {
          path: '/notice/edit-notice/:id',
          name: 'editNotice',
          meta: {},
          component: () => import('../view/notice/editNotice'),
        },
        {
          path: '/employee/employee-list',
          name: 'employeeList',
          meta: {},
          component: () => import('../view/employee'),
        },
        {
          path: '/employee/add-employee',
          name: 'addEmployee',
          meta: {},
          component: () => import('../view/employee/addEmployee'),
        },
        {
          path: '/employee/edit-employee/:id',
          name: 'editEmployee',
          meta: {},
          component: () => import('../view/employee/editEmployee'),
        }
      ]
    }
  ]
})
