import ListTable from "./ListTable";
import * as T from "../../reducer/action";

export default function TransactionListTable(props) {
  const {
    dispatch,
    state2: {
      transactionLog: { list, status, filter }
    }
  } = props;
  const filterElem = (
    <span>
      <strong>Type: </strong>
      <select
        value={filter}
        onChange={(e) =>
          dispatch(
            T.createAction(T.TRANSACTION_LOG, { filter: e.target.value })
          )
        }
      >
        <option value="">Both</option>
        <option value="credit">Addition</option>
        <option value="debit">Subtraction</option>
      </select>
    </span>
  );
  return (
    <ListTable
      dispatch={dispatch}
      list={filter ? list.filter((item) => filter === item.status) : list}
      actionType={T.TRANSACTION_LOG}
      status={status}
      ajaxKey="pxq_pgck_get_transactions1"
      ajaxFailMsg="Failed to load transactions. Please refresh!"
      filter={filterElem}
      renderTableHead={() => (
        <tr>
          <th key="id">ID</th>
          <th key="date">Date</th>
          <th key="detail">Description</th>
          <th key="credits">Credits</th>
        </tr>
      )}
      renderTableBody={(items) =>
        items.map((obj) => (
          <tr key={obj.id}>
            <td key="id">{obj.id}</td>
            <td key="date">{obj.created_at}</td>
            <td key="detail">{obj.detail}</td>
            <td key="credits">
              <span
                style={{ color: "credit" === obj.status ? "green" : "red" }}
              >
                {"credit" === obj.status ? "+" : "-"}
                {obj.credits}
              </span>
            </td>
          </tr>
        ))
      }
    />
  );
}
