import Login from './components/Login.vue'
import File from './components/File.vue'

const routes = [

    { path: '/', component: Login, name: 'login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/file', component: File, name: 'file' },
]

export default routes
