import {combineReducers} from "redux"

import {user} from "./redux/user.redux"

import { chartuser} from "./redux/chartuser.redux";
import { chat } from "./redux/chart.redux"
export default combineReducers({user,chartuser,chat})