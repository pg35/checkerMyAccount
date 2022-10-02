import { useEffect } from "react";
import Loading from "../ui/Loading";
import { ErrorMessage } from "../styled";
import { doAjax } from "../../util/ajax";
import { createAction } from "../../reducer/action";

export default function ListTable(props) {
  const {
    dispatch,
    list,
    actionType,
    status,
    ajaxKey,
    ajaxFailMsg,
    renderTableBody,
    renderTableHead,
    filter
  } = props;
  console.log("props", list, status);
  function loadList() {
    return doAjax(
      { data: { action: ajaxKey } },
      (data) => {
        if (data.success) {
          console.log("list size", data.data.list.length);
          dispatch(
            createAction(actionType, {
              list: data.data.list,
              status: 2
            })
          );
        }
      },
      (textStatus) => {
        console.log("ajax error", textStatus);
        if ("abort" === textStatus) {
          console.log("listtable aborting jaax");
          return;
        }
        dispatch(createAction(actionType, { list: null, status: 3 }));
      }
    );
  }
  useEffect(() => {
    if (2 === status || 3 === status) return;
    const xhr = loadList();
    return () => {
      if (xhr) {
        console.log("unmounting listable " + actionType);
        xhr.abort();
      }
    };
  }, [status]);

  let Comp = null;
  if (1 === status) {
    Comp = <Loading />;
  } else if (3 === status) {
    Comp = <ErrorMessage>{ajaxFailMsg}</ErrorMessage>;
  } else if (2 === status) {
    const items = list.filter(
      (obj) => "draft" !== obj.status && "pending" !== obj.status
    );
    let tbody = null;
    if (!items.length) {
      tbody = (
        <tr>
          <td colSpan={6} style={{ textAlign: "center", padding: "40px 30px" }}>
            You don't have any entries.
          </td>
        </tr>
      );
    } else {
      tbody = renderTableBody(items);
    }
    Comp = (
      <table style={{ textAlign: "left" }} className="pxq_pgck_list_table">
        <thead>{renderTableHead(items)}</thead>
        <tbody>{tbody}</tbody>
      </table>
    );
  }

  return (
    <div>
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <button
          disabled={1 === status}
          onClick={() => dispatch(createAction(actionType, { status: 1 }))}
        >
          Refresh
        </button>
      </div>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>{filter}</div>
      <div>{Comp}</div>
    </div>
  );
}
