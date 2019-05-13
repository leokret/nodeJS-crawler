
import { Router } from 'express'
import LoginController from './controllers/LoginController'

const routes = Router()

routes.post('/', LoginController.makeLogin)

export default routes
