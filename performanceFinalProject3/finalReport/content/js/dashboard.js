/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 82.25, "KoPercent": 17.75};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.46625, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "GET-UserProfile"], "isController": false}, {"data": [0.9325, 500, 1500, "GET-Contact"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 400, 71, 17.75, 1531.225, 247, 6280, 1553.5, 3481.0, 3782.899999999999, 4562.580000000004, 16.97288581491068, 16.58353709636356, 5.8137520818305255], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET-UserProfile", 200, 67, 33.5, 2653.935000000001, 1489, 6280, 2552.5, 3723.2, 3970.5499999999997, 4854.000000000001, 8.61623298293986, 7.905057190246424, 2.898764984167672], "isController": false}, {"data": ["GET-Contact", 200, 4, 2.0, 408.51499999999993, 247, 3947, 269.5, 516.7000000000002, 921.1999999999985, 3693.0700000000006, 9.565716472163764, 9.916397132676487, 3.3349226372680314], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 3,601 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,106 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,556 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 2, 2.816901408450704, 0.5], "isController": false}, {"data": ["The operation lasted too long: It took 3,917 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 4,755 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,842 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,508 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,180 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 4,023 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,613 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 7, 9.859154929577464, 1.75], "isController": false}, {"data": ["The operation lasted too long: It took 4,062 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,060 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,419 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,724 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,481 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 2, 2.816901408450704, 0.5], "isController": false}, {"data": ["The operation lasted too long: It took 3,512 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,962 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,657 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,896 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,301 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,089 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,289 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,795 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 4,217 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,018 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,815 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 4,107 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,302 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,626 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,716 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,786 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,589 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,947 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,533 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 4,855 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,694 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 4,224 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,129 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,090 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,107 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 4,566 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,713 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,172 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,006 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,532 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 6,280 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,576 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 2, 2.816901408450704, 0.5], "isController": false}, {"data": ["The operation lasted too long: It took 3,428 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,137 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,041 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,175 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,812 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,040 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,095 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,263 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,688 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,205 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,878 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,521 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,971 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}, {"data": ["The operation lasted too long: It took 3,004 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 1.408450704225352, 0.25], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 400, 71, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 7, "The operation lasted too long: It took 3,556 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 2, "The operation lasted too long: It took 3,481 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 2, "The operation lasted too long: It took 3,576 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 2, "The operation lasted too long: It took 3,601 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GET-UserProfile", 200, 67, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 7, "The operation lasted too long: It took 3,556 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 2, "The operation lasted too long: It took 3,481 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 2, "The operation lasted too long: It took 3,576 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 2, "The operation lasted too long: It took 3,106 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1], "isController": false}, {"data": ["GET-Contact", 200, 4, "The operation lasted too long: It took 3,601 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, "The operation lasted too long: It took 3,589 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, "The operation lasted too long: It took 3,947 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, "The operation lasted too long: It took 3,694 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
