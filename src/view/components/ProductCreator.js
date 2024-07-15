export class ProductCreator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${this.styles()}</style>
        <div class='container'>
            <div class='container__title'>
                <h2 class='container__h2'>Create a new product</h2>
            </div>
            <form id="form" >
              <div class="container__inputs">
                  <div class='container__name'>
                      <label for="new product">name</label>
                      <input type="text" id="name" class="container__input-text" autocomplete="off" placeholder="papa...">
                  </div>
                  <div class='container__type'>
                      <label for="type">type</label>
                      <input type="text" id="type" class="container__input-text" autocomplete="off" placeholder="verdura...">
                  </div>
                  <div class='container__price'>
                      <label for="type">price</label>
                      <input type="number" id="price" class="container__input-text container__input-text--number" autocomplete="off" placeholder="500...">
                  </div>
                  <div class='container__unidad'>
                      <label for="type">unidad</label>
                      <input type="text" id="unidad" class="container__input-text" autocomplete="off" placeholder="kilo">
                  </div>
                  <div class="container__sumit">
                      <button type="submit" id="button" class="container__input-button">crear</button>
                  </div>
              </div>
            </form>
        </div>
    `;
  }

  styles() {
    return /*css*/ `
        .container{
            width:400px;
            display:flex;
            flex-direction:column;
            align-items:center;
            gap:15px;
            padding:20px;
            border:1px solid gray;
            border-radius:5px;
            background:var(--lt-color-gray-700);
        }
        .container__h2{
            margin:10px;
        }
        .container__inputs{
            display:flex;
            flex-direction:column;
            gap:10px;
            width:300px
        }
        .container__input-text{
            width: 100%;
            padding: 8px 10px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            background:var(--lt-color-gray-800);
            color: #fff;
        }
        .container__input-text--number::-webkit-outer-spin-button,
        .container__input-text--number::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin:0;
        }
        .container__input-button{
            width:100%;
            padding:10px;
            color: #fff;
            border: none;
            border-radius:10px;
            background-color:#21438f;
            cursor:pointer;
        }
        .container__input-button:hover{
            background-color:#2b498b
        }
    `;
  }
}

customElements.define("product-creator", ProductCreator);
