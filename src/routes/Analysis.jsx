import { useEffect, useState } from "react";
import Table from "../components/table/Table";
import { fetchAnalysisData } from "../api/analysis";
import analysisDefs from "../constants/defs/AnalysisDefs";
import * as XLSX from "xlsx";
import {
  useAlertContext,
  useSelectedDataContext,
} from "../hooks/useCustomContext";
import moment from "moment";
import Loader from "../components/Loader";

function EngToCn(col_name_ENG) {
  return analysisDefs.find((col) => col.id === col_name_ENG)?.header;
}

const FilterPopup = ({ url, open, closePopup, setRows, isRefreshed }) => {
  const { alertError } = useAlertContext();
  const { setSelectedCustomerDisplay } = useSelectedDataContext();

  const [params, setParams] = useState({
    yearly: 1,
    monthly: 1,
    agent: 1,
    newCustomer: 1,
    temporaryCustomer: 1,
    daily: 1,
    pageNum: 1,
    pageSize: 100,
  });

  const labels = [
    "年度客户",
    "月度客户",
    "代理商",
    "新增客户",
    "临时客户",
    "日常客户",
  ];
  const keys = Object.keys(params);

  const handleClick = async () => {
    setSelectedCustomerDisplay((prev) => ({ ...prev, [url]: params }));
    const res = await fetchAnalysisData(url, params);
    switch (res.code) {
      case 200:
        setRows(res.data);
        break;
      case 1:
      case 400:
        alertError(res.message);
        break;
    }
    closePopup();
  };

  const CustomeSelect = ({ label, index }) => {
    return (
      <div className="row flex-between ">
        {label}:
        <div className="select-wrapper">
          <select
            id={"analysis-filter" + index}
            value={params[keys[index]]}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                [keys[index]]: e.target.value,
              }))
            }
          >
            <option value={1}>显示</option>
            <option value={0}>不显示</option>
          </select>
        </div>
      </div>
    );
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      window.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, []);

  return (
    open && (
      <div
        className="popup-container"
        onKeyDown={handleEnterKeyDown}
        tabIndex="0"
      >
        <div className="popup-wrapper filter-popup g2">
          客户显示选项:
          <div className="row g2">
            <div className="col g1">
              {labels.slice(0, 3).map((label, i) => (
                <CustomeSelect label={label} index={i} key={i} />
              ))}
            </div>
            <div className="col g1">
              {labels.slice(3).map((label, i) => (
                <CustomeSelect label={label} index={i + 3} key={i} />
              ))}
            </div>
          </div>
          {isRefreshed && (
            <button onClick={closePopup} className="white">
              取消
            </button>
          )}
          <button onClick={handleClick} className="blue40">
            确认
          </button>
        </div>
      </div>
    )
  );
};

const Analysis = ({ schema }) => {
  const [rows, setRows] = useState([]);
  const { alertConfirm } = useAlertContext();
  const [openPopup, setOpenPopup] = useState(true);
  const { selectedCustomerDisplay, setSelectedCustomerDisplay } =
    useSelectedDataContext();
  const [isRefreshed, setIsRefreshed] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetchAnalysisData(
        schema.select,
        selectedCustomerDisplay?.[schema.select]
      );
      console.log(res);
      setRows(res.data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching analysis data:", err);
      }
    }
  };

  useEffect(() => {
    setRows([]);

    if (selectedCustomerDisplay?.[schema.select]) {
      setOpenPopup(false);
    } else {
      setOpenPopup(true);
    }

    !schema.cn.includes("客户类型分类") && fetchData();
  }, [schema.select, selectedCustomerDisplay]);

  const handleRefresh = async () => {
    setRows([]);
    setIsRefreshed(true);
    setOpenPopup(true);
    setSelectedCustomerDisplay((prevState) => {
      if (prevState) {
        const { [schema.select]: _, ...rest } = prevState;
        return rest;
      } else {
        return {};
      }
    });

    try {
      const res = await fetchData();
      console.log(res);
      if (res && res.data) {
        setRows(res.data);
      } else {
        console.error("Invalid response:", res);
      }
    } catch (error) {
      console.error("Error during fetchData:", error);
    }
  };

  const handleExport = () => {
    alertConfirm("确定导出该表单？", () => {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([]);

      const headers_ENG = Object.keys(rows[0]);

      let headers_CN = headers_ENG
        .map((name) => EngToCn(name))
        .filter((value) => value !== undefined);

      XLSX.utils.sheet_add_aoa(ws, [headers_CN]);
      XLSX.utils.sheet_add_json(ws, rows, { origin: "A2", skipHeader: true });
      XLSX.utils.book_append_sheet(wb, ws);

      const timestamp = moment(new Date()).format("YYMMDDHHmmss");
      const filename = "销售员销售现况表";

      XLSX.writeFileXLSX(wb, filename + timestamp + ".xlsx");
    });
  };

  const defs =
    rows.length === 0 && Array.isArray(rows)
      ? undefined
      : analysisDefs.filter((def) => Object.keys(rows[0]).includes(def.id));

  return (
    <div className="col full-screen analysis">
      <div className="row toolbar">
        <div className="row flex-center">
          <button onClick={handleRefresh}>刷新</button>
          <button onClick={handleExport}>导出</button>
        </div>
      </div>
      {schema.cn.includes("客户类型分类") && openPopup && (
        <FilterPopup
          open={openPopup}
          closePopup={() => setOpenPopup(false)}
          url={schema.select}
          setRows={setRows}
          isRefreshed={isRefreshed}
        />
      )}
      {rows?.length > 0 && Array.isArray(rows) && defs ? (
        <Table data={rows} columns={defs} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Analysis;
