export const createFakeServer = function (allData) {
    return {
        getData: function (request) {
            var requestedRows = allData.slice(request.startRow, request.endRow);
            var lastRow = getLastRowIndex(request, requestedRows);
            return {
                success: true,
                rows: requestedRows,
                lastRow: lastRow,
            };
        },
    };
}
function getLastRowIndex(request, results) {
    if (!results) return undefined;
    var currentLastRow = request.startRow + results.length;
    return currentLastRow < request.endRow ? currentLastRow : undefined;
}