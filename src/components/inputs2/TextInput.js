import Container from "../ui/Container";
import * as T from "../../reducer/action";

export default function TextInput(props) {
  const {
    state: {
      textInput: { input }
    },
    dispatch,
    onComplete
  } = props;
  const charCount = countChars(input);
  const wordCount = countWords(input);

  function handleChange(e) {
    dispatch(
      T.createAction(T.TEXT_INPUT, {
        input: e.target.value
      })
    );
  }

  return (
    <Container
      footer={
        <button
          disabled={countChars(input) < 30 || countWords(input) < 6}
          onClick={onComplete}
        >
          Next
        </button>
      }
    >
      <div className="pxq_pgck_input pxq_pgck_input_text">
        <div className="pxq_pgck_input__header">
          <label className="pxq_pgck_label" htmlFor="pxq_pgck_url_input">
            Please enter text to check plagiarism
          </label>{" "}
          <small className="pxq_pgck_help">
            (At least 30 characters and 6 words)
          </small>
        </div>
        <div className="pxq_pgck_input__body">
          <textarea
            id="pxq_pgck_text_input"
            value={input}
            onChange={handleChange}
            placeholder="Enter at least 30 characters and 6 words"
          ></textarea>
          <div style={{ textAlign: "left" }}>
            <small>
              <span>
                <strong>Characters:</strong>{" "}
                <span
                  style={{
                    color: charCount < 30 ? "red" : "green"
                  }}
                >
                  {charCount}
                </span>
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>
                <strong>Words:</strong>{" "}
                <span
                  style={{
                    color: wordCount < 6 ? "red" : "green"
                  }}
                >
                  {wordCount}
                </span>
              </span>
            </small>
          </div>
        </div>
      </div>
    </Container>
  );
}
function getWords(s) {
  return window.jQuery
    .trim(s)
    .split(/\s+|\r?\n/g)
    .filter((tok) => tok.length);
}
function countWords(s) {
  return getWords(s).length;
}
function countChars(s) {
  const words = getWords(s);
  return words.reduce(
    (t, c) => t + c.length,
    words.length ? words.length - 1 : 0
  );
}
