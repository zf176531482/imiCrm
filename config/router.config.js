export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      // { path: '/user/register', component: './User/Register' },
      // { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/home' },
      {
        name: 'Home', //菜单名字
        icon: 'icon-dashboard', //图标
        path: '/home', //文件夹
        component: './Home/Home', //文件名称
        authority: ['admin'], //配置准入权限,可以配置多个角色
      },
      // {
      //   name: 'Support',  //菜单名字
      //   icon: 'icon-kefu-copy',       //图标
      //   path: '/support',       //文件夹
      //   component: './Support/Support', //文件名称
      //   authority: ['admin'],//配置准入权限,可以配置多个角色
      // },
      {
        name: 'Contcts', //菜单名字
        icon: 'icon-user-copy', //图标
        path: '/contcts', //文件夹
        component: './Contcts/Contcts',
        authority: ['admin'], //配置准入权限,可以配置多个角色
      },
      {
        name: 'Product & Asset Information', //菜单名字
        icon: 'icon-assect-copy', //图标
        path: '/product', //文件夹
        component: './Product/Product', //文件名称
        authority: ['admin'], //配置准入权限,可以配置多个角色
      },
      {
        name: 'Upgrades', //菜单名字
        icon: 'icon-updata-copy', //图标
        path: '/upgrades', //文件夹
        authority: ['admin'], //配置准入权限,可以配置多个角色
        routes: [
          {
            path: '/upgrades',
            redirect: '/upgrades/find',
          },
          {
            path: '/upgrades/find',
            name: 'Find Upgrade Opportunities',
            component: './Upgrades/FindUpgrades',
          },
          {
            path: '/upgrades/my',
            name: 'My Upgrade List & Status',
            component: './Upgrades/MyUpgrades',
          },
          {
            path: '/upgrades/case',
            name: 'Case Studies',
            component: './Upgrades/CaseStudies',
          },
          {
            path: '/upgrades/manual',
            name: 'Manual Search & Input',
            routes: [
              {
                path: '/upgrades/manual',
                redirect: '/upgrades/manual/search',
              },
              {
                path: '/upgrades/manual/search',
                name: 'Manual Search',
                component: './Upgrades/ManualSearch',
              },
              {
                path: '/upgrades/manual/input',
                name: 'Manual Input',
                component: './Upgrades/ManualInput',
              },
            ],
          },
        ],
      },
      {
        name: 'Service Report', //菜单名字
        icon: 'icon-report-copy', //图标
        path: '/service', //文件夹
        component: './Service/Service', //文件名称
        authority: ['admin'], //配置准入权限,可以配置多个角色
      },
      {
        name: 'Utilities', //菜单名字
        icon: 'icon-tool_brief', //图标
        path: '/utilities', //文件夹
        component: './Utilities/Utilities', //文件名称
        authority: ['admin'], //配置准入权限,可以配置多个角色
      },
      {
        component: '404',
      },
    ],
  },
];

