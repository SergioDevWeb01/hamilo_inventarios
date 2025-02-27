var express = require("express");
var router = express.Router();
const connection = require("../database");

// Get Listar Proveedores
router.get("/", function (req, res, next) {
    var query = "SELECT * FROM proveedores;";
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).send({
                error: err,
                message: "Error al obtener los proveedores",
            });
        } else {
            console.log(rows);
            res.status(200).send({
                data: rows,
                message: "Lista de proveedores",
            });
        }
    });
});

// Get Actualizar Estado Proveedor
router.get("/estado/:id", function (req, res, next) {
    //Creamos la consulta
    var query = `UPDATE proveedores SET estado = !estado WHERE id = ${req.params.id};`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields){
        if (error) {
            res.status(500).send({
                error: error,
                message: "Error al actualizar el estado del proveedor",
            });
        } else {
            console.log(req.results);
            res.status(200).send({
                data: results,
                message: "Estado Actualizado correctamente",
            });
        }
    })
});

// Get Proveedores Activos
router.get("/activos", function (req, res, next){
    //Creamos la consulta
    var query = `SELECT * FROM proveedores WHERE estado = 1;`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields){
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al obtener los proveedores activos",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Lista de proveedores activos",
            });
        }
    })
});

//POST Agregar Proveedor
router.post("/", function (req, res, next){
    //Obtenemos los datos del proveedor
    const { empresa, contacto, telefono, correo, direccion, estado } = req.body;
    //Creamos la consulta
    var query = `INSERT INTO proveedores (empresa, contacto, telefono, correo, direccion, estado, created_at, updated_at) VALUES ('${empresa}', '${contacto}', '${telefono}', '${correo}', '${direccion}', ${estado}, NOW(), NOW());`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields){
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al agregar el proveedor",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Proveedor agregado correctamente",
            });
        }
    });
});

//PUT Actualizar Proveedor
router.put("/:id", function (req, res, next){
    //Obtenemos los datos del proveedor
    const { empresa, contacto, telefono, correo, direccion, estado } = req.body;
    //Creamos la consulta
    var query = `UPDATE proveedores SET empresa = '${empresa}', contacto = '${contacto}', telefono = '${telefono}', correo = '${correo}', direccion = '${direccion}', estado = ${estado}, updated_at = NOW() WHERE id = ${req.params.id};`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields){
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al actualizar el proveedor",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Proveedor actualizado correctamente",
            });
        }
    });
});

//DELETE Eliminar Proveedor
router.delete("/:id", function (req, res, next){
    //Creamos la consulta
    var query = `DELETE FROM proveedores WHERE id = ${req.params.id};`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields){
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al eliminar el proveedor",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Proveedor eliminado correctamente",
            });
        }
    });
});

module.exports = router;
