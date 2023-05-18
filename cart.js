let productInCart = localStorage.getItem("product-in-cart");  //lấy giá trị được lưu trong LS
productInCart = JSON.parse(productInCart); //đổi chuỗi thành đối tượng JS

const containerEmptyCart = document.querySelector("#empty-cart");  
const containerProductCart = document.querySelector("#cart-product");
const containerActionsCart = document.querySelector("#cart-actions");
const containerShoppingCart = document.querySelector("#shopping-cart");
let removeButton = document.querySelectorAll(".cart-product-remove");
const emptyButton = document.querySelector("#cart-action-empty");
const containerTotal = document.querySelector("#total");
const buyButton = document.querySelector("#cart-action-buy");


function loadProductCart() {
    if (productInCart && productInCart.length > 0) {  // kiểm tra xem có sản phẩm trong giỏ hàng chưa

        //nếu có sản phẩm trong giỏ hàng thì hàm tiếp tục bằng cách thay đổi thuộc tính CSS của các phần tử trên trang để hiển thị giỏ hàng 
        //rồi xóa nội dung của phần tử chứa sản phẩm hiện tại trong giỏ hàng để chuẩn bị hiển thị các sản phẩm mới 

        containerEmptyCart.classList.add("disabled");  
        containerProductCart.classList.remove("disabled");
        containerActionsCart.classList.remove("disabled");
        containerShoppingCart.classList.add("disabled");
    
        // vòng lặp để thêm các sản phẩm

        containerProductCart.innerHTML = "";
    
        productInCart.forEach(product => {
    
            const div = document.createElement("div");
            div.classList.add("cart-products");
            div.innerHTML = `
                <img class="cart-product-image" src="${product.image}" alt="${product.title}">
                <div class="cart-product-title">
                    <small>Title</small>
                    <h3>${product.title}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Quantity</small>
                    <p>${product.quantity}</p>
                </div>
                <div class="cart-product-price">
                    <small>Price</small>
                    <p>$${product.price}</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Subtotal</small>
                    <p>$${product.price * product.quantity}</p>
                </div>
                <button class="cart-product-remove" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            containerProductCart.prepend(div);  //lưu id containerProductCart vào div
        })
    
    updateProductRemove();
    updateTotal();
	
    } else {
        containerEmptyCart.classList.remove("disabled");
        containerProductCart.classList.add("disabled");
        containerActionsCart.classList.add("disabled");
        containerShoppingCart.classList.add("disabled");
    }

}

loadProductCart();

function updateProductRemove() {
    removeButton = document.querySelectorAll(".cart-product-remove");

    removeButton.forEach(button => {
        button.addEventListener("click", removeCart);
    });
}

function removeCart(e) {
    Toastify({
        text: "Product Removed",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #e96d08c3, #fff33)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem' 
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idButton = e.currentTarget.id;
    const index = productInCart.findIndex(product => product.id === idButton);
    
    productInCart.splice(index, 1);
    loadProductCart();

    localStorage.setItem("product-in-cart", JSON.stringify(productInCart));  // chuyển object sang json

}

emptyButton.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        html: `You will detele ${productInCart.reduce((acc, product) => acc + product.quantity, 0)} products.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No!!'
    }).then((result) => {
        if (result.isConfirmed) {
            productInCart.length = 0;
            localStorage.setItem("product-in-cart", JSON.stringify(productInCart));
            loadProductCart();
        }
      })
}


function updateTotal() {
    const totalCart = productInCart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    total.innerText = `$${totalCart}`;
}

buyButton.addEventListener("click", buyCart);
function buyCart() {

    productInCart.length = 0;
    localStorage.setItem("product-in-cart", JSON.stringify(productInCart));
    
    containerEmptyCart.classList.add("disabled");
    containerProductCart.classList.add("disabled");
    containerActionsCart.classList.add("disabled");
    containerShoppingCart.classList.remove("disabled");

}
