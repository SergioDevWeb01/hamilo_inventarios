var express = require("express");
var router = express.Router();
const mysql = require("mysql2");
const connection = require("../database");

// Get Listar Productos
router.get("/", function (req, res, next) {
    //creamos la consulta
    var query = "SELECT * FROM productos;";
    //ejecutamos la consulta
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).send({
                error: err,
                message: "Error al obtener los productos",
            });
        } else {
            console.log(rows);
            res.status(200).send({
                data: rows,
                message: "Lista de productos",
            });
        }
    });
});

//GET Actualizar Estado Producto
router.get("/estado/:id", function (req, res, next) {
    //Creamos la consulta
    var query = `UPDATE productos SET estado = !estado WHERE id = ${req.params.id};`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields) {
        if (error) {
                res.status(500).send({
                error: error,
                message: "Error al actualizar el estado del producto",
            });
        } else {
            console.log(req.results);
            res.status(200).send({
                data: results,
                message: "Estado Actualizado correctamente",
            });
        }
    });
});

//GET Productos Activos con Stock
router.get("/activos", function (req, res, next) {
    //Creamos la consulta
    var query = `SELECT * FROM productos WHERE estado = 1 AND stock > 0;`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al obtener los productos activos",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Lista de productos activos",
            });
        }
    });
});

//POST Crear Producto
router.post("/", function (req, res, next) {
    //obtenemos los datos del formulario
    const { nombre, codigo, costo, precio, stock, estado } = req.body;
    //creamos la consulta
    var query = `INSERT INTO productos (nombre, codigo, costo, precio, stock, estado, created_at, updated_at) VALUES ('${nombre}', '${codigo}', ${costo}, ${precio}, ${stock}, ${estado}, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`;
    //ejecutamos la consulta
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al crear el producto",
            });
        } else {
            console.log(results.insertId);
            res.status(200).send({
                data: results.insertId,
                message: "Producto creado correctamente",
            });
        }
    });
});

//PUT Actualizar Producto
router.put("/:id", function (req, res, next) {
    //obtenemos los datos del formulario
    const { nombre, codigo, costo, precio, stock, estado} = req.body;
    //creamos la consulta
    var query = `UPDATE productos SET nombre = '${nombre}', codigo = '${codigo}', costo = ${costo}, precio = ${precio}, stock = ${stock}, estado = ${estado}, updated_at = CURRENT_TIMESTAMP() WHERE id = ${req.params.id};`;
    //ejecutamos la consulta
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al actualizar el producto",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Producto actualizado correctamente",
            });
        }
    })

});

//DELETE Eliminar Producto
router.delete("/:id", function (req, res, next) {
    //Creamos la consulta
    var query = `DELETE FROM productos WHERE id = ${req.params.id};`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al eliminar el producto",
            });
        } else {
            console.log(req.params.id);
            res.status(200).send({
                data: req.params.id,
                message: "Producto eliminado correctamente",
            });
        }
    });
});

module.exports = router;
