import Spinner from "./Spinner";
export default function Loading(props) {
  const elem = (
    <span>
      {props.message ? props.message : "Loading..."}
      <Spinner />
    </span>
  );

  return props.inline ? <span>{elem}</span> : <p>{elem}</p>;
}
