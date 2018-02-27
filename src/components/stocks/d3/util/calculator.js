
const ansObj = [[], [0], [0]];
let sum = 0;
let gainsTot = 0;
let lossesTot = 0 ;
const gainsArr=[];
const lossesArr=[];
function CalculatedStat(){
    this.bollinger = { "top": null, "bottom": null, "middle": null }
    this.rsi =  null
    this.ma = null
}
function calculator(prices){
    const avgN = 20;
    const first = [[],[]]
    const ma = getInitialMA(avgN,prices)
    for (let i = avgN;i<prices.length;i++){
        // the new 20 day sum is sum - moving average[-20] + newprice
        sum = (sum - ansObj[0][i-1] + prices[i])
        ma.push(sum/avgN)
    }
}

// will return and array of [20d mobing averages,[gains from start],[losses from start]]
function getInitialMA(n, prices) {
    const ma = []
    ma.push(prices[0])
    let sum = prices[0]
    for (let i = 1; i < n; i++) {
        sum += prices[i]
        ma.push(sum / (i + 1))

    }
}



function calculatorAll(prices){
    const avgN = 20;
    const first = [[],[]]
    getInitial(avgN,prices)
    for (let i = avgN;i<prices.length;i++){
        // the new 20 day sum is sum - moving average[-1] + newprice
        sum = (sum - ansObj[0][i-1] + prices[i])
        ansObj[0].push(sum/avgN)
        const val = prices[i] >= prices[i - 1]
        if (val >= 0) {
            gainsarr.push(val)
        } else {

        }
        ansObj[1].push(gainsTot / avgN)
        ansObj[2].push(losseTot / avgN)
    }
}



// will return and array of [20d mobing averages,[gains from start],[losses from start]]
function getInitial(n,prices){
    ansObj[0].pushprices[0]
    sum = prices[0]
    gainsTot = 0 
    lossesTot = 0
    
    for(let i = 1; i<n;i++){
        sum += prices[i]
        ansObj[0].push(sum/(i+1))
        const val = prices[i] - prices[i - 1] 
        if (val >= 0){
            gainsTot += gain
            gainsArr.push(val);
        }else{   
            lossesTot += 
            lossesArr.push(val)
        }
        ansObj[1].push(gainsTot / i)
        ansObj[2].push(lossesTot / i)
    }
}
export default calculator;