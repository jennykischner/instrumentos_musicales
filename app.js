// INICIO DE SESION DEL USUARIO

const inicioSesionLink = document.getElementById("inicioSesionLink");

inicioSesionLink.addEventListener("click", async (event) => {
  event.preventDefault();

  const { value: email } = await Swal.fire({
    title: "Ingresa tu dirección de correo electrónico",
    input: "email",
    inputLabel: "Tu dirección de correo electrónico",
    inputPlaceholder: "Ingresa tu dirección de correo electrónico",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Aceptar",
  });

  if (email) {
    const { value: password } = await Swal.fire({
      title: "Ingresa tu contraseña",
      input: "password",
      inputLabel: "Contraseña",
      inputPlaceholder: "Ingresa tu contraseña",
      inputAttributes: {
        maxlength: 10,
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
    });

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    Swal.fire(`Correo electrónico: ${email}\nContraseña: ${password}`);
  }
});


// FUNCION MODAL DEL CARRITO

const abrirCarritoBtn = document.getElementById("abrirCarrito");
const carritoModal = document.getElementById("carritoModal");
const cerrarModalBtn = document.getElementsByClassName("cerrarModal")[0];

abrirCarritoBtn.addEventListener("click", function (event) {
  event.preventDefault();
  carritoModal.style.display = "block";
});

cerrarModalBtn.addEventListener("click", function () {
  carritoModal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === carritoModal) {
    carritoModal.style.display = "none";
  }
});

// CARDS DE PRODUCTOS MEDIANTE FETCH (OPERACION ASINCRONICA)

fetch("data.json")
  .then((response) => response.json())
  .then(async (data) => {
    await operacionAsincronica(data);

    const violinContainer = document.getElementById("violin-container");
    const violaContainer = document.getElementById("viola-container");
    const violoncelloContainer = document.getElementById("violoncello-container");
    const contrabajoContainer = document.getElementById("contrabajo-container");

    const createProductCard = (tarjeta, agregarAlCarritoFn) => {
      const div = document.createElement("div");
      div.classList.add("card", "m-2", "p-3");
      div.setAttribute("data-instrumento", tarjeta.instrumento);

      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.src = tarjeta.imagen;
      img.alt = tarjeta.titulo;
      div.appendChild(img);

      const divCardBody = document.createElement("div");
      divCardBody.classList.add("card-body");

      const h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.textContent = tarjeta.titulo;
      divCardBody.appendChild(h5);

      const p = document.createElement("p");
      p.classList.add("card-text");
      p.textContent = tarjeta.descripcion;
      divCardBody.appendChild(p);

      const spanPrecio = document.createElement("span");
      spanPrecio.classList.add("precio_producto");
      spanPrecio.textContent = tarjeta.precio;
      divCardBody.appendChild(spanPrecio);

      const btn = document.createElement("button");
      btn.classList.add("btn", "btn-primary");
      btn.textContent = "Añadir al carrito";
      btn.addEventListener("click", () => {
        agregarAlCarritoFn(tarjeta.Id);
      });
      divCardBody.appendChild(btn);

      div.appendChild(divCardBody);

      return div;
    };

    async function operacionAsincronica() {
      try {
        const response = await fetch("data.json");
        const data = await response.json();
      } catch (error) {
        console.log("Error en la operación asincrónica:", error);
      }
    }

    // CARDS DE VIOLIN
    data.tarjetasViolin.forEach((tarjeta) => {
      const div = createProductCard(tarjeta, agregarViolinAlCarrito);
      violinContainer.appendChild(div);
    });

    // CARDS DE VIOLA
    data.tarjetasViola.forEach((tarjeta) => {
      const div = createProductCard(tarjeta, agregarViolaAlCarrito);
      violaContainer.appendChild(div);
    });

    // CARDS DE VIOLONCELLO
    data.tarjetasVioloncellos.forEach((tarjeta) => {
      const div = createProductCard(tarjeta, agregarVioloncelloAlCarrito);
      violoncelloContainer.appendChild(div);
    });

    // CARDS DE CONTRABAJO
    data.tarjetasContrabajos.forEach((tarjeta) => {
      const div = createProductCard(tarjeta, agregarContrabajoAlCarrito);
      contrabajoContainer.appendChild(div);
    });

    // FILTRAR INSTRUMENTOS POR LA BARRA DE BUSQUEDA (POR NOMBRE DE INSTRUMENTO Y MARCA)

    function filterResults(event) {
      event.preventDefault();

      const searchInput = document.getElementById("searchInput");
      const searchTerm = searchInput.value.toLowerCase();

      const productCards = document.querySelectorAll(".card");

      productCards.forEach((card) => {
        const instrumento = card.getAttribute("data-instrumento");
        const marca = card.getAttribute("data-marca");
        const cardText = card.textContent.toLowerCase();

        if (instrumento === searchTerm || cardText.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }

    const form = document.querySelector("form");
    form.addEventListener("submit", filterResults);

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();

      if (searchTerm === "") {
        const productCards = document.querySelectorAll(".card");
        productCards.forEach((card) => {
          card.style.display = "block";
        });
      }
    });

    filterResults(new Event("submit"));

    // FUNCION PARA AGREGAR AL CARRITO

    function agregarAlCarrito(producto) {
      carrito.push(producto);
      actualizarCarrito();
      actualizarTotal();
      guardarCarrito();

      Toastify({
        text: "Producto agregado al carrito",
        duration: 1000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
    }

    function agregarViolinAlCarrito(productoId) {
      const producto = data.tarjetasViolin.find((p) => p.Id === productoId);
      if (producto) {
        agregarAlCarrito(producto);
      }
    }

    function agregarViolaAlCarrito(productoId) {
      const producto = data.tarjetasViola.find((p) => p.Id === productoId);
      if (producto) {
        agregarAlCarrito(producto);
      }
    }

    function agregarVioloncelloAlCarrito(productoId) {
      const producto = data.tarjetasVioloncellos.find(
        (p) => p.Id === productoId
      );
      if (producto) {
        agregarAlCarrito(producto);
      }
    }

    function agregarContrabajoAlCarrito(productoId) {
      const producto = data.tarjetasContrabajos.find(
        (p) => p.Id === productoId
      );
      if (producto) {
        agregarAlCarrito(producto);
      }
    }
  });

// ALMACENAR PRODUCTOS

let carrito = [];

// GUARDAR EN EL LOCAL STORAGE
function obtenerCarritoGuardado() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
    actualizarTotal();
  }
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//  FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  actualizarTotal();
  guardarCarrito();
}

// FUNCION PARA ACTUALIZAR EL CARRITO

function actualizarCarrito() {
  const carritoLista = document.getElementById("carrito-lista");
  let html = "";

  carrito.forEach((producto, index) => {
    html += `
    <li> <img id="imagen-carrito" src="${producto.imagen}" alt="Producto"> - ${producto.titulo} 
    - Precio: ${producto.precio} <i class="fas fa-trash" onclick="eliminarDelCarrito(${index})"></i></li>
      `;
  });

  carritoLista.innerHTML = html;
  actualizarCantidadCarrito();
}

// FUNCION PARA ACTUALIZAR EL TOTAL DE LA COMPRA

function actualizarTotal() {
  const totalElemento = document.getElementById("total");
  let total = 0;

  carrito.forEach((producto) => {
    total += parseFloat(producto.precio.replace("$", ""));
  });

  totalElemento.textContent = `Total: $${total.toFixed(3)}`;
}

function actualizarCantidadCarrito() {
  const cantidadCarrito = document.getElementById("cantidad-carrito");
  cantidadCarrito.textContent = carrito.length.toString();
}

window.addEventListener("DOMContentLoaded", actualizarCantidadCarrito);

// VACIAR EL CARRITO

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  actualizarTotal();
  guardarCarrito();
  actualizarCantidadCarrito();
}

