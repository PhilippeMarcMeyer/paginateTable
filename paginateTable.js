function pagineTable(idTable, nrRowsPerPage, offset, tabsZone, rowHeight) {
    var xTable = document.getElementById(idTable)
    var vStart = offset + 1;
    var vEnd = vStart + nrRowsPerPage - 1;
    var vTr;
    var pageShown = Math.ceil(offset / nrRowsPerPage);
    if (xTable) {
        var tableHeight = xTable.offsetHeight;
        var nbLignes = xTable.rows.length;
        var nbMax = nbLignes - 1;
        for (var i = nbMax; i > 0; i--) {
            vTr = xTable.rows[i];
            var cp = vTr.cells[0].colSpan;
            if (cp != 1) xTable.deleteRow(i);
        }

        var nbLignes = xTable.rows.length;
        if (nbLignes >= nrRowsPerPage + 1) {

            var nbPages = Math.ceil((nbLignes - 1) / nrRowsPerPage);
            var nbCellManquantes = (nbPages * nrRowsPerPage) - nbLignes;
            var nbspan = xTable.rows[0].cells.length;

            for (var i = 0; i <= nbCellManquantes; i++) {
                var row = xTable.insertRow(nbLignes);
                var cell = row.insertCell(0);
                cell.colSpan = nbspan;
                nbLignes++;
            }

            nbLignes = xTable.rows.length;

            for (var i = 1; i < nbLignes; i++) {
                vTr = xTable.rows[i];
                if (i >= vStart && i <= vEnd) {
                    vTr.style.display = "";
                }
                else {
                    vTr.style.display = "none";
                }
                vTr.style.height = rowHeight + "px";
            }

            var vbottom = "";
            for (var i = 0; i < nbPages; i++) {
                boffset = Math.floor(i * nrRowsPerPage);
                if (pageShown == i)
                    vbottom += "<b style='padding:2px 8px 2px 8px;'>" + (i + 1) + "</b>&nbsp;";
                else{
                    let functionCall = 'pagineTable(\'' + idTable + '\',' + nrRowsPerPage + ',' + boffset + ',\'' + tabsZone + '\',\''+ rowHeight + '\')';
                    console.log(functionCall);
                    vbottom += "<a style='padding:2px 8px 2px 8px;border:1px solid grey;cursor:pointer;border-radius:4px;' href='#' onclick="+ functionCall+ ">" + (i + 1) + "</a>&nbsp;";
                }
            }
            var xBottom = document.getElementById(tabsZone);
            if (xBottom) {
                xBottom.innerHTML = vbottom;
            }
            if (nbLignes <= nrRowsPerPage + 1) {
                var xBottom = document.getElementById(tabsZone);
                if (xBottom) xBottom.innerHTML = "";
            }
        }
        else {
            var xBottom = document.getElementById(tabsZone);
            if (xBottom) xBottom.innerHTML = "";

        }
    }
}