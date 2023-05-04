const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if(apiKey === "mio"){
            next();
        }else{
            res.status(403);
            res.send({error: "Api key no es correcta"})
        }
    } catch (e) {
        res.status(403);
        res.send({error:"Ha ocurrido un error en el custom Header"})
    }
};

module.exports = customHeader;