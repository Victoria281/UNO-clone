function printingDebugInfo(req, res, next) {
    console.log("------------[Debug Info]---------------");
    // console.log(`Servicing ${urlPattern}..`)
    console.log("Servicing " + req.method + " " + req.url + "..")

    console.log("> req.params:" + JSON.stringify(req.params))
    console.log("> req.body: " + JSON.stringify(req.body))
    //console.log("> req.myOwnDebugInfo:" + JSON.stringify(req.myOwnDebugInfo))
    console.log("------------[Debug Info]---------------");

    console.log("")
    next();
}

module.exports=printingDebugInfo;