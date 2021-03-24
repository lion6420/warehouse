import XLSX from 'xlsx'


function JSONtoXLSX(json, sheetName, custHeader=null) {
  var sheet
  if (custHeader) {
    json.unshift(custHeader)
    sheet = XLSX.utils.json_to_sheet(json, {skipHeader: true})
  }
  else {
    sheet = XLSX.utils.json_to_sheet(json)
  }
  var wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, sheet, sheetName)
  const workbookBlob = workbook2blob(wb)
  const url = URL.createObjectURL(workbookBlob)
  return url
}


function workbook2blob(workbook) {
  var wopts = {
    bookType: "xlsx",
    bookSST: false,
    type: "binary"
  }
  var wbout = XLSX.write(workbook, wopts)
  var blob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  })
  return blob
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export {
  JSONtoXLSX,
}