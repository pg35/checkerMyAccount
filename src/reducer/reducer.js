import * as T from "./action";

export const initialState = {
  welcomePopup: true,
  scan: {
    type: "text",
    status: 1,
    cost: 0
  },
  scanLog: {
    status: 1,
    list: [],
    order: null,
    orderBy: null,
    filter: ""
  },
  transactionLog: {
    status: 1,
    list: [],
    order: null,
    orderBy: null,
    filter: ""
  },
  textInput: {
    input: ""
  },
  fileInput: {
    input: null,
    status: 0,
    message: "",
    dirty: false
  },
  urlInput: {
    input: "",
    status: 0,
    message: "",
    dirty: false
  }
};

export default function reducer(state, action) {
  console.log("%cBefore: ", "color:#fff;background:darkgreen");
  console.log(action, state);
  const state2 = reducer1(state, action);
  console.log("%cAfter: ", "color:orange;font-size:1.2em;font-weight:bold;");
  console.log(state2);

  return state2;
}
export function reducer1(state, action) {
  switch (action.type) {
    case T.WELCOME_POPUP:
      return {
        ...state,
        welcomePopup: false
      };
    case T.AJAX_STATUS:
      return {
        ...state,
        ajaxStatus: action.data
      };
    case T.SCAN_LOG:
    case T.TRANSACTION_LOG:
    case T.TEXT_INPUT:
    case T.FILE_INPUT:
    case T.URL_INPUT:
    case T.SCAN:
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          ...action.data
        }
      };
    case T.TRANSACTION_LOG:
      return {
        ...state,
        transactionLog: {
          ...state.transactionLog,
          ...action.data
        }
      };
    default:
      throw new Error("Invalid action.type in reducer");
  }
}