// FUNCION PARA FINALIZAR LA COMPRA

const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");

btnFinalizarCompra.addEventListener("click", finalizarCompra);

obtenerCarritoGuardado();

//FORMULARIO DE COMPRA

function finalizarCompra() {
  Swal.fire({
    title: "Ingrese sus datos",
    html: `
      <div id="formulario-compra">
        <label for="nombreCompleto">Nombre completo:</label>
        <input id="nombreCompleto" class="swal2-input" type="text" placeholder="Nombre completo" required>
        
        <label for="email">Correo electrónico:</label>
        <input id="email" class="swal2-input" type="email" placeholder="Correo electrónico" required>
        
        <label for="pagoTarjeta">¿Va a pagar con tarjeta?</label>
        <input id="pagoTarjeta" class="swal2-input" type="checkbox" onchange="toggleTipoTarjeta()">
        
        <div id="tipoTarjetaContainer" style="display: none;">
          <label for="tipoTarjeta">Seleccione el tipo de tarjeta:</label>
          <div>
            <input id="visa" type="checkbox" value="Visa">
            <label for="visa">Visa</label>
          </div>
          <div>
            <input id="mastercard" type="checkbox" value="Mastercard">
            <label for="mastercard">Mastercard</label>
          </div>
          <div>
            <input id="amex" type="checkbox" value="American Express">
            <label for="amex">American Express</label>
          </div>
          <div>
            <input id="naranja" type="checkbox" value="Naranja">
            <label for="naranja">Naranja</label>
          </div>
        </div>
        
        <label for="cuotas">¿Desea pagar en cuotas sin interés?</label>
        <select id="cuotas" class="swal2-input">
          <option value="no">No</option>
          <option value="3">3 cuotas</option>
          <option value="6">6 cuotas</option>
          <option value="12">12 cuotas</option>
        </select>
      </div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const nombreCompleto = document.getElementById("nombreCompleto").value;
      const pagoTarjeta = document.getElementById("pagoTarjeta").checked
        ? "si"
        : "no";
      const tipoTarjeta = getSelectedTarjetas();
      const cuotas = document.getElementById("cuotas").value;

      // RESUMEN DE COMPRA

      const resumen = `
        <p><strong>Nombre completo:</strong> ${nombreCompleto}</p>
        <p><strong>Pago con tarjeta:</strong> ${pagoTarjeta}</p>
        <p><strong>Tipo de tarjeta:</strong> ${tipoTarjeta.join(", ")}</p>
        <p><strong>Cuotas:</strong> ${cuotas}</p>
      `;

      localStorage.setItem("resumenCompra", resumen);

      Swal.fire({
        title: "Resumen de datos",
        html: resumen,
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Volver",
        confirmButtonText: "Finalizar compra",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Tu compra ha sido realizada",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

      vaciarCarrito();
    },
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Finalizar compra",
    reverseButtons: true,
  });

  toggleTipoTarjeta();
}

function toggleTipoTarjeta() {
  const tipoTarjetaContainer = document.getElementById("tipoTarjetaContainer");
  const pagoTarjetaCheckbox = document.getElementById("pagoTarjeta");

  if (pagoTarjetaCheckbox.checked) {
    tipoTarjetaContainer.style.display = "block";
  } else {
    tipoTarjetaContainer.style.display = "none";
  }
}
function getSelectedTarjetas() {
  const checkboxes = document.querySelectorAll(
    "#tipoTarjetaContainer input[type='checkbox']"
  );
  const selectedTarjetas = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedTarjetas.push(checkbox.value);
    }
  });

  return selectedTarjetas;
}
