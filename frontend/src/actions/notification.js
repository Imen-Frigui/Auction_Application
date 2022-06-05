import { ADD_NOTIFICATION } from '../constants/productConstants'

export function addNotification(message, level) {
  return {
    type: ADD_NOTIFICATION,
    message,
    level
  };
}
