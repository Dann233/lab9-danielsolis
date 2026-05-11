const DEFAULT_TITULO  = "¡La sede te acompaña!";
const DEFAULT_MENSAJE = "";
const DEFAULT_QR      = "";
const DEFAULT_FOTO1   = "";
const DEFAULT_FOTO2   = "";
const DEFAULT_LOGO    = "";
const DEFAULT_SEDE    = "Sede de Guanacaste";

class UcrAcoso extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    // Se leen atributos y se guardan como propiedades JS
    this.titulo  = this.getAttribute("titulo")  ?? DEFAULT_TITULO;
    this.mensaje = this.getAttribute("mensaje") ?? DEFAULT_MENSAJE;
    this.qr      = this.getAttribute("qr")      ?? DEFAULT_QR;
    this.foto1   = this.getAttribute("foto1")   ?? DEFAULT_FOTO1;
    this.foto2   = this.getAttribute("foto2")   ?? DEFAULT_FOTO2;
    this.logo    = this.getAttribute("logo")    ?? DEFAULT_LOGO;
    this.sede    = this.getAttribute("sede")    ?? DEFAULT_SEDE;
    this.render();
  }

  #parseTitulo() {
    // Formato esperado: "¡La sede te acompaña!"
    // Separa la primera parte (blanco) y el resto (morado)
    const partes = this.titulo.replace(/^¡/, "").replace(/!$/, "").split(" ");
    const mitad = Math.ceil(partes.length / 2);
    const linea1 = "¡" + partes.slice(0, mitad).join(" ");
    const palabras = partes.slice(mitad);
    const te = palabras.shift() ?? "";
    const resto = palabras.join(" ") + "!";
    return { linea1, te, resto };
  }

  render() {
    const { linea1, te, resto } = this.#parseTitulo();

    this.setHTMLUnsafe(/* html */`
      <style>
        @scope {
          ucr-acoso {
            display: block;
          }

          .cartel {
            display: grid;
            grid-template-rows: auto auto auto auto auto;
            width: 380px;
            background: #c8a84b;
            border: 4px solid #555;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
            animation: entrada 0.8s ease both;
          }

          @keyframes entrada {
            from { opacity: 0; transform: translateY(-30px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          @keyframes aparecer {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .titulo {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 24px 12px 24px;
            gap: 6px;
            opacity: 0;
            animation: aparecer 0.5s ease forwards;
            animation-delay: 0.3s;
          }

          .titulo .linea1 {
            background: white;
            color: #7b3fa0;
            font-size: 1.6rem;
            font-weight: 900;
            padding: 2px 10px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .titulo .linea2 {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
          }

          .titulo .linea2 .te {
            background: #7b3fa0;
            color: white;
            font-size: 1.6rem;
            font-weight: 900;
            padding: 2px 10px;
            text-transform: uppercase;
          }

          .titulo .linea2 .acompana {
            color: #7b3fa0;
            font-size: 1.9rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          }

          .mensaje {
            padding: 16px 24px;
            text-align: center;
            opacity: 0;
            animation: aparecer 0.5s ease forwards;
            animation-delay: 0.6s;
          }

          .mensaje p {
            color: #7b3fa0;
            font-size: 1.15rem;
            font-weight: 700;
            line-height: 1.5;
          }

          .qr {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            padding: 8px 24px 16px 24px;
            opacity: 0;
            animation: aparecer 0.5s ease forwards;
            animation-delay: 0.9s;
          }

          .qr p {
            font-size: 0.7rem;
            color: #555;
            text-align: center;
          }

          .qr img {
            width: 80px;
            height: 80px;
            object-fit: contain;
          }

          .fotos {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: flex-end;
            opacity: 0;
            animation: aparecer 0.5s ease forwards;
            animation-delay: 1.1s;
          }

          .fotos img {
            width: 48%;
            object-fit: cover;
            object-position: top;
            display: block;
          }

          .logos {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            background: white;
            padding: 12px 20px;
            gap: 1rem;
            opacity: 0;
            animation: aparecer 0.5s ease forwards;
            animation-delay: 1.3s;
          }

          .logos img {
            height: 80px;
            object-fit: contain;
          }

          .logos .separador {
            width: 1px;
            height: 40px;
            background: #ccc;
          }

          .logos .sede-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          }

          .logos .sede-info .sg {
            font-size: 1.4rem;
            font-weight: 900;
            color: #333;
          }

          .logos .sede-info span {
            font-size: 0.6rem;
            color: #555;
            text-align: center;
          }
        }
      </style>

      <div class="cartel">

        <div class="titulo">
          <span class="linea1">${linea1}</span>
          <div class="linea2">
            <span class="te">${te}</span>
            <span class="acompana">${resto}</span>
          </div>
        </div>

        <div class="mensaje">
          <p>${this.mensaje}</p>
        </div>

        <div class="qr">
          <p>Si necesitas ayuda, escanea este QR</p>
          <img src="${this.qr}" alt="Código QR">
        </div>

        <div class="fotos">
          <img src="${this.foto1}" alt="Estudiante 1">
          <img src="${this.foto2}" alt="Estudiante 2">
        </div>

        <div class="logos">
          <img src="${this.logo}" alt="UCR">
          <div class="separador"></div>
          <div class="sede-info">
            <span class="sg">SG</span>
            <span>${this.sede}</span>
          </div>
        </div>

      </div>
    `);
  }
}

customElements.define("ucr-acoso", UcrAcoso);