// {
//   path: '/dashboard',
//   name: 'dashboard',
//   icon: 'dashboard',
//   routes: [
//     {
//       path: '/dashboard/analysis',
//       name: 'analysis',
//       component: './Dashboard/Analysis',
//     },
//     {
//       path: '/dashboard/monitor',
//       name: 'monitor',
//       component: './Dashboard/Monitor',
//     },
//     {
//       path: '/dashboard/workplace',
//       name: 'workplace',
//       component: './Dashboard/Workplace',
//     },
//   ],
// },
// // forms
// {
//   path: '/form',
//   icon: 'form',
//   name: 'form',
//   routes: [
//     {
//       path: '/form/basic-form',
//       name: 'basicform',
//       component: './Forms/BasicForm',
//     },
//     {
//       path: '/form/step-form',
//       name: 'stepform',
//       component: './Forms/StepForm',
//       hideChildrenInMenu: true,
//       routes: [
//         {
//           path: '/form/step-form',
//           redirect: '/form/step-form/info',
//         },
//         {
//           path: '/form/step-form/info',
//           name: 'info',
//           component: './Forms/StepForm/Step1',
//         },
//         {
//           path: '/form/step-form/confirm',
//           name: 'confirm',
//           component: './Forms/StepForm/Step2',
//         },
//         {
//           path: '/form/step-form/result',
//           name: 'result',
//           component: './Forms/StepForm/Step3',
//         },
//       ],
//     },
//     {
//       path: '/form/advanced-form',
//       name: 'advancedform',
//       authority: ['admin'],
//       component: './Forms/AdvancedForm',
//     },
//   ],
// },
// // list
// {
//   path: '/list',
//   icon: 'table',
//   name: 'list',
//   routes: [
//     {
//       path: '/list/table-list',
//       name: 'searchtable',
//       component: './List/TableList',
//     },
//     {
//       path: '/list/basic-list',
//       name: 'basiclist',
//       component: './List/BasicList',
//     },
//     {
//       path: '/list/card-list',
//       name: 'cardlist',
//       component: './List/CardList',
//     },
//     {
//       path: '/list/search',
//       name: 'searchlist',
//       component: './List/List',
//       routes: [
//         {
//           path: '/list/search',
//           redirect: '/list/search/articles',
//         },
//         {
//           path: '/list/search/articles',
//           name: 'articles',
//           component: './List/Articles',
//         },
//         {
//           path: '/list/search/projects',
//           name: 'projects',
//           component: './List/Projects',
//         },
//         {
//           path: '/list/search/applications',
//           name: 'applications',
//           component: './List/Applications',
//         },
//       ],
//     },
//   ],
// },
// {
//   path: '/profile',
//   name: 'profile',
//   icon: 'profile',
//   routes: [
//     // profile
//     {
//       path: '/profile/basic',
//       name: 'basic',
//       component: './Profile/BasicProfile',
//     },
//     {
//       path: '/profile/advanced',
//       name: 'advanced',
//       authority: ['admin'],
//       component: './Profile/AdvancedProfile',
//     },
//   ],
// },
// {
//   name: 'result',
//   icon: 'check-circle-o',
//   path: '/result',
//   routes: [
//     // result
//     {
//       path: '/result/success',
//       name: 'success',
//       component: './Result/Success',
//     },
//     { path: '/result/fail', name: 'fail', component: './Result/Error' },
//   ],
// },
// {
//   name: 'exception',
//   icon: 'warning',
//   path: '/exception',
//   routes: [
//     // exception
//     {
//       path: '/exception/403',
//       name: 'not-permission',
//       component: './Exception/403',
//     },
//     {
//       path: '/exception/404',
//       name: 'not-find',
//       component: './Exception/404',
//     },
//     {
//       path: '/exception/500',
//       name: 'server-error',
//       component: './Exception/500',
//     },
//     {
//       path: '/exception/trigger',
//       name: 'trigger',
//       hideInMenu: true,
//       component: './Exception/TriggerException',
//     },
//   ],
// },
// {
//   name: 'account',
//   icon: 'user',
//   path: '/account',
//   routes: [
//     {
//       path: '/account/center',
//       name: 'center',
//       component: './Account/Center/Center',
//       routes: [
//         {
//           path: '/account/center',
//           redirect: '/account/center/articles',
//         },
//         {
//           path: '/account/center/articles',
//           component: './Account/Center/Articles',
//         },
//         {
//           path: '/account/center/applications',
//           component: './Account/Center/Applications',
//         },
//         {
//           path: '/account/center/projects',
//           component: './Account/Center/Projects',
//         },
//       ],
//     },
//     {
//       path: '/account/settings',
//       name: 'settings',
//       component: './Account/Settings/Info',
//       routes: [
//         {
//           path: '/account/settings',
//           redirect: '/account/settings/base',
//         },
//         {
//           path: '/account/settings/base',
//           component: './Account/Settings/BaseView',
//         },
//         {
//           path: '/account/settings/security',
//           component: './Account/Settings/SecurityView',
//         },
//         {
//           path: '/account/settings/binding',
//           component: './Account/Settings/BindingView',
//         },
//         {
//           path: '/account/settings/notification',
//           component: './Account/Settings/NotificationView',
//         },
//       ],
//     },
//   ],
// },
