const DEFAULT_TITULO = "Letrero UCR";
const DEFAULT_FILAS  = [];
const DEFAULT_LOGO   = "";

class UcrLetrero extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.titulo = this.getAttribute("titulo") ?? DEFAULT_TITULO;
    this.filas  = this.getAttribute("filas")?.split("|").map(f => f.trim()).filter(Boolean) ?? DEFAULT_FILAS;
    this.logo   = this.getAttribute("logo") ?? DEFAULT_LOGO;
    this.render();
  }

  #buildFilas() {
    return this.filas.map((texto, i) => /* html */`
      <div class="fila" style="animation-delay: ${0.2 + i * 0.2}s">
        <p>${texto}</p>
        <span class="flecha">→</span>
      </div>
    `).join("");
  }

  render() {
    this.setHTMLUnsafe(/* html */`
      <style>
        @scope {
          ucr-letrero {
            display: block;
          }

          .cartel {
            display: grid;
            grid-template-rows: repeat(auto-fill, 1fr) 80px;
            width: 340px;
            background: #1e3a6e;
            border: 3px solid #8a9bb5;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            animation: entrada 0.8s ease both;
          }

          @keyframes entrada {
            from { opacity: 0; transform: translateY(-30px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          @keyframes aparecer {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .fila {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            border-bottom: 1px solid #3a5a9e;
            gap: 1rem;
            min-height: 60px;
            opacity: 0;
            animation: aparecer 0.5s ease forwards;
            transition: background 0.3s;
          }

          .fila:hover {
            background: #2a4a8e;
            cursor: pointer;
          }

          .fila:hover .flecha {
            transform: translateX(6px);
          }

          .fila p {
            color: #d0dff0;
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.3;
          }

          .flecha {
            color: #a0b8d8;
            font-size: 1.4rem;
            flex-shrink: 0;
            transition: transform 0.3s;
          }

          .pie {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #e4e1d8;
            border-top: 3px solid #8a9bb5;
            opacity: 0;
            animation: aparecer 0.5s ease forwards;
            animation-delay: ${0.2 + this.filas.length * 0.2}s;
          }

          .pie img {
            height: 90px;
            padding: 6px;
          }
        }
      </style>

      <div class="cartel">
        ${this.#buildFilas()}
        <div class="pie">
          <img src="${this.logo}" alt="${this.titulo}">
        </div>
      </div>
    `);
  }
}

customElements.define("ucr-letrero", UcrLetrero);