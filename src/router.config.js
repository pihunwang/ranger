import Base from './Base.vue'
import Main from './views/Main.vue'
import Editor from './views/editor/Editor.vue'
import Login from './views/login/Login.vue'
import Tutorial from './views/tutorial/Tutorial.vue'

/**
 * Created by UKfire on 17/2/5.
 */

export default {
    routes: [
        {
            path: '',
            component: Base,
            children: [
                {
                    path: 'main',
                    name: 'main',
                    component: Main,
                    children: [
                        {
                            path: 'editor',
                            name: 'editor',
                            component: Editor
                        },
                        {
                            path: 'login',
                            name: 'login',
                            component: Login
                        },
                        {
                            path: 'tutorial',
                            name: 'tutorial',
                            component: Tutorial
                        }
                    ]
                },
            ],
        },
    ],
}
