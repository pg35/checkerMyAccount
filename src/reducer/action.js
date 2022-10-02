export function createAction(type, data) {
  return {
    type,
    data
  };
}
export const WELCOME_POPUP = "welcomePopup";
export const AJAX_STATUS = "ajaxStatus";

export const SCAN_LOG = "scanLog";
export const TRANSACTION_LOG = "transactionLog";

export const TEXT_INPUT = "textInput";
export const FILE_INPUT = "fileInput";
export const URL_INPUT = "urlInput";

export const SCAN = "scan";
