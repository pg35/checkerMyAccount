import { useState } from "react";
import ListTable from "./ListTable";
import * as T from "../../reducer/action";

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}
export default function ScanListTable(props) {
  const {
    dispatch,
    state2: {
      scanLog: { list, status, filter }
    }
  } = props;
  const [visibleInputs, setVisibleInputs] = useState([]);
  const filterElem = (
    <span>
      <strong>Last activity: </strong>
      <select
        value={filter}
        onChange={(e) =>
          dispatch(T.createAction(T.SCAN_LOG, { filter: e.target.value }))
        }
      >
        {renderStatusOptions()}
      </select>
    </span>
  );
  return (
    <ListTable
      dispatch={dispatch}
      list={filter ? list.filter((item) => filter === item.status) : list}
      actionType={T.SCAN_LOG}
      status={status}
      ajaxKey="pxq_pgck_get_scans1"
      ajaxFailMsg="Failed to load plagiarism checks. Please refresh!"
      filter={filterElem}
      renderTableHead={() => (
        <tr>
          <th key="id">ID</th>
          <th key="type">Type</th>
          <th key="input">Input</th>
          <th key="status">Last activity</th>
          <th key="credit">Credits used</th>
          <th key="date">Created at</th>
          <th key="actions"> </th>
        </tr>
      )}
      renderTableBody={(items) =>
        items.map((obj) => (
          <>
            <tr
              key={obj.id}
              className={
                visibleInputs.includes(obj.id)
                  ? "pxq_pgck_open"
                  : "pxq_pgck_close"
              }
            >
              <td key="id">{obj.id}</td>
              <td key="type">{capitalize(obj.type)}</td>
              <td key="input">
                <a
                  href="#"
                  onClick={(e) => {
                    if (visibleInputs.includes(obj.id)) {
                      setVisibleInputs(
                        visibleInputs.filter((id) => id !== obj.id)
                      );
                    } else setVisibleInputs([...visibleInputs, obj.id]);
                    e.preventDefault();
                  }}
                >
                  {visibleInputs.includes(obj.id) ? "Hide" : "Show"}
                </a>
              </td>
              <td key="status">{getStatus(obj.status)}</td>
              <td key="credits">{getCredits(obj.status, obj.credits)}</td>
              <td key="date">{obj.created_at}</td>
              <td className="pxq_pgck_actions">
                {("check_failed" === obj.status ||
                  "checked" === obj.status) && (
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      const url =
                        window.pxq_pgck_main_url + "?pxq_pgck_sid=" + obj.id;
                      window.open(url, "_blank");
                      e.preventDefault();
                    }}
                  >
                    Resume
                  </a>
                )}
                {"exported" === obj.status && (
                  <>
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        const url =
                          window.pxq_pgck_report_url + "?scan_id=" + obj.id;
                        window.open(url, "_blank");
                        e.preventDefault();
                      }}
                    >
                      Report
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        const url = window.pxq_pgck_pdf_url.replace(
                          "{SCANID}",
                          obj.id
                        );
                        window.open(url, "_blank");
                        e.preventDefault();
                      }}
                    >
                      PDF
                    </a>
                  </>
                )}
              </td>
            </tr>
            {visibleInputs.includes(obj.id) && (
              <tr key={`${obj.id}_s`}>
                <td colSpan={7}>{getInput(obj.type, obj.input)}</td>
              </tr>
            )}
          </>
        ))
      }
    />
  );
}
function getInput(type, input) {
  if ("url" === type) {
    return (
      <a href={input} target="_blank" rel="noreferrer">
        {input}
      </a>
    );
  } else if ("file" === type) {
    const toks = input.split(",");
    return toks.length > 1 ? toks[0] : "";
  } else if ("text" === type) {
    const text = input;
    return text;
  }
}
function getCredits(status, credits) {
  //return credits;
  if (
    "scanned" === status ||
    "exporting" === status ||
    "export_failed" === status ||
    "exported" === status
  )
    return credits;
  return "";
}
function getStatus(status) {
  switch (status) {
    case "checking":
      return "Checking credits";
    case "check_failed":
      return "Checking creits failed";
    case "checked":
      return "Credits checked";
    case "scanning":
      return "Scanning";
    case "scan_failed":
      return "Scan failed";
    case "scanned":
      return "Scanned";
    case "exporting":
      return "Generating reports";
    case "export_failed":
      return "Report generation failed";
    case "exported":
      return "Completed";
    default:
      return status;
  }
}
function renderStatusOptions() {
  return (
    <>
      <option value="">All</option>
      <option value="checking">Checking credits</option>
      <option value="check_failed">Checking creits failed</option>
      <option value="checked">Credits checked</option>
      <option value="scanning">Scanning</option>
      <option value="scan_failed">Scan failed</option>
      <option value="scanned">Scanned</option>
      <option value="exporting">Generating reports</option>
      <option value="export_failed">Report generation failed</option>
      <option value="exported">Completed</option>
    </>
  );
}
