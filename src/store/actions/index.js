import { loginAction } from "./loginAction.js"
import { ratingAction } from "./ratingAction.js"
import { registerAction } from "./registerAction.js"
import { recommendationAction, recommendedAction } from "./recommendationActions.js"
import { uploadAction } from "./uploadAction.js"
import { setFilter } from "./filterActions.js"; 
import {getRatingAction} from './ratingAction';
import { addToWatchlistAction, removeFromWatchlistAction, getWatchlistAction } from "./watchlistActions.js"

export { 
    loginAction, 
    ratingAction,
    registerAction,
    recommendationAction,
    setFilter,
    recommendedAction,
    uploadAction,
    getRatingAction,
    addToWatchlistAction,
    removeFromWatchlistAction,
    getWatchlistAction
};