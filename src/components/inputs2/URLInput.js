import { useEffect } from "react";
import Container from "../ui/Container";
import Progress from "../ui/Progress";
import * as T from "../../reducer/action";
import { useAjax } from "../../util/hooks";
import { isValidUrl } from "../../util/general";

export default function URLInput(props) {
  const {
    state: {
      urlInput: { input, status, message, dirty }
    },
    dispatch,
    onComplete
  } = props;
  const [response, ajaxFuncs] = useAjax();
  useEffect(() => {
    if (2 !== status) {
      dispatch(
        T.createAction(T.URL_INPUT, {
          status: 0,
          message: "",
          dirty: isValidUrl(input)
        })
      );
    }
  }, []);
  useEffect(() => {
    if (response.data) {
      dispatch(
        T.createAction(T.URL_INPUT, {
          status: 2,
          message: "validated",
          dirty: true
        })
      );
      onComplete();
    } else if (response.fail) {
      dispatch(
        T.createAction(T.URL_INPUT, {
          status: 3,
          message: `Failed to validate URL: ${response.fail}`,
          dirty: true
        })
      );
    }
  }, [response]);

  function handleNextBtn(url) {
    if (2 === status) {
      return onComplete();
    }
    dispatch(
      T.createAction(T.URL_INPUT, {
        status: 1,
        message: "Validating URL...",
        dirty: false
      })
    );
    ajaxFuncs.start({ data: { action: "pxq_pgck_validate_url", url } });
  }

  function handleChange(e) {
    const url = window.jQuery.trim(e.target.value.toLowerCase());
    const isValid = url ? isValidUrl(url) : true;
    dispatch(
      T.createAction(T.URL_INPUT, {
        input: url,
        status: isValid ? 0 : 3,
        message: !isValid ? "Please enter a valid HTTP URL" : "",
        dirty: url ? isValid : false
      })
    );
  }
  return (
    <Container
      footer={
        <button disabled={!dirty} onClick={() => handleNextBtn(input)}>
          Next
        </button>
      }
    >
      <div className="pxq_pgck_input pxq_pgck_input_url">
        <div className="pxq_pgck_input__header">
          <label className="pxq_pgck_label" htmlFor="pxq_pgck_url_input">
            Please enter URL to check plagiarism
          </label>{" "}
          <small className="pxq_pgck_help">
            (online .txt, .htm, .html, .pdf, .doc, .docx, .ppt are also allowed)
          </small>
        </div>
        <div className="pxq_pgck_input__body">
          <input
            id="pxq_pgck_url_input"
            type="url"
            value={input}
            onChange={handleChange}
            placeholder="https://somehost.com/page.html"
            disabled={1 === status}
          />
          <Progress status={status} message={message} />
        </div>
      </div>
    </Container>
  );
}
/*
doAjax(
      { action: "pxq_pgck_validate_url", url },
      (data) => {
        dispatch(
          T.createAction(T.URL_INPUT, {
            status: 2,
            message: "Successfully validated URL"
          })
        );
      },
      () =>
        dispatch(
          T.createAction(T.URL_INPUT, {
            status: 3,
            message: `Failed to validate URL: reason`,
            dirty: true
          })
        )
    );*/
