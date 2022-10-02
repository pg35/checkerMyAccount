import Loading from "./Loading";

export default function Progress(props) {
  const { status, message } = props;
  let elem = null;
  if (1 === status) {
    elem = <Loading inline={true} message={message} />;
  } else if (2 === status) {
    elem = <div className="pxq_pgck_success">{message}</div>;
  } else {
    elem = <div className="pxq_pgck_error">{message}</div>;
  }
  return <div className="pxq_pgck_progress">{elem}</div>;
}
