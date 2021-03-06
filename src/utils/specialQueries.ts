import countStatuses from "./calc.utils"
import fs from "fs"

export const APROX_PAGE_SIZE =  2500

export const TIMEFRAMES = {
    THIRTY_MINUTES: 1800,
    ONE_HOUR: 3600,
    TWELVE_HOURS: 43200,
    ONE_DAY: 86400,
    FIFTY_DAYS: 1296000,
    ONE_MOTH: 2592000,
    SIX_MONTHS : 15552000,
    ONE_YEAR: 31104000,
    FIVE_YEARS: 155520000
}

export function getTimeframeValue( tf:any ){
    switch(tf){
        case "30-m": return TIMEFRAMES.THIRTY_MINUTES
        case "1-h":  return TIMEFRAMES.ONE_HOUR
        case "12-h": return TIMEFRAMES.TWELVE_HOURS
        case "1-d": return TIMEFRAMES.ONE_DAY
        case "15-d": return TIMEFRAMES.FIFTY_DAYS
        case "1-M": return TIMEFRAMES.ONE_MOTH
        case "6-M": return TIMEFRAMES.SIX_MONTHS
        case "1-y": return TIMEFRAMES.ONE_YEAR
        case "5-y": return TIMEFRAMES.FIVE_YEARS
        default : throw new Error("Invalid timeframe")
    }
}


 async function formatStrategiesAndCountingByTimeframe( arr:any, timeframe:any  ){

    arr = Array.from(arr)
    // get the first and the last element of an array
    let start = arr[0]
    let end = arr[ arr.length - 1 ]

    // create 2 date objects with the first eleemnt date
    let startDate = new Date(start.datetime) 
    let stopDate = new Date(start.datetime)

    //console.log(arr)
    

    // a element with the start date plus a timeframe unit margin
    stopDate.setSeconds( stopDate.getSeconds() + timeframe )

    // set a date object with the last element of the array
    let finalDate = new Date(end.datetime)

    let output = []
    let i = 0

    while (startDate.getTime() < finalDate.getTime() ){

        let dataFragment = []

        //console.log(startDate, stopDate)
        for (i = 0; i < arr.length; i++){
            const date = new Date( arr[i].datetime ).getTime()
            if(date >= startDate.getTime() && date < stopDate.getTime()){
                dataFragment.push(arr[i])
                //arr.splice(i,1)
            } else{
                arr.splice(0,i+1)
                break
            }
        }

        
        if ( dataFragment.length == 0){
            startDate.setSeconds( startDate.getSeconds() + timeframe )
            stopDate.setSeconds( stopDate.getSeconds() + timeframe )
            continue
        }
        let pivotElement:any = dataFragment[ dataFragment.length -1 ]
        
        let calcs = await  countStatuses(dataFragment)


         output.push({
            _id: pivotElement._id,
            datetime: pivotElement.datetime,
            open: pivotElement.open,
            high : pivotElement.high,
            low: pivotElement.low,
            close: pivotElement.close,
            calcTotal: calcs
        })
        startDate.setSeconds( startDate.getSeconds() + timeframe )
        stopDate.setSeconds( stopDate.getSeconds() + timeframe )

    }

    

    return output
   
}

export default formatStrategiesAndCountingByTimeframe