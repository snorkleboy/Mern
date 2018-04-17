export const processMinuteDate = function(data,minuteData){
    let days=0;
    console.log(minuteData);
    for (let i = minuteData.length-1; i>=0; i--){
        const dayArr = minuteData[i]
        if (dayArr.length > 0){
            for (let j = 0; j<dayArr.length; j++) {
                const index = data.length - 1 - days

                dayArr[j].rsi = data[index].rsi;
                dayArr[j].ma = data[index].ma;
                dayArr[j].volume = dayArr[j].volume > 0 ? dayArr[j].volume : 1;
                dayArr[j].stdev = data[index].stdev;
                dayArr[j].date = new Date(data[index].date + " " + dayArr[j].label) ;
                dayArr[j].close = validPricePoint(dayArr, j,"marketAverage") ? 
                    dayArr[j].marketAverage 
                : 
                    findBackup(dayArr, j, "marketAverage")
                ;
            }
            days++;
        }
    }
    return [].concat(...minuteData);

}
function findBackup(arr, x, key) {
    let i = x;
    let j = i + 1
    while (arr[i] || arr[j]) {
        if (validPricePoint(arr,i,key)) {
            return arr[i][key]
        } else if (validPricePoint(arr,j,key)) {
            return arr[j][key]
        }
        j++;
        i--;
    }
}
function validPricePoint(arr,i,key){
    return Boolean(arr[i] && arr[i][key] && arr[i][key] > 0)
}


export const addAnalysis = function(data, ranges,rsiRange) {
    rsiRange = rsiRange || 14
    const sums = {}
    const sqSums = {}
    ranges.forEach(range=>{[sums[range],sqSums[range]] = [0,0]})
    let rsiCount = [0, 0];
    for (let i = 0; i < data.length; i++) {
        data[i].stdev = {};
        data[i].ma = {};

        ranges.forEach(range => {
            [sums[range], sqSums[range]] = updateSums(data, sums, sqSums, i, range);
            data[i].ma[range] = calcAverage(sums, range, i)
            data[i].stdev[range] = calcStDev(data, sqSums, range, i)
        })
        rsiCount = updateRSICount(data,rsiCount[0], rsiCount[1], i, rsiRange);
        data[i].rsi = calcRSI(rsiCount[0], rsiCount[1], rsiRange, i)
    }
    return data;
}

function updateSums(data, sums, sqSums, i, range) {
    let [sum, sqSum] = [sums[range], sqSums[range]]
    const num = i + 1
    if (range >= num) {
        sqSum = sqSum + Math.pow(data[i].close, 2)
        sum = sum + data[i].close
    } else {
        sqSum = sqSum + Math.pow(data[i].close, 2) - Math.pow(data[i - range].close, 2)
        sum = sum + data[i].close - data[i - range].close
    }
    return [sum, sqSum]
}

function calcAverage(sums, range, i) {
    const num = i + 1

    return num >= range ?
        sums[range] / range
        :
        sums[range] / num
}

function calcStDev(data, sqSums, range, i) {
    const num = i + 1

    const interval = num <= range ? num : range;
    const variance = sqSums[range] / interval - Math.pow(data[i].ma[range], 2);
    return Math.pow(variance, 1 / 2)
}
function updateRSICount(data, inc, dec, i, rsiRange) {
    if (data[i].change > 0) {
        inc = inc + data[i].change
    } else {
        dec = dec + data[i].change
    }
    if ((i + 1) > rsiRange) {
        [inc, dec] = removeChanges(data, i, inc, dec, rsiRange);
    }
    return [inc, dec]
}
function removeChanges(data, i, increases, decreases, rsiRange) {
    if (data[i - rsiRange].change >= 0) {
        increases = increases - data[i - rsiRange].change
    } else {
        decreases = decreases - data[i - rsiRange].change
    }
    return [increases, decreases]
}
function calcRSI(inc, dec, range, j) {
    const i = range > j ? j+1 : range;
    let rsi = Math.abs((inc / i) / (dec / i))
    return 100 - 100 / (1 + rsi)
}









// ///original
// //brocken

// function addMa(data, avgN) {
//     // sums holds [movingSum, MovingsquareSum, NumIncreaseIntervals, NumDecreaseIntervals]
//     const pointers = avgN.slice();
//     let sums = getInitialMA(data, avgN)
//     for (let i = avgN[0]; i < data.length; i++) {

