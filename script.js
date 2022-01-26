let dishes, drinks, desserts;

function fillOrderVariables(attribute, e) {
  if (attribute === 'dishes') {
    dishes = e;
  } else if (attribute === 'drinks') {
    drinks = e;
  } else {
    desserts = e;
  }
}

function checkIfOrdersAreMarked() {
  if (dishes && drinks && desserts) {
    const btn = document.querySelector(".btn");
    btn.classList.remove("disabled");
    btn.innerText = "Fazer pedido";
  }
}

function takeOrders(e) {
  const attribute = e.parentElement.getAttribute("data-identifier");

  const section = document.querySelector(`[data-identifier="${attribute}"]`);  
  const foods = section.querySelectorAll('[data-identifier="food-option"]');

  foods.forEach(food => {
      food.classList.remove("checked");
  });

  e.classList.add("checked");

  fillOrderVariables(attribute, e);
  checkIfOrdersAreMarked();
}

