export function validateNewProduct(input) {
  if (!input || typeof input !== "object") {
    return { error: "el input put tiene que ser un objeto" };
  }

  if(!input.item && !input.type && !input.price && input.unidad)

  if (!input.item) {
    return { error: "debes ingresar un item" };
  } else if (typeof input.item !== "string") {
    return { error: "item debe ser un string" };
  } else if (input.item.length < 3) {
    return { error: "item debe tener mas de 3 caracteres" };
  } else if (input.item.length > 30) {
    return { error: "item tiene mas de 30 caracteres" };
  }

  if (!input.type) {
    return { error: "debes ingresar un type" };
  } else if (typeof input.type !== "string") {
    return { error: "type debe ser un string" };
  } else if (input.type.length < 3) {
    return { error: "type debe tener mas de 3 caracteres" };
  } else if (input.type.length > 30) {
    return { error: "type debe tener menos de 30 caracteres" };
  }

  if (!input.price) {
    return { error: "debes ingresar un price" };
  } else if (typeof input.price !== "number") {
    return { error: "price debe ser un number" };
  } else if (Math.floor(Math.log10(input.price)) + 1 > 4) {
    return { error: "price debe tener menos de 4 caracteres" };
  }

  if (!input.unidad) {
    return { error: "debes ingresas un unidad" };
  } else if (typeof input.unidad !== "string") {
    return { error: "unidad debe ser un string" };
  } else if (input.unidad.length < 3) {
    return { error: "unidad debe tener mas de 3 caracteres" };
  } else if (input.unidad.length > 30) {
    return { error: "unidad debe tener menos de 30 caracteres" };
  }
}

export function validateUpdateProduct(input) {
  if (
    !input.hasOwnProperty("item") ||
    !input.hasOwnProperty("type") ||
    !input.hasOwnProperty("price") ||
    !input.hasOwnProperty("unidad")
  ) {
    return { error: "ingresaste datos no valido" };
  }

  if (typeof input.item !== "string") {
    return { error: "item debe ser un string" };
  } else if (input.item < 3) {
    return { error: "type debe tener mas de 3 caracteres" };
  } else if (input.unidad.length > 30) {
    return { error: "unidad debe tener menos de 30 caracteres" };
  }

  if (typeof input.type !== "string") {
    return { error: "type debe ser un string" };
  } else if (input.type.length < 3) {
    return { error: "type debe tener mas de 3 caracteres" };
  } else if (input.type.length > 30) {
    return { error: "type debe tener menos de 30 caracteres" };
  }

  if (typeof input.price !== "number") {
    return { error: "price debe ser un number" };
  } else if (Math.floor(Math.log10(input.price)) + 1 > 4) {
    return { error: "price debe tener menos de 4 caracteres" };
  }
}
