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
      { path: '/', redirect: '/dashboard' },
      {
        name: 'Dashboard', //菜单名字
        icon: 'icon-dashboard', //图标
        path: '/dashboard', //文件夹
        component: './Home/Home', //文件名称
        authority: ['admin', 'user'], //配置准入权限,可以配置多个角色
      },
      {
        name: 'Support', //菜单名字
        icon: 'icon-kefu-copy', //图标
        path: '/support', //文件夹
        component: './Support/Support', //文件名称
        authority: ['admin'], //配置准入权限,可以配置多个角色
      },
      {
        name: 'Contacts', //菜单名字
        icon: 'icon-user-copy', //图标
        path: '/contacts', //文件夹
        component: './Contacts/Contacts',
        authority: ['admin', 'user'], //配置准入权限,可以配置多个角色
      },
      {
        name: 'Product & Asset Information', //菜单名字
        icon: 'icon-imagevector-copy', //图标
        path: '/product', //文件夹
        component: './Product/Product', //文件名称
        authority: ['admin', 'user'], //配置准入权限,可以配置多个角色
      },
      {
        name: 'Upgrades', //菜单名字
        icon: 'icon-updata-copy', //图标
        path: '/upgrades', //文件夹
        authority: ['admin', 'user'], //配置准入权限,可以配置多个角色
        routes: [
          {
            path: '/upgrades',
            redirect: '/upgrades/find',
          },
          {
            path: '/upgrades/find',
            name: 'Find Upgrade Opportunities',
            component: './Upgrades/FindUpgrades',
            authority: ['admin', 'user'],
          },
          {
            path: '/upgrades/my',
            name: 'My Upgrade List & Status',
            component: './Upgrades/MyUpgrades',
            authority: ['admin'],
          },
          {
            path: '/upgrades/manual',
            name: 'Manual Search',
            component: './Upgrades/ManualSearch',
            authority: ['admin', 'user'],
          },
          {
            path: '/upgrades/case',
            name: 'Upgrade Packages',
            component: './Upgrades/CaseStudies',
            authority: ['admin', 'user'],
          },
        ],
      },
      {
        name: 'Service Report', //菜单名字
        icon: 'icon-report-copy', //图标
        path: '/service', //文件夹
        component: './Service/Service', //文件名称
        authority: ['admin', 'user'], //配置准入权限,可以配置多个角色
      },
      {
        name: 'Utilities', //菜单名字
        icon: 'icon-tool_brief', //图标
        path: '/utilities', //文件夹
        component: './Utilities/Utilities', //文件名称
        authority: ['admin', 'user'], //配置准入权限,可以配置多个角色
      },
      {
        path: '/exception/500',
        component: './Exception/500',
      },
      {
        path: '/exception/403',
        component: './Exception/403',
      },
      {
        path: '/exception/404',
        component: './Exception/404',
      },
    ],
  },
];
