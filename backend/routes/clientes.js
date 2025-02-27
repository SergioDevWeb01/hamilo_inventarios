var express = require("express");
var router = express.Router();
const mysql = require("mysql2");
const connection = require("../database");

// Get Listar Clientes
router.get("/", function (req, res, next) {
    var query = "SELECT * FROM clientes;";
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).send({
                error: err,
                message: "Error al obtener los clientes",
            });
        } else {
            console.log(rows);
            res.status(200).send({
                data: rows,
                message: "Lista de clientes",
            });
        }
    });
});

// Get Actualizar Estado Cliente
router.get("/estado/:id", function (req, res, next) {
    //Creamos la consulta
    var query = `UPDATE clientes SET estado = !estado WHERE id = ${req.params.id};`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields){
        if (error) {
            res.status(500).send({
                error: error,
                message: "Error al actualizar el estado del cliente",
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

// Get Clientes Activos
router.get("/activos", function (req, res, next) {
    //Creamos la consulta
    var query = `SELECT * FROM clientes WHERE estado = 1;`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields){
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al obtener los clientes activos",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Lista de clientes activos",
            });
        }
    });
});

// POST Crear Cliente
router.post("/", function (req, res, next) {
    // Obtenemos los datos del cliente
    const { nombres, apellidos, documento, tipo_documento, telefono, correo, estado } = req.body;
    // Creamos la consulta
    var query = `INSERT INTO clientes (nombres, apellidos, documento, tipo_documento, telefono, correo, estado, created_at, updated_at) VALUES ('${nombres}', '${apellidos}', '${documento}', '${tipo_documento}', '${telefono}', '${correo}', '${estado}', NOW(), NOW());`;
    // Ejecutamos la consulta
    connection.query(query, function (error, results, fields) {
        if (error) {
            res.status(500).send({
                error: error,
                message: "Error al crear el cliente",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Cliente creado correctamente",
            });
        }
    });
});

// PUT Actualizar Cliente
router.put("/:id", function (req, res, next) {
    //Obtenemos los datos del cliente
    const { nombres, apellidos, documento, tipo_documento, telefono, correo, estado } = req.body;
    //Creamos la consulta
    var query = `UPDATE clientes SET nombres = '${nombres}', apellidos = '${apellidos}', documento = '${documento}', tipo_documento = '${tipo_documento}', telefono = '${telefono}', correo = '${correo}', estado = '${estado}', updated_at = NOW() WHERE id = ${req.params.id};`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al actualizar el cliente",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Cliente actualizado correctamente",
            });
        }
    });
});

// DELETE Eliminar Cliente
router.delete("/:id", function (req, res, next) {
    //Creamos la consulta
    var query = `DELETE FROM clientes WHERE id = ${req.params.id};`;
    //Ejecutamos la consulta
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: "Error al eliminar el cliente",
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: "Cliente eliminado correctamente",
            });
        }
    });
});

module.exports = router;
