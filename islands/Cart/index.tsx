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
        const updateCartProducts = cartProducts.filter((p: any) => p.id !== productId);
        setCartProducts(updateCartProducts);
        localStorage.setItem("cartProducts", JSON.stringify(updateCartProducts));
    };

    const calculateTotalPrice = () => {
        const total = cartProducts.reduce((acc, product: any) => acc + parseFloat(product.price), 0);
        setTotal(total);
        localStorage.setItem("totalPrice", JSON.stringify(total));
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [cartProducts]);

    return (
        <>
            <div class="mt-8 pb-24"> {/* Added padding-bottom to avoid overlap */}
                <div class="flow-root">
                    <ul role="list" class="my-6">
                        {cartProducts && cartProducts.length > 0 && cartProducts.map((product: any) => (
                            <li class="flex py-6 border-b border-gray-400 px-0" key={product.id}>
                                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                        class="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div class="ml-4 flex flex-1 flex-col">
                                    <div class="flex justify-between text-base font-medium text-gray-400">
                                        <h3>
                                            <a>{product.title}</a>
                                        </h3>
                                        <p class="ml-4">${product.price}</p>
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500">
                                        {product.category}
                                    </p>
                                    <div class="flex flex-1 items-end justify-between text-sm">
                                        <p class="text-gray-400 -mt-2">Qty 1</p>
                                        <div class="flex">
                                            <button
                                                type="button"
                                                class="font-medium text-white hover:text-red-700"
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
                {/* Bottom bar */}
                <div class="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-400">
                        <p>Subtotal</p>
                        <p>${total}</p>
                    </div>
                    <div class="mt-6">
                        <a
                            href="/checkout"
                            class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700"
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
