export class ProducsTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  async fetchData() {
    const req = await fetch("http://localhost:4200/products");
    const res = await req.json();
    const products = res.products;
    return products;
  }

  async keys() {
    const data = await this.fetchData();
    const renderHeaders = /*html*/ `
        <tr class="container__tr">
          ${Object.keys(data[0])
            .map((key) => /*html*/ `<th class="container__th">${key}</th>`)
            .join("")}
        </tr>
      `;

    return `${renderHeaders}`;
  }

  async content() {
    const data = await this.fetchData();
    const toRender = data
      .map(
        (element) =>
          /*html*/ `<tr class="container__tr">${Object.values(element)
            .map(
              (element) => /*html*/ `<td class="container__td">${element}</td>`
            )
            .join("")}</tr>`
      )
      .join("");
    return `${toRender}`;
  }

  async render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${this.styles()}</style>
        <div class='container'>
          <table class="container__table">
            <thead class="container__thead">
              ${await this.keys()}
            </thead>
            <tbody class="container__tbody">
              ${await this.content()}
            </tbody>
      </table>
        </div>
    `;
  }
  styles() {
    return /*css*/ `
        .container{
          font-family:sans serif;
          background-color:var(--lt-color-gray-700);
        }
        .container__table{
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        .container__td, .container__th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .container__th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #21438f;
          color: white;
        }
        .container__table tr:hover {background-color: var(--lt-color-gray-600)}
    `;
  }
}

customElements.define("products-table", ProducsTable);
