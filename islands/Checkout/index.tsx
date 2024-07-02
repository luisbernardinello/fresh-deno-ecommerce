import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import {useEffect, useState} from "preact/hooks";

function CheckoutFields() {

    const [checkoutData, setCheckoutData] = useState(
        {
            lname:"",
            adress:"",
            city:"",
            state:"",
            zipcode:"",

        },
    );

    const handleCreateOrder = async()=>{
        try {
            const cartProducts = JSON.parse(
                localStorage.getItem("cartProducts") || "[]",
            );
            const totalPrice = JSON.parse(
                localStorage.getItem("totalProducts") || "0",
            );
            const resp = await axiod.post('/api/orders/create', {
                userDetails: checkoutData,
                userProducts: cartProducts ? cartProducts : [],
                totalOrderCount: cartProducts.length,
                totalPrice: totalPrice
            })
            if(resp.status === 201){
                localStorage.clear();
                alert("Order created sucessfully");
                window.location.href= "/"; 
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <>
        <h1 class="text-2xl font-bold mb-6">Checkout</h1>

        <div class="mb-4">
          <h2 class="text-lg font-medium">Delivery Information</h2>
          <div class="mt-2 px-4">
            <label class="block text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              id="last_name"
              class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              value={checkoutData.lname}
              onChange={(e:any)=>
                setCheckoutData({...checkoutData, lname: e.target.value})
              }
            />

            <div class="mt-4">
              <label htmlFor="address" class="block text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                value={checkoutData.adress}
                onChange={(e:any)=>
                    setCheckoutData({...checkoutData, adress: e.target.value})
                  }
              />
            </div>

            <div class="mt-4">
              <label htmlFor="city" class="block text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                value={checkoutData.city}
                onChange={(e:any)=>
                    setCheckoutData({...checkoutData, city: e.target.value})
                  }
              />
            </div>

            <div class="mt-4">
              <label htmlFor="state" class="block text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                id="state"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                value={checkoutData.state}
                onChange={(e:any)=>
                    setCheckoutData({...checkoutData, state: e.target.value})
                  }
              />
            </div>

            <div class="mt-4">
              <label htmlFor="zip" class="block text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                value={checkoutData.zipcode}
                onChange={(e:any)=>
                    setCheckoutData({...checkoutData, zipcode: e.target.value})
                  }
              />
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="button"
            onClick={handleCreateOrder}
            class="w-full bg-blue-600 text-white py-3 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Place Order
          </button>
        </div>
      </>
    );
}

export default CheckoutFields