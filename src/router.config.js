import Base from './Base.vue'
import Main from './views/Main.vue'

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
                },
            ],
        },
    ],
}
