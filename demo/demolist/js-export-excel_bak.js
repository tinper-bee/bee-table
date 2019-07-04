require("script-loader!file-saver");
require("script-loader!xlsx/dist/xlsx.core.min");
require("script-loader!blob.js/Blob");

/**
 * Created by kin on 2017/5/18.
 *
 * josn导出excel
 * mail：cuikangjie_90h@126.com
 */
const changeData = function(data, filter) {
  let sj = data,
    f = filter,
    re = [];
  Array.isArray(data)
    ? (function() {
        //对象
        f
          ? (function() {
              //存在过滤
              sj.forEach(function(obj) {
                let one = [];
                filter.forEach(function(no) {
                  one.push(obj[no]);
                });
                re.push(one);
              });
            })()
          : (function() {
              //不存在过滤
              sj.forEach(function(obj) {
                let col = Object.keys(obj);
                let one = [];
                col.forEach(function(no) {
                  one.push(obj[no]);
                });
                re.push(one);
              });
            })();
      })()
    : (function() {
        re = sj;
      })();
  return re;
};

// 转换数据
const sheetChangeData = function(data) {
  let ws = {};
  let range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      let cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      let cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === "number") cell.t = "n";
      else if (typeof cell.v === "boolean") cell.t = "b";
      else if (cell.v instanceof Date) {
        cell.t = "n";
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = "s";
      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws["!ref"] = XLSX.utils.encode_range(range);
  return ws;
};

const s2ab = function(s) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};
const datenum = function(v, date1904) {
  if (date1904) v += 1462;
  let epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};

const columnwidths = function(columnWidths) {
  let out = [];
  out = columnWidths.map(function(item) {
    return { width: item ? parseInt(256 * (Number(item) / 100)) : 20 };
  });
  return out;
};

const exportExcel = function(options) {
  let _options = {
    fileName: options.fileName || "download",
    datas: options.datas,
    workbook: {
      SheetNames: [],
      Sheets: {}
    }
  };

  const instance = {
    saveExcel: function() {
      let wb = _options.workbook;
      debugger;
      _options.datas.forEach(function(data, index) {
        let sheetHeader = data.sheetHeader || null;
        let sheetData = data.sheetData;
        let sheetName = data.sheetName || "sheet" + (index + 1);
        let sheetFilter = data.sheetFilter || null;
        let columnWidths = data.columnWidths || [];

        sheetData = changeData(sheetData, sheetFilter);

        if (sheetHeader) {
          sheetData.unshift(sheetHeader);
        }

        let ws = sheetChangeData(sheetData);

        ws["!merges"] = [{ s: {r:2, c:0}, e: {r:2, c:1} }];

        ws["!cols"] = columnwidths(columnWidths);

        ws["!margins"]={left:0.7, right:0.7, top:0.75,bottom:0.75,header:0.3,footer:0.3};

        ws["!ref"] = "A1:B4";
        ws["A4"] = {"t":"n","f":'SUM(A2+B2)'}; 
        
        /* merge cells A1:B1 */
        // let merge = { s: {r:0, c:0}, e: {r:0, c:1} };
        // ws['!merges'].push(merge);

        ws["A3"] = {
          "t": "n",
          "v": 5,
          "s": {
              "numFmt": "General",
              "fill": {
                  "patternType": "lightDown",
                  "fgColor": {
                      "theme": 4,
                      "tint": -0.249977111117893
                  },
                  "bgColor": {
                      "theme": 7,
                      "tint": -0.249977111117893
                  }
              },
              "font": {
                  "sz": "12",
                  "color": {
                      "theme": "1"
                  },
                  "name": "Calibri"
              },
              "border": {}
          },
          "w": "5",
          "z": "General"
      };
        // ws.A1.s = { fill: {patternType: "none",fgColor: {rgb: "#5fb3dd"},bgColor: {rgb: "5fb3dd"}} };

        // ws.B2 = { t: 'n', v: 1, w: '1', s: { patternType: 'solid', fgColor: { rgb: 'FFFF00' }, bgColor: { indexed: 64 } } };

        // ws["B1"] = {v: "第二22222列", t: "s"};
        // ws["A4"]["t"] = "n";
        // ws["A4"]["f"] = 'SUM(A2+B2)';
        console.log("ws: " , ws);
        wb.SheetNames.push(sheetName);
        wb.Sheets[sheetName] = ws;
      });
      
      let defaultCellStyle = { font: { name: "Verdana", sz: 11, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}};

      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        
        type: "binary",
        
        bookSST: true,
        cellStyles: true,
        defaultCellStyle:defaultCellStyle
      });
      saveAs(
        new Blob([s2ab(wbout)], {
          type: "application/octet-stream"
        }),
        _options.fileName + ".xlsx"
      );
    }
  };

  return instance;
};

module.exports = exportExcel;
