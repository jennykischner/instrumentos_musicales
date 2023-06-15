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

const tarjetasViolin = [
  {
    Id: 1,
    imagen: "../img/violin_1.jpg",
    titulo: "CREMONA SV-175 4/4",
    descripcion: `Cremona Violin Outfit 4/4 Accesorios de ébano - Cremona VP-203 Puente de arce envejecido de 3 estrellas. `,
    precio: "$193516",
  },
  {
    Id: 2,
    imagen: "../img/violin_2.jpg",
    titulo: "CREMONA SV-75 4/4",
    descripcion: `Cremona Violin Outfit 4/4 Forma estándar: madera dura ebonizada fácil de afinar. Estuche: Interior con forro de felpa.`,
    precio: "$99699",
  },
  {
    Id: 3,
    imagen: "../img/violin_3.jpg",
    titulo: "STAGG EVN44BK",
    descripcion: `Violin Electrico - Incluye Auriculares y Estuche - Color Negro. Incluye Auriculares y Estuche. `,
    precio: "$130787",
  },
  {
    Id: 4,
    imagen: "../img/violin_4.jpg",
    titulo: "CERVINI HV-100",
    descripcion: `Violín De Estudio, 4/4, Tapa Pícea, Cuerpo Arce, Diapasón Ma. Mentonera de Madera, Puente de Arce. `,
    precio: "$52163",
  },
  {
    Id: 5,
    imagen: "../img/violin_5.jpg",
    titulo: "YIRELLY CV 103 4/4 HP",
    descripcion: `Acústico 4/4, tapa de pino spruce sólido, fondo y aros de maple, lustre brillante, incluye estuche, arco y resina. `,
    precio: "$57204",
  },
  {
    Id: 6,
    imagen: "../img/violin_6.jpg",
    titulo: "YIRELLY CV 101 4/4",
    descripcion: `Violín Acústico 4/4, tapa plywood, fondo y aros plywood, lustre satinado, con estuche, arco y resina. `,
    precio: "$42724",
  },
  {
    Id: 7,
    imagen: "../img/violin_7.jpg",
    titulo: "KINGLOS HB-1312",
    descripcion: `Violin Acustico 4/4 de madera, diseño con craneos, instrumento musical personalizado. Incluye estuche semi-rigido y arco.`,
    precio: "$96002",
  },
  {
    Id: 8,
    imagen: "../img/violin_8.jpg",
    titulo: "KINGLOS YZ-1201 4/4",
    descripcion: `Violin Acustico 4/4 de madera, diseño flores, instrumento musical personalizado. Incluye estuche semi-rigido y arco.`,
    precio: "$90179",
  },
  {
    Id: 9,
    imagen: "../img/violin_9.jpg",
    titulo: "STRADELLA MV141944",
    descripcion: ` 4/4. Tapa pino seleccionado Fully Carved, fondo maple fully carved. Clavijas, cordal y mentonera de ébano. 4 afinadores.`,
    precio: "$261880",
  },
  {
    Id: 10,
    imagen: "../img/violin_10.jpg",
    titulo: "KINGLOS DSZA-1201 INTERMEDIO A 4/4 ",
    descripcion: `Eléctrico 4/4 intermedio A. Diseño de pintura especial en todo el instrumento. Sistema de micrófono activo con control de tono y volumen.`,
    precio: "$150125",
  },
  {
    Id: 11,
    imagen: "../img/violin_11.jpg",
    titulo: "KINGLOS PJB-1002 BEGINEER 4/4",
    descripcion: `Textura de arce: piel de tigre transparente, pintura artística, ensamblaje de alto nivel, mano de obra exquisita. Incluye Estuche y resina. `,
    precio: "$53125",
  },
  {
    Id: 12,
    imagen: "../img/violin_12.jpg",
    titulo: "PARQUER VIOLIN MASTER ",
    descripcion: `4/4. Hermoso violín de estudio avanzado para niveles intermedios. Su madera es conservada 10 años. Sistema de micrófono. Incluye Estuche y resina. `,
    precio: "$70308",
  },
];

function mostrarProductos() {
  const container = document.getElementById("productosContainer");
  let html = "";

  tarjetasViolin.forEach((producto) => {
    html += `
        <div class="card">
          <img src="${producto.imagen}" alt="${producto.titulo}">
          <h3>${producto.titulo}</h3>
          <p>${producto.descripcion}</p>
          <p>Precio: ${producto.precio}</p>
          <button class="comprar-btn" onclick="agregarAlCarrito(${producto.Id})">Comprar</button>
        </div>
      `;
  });

  container.innerHTML = html;
}

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

// Función para agregar productos al carrito

function agregarAlCarrito(productoId) {
  const producto = tarjetasViolin.find((p) => p.Id === productoId);
  if (producto) {
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

mostrarProductos();
obtenerCarritoGuardado();