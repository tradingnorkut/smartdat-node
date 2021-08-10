async function map( data:any, callback:any ){
    return Promise.all( data.map(  callback ) )
}


export default map