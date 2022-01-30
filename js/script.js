let dishes = null,
  drinks = null,
  desserts = null,
  totalSum = null;

function fillOrderVariables(e, foodOption) {
  if (foodOption === "dishes") {
    dishes = e;
  } else if (foodOption === "drinks") {
    drinks = e;
  } else {
    desserts = e;
  }
}

function checkIfOrdersAreMarked() {
  if (dishes && drinks && desserts) {
    const btn = document.querySelector(".btn");
    btn.classList.remove("disabled");
    btn.removeAttribute("disabled");
    btn.innerText = "Fechar pedido";
  }
}

function takeOrders(e, foodOption) {
  const section = document.querySelector(`[data-identifier="${foodOption}"]`);
  const selected = section.querySelector(".checked");

  if (selected !== null) {
    selected.classList.remove("checked");
  }

  e.classList.add("checked");

  fillOrderVariables(e, foodOption);
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
        price.innerText = dishes
          .querySelector(".value")
          .innerText.split(" ")[1];
      } else if (index === 1) {
        title.innerText = drinks.querySelector(".title").innerText;
        price.innerText = drinks
          .querySelector(".value")
          .innerText.split(" ")[1];
      } else {
        title.innerText = desserts.querySelector(".title").innerText;
        price.innerText = desserts
          .querySelector(".value")
          .innerText.split(" ")[1];
      }

      total += parseFloat(price.innerText.replace(",", "."));
    });

    totalSum = total.toFixed(2);
    sum.innerText = total.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    modal.classList.add("show");
  }
}

function sendOrderToWhatsapp() {
  const nome = prompt("Qual é o seu nome?");
  const endereco = prompt("Qual é o seu endereço?");
  let msg = `Olá, gostaria de fazer o pedido:\n- Prato: ${dishes.children[1].innerText}\n- Bebida: ${drinks.children[1].innerText}\n- Sobremesa: ${desserts.children[1].innerText}\nTotal: R$ ${totalSum}\n\nNome: ${nome}\nEndereço: ${endereco}\n
  `;

  msg = window.encodeURIComponent(msg);

  window.open(`https://wa.me/5584981018236?text=${msg}`, "_blank");
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("show");
}
