import { useEffect, useState } from "preact/hooks";
import ProductsPage from "../../routes/products/index.tsx";

function index() {
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const cartProducts = JSON.parse(
        localStorage.getItem("cartProducts") || "[]"
      );
      setCartProducts(cartProducts);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const deleteCartItem = (productId: number) => {
    const updatedCartProducts = cartProducts.filter(
      (p: any) => p.id !== productId
    );
    setCartProducts(updatedCartProducts);
    localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
  };

  const calculateTotalPrice = () => {
    const total = cartProducts.reduce(
      (acc, product: any) => acc + parseFloat(product.price),
      0
    );
    setTotal(total);
    localStorage.setItem("totalPrice", JSON.stringify(total));
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartProducts]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <ul role="list" className="my-6">
            {cartProducts &&
              cartProducts.length > 0 &&
              cartProducts.map((product: any) => (
                <li
                  className="flex py-6 border-b border-gray-400 px-0"
                  key={product.id}
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>{product.title}</a>
                      </h3>
                      <p className="ml-4">${product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500 -mt-2">Qty 1</p>
                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:text-red-800"
                          onClick={() => deleteCartItem(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${total}</p>
          </div>
          <div className="mt-6">
            <a
              href="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
