"use strict";
let btnsAddBasket = document.querySelectorAll('.card_btn');
let basketCount = document.querySelector('.basket_count');
let basketTotal = document.querySelector(".basket_list");
let basketTotalEl = document.querySelector('.basketTotal');
let openBasketBtn = document.getElementById("basket");
// let nameProd = document.getElementById("nameProd");
// let countProd =document.getElementById("countProd");
// let costProd =document.getElementById("costProd");
// let summProd =document.getElementById("summProd");
let summProds =document.getElementById("summProds");
let basket = {};

openBasketBtn.addEventListener('click', function () {
  basketTotal.classList.toggle('hidden');
});
/**
 * Метод добавляет продукт в объект basket.
 * @param {number} productId
 */
function addProductToObject(productId, product) {
  if (!(productId in basket)) {
    basket[productId] = 1;
    console.log(basket);
    console.log(product);
    } else {
    basket[productId]++;
  }
}

btnsAddBasket.forEach(function (btn){
  btn.addEventListener("click", function (event){
    // event.target.style.background = "red";
    let product = event.currentTarget.parentNode.parentNode;
    let productId = product.getAttribute('data-id');
    addProductIntoBasket(productId, product);
  })
})
/**
 * Эта функция срабатывает когда добавляют новый товар в корзину.
 * @param {number} productId
 */
function addProductIntoBasket(productId, product) {
  increaseProductsCount();
  addProductToObject(productId, product);
  renderProductInBasket(productId, product);
  calculateAndRenderTotalBasketSum(productId, product);
  // renderNewProductInBasket(productId, product);
}
/**
 * Функция увеличивает счетчик количества товаров рядом с иконкой корзины.
 */
function increaseProductsCount() {
  basketCount.textContent++;
}
/**
 * Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
 */
function calculateAndRenderTotalBasketSum(productId, product) {
  let price = +product.querySelector(".priceProd").textContent;
  let totalSum = 0;
  for (let productId in basket) {
    totalSum += basket[productId] * price;
  }
  summProds.textContent = totalSum.toFixed(2);
}

/**
 * Функция срабатывает когда нужно отрисовать продукт в корзине.
 * @param {number} productId
 */
function renderProductInBasket(productId,product) {
  let productExist = document.querySelector(`.productCount[data-id="${productId}"]`);
  if (productExist) {
    increaseProductCount(productId, product);
    recalculateSumForProduct(productId, product);
  } else {
    renderNewProductInBasket(productId,product);
  }
}

/**
 * Функция отрисовывает новый товар в корзине.
 * @param {number} productId
 */
function renderNewProductInBasket(productId, product) {
  let name = product.querySelector(".heading3").textContent;
  let price = +product.querySelector(".priceProd").textContent;
  let productRow = `
        <div class="basketRow">
            <div>${name}</div>
            <div>
                <span class="productCount" data-id="${productId}">1</span> шт.
            </div>
            <div>$${price}</div>
            <div>
                $<span class="productTotalRow" data-id="${productId}">${price}</span>
            </div>
        </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

/**
 * Функция увеличивает количество товаров в строке в корзине.
 * @param {number} productId
 */
function increaseProductCount(productId) {
  let productCountEl = document.querySelector(`.productCount[data-id="${productId}"]`);
  productCountEl.textContent++;
}

/**
 * Функция пересчитывает стоимость товара умноженное на количество товара
 * в корзине.
 * @param {number} productId
 */
function recalculateSumForProduct(productId, product) {
  let price = +product.querySelector(".priceProd").textContent;
  let productTotalRowEl = document.querySelector(`.productTotalRow[data-id="${productId}"]`);
  let totalPriceForRow = (basket[productId] * price).toFixed(2);
  productTotalRowEl.textContent = totalPriceForRow;
}
