import TextInput from "../inputs2/TextInput";
import FileInput from "../inputs2/FileInput";
import URLInput from "../inputs2/URLInput";
import * as T from "../../reducer/action";

export default function Home(props) {
  const {
    state: {
      scan: { type }
    },
    dispatch
  } = props;
  const sandbox = true;
  const handleTypeChange = (e) =>
    dispatch(T.createAction(T.SCAN, { type: e.target.value }));

  const allTypes = {
    text: "Enter text",
    file: "Upload file",
    url: "Enter URL"
  };
  const typeElems = Object.keys(allTypes).map((k) => (
    <label key={k}>
      <input
        type="radio"
        name="type"
        value={k}
        checked={k === type}
        onChange={handleTypeChange}
      />{" "}
      {allTypes[k]}
    </label>
  ));

  let Comp = TextInput;
  if ("file" === type) Comp = FileInput;
  else if ("url" === type) Comp = URLInput;

  return (
    <div className="pxq_pgck_home">
      <div className="pxq_pgck_types">{typeElems}</div>
      <Comp
        state={props.state}
        dispatch={dispatch}
        onComplete={props.onComplete}
      />
      <p style={{ textAlign: "left" }}>
        <label>
          <input type="checkbox" checked={sandbox} onChange={(e) => {}} />{" "}
          Enable sandbox mode
        </label>
      </p>
    </div>
  );
}
