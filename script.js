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

function makeOrder() {
  const modal = document.querySelector(".modal");
  const modalItems = modal.querySelectorAll(".modal__item");

  if (dishes && drinks && desserts) {
    let sum = modal.querySelector(".modal__sum .modal__item-price");
    let total = 0;

    modalItems.forEach((modalItem, index) => {
      let title = modalItem.querySelector(".modal__item-title");
      let price = modalItem.querySelector(".modal__item-price");
  
      if (index === 0) {
        title.innerText = dishes.querySelector(".title").innerText;
        price.innerText = dishes.querySelector(".value").innerText;
      } else if (index === 1) {
        title.innerText = drinks.querySelector(".title").innerText;
        price.innerText = drinks.querySelector(".value").innerText;
      } else {
        title.innerText = desserts.querySelector(".title").innerText;
        price.innerText = desserts.querySelector(".value").innerText;
      }

      total += parseFloat(price.innerText.split(" ")[1].replace(",", "."));
    });

    total = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    sum.innerText = total;
  
    modal.classList.add("show");
  }
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("show");
}
