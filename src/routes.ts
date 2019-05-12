
import { Router } from 'express'
import LoginController from './controllers/LoginController'

const routes = Router()

routes.post('/', LoginController.index)

export default routes