//         // get new sum by removing oldest element and adding new
//         // the new 20 day sum is sum - num[-20] + num[i]
//         sums[0] = sums[0] - data[i - avgN].close + data[i].close
//         sums[1] = sums[1] - (Math.pow(data[i - avgN].close, 2)) + (Math.pow(data[i].close, 2))
//         // calc new moving average as sum/n
//         data[i].ma = (sums[0] / avgN)
//         //  calc new varaince and then stdev

//         const variance = sums[1] / avgN - Math.pow(data[i].ma, 2); //sums[1]/avgn = average square of value; Math.pow(data[i].ma, 2) = squared average/ 
//         data[i].stdev = Math.pow(variance, 1 / 2)

//         // calc new NumIncreaseIntervals, NumDecreaseIntervals
//         // remove one from increases or decreases depending on oldest element.
//         if (data[i - 14].change >= 0) {
//             sums[2] = sums[2] - data[i - 14].change
//         } else {
//             sums[3] = sums[3] + data[i - 14].change
//         }
//         // add on to increases or decreases depending on new element
//         const change = data[i].close - data[i - 1].close
//         if (change > 0) {
//             sums[2] += change
//         } else {
//             sums[3] += -change
//         }
//         // rawrsi is average increases/average decreases 
//         data[i].rsi = (sums[2] / i) / (sums[3] / i)
//         //  end-rsi = 100 - (100/(1+rawrsi))
//         //  if rawrsi = large then end-rsi will = 100: ( 100 - 100/infinity)
//         //  if rawrsi = 0 then end-rsi will = 0: (100 - 100/(1))
//         data[i].rsi = 100 - 100 / (1 + data[i].rsi)

//     }
//     return data
// }
// // gets first N values of rollig sums and averages and stdevs. 
// // instead of using N for averages it uses i for each value
// // so first elements moving average = first_element.closingprice/(i+1) i=0
// //  second eleemnts moving average = first_el
// function getInitialMA(data, narr) {
//     narr = narr.slice();
//     data[0].ma = {}
//     let sum = {};
//     data[0].stDev = {}
//     let squareSum = {}
//     const var2 = {};
//     sqaureSum[narr[0]] = (data[0].close * data[0].close)
//     let largestN = n[n.length - 1];
//     narr.forEach(n => {
//         data[0].ma[n] = data[0].close
//         data[0].stdev[n] = data[0].close * .025;
//         squareSum[n] = sqaureSum[narr[0]]
//         sum[n] = data[0].close
//         var2[n] = undefined;
//     })
//     data[0].ma = data[0].close;
//     data[0].change = 0;
//     data[0].rsi = 50;
//     let sum = data[0].close;
//     let squareSum = data[0].close * data[0].close;
//     data[0].stdev = data[0].close * .025;
//     let gainsTot = 1;
//     let lossesTot = 1;
//     let position = 1;
//     for (let j = 0; j < narr.length; j++) {
//         for (position; i < narr[0]; i++) {
//             narr.forEach(n => {
//                 sum[n] += data[i].close
//                 squareSum[n] += data[i].close * data[i].close
//                 data[i].ma[n] = sum[n] / (i + 1)
//                 var2[n] = squareSum / (i + 1) - Math.pow(data[i].ma, 2);
//                 data[i].stdev[n] = Math.pow(var2, 1 / 2)
//             })
//             sum += data[i].close
//             squareSum += data[i].close * data[i].close
//             data[i].ma = sum / (i + 1)
//             var2 = squareSum / (i + 1) - Math.pow(data[i].ma, 2);
//             data[i].stdev = Math.pow(var2, 1 / 2)

//             // get total numver of increase and decreases for RSI
//             // average is calculated using N instead of I for these first N values;
//             if (position > 14) {
//                 if (data[i - interval].change >= 0) {
//                     increases = increases - data[i - interval].change
//                 } else {
//                     decreases = decreases + data[i - interval].change
//                 }
//             }
//             const change = data[i].close - data[i - 1].close
//             if (change >= 0) {
//                 gainsTot += change
//             } else {
//                 lossesTot += -change
//             }
//             // data[i].change = change;
//             data[i].rsi = (gainsTot / n) / (lossesTot / n)

//             data[i].rsi = 100 - 100 / (1 + data[i].rsi)
//         }
//         narr.shift();
//     })

//     return [sum, squareSum, gainsTot, lossesTot];
// }


