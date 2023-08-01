const { Router } = require("express");
const router = Router();

const { routerActivities } = require("./routerActivities");

const countriesRouter = require("./countriesRouter"); //creo una constante con el string countries para usarlo en las rutas

router.use("/countries", countriesRouter); //le paso cada una de las funciones, 
//y de manera predeterminada se les envia a cada uno las req y res, 
//tengo una ruta para cada handler específicamente

router.use("/activities", routerActivities);


module.exports = router;