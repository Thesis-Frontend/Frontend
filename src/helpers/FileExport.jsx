import * as FileSaver from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import XLSXStyle from "xlsx-js-style";

function formatDataForXLSX(columns, renderData) {
  let rows = [];
  let topRow = {};
  let lookups = {};
  let renders = {};

  // Column names
  for (let index in columns) {
    topRow[columns[index].id] = columns[index].label;
    if (columns[index].lookup) {
      // If the column has lookup information, fill the lookups object as well.
      lookups[columns[index].id] = columns[index].lookup;
    }
    if (columns[index].render) {
      // If the column has render information, fill the renders object as well.
      renders[columns[index].id] = columns[index].render;
    }
  }
  rows.push(topRow);

  // Column data
  for (let index in renderData) {
    let row = {};
    for (let prop in renderData[index]) {
      if (prop in topRow) {
        let data = renderData[index][prop];
        if (data === null || data === undefined) {
          data = ""; // Default empty string
          row[prop] = data;
          continue;
        }
        if (prop in renders) {
          data = renders[prop](renderData[index]);
          if (typeof data === "string" || data instanceof String) {
            row[prop] = data;
            continue;
          }
        }
        data = renderData[index][prop];
        if (Array.isArray(data)) {
          let temp = "";
          for (let i in data) {
            if (temp === "") {
              temp += typeof data[i] === "object" ? data[i]?.name : data[i];
            } else {
              temp += ", " + (typeof data[i] === "object" ? data[i]?.name : data[i]);
            }
          }
          data = temp === "" ? "" : temp;
        }
        if (prop in lookups) {
          data = lookups[prop][data];
        }
        row[prop] = data;
      }
    }
    rows.push(row);
  }
  return rows;
}

function formatDataForPDF(columns, renderData) {
  let topRow = {};
  let head = [];
  let body = [];
  let maxRowWidth = 0;
  let lookups = {};
  let renders = {};
  let columnWidths = {};

  // Column names
  for (let index in columns) {
    topRow[columns[index].id] = columns[index].label;
    head.push(columns[index].label);
    if (columns[index].lookup) {
      lookups[columns[index].id] = columns[index].lookup;
    }
    if (columns[index].render) {
      renders[columns[index].id] = columns[index].render;
    }
  }
  head = [head];

  const increaseRowWidth = (data, prop, topRow) => {
    const widthOfCell = getWidthOfText(data);
    const ind = getIndexOfProp(prop, topRow);
    !columnWidths[ind] && (columnWidths[ind] = { cellWidth: 100 });
    if (
      !columnWidths[ind].cellWidth ||
      columnWidths[ind].cellWidth < widthOfCell
    ) {
      columnWidths[ind].cellWidth = widthOfCell;
    }
    return widthOfCell;
  };

  // Column data
  for (let index in renderData) {
    let row = [];
    let rowWidth = 0;
    for (let col in topRow) {
      for (let prop in renderData[index]) {
        if (prop === col) {
          let data = renderData[index][prop];
          if (data === null || data === undefined) {
            data = ""; // Default empty string
            rowWidth += increaseRowWidth(data, prop, topRow);
            row.push(data);
            continue;
          }
          if (prop in renders) {
            data = renders[prop](renderData[index]);
            if (typeof data === "string" || data instanceof String) {
              rowWidth += increaseRowWidth(data, prop, topRow);
              row.push(data);
              continue;
            }
          }
          data = renderData[index][prop];
          if (Array.isArray(data)) {
            let temp = "";
            for (let j in data) {
              if (temp === "") {
                temp += typeof data[j] === "object" ? data[j]?.name : data[j];
              } else {
                temp += ", " + (typeof data[j] === "object" ? data[j]?.name : data[j]);
              }
            }
            data = temp === "" ? "" : temp;
          }
          if (prop in lookups) {
            data = lookups[prop][data];
          }
          rowWidth += increaseRowWidth(data, prop, topRow);
          row.push(data);
        }
      }
    }
    rowWidth > maxRowWidth && (maxRowWidth = rowWidth);
    body.push(row);
  }
  return {
    head: head,
    body: body,
    width: maxRowWidth,
    columnWidths: columnWidths,
  };
}

const getIndexOfProp = (prop, list) => {
  const keys = Object.keys(list);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === prop) {
      return i;
    }
  }
};

const getWidthOfText = (str) => {
  let text = document.createElement("span");
  document.body.appendChild(text);

  text.style.font = "calibri";
  text.style.fontSize = 10 + "px";
  text.style.height = "auto";
  text.style.width = "auto";
  text.style.position = "absolute";
  text.style.whiteSpace = "nowrap";
  text.innerHTML = str;
  let width = Math.ceil(text.clientWidth);

  document.body.removeChild(text);
  return width + 30;
};

const setWorksheetStyles = (ws, cols, rows) => {
  for (let prop in ws) {
    if (prop.charAt(0) !== "!" && prop.charAt(0) !== "_") {
      if (prop.match(/\d+/g)[0] === "1") {
        ws[prop].s = {
          fill: {
            bgColor: { rgb: "FFFCD5B4" },
            fgColor: { rgb: "FFFCD5B4" },
          },
          font: {
            bold: true,
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        };
      } else {
        ws[prop].s = {
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        };
      }
    }
  }
  let objectMaxLength = [];
  let wsrows = [];
  let wscols = [];
  wsrows.push({ hpt: 30 });
  for (let i = 0; i < cols.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      wsrows.push({ hpt: 30 });
      const field = cols[i]?.id;
      const value = rows[j][field];
      const title = cols[i]?.label;
      if (typeof value === "number") {
        objectMaxLength[j] = 5;
      } else {
        objectMaxLength[j] = value
          ? objectMaxLength[j] >= value.length
            ? objectMaxLength[j]
            : value.length + 5
          : objectMaxLength[j];
      }
      objectMaxLength[j] =
        objectMaxLength[j] >= title.length
          ? objectMaxLength[j]
          : title.length + 5;
    }
  }
  for (let i = 0; i < objectMaxLength.length; i++) {
    wscols.push({ wch: objectMaxLength[i] });
  }
  ws["!cols"] = wscols;
  ws["!rows"] = wsrows;
};

export const exportToXLSX = (columns, renderData, fileName) => {
  const data = formatDataForXLSX(columns, renderData);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws = XLSX.utils.json_to_sheet(data, {
    skipHeader: true,
  });
  setWorksheetStyles(ws, columns, renderData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSXStyle.write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "array",
  });
  const blob = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(blob, fileName + fileExtension);
};

export const exportToPDF = (columns, renderData, fileName) => {
  const data = formatDataForPDF(columns, renderData);
  const fileExtension = ".pdf";

  const doc = new jsPDF("landscape", "px", [data.width, 800]);
  doc.setFont("calibri-400");
  doc.autoTable({
    head: data.head,
    body: data.body,
    columnStyles: data.columnWidths,
    styles: {
      font: "calibri-400",
      fontStyle: "normal",
      cellWidth: "wrap",
      overflow: "linebreak",
    },
  });
  doc.save(fileName + fileExtension);
};

export const exportToXLSXWorkAccidents = async (filters) => {
  const res = await Request(
    "get",
    "/api/industrial-accidents/export-to-excel",
    null,
    filters
  );
  if (res.status === 200) {
    const { fileName, base64 } = res.data?.content;
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${base64}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
