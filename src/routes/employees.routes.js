import { Router } from 'express'
import {
  getEmployees,
  getEmployeeId,
  postEmployees,
  putEmployees,
  patchEmployees,
  deleteEmployees
} from "../controllers/employees.controllers.js";

const router = Router()

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployeeId)

router.post('/employees', postEmployees)

router.put('/employees/:id', putEmployees)

router.patch('/employees/:id', patchEmployees)

router.delete('/employees/:id', deleteEmployees)

export default router