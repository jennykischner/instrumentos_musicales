// Inicio de Sesión del Usuario

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

// Función modal del carrito

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

// Cards de productos



fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const violinContainer = document.getElementById("violin-container");
    const violaContainer = document.getElementById("viola-container");
    const violoncelloContainer = document.getElementById("violoncello-container");
    const contrabajoContainer = document.getElementById("contrabajo-container");

    const createProductCard = (tarjeta, agregarAlCarritoFn) => {
      const div = document.createElement("div");
      div.classList.add("card", "m-2", "p-3");

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

    // Mostrar cards de violín
    data.tarjetasViolin.forEach((tarjeta) => {
      const div = createProductCard(tarjeta, agregarViolinAlCarrito);
      violinContainer.appendChild(div);
    });

    // Mostrar cards de viola
    data.tarjetasViola.forEach((tarjeta) => {
      const div = createProductCard(tarjeta, agregarViolaAlCarrito);
      violaContainer.appendChild(div);
    });

    // Mostrar cards de violoncello
    data.tarjetasVioloncellos.forEach((tarjeta) => {
      const div = createProductCard(tarjeta, agregarVioloncelloAlCarrito);
      violoncelloContainer.appendChild(div);
    });

    // Mostrar cards de contrabajo
    data.tarjetasContrabajos.forEach((tarjeta) => {
      const div = createProductCard(tarjeta, agregarContrabajoAlCarrito);
      contrabajoContainer.appendChild(div);
    });

    // Función para agregar productos al carrito

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

// Funciones específicas para cada tipo de producto
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
  const producto = data.tarjetasVioloncellos.find((p) => p.Id === productoId);
  if (producto) {
    agregarAlCarrito(producto);
  }
}

function agregarContrabajoAlCarrito(productoId) {
  const producto = data.tarjetasContrabajos.find((p) => p.Id === productoId);
  if (producto) {
    agregarAlCarrito(producto);
  }
}


  })
 
  .catch((error) => {
    console.log("Error al cargar el archivo JSON:", error);
  });

// Almacenar productos

let carrito = [];

// Guardar en el Local Storage
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


// Función para eliminar productos del carrito

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  actualizarTotal();
  guardarCarrito();
}

// Función para actualizar el carrito

function actualizarCarrito() {
  const carritoLista = document.getElementById("carrito-lista");
  let html = "";

  carrito.forEach((producto, index) => {
    html += `
    <li>${producto.titulo} - Precio: ${producto.precio} <i class="fas fa-trash" onclick="eliminarDelCarrito(${index})"></i></li>
      `;
  });

  carritoLista.innerHTML = html;
}

// Función para actualizar el total de la compra

function actualizarTotal() {
  const totalElemento = document.getElementById("total");
  let total = 0;

  carrito.forEach((producto) => {
    total += parseFloat(producto.precio.replace("$", ""));
  });

  totalElemento.textContent = `Total: $${total.toFixed(2)}`;
}

// Vaciar el carrito

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  actualizarTotal();
  guardarCarrito();
}

// Función para finalizar la compra

const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");

btnFinalizarCompra.addEventListener("click", finalizarCompra);

function finalizarCompra() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Tu compra ha sido realizada",
    showConfirmButton: false,
    timer: 1500,
  });

  vaciarCarrito();
}


obtenerCarritoGuardado()