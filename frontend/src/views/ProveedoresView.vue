<template>
    <!-- Card -->
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <h5 class="card-title">Proveedores</h5>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                        data-bs-target="#modalProveedor">
                        <i class="fa fa-plus"></i>
                        Nuevo
                    </button>
                </div>
            </div>

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
                        <tr v-for="item in proveedores" :key="item">
                            <td>{{ item.id }}</td>
                            <td>{{ item.empresa }}</td>
                            <td>{{ item.contacto }}</td>
                            <td>{{ item.telefono }}</td>
                            <td>{{ item.correo }}</td>
                            <td>{{ item.direccion }}</td>
                            <td>
                                <span v-if="item.estado" class="badge text-bg-success">Activo</span>
                                <span v-else class="badge text-bg-danger">Inactivo</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-sm">
                                    <i class="fa fa-eye"></i>
                                </a>
                                <a href="#" class="btn btn-warning btn-sm">
                                    <i class="fa fa-edit"></i>
                                </a>
                                <a href="#" class="btn btn-danger btn-sm">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal -->
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
                        <button type="button" @click="registrar(); $refs.modalProveedorClose.click()" class="btn btn-primary">
                            Guardar
                        </button>
                        <button type="button" ref="modalProveedorClose" class="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
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
        const { data } = await axios.post(baseURL, datos); // Cambia '/store' por ''
        console.log(data);
        obtenerDatos();
    } catch (error) {
        console.error(error);
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
