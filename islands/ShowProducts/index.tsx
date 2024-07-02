import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts"
import { useState, useEffect } from "preact/hooks";

function ShowProducts() {
    const [products, setProducts] = useState([]);
    const getProducts = async() =>{
        try {

            const response = await axiod.get('https://jsonplaceholder.typicode.com/photos');
            const updateProducts = response.data.map((product: any)=> ({
                ...product,
                price: (Math.random() * 100).toFixed(2), //random price
                category: 'Category ' + (Math.floor(Math.random() * 5) + 1)
            }));
            setProducts(updateProducts)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getProducts();
    },[])

    const handleBuyNow = (selectedProduct: any) => {
        const existingProduct = JSON.parse(localStorage.getItem("cartProducts") || "[]")
        const isProductAdded = existingProduct.find((p:any) => p.id === selectedProduct.id)
        if(isProductAdded) {
            alert("Product is already added in the cart");

        } else {
            const newProduct = [...existingProduct, selectedProduct]
            localStorage.setItem("cartProducts", JSON.stringify(newProduct))
            alert("Product added sucessfully in the cart")
        }

    
    }

    return (
        <>
        <div class="flex gap-3 items-center justify-center flex-wrap">
        {
            products && products.slice(0,20).map((product:any)=>{
                return (
                  <>
                    <div key={product.id} className="card bg-base-100 w-96 shadow-xl my-12 mx-4">
                      <figure>
                        <img
                          src={product.url}
                          alt="Shoes"
                          width={350}
                          height={350}
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">
                          Shoes!
                          <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>{product.title}</p>
                        <div className="card-actions justify-end">
                          <div className="badge badge-outline">{product.category}</div>
                        </div>
                        <div className="card-actions justify-start mt-4">
                            <span class="font-medium text-sm">Price:</span> <p class="text-sm">${product.price}</p>
                        </div>
                        <div className="card-actions justify-end mt-4">
                          <button className="btn btn-primary" onClick={()=>handleBuyNow(product)}>Buy Now</button>
                        </div>
                      </div>
                    </div>
                  </>
                );
            })
        }
        </div>
        </>
    )
}

export default ShowProducts