export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_HISTORY = 'ADD_HISTORY';
export const TOGGLE_CHAT = 'TOGGLE_CHAT';

/**
 * add message action
 * @param {string} message
 * @returns {Object}
 */
export const addMessageAction = (message) => ({
  type: ADD_MESSAGE,
  payload: { message }
});

/**
 * add history action
 * @param {string[]} history
 * @returns {Object}
 */
export const addHistoryAction = (history) => ({
  type: ADD_HISTORY,
  payload: { history }
});

export const toggleChatAction = (isOpen) => ({
  type: TOGGLE_CHAT,
  payload: { isOpen }
});
