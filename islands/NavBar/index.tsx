import { useEffect, useState } from "preact/hooks";
import Cart from "../Cart/index.tsx";
import { ProfileIcon } from "../../components/SVGs.tsx";

function NavBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [cartProductsLength, setCartProductsLength] = useState(0);

  const sideBarStyles = {
    width: "370px",
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    backgroundColor: "gray",
    zIndex: 999,
    padding: "1rem",
    transform: showSidebar ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflowY: "auto" // Adicionado para permitir a rolagem
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const cartProducts = JSON.parse(
        localStorage.getItem("cartProducts") || "[]"
      );
      setCartProductsLength(cartProducts.length);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 border-gray-600 border-b">
        <div style={sideBarStyles}>
          <p className="p-4 border-b border-gray-600 w-screen mb-3">
            Cart({cartProductsLength})
          </p>
          <div style={{ width: "100%" }}> {/* Adicionado para ajustar a largura do conteúdo interno */}
            <Cart />
          </div>
        </div>
        <div className="flex-1 items-center">
          <a className="btn btn-ghost text-xl">
            The King in The North E-Commerce
          </a>
          <div>
            <a href="/products" className="ml-6 mt-4">
              Products
            </a>
          </div>
        </div>
        <div className="flex-none">
          <div
            onClick={() => setShowSidebar(true)}
            className="dropdown dropdown-end"
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartProductsLength}
                </span>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <ProfileIcon />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
        ></div>
      )}
    </>
  );
}

export default NavBar;
