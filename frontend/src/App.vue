<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <nav class="navbar navbar-expand-sm navbar-light bg-hamilo shadow">
    <div class="container">
      <a class="navbar-brand mb-0 h1 d-flex align-items-center gap-2" href="#">
        <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" width="30" height="24" alt="Logo">
        Hamilo
      </a>
      <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav me-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" activeClass="active" exactActiveClass="active">
              <i class="fa fa-home"></i>
              Inicio
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/ventas" class="nav-link" activeClass="active" exactActiveClass="active">
              <i class="fa fa-shopping-cart"></i>
              Ventas
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/compras" class="nav-link" activeClass="active" exactActiveClass="active">
              <i class="fa fa-shopping-bag"></i>
              Compras
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/productos" class="nav-link" activeClass="active" exactActiveClass="active">
              <i class="fa fa-cubes"></i>
              Productos
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/clientes" class="nav-link" activeClass="active" exactActiveClass="active">
              <i class="fa fa-users"></i>
              Clientes
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/proveedores" class="nav-link" activeClass="active" exactActiveClass="active">
              <i class="fa fa-building"></i>
              Proveedores
            </RouterLink>
          </li>
        </ul>
        <!-- <form class="d-flex my-2 my-lg-0">
                    <input class="form-control me-sm-2" type="text" placeholder="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                        Search
                    </button>
                </form> -->
        <div class="d-flex my-2 my-lg-0 dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <img class="rounded-circle" width="36" height="36"
              src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg" alt="">
            Sergio Antonio
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownId">
            <a class="dropdown-item" href="perfil.html">
              <i class="fa fa-user-circle"></i>
              Perfil
            </a>
            <a class="dropdown-item" href="#">
              <i class="fa fa-sign-out"></i>
              Cerrar sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="container pt-3">
    <RouterView />
  </div> 
  
</template>

<style scoped></style>
