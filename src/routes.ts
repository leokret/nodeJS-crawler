
import { Router } from 'express'
import LoginController from './controllers/LoginController'

const routes = Router()

routes.post('/', LoginController.parseJson)
routes.get('/', LoginController.getCookie)

export default routes
