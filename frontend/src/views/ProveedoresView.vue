<template>
    <!-- Card -->
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <h5 class="card-title">Proveedores</h5>
                </div>
                <div class="col-md-6 text-end">
                    <!-- Botón para abrir el modal y agregar un nuevo proveedor -->
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                        data-bs-target="#modalProveedor">
                        <i class="fa fa-plus"></i>
                        Nuevo
                    </button>
                </div>
            </div>

            <!-- Tabla para mostrar la lista de proveedores -->
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Empresa</th>
                            <th>Contacto</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Dirección</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Recorrer los proveedores y mostrar cada uno en una fila de la tabla -->
                        <tr v-for="item in proveedores" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.empresa }}</td>
                            <td>{{ item.contacto }}</td>
                            <td>{{ item.telefono }}</td>
                            <td>{{ item.correo }}</td>
                            <td>{{ item.direccion }}</td>
                            <td>
                                <!-- Mostrar el estado del proveedor -->
                                <span v-if="item.estado" class="badge text-bg-success">Activo</span>
                                <span v-else class="badge text-bg-danger">Inactivo</span>
                            </td>
                            <td>
                                <!-- Botón para editar el proveedor -->
                                <button @click="seleccionar(item)" class="btn btn-warning btn-sm">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <!-- Botón para cambiar el estado del proveedor -->
                                <button v-if="item.estado" @click="estado(item.id)" class="btn btn-danger btn-sm">
                                    <i class="fa fa-ban"></i>
                                </button>
                                <button v-else @click="estado(item.id)" class="btn btn-primary btn-sm">
                                    <i class="fa fa-check"></i>
                                </button>
                                <!-- Botón para eliminar el proveedor si está inactivo -->
                                <button v-if="item.estado == 0" @click="eliminar(item.id)"
                                    class="btn btn-danger btn-sm">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal para agregar o editar un proveedor -->
    <div class="modal fade" id="modalProveedor" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Datos del proveedor
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="#" class="needs-validation" novalidate>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="empresa" class="form-label">Empresa</label>
                            <input type="text" v-model="empresa" id="empresa" class="form-control" required />
                        </div>

                        <div class="mb-3">
                            <label for="contacto" class="form-label">Nombre del contacto</label>
                            <input type="text" v-model="contacto" id="contacto" class="form-control"
                                placeholder="Jhon Doe" required />
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="telefono" class="form-label">Teléfono</label>
                                    <input type="text" v-model="telefono" id="telefono" class="form-control"
                                        placeholder="+591 XXXXXXXX" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="correo" class="form-label">Correo</label>
                                    <input type="email" v-model="correo" id="correo" class="form-control"
                                        placeholder="example@example.com" />
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="direccion" class="form-label">Dirección</label>
                            <input type="text" v-model="direccion" id="direccion" class="form-control" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Cerrar
                        </button>
                        <button type="button" @click="
                            registrar();
                        $refs.modalProveedorClose.click();
                        " class="btn btn-primary">
                            Guardar
                        </button>
                        <button type="button" ref="modalProveedorClose" class="btn-close d-none" data-bs-dismiss="modal"
                            aria-label="Close">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * Importar los módulos necesarios de Vue y Axios.
 */
import { ref, onMounted } from "vue";
import axios from "axios";

/**
 * Definir variables reactivas para almacenar la lista de proveedores y los valores de entrada del formulario.
 */
const proveedores = ref([]);
let baseURL = "http://localhost:3000/proveedores";

const empresa = ref("");
const contacto = ref("");
const telefono = ref("");
const correo = ref("");
const direccion = ref("");
const seleccionado = ref({});

/**
 * Hook del ciclo de vida que se ejecuta cuando el componente se monta.
 * Llama a la función obtenerDatos para obtener datos iniciales.
 */
onMounted(() => {
    obtenerDatos();
});

/**
 * Obtiene datos de la API y actualiza la lista de proveedores.
 * Registra los datos en la consola y maneja cualquier error.
 */
const obtenerDatos = async () => {
    try {
        const { data } = await axios.get(baseURL);
        console.log(data);
        proveedores.value = data.data;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Envía una solicitud POST a la API para registrar un nuevo proveedor.
 * Utiliza los valores de entrada del formulario para crear la carga útil de la solicitud.
 * Llama a la función obtenerDatos para actualizar la lista de proveedores después de un registro exitoso.
 * Registra la respuesta en la consola y maneja cualquier error.
 */
const registrar = async () => {
    const datos = {
        empresa: empresa.value,
        contacto: contacto.value,
        telefono: telefono.value,
        correo: correo.value,
        direccion: direccion.value,
        estado: 1,
    };
    try {
        if (seleccionado.value.id) {
            const { data } = await axios.put(`${baseURL}/${seleccionado.value.id}`, datos);
            console.log(data);
        } else {
            const { data } = await axios.post(baseURL, datos);
            console.log(data);
        }
        obtenerDatos();
        limpiarFormulario();
        $refs.modalProveedorClose.click();
    } catch (error) {
        console.error(error);
    }
};

/**
 * Actualiza los datos del proveedor seleccionado y muestra el modal.
 */
const seleccionar = (item) => {
    seleccionado.value = item;
    empresa.value = item.empresa;
    contacto.value = item.contacto;
    telefono.value = item.telefono;
    correo.value = item.correo;
    direccion.value = item.direccion;

    var myModalEl = document.getElementById("modalProveedor");
    var modal = new bootstrap.Modal(myModalEl);
    modal.show();
};

/**
 * Limpia los valores de entrada del formulario y cierra el modal.
 */
const limpiarYCerrarModal = () => {
    limpiarFormulario();
    $refs.modalProveedorClose.click();
};

/**
 * Limpia los valores de entrada del formulario.
 */
const limpiarFormulario = () => {
    empresa.value = "";
    contacto.value = "";
    telefono.value = "";
    correo.value = "";
    direccion.value = "";
    seleccionado.value = {};
};

/**
 * Actualizar Estado
 */
const estado = async (id) => {
    try {
        const proveedor = proveedores.value.find(item => item.id === id);
        const nuevoEstado = proveedor.estado ? 0 : 1;
        const { data } = await axios.put(`${baseURL}/${id}`, { estado: nuevoEstado });
        obtenerDatos();
    } catch (error) {
        console.log(error);
    }
};

/**
 * Eliminar
 */
const eliminar = async (id) => {
    try {
        await axios.delete(`${baseURL}/${id}`);
        obtenerDatos();
    } catch (error) {
        console.log(error);
    }
};
</script>

<style scoped>
.modal-body .form-label {
    color: #000000;
}

.modal-header h1 {
    color: #000000;
}
</style>
