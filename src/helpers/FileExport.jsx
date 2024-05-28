import * as FileSaver from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import XLSXStyle from "xlsx-js-style";
import "../assets/fonts/calibri-400-normal";

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
              temp +=
                ", " + (typeof data[i] === "object" ? data[i]?.name : data[i]);
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
  let lookups = {};
  let renders = {};
  let columnWidths = [];

  // Column names
  for (let index in columns) {
    topRow[columns[index].id] = columns[index].label;
    head.push(columns[index].label);
    columnWidths.push({ header: columns[index].label, dataKey: columns[index].id, width: calculateTextWidth(columns[index].label) });
    if (columns[index].lookup) {
      lookups[columns[index].id] = columns[index].lookup;
    }
    if (columns[index].render) {
      renders[columns[index].id] = columns[index].render;
    }
  }
  head = [head];

  // Column data
  for (let index in renderData) {
    let row = [];
    for (let col in topRow) {
      for (let prop in renderData[index]) {
        if (prop === col) {
          let data = renderData[index][prop];
          if (data === null || data === undefined) {
            data = ""; // Default empty string
            row.push(data);
            continue;
          }
          if (prop in renders) {
            data = renders[prop](renderData[index]);
            if (typeof data === "string" || data instanceof String) {
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
                temp +=
                  ", " +
                  (typeof data[j] === "object" ? data[j]?.name : data[j]);
              }
            }
            data = temp === "" ? "" : temp;
          }
          if (prop in lookups) {
            data = lookups[prop][data];
          }
          row.push(data);
          columnWidths[getColumnIndex(columnWidths, prop)].width = Math.max(columnWidths[getColumnIndex(columnWidths, prop)].width, calculateTextWidth(data));
        }
      }
    }
    body.push(row);
  }
  return {
    head: head,
    body: body,
    columnWidths: columnWidths,
  };
}

function calculateTextWidth(text) {
  const span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.whiteSpace = "nowrap";
  span.style.font = "12px Arial";
  document.body.appendChild(span);
  span.innerText = text;
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width + 10; // Add some padding
}

function getColumnIndex(columnWidths, key) {
  return columnWidths.findIndex(column => column.dataKey === key);
}

const setWorksheetStyles = (ws, cols, rows) => {
  for (let prop in ws) {
    if (prop.charAt(0) !== "!" && prop.charAt(0) !== "_") {
      if (prop.match(/\d+/g)[0] === "1") {
        ws[prop].s = {
          fill: {
            bgColor: { rgb: "FFFCD5B4" }, //fcd5b4
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

  const doc = new jsPDF("landscape");
  doc.setFont("calibri-400");
  const columnStyles = {};
  data.columnWidths.forEach(col => {
    columnStyles[col.dataKey] = { cellWidth: col.width };
  });
  doc.autoTable({
    head: data.head,
    body: data.body,
    columnStyles: columnStyles,
    styles: {
      font: "calibri-400",
      fontStyle: "normal",
      cellWidth: "auto",
      overflow: "linebreak",
    },
    margin: { top: 10, bottom: 10 },
  });
  doc.save(fileName + fileExtension);
};
