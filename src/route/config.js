export default {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'icon iconfont iconshenhe', component: 'Dashboard', roles: ['admin']},
        {
            key: '/app/user',
            title: '用户',
            icon: 'icon iconfont iconshenhe',
            subs: [
                { key: '/app/user/list', title: '新建用户', icon: 'icon iconfont iconfenlei', component: 'UserList', roles: ['student']},
            ],
        },
        {
            key: '/app/role',
            title: '角色',
            icon: 'icon iconfont iconshenhe',
            subs: [
                { key: '/app/role/list', title: '新建角色', icon: 'icon iconfont iconxitongguanli', component: 'RoleList', roles: ['admin']},
            ],
        },
    ],
    others: [], // 非菜单相关路由
};
