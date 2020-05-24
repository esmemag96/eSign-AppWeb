import Login from './components/Login.vue'
import File from './components/File.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'

const routes = [
    { path: '/', component: Login, name: 'login' },
    { path: '/login', component: Login, name: 'login'},
    { path: '/register', component: Register, name: 'register' },
    { path: '/file', component: File, name: 'file' },
    { path: '/profile', component: Profile, name: 'profile' },
]

export default routes
