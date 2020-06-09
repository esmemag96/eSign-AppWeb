import Login from './components/Login.vue'
import File from './components/File.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'
import Checkout from './components/Checkout.vue'

const routes = [
    { path: '/', component: Login, name: 'login' },
    { path: '/login', component: Login, name: 'login'},
    { path: '/register', component: Register, name: 'register' },
    { path: '/file', component: File, name: 'file' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/Checkout', component: Checkout, name: 'Checkout' },
]

export default routes
