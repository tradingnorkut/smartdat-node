import log from "../logger"

export function countStatuses( calcList:any){
    return new Promise( (resolve,reject) => {
        let stop = 0
        let sell = 0
        let buy = 0
        
        calcList.forEach( (calc:any) => {

            calc.calcs.data.forEach( (element:any) => {
                switch(element.status){
                    case -1:
                        sell += 1
                    break

                    case 1:
                        buy += 1
                    break

                    case 2:
                        buy += 1
                        sell += 1
                    break

                    case 0: 
                        stop += 1
                    break

                    default:
                        const error = "Wrong status code"
                        log.error(error)
                        reject(error)
                    break

                }
            })
        }) 

        resolve({
            stop,
            sell,
            buy
        })
    })
    
}

export default countStatuses