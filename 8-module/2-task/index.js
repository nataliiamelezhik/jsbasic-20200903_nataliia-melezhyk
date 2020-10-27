import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    
    this.elem = this.createCard(this.products);
  }

  createCard(product){

    const productGrid = document.createElement('div');
    productGrid.className = 'products-grid';

    const cardList = document.createElement('div');
    cardList.className = 'products-grid__inner';
    product.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';

      const topCard = document.createElement('div');
      topCard.className = 'card__top';

      const cardImg = document.createElement('img');
      cardImg.className = 'card__image';
      cardImg.setAttribute('alt', 'product');
      const srcImg = '/assets/images/products/' + product.image;
      cardImg.setAttribute('src', srcImg);
      topCard.append(cardImg);

      const price = document.createElement('span');
      price.className = 'card__price';
      const priceValue = '€' + product.price.toFixed(2);
      price.append(priceValue);
      topCard.append(price);
      card.append(topCard);

      const cardBody = document.createElement('div');
      cardBody.className = 'card__body';

      const cardTitle = document.createElement('div');
      cardTitle.className = 'card__title';
      cardTitle.innerHTML = product.name;
      cardBody.append(cardTitle);

      const cardButton = document.createElement('button');
      cardButton.className = 'card__button';
      cardButton.setAttribute('type', 'button');
      cardButton.addEventListener('product-add', function(event){})
      cardButton.addEventListener('click', function(event){
        cardButton.dispatchEvent(new CustomEvent("product-add", {
          "detail" : product.id,
          "bubbles" : true
        }))
        event.stopPropagation();
      })

      const imgButton = document.createElement('img');
      imgButton.setAttribute('alt', 'icon');
      imgButton.setAttribute('src', '/assets/images/icons/plus-icon.svg');
      cardButton.append(imgButton);
      cardBody.append(cardButton);
      card.append(cardBody);
      cardList.append(card);
    });
    productGrid.append(cardList);
    return productGrid;
  }

  updateFilter(filters){
    console.log(filters);
    let allProducts = this.products;
    let resultFilters = this.products.filter(function(item){
      if(filters.noNuts === false) return allProducts;
      else return item.nuts === true;
    })
    let isEmptyProducts = this.isEmptyProduct(resultFilters);

    if(!isEmptyProducts){
      const productGrid = document.querySelector('.products-grid');
      productGrid.remove();
      let result = this.createCard(resultFilters);
      const container = document.querySelector('#container');
      container.append(result);
    }
  }

  isEmptyProduct(obj){
    for(let key in obj){
      return false;
    }
  }
}
