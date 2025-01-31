import { useState, useRef, useEffect } from "react";
import { ScrollableProductCard } from "./chabot_product";
import { CancelOrderForm } from "./Cancel_order_form";
import { ReturnExchangeForm } from "./return_exchange_form";

const sampleProducts = {
  sarees: [
    {
      id: "s1",
      name: "Silk Saree",
      price: 5999,
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: "s2",
      name: "Cotton Saree",
      price: 1999,
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: "s3",
      name: "Designer Saree",
      price: 8999,
      images: ["/placeholder.svg?height=300&width=300"],
    },
  ],
  lehengas: [
    {
      id: "l1",
      name: "Bridal Lehenga",
      price: 15999,
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: "l2",
      name: "Party Wear Lehenga",
      price: 7999,
      images: ["/placeholder.svg?height=300&width=300"],
    },
  ],
  kurtis: [
    {
      id: "k1",
      name: "Casual Kurti",
      price: 799,
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: "k2",
      name: "Formal Kurti",
      price: 1299,
      images: ["/placeholder.svg?height=300&width=300"],
    },
  ],
  dresses: [
    {
      id: "d1",
      name: "Casual Dress",
      price: 1499,
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: "d2",
      name: "Party Dress",
      price: 2999,
      images: ["/placeholder.svg?height=300&width=300"],
    },
  ],
  tops: [
    {
      id: "t1",
      name: "Casual Top",
      price: 599,
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: "t2",
      name: "Formal Shirt",
      price: 999,
      images: ["/placeholder.svg?height=300&width=300"],
    },
  ],
};

const mainMenuOption = {
  id: "main-menu",
  text: "Back to Main Menu",
  response: "Sure, let's go back to the main menu. How else can I assist you?",
};

const chatOptions = [
  {
    id: "products",
    text: "View Products",
    response: "What type of clothing are you looking for?",
    nextOptions: [
      {
        id: "men",
        text: "Men Wear",
        response:
          "Our Men collection includes Coats, T-shirts, Jeans,Accessories. What would you like to see?",
        nextOptions: [
          {
            id: "coats",
            text: "Coats",
            response: "Here are some of our popular Coats:",
            products: sampleProducts.sarees,
          },
          {
            id: " tshirts",
            text: " T-shirts",
            response: "Check out our T-shirts collection:",
            products: sampleProducts.lehengas,
          },
          {
            id: "jeans",
            text: "Jeans",
            response: "Browse our Jeans designs:",
            products: sampleProducts.kurtis,
          },
          {
            id: "accessories",
            text: "Accessories",
            response: "Browse our Accessories designs:",
            products: sampleProducts.kurtis,
          },
          mainMenuOption,
        ],
      },
      {
        id: "women",
        text: "Women Wear",
        response: "Explore our western wear collection:",
        nextOptions: [
          {
            id: "dresses",
            text: "Dresses",
            response: "Here are some of our trendy dresses:",
            products: sampleProducts.dresses,
          },
          {
            id: "tops",
            text: "Tops & Shirts",
            response: "Check out our tops and shirts:",
            products: sampleProducts.tops,
          },
          {
            id: "kurties",
            text: "Kurties",
            response: "Check out our Kurties:",
            products: sampleProducts.tops,
          },
          {
            id: "jeans",
            text: "Jeans",
            response: "Browse our Jeans designs:",
            products: sampleProducts.kurtis,
          },
          mainMenuOption,
        ],
      },
      {
        id: "kids",
        text: "Kids",
        response: "Explore our western wear collection:",
        nextOptions: [
          {
            id: "dresses",
            text: "Dresses",
            response: "Here are some of our trendy dresses:",
            products: sampleProducts.dresses,
          },
          {
            id: "tops",
            text: "Tops & Shirts",
            response: "Check out our tops and shirts:",
            products: sampleProducts.tops,
          },
          {
            id: "shorts",
            text: "Shorts",
            response: "Check out our Shorts:",
            products: sampleProducts.tops,
          },
          {
            id: "jeans",
            text: "Jeans",
            response: "Browse our Jeans designs:",
            products: sampleProducts.kurtis,
          },
          mainMenuOption,
        ],
      },
      mainMenuOption,
    ],
  },
  {
    id: "sizes",
    text: "Size Guide",
    response: "What would you like to know about sizing?",
    nextOptions: [
      {
        id: "size-chart",
        text: "View Size Chart",
        response:
          "Our sizes range from XS to XXL. For detailed measurements, please visit our size guide page.",
      },
      {
        id: "custom",
        text: "Custom Sizing",
        response:
          "We offer custom sizing for select traditional wear. Please contact our support team for details.",
      },
      mainMenuOption,
    ],
  },

  {
    id: "shipping",
    text: "Shipping Info",
    response: "Choose your shipping query:",
    nextOptions: [
      {
        id: "delivery-time",
        text: "Delivery Time",
        response:
          "Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available for select locations.",
      },
      {
        id: "shipping-cost",
        text: "Shipping Cost",
        response:
          "Free shipping on orders above ₹999. Standard shipping costs ₹99 for orders below ₹999.",
      },
      mainMenuOption,
    ],
  },
  {
    id: "support",
    text: "Customer Support",
    response: "How can we help you?",
    nextOptions: [
      {
        id: "contact",
        text: "Contact Us",
        response:
          "You can reach us at support@adaajaipur.com or call us at 1800-123-4567.",
      },
      {
        id: "return",
        text: "Returns & Exchange",
        response: "Please fill out the form for returns and exchanges:",
        form: "return-exchange",
      },
      {
        id: "cancel-order",
        text: "Cancel Order",
        response: "Please fill out the form to cancel your order:",
        form: "cancel-order",
      },
      mainMenuOption,
    ],
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to ADAA Jaipur. How can I help you today?",
      sender: "bot",
      options: chatOptions,
    },
  ]);
  const [cart, setCart] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionClick = (option) => {
    const userMessage = {
      id: messages.length + 1,
      text: option.text,
      sender: "user",
    };

    let botMessage;

    if (option.id === "main-menu") {
      botMessage = {
        id: messages.length + 2,
        text: "Sure, let's go back to the main menu. How else can I assist you?",
        sender: "bot",
        options: chatOptions,
      };
    } else {
      botMessage = {
        id: messages.length + 2,
        text: option.response,
        sender: "bot",
        options: option.nextOptions,
        products: option.products,
        form: option.form,
      };
    }

    setMessages([...messages, userMessage, botMessage]);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    const botMessage = {
      id: messages.length + 1,
      text: `Great choice! I've added ${product.name} to your cart.`,
      sender: "bot",
      options: [
        {
          id: "view-cart",
          text: "View Cart",
          response: "Here's what's in your cart:",
        },
        {
          id: "continue-shopping",
          text: "Continue Shopping",
          response: "What else would you like to see?",
        },
      ],
    };

    setMessages([...messages, botMessage]);
  };

  const viewCart = () => {
    if (cart.length === 0) {
      const botMessage = {
        id: messages.length + 1,
        text: "Your cart is empty. Would you like to see our products?",
        sender: "bot",
        options: chatOptions.filter((option) => option.id === "products"),
      };
      setMessages([...messages, botMessage]);
    } else {
      const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const cartItems = cart
        .map(
          (item) =>
            `${item.name} (x${item.quantity}): ₹${(
              item.price * item.quantity
            ).toLocaleString()}`
        )
        .join("\n");
      const botMessage = {
        id: messages.length + 1,
        text: `Here's your cart:\n\n${cartItems}\n\nTotal: ₹${cartTotal.toLocaleString()}`,
        sender: "bot",
        options: [
          {
            id: "checkout",
            text: "Proceed to Checkout",
            response: "Great! I'll guide you through the checkout process.",
          },
          {
            id: "continue-shopping",
            text: "Continue Shopping",
            response: "What else would you like to see?",
          },
        ],
      };
      setMessages([...messages, botMessage]);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! Welcome to ADAA Jaipur. How can I help you today?",
        sender: "bot",
        options: chatOptions,
      },
    ]);
    setCart([]);
  };

  const handleFormSubmit = (formData) => {
    const botMessage = {
      id: messages.length + 1,
      text: `Thank you for submitting your request. We've received the following information:
      
      ${Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}
      
      Our team will process your request and get back to you shortly.`,
      sender: "bot",
      options: [mainMenuOption],
    };

    setMessages([...messages, botMessage]);
  };

  const renderForm = (formType) => {
    switch (formType) {
      case "cancel-order":
        return <CancelOrderForm onSubmit={handleFormSubmit} />;
      case "return-exchange":
        return <ReturnExchangeForm onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white flex items-center justify-center z-50"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 max-h-[80vh] flex flex-col shadow-xl bg-white rounded-lg overflow-hidden z-50">
          <div className="bg-[#FF8A00] text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">ADAA Jaipur Support</h3>
            <div className="flex items-center gap-2">
              <button
                className="text-white hover:text-white hover:bg-[#FF8A00]/90 p-1 rounded"
                onClick={viewCart}
              >
                🛒{" "}
                <span className="ml-1">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </button>
              <button
                className="text-white hover:text-white hover:bg-[#FF8A00]/90 p-1 rounded"
                onClick={resetChat}
              >
                ↺
              </button>
            </div>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-auto p-4 space-y-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-2 ${
                    message.sender === "user"
                      ? "bg-[#FF8A00] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  {message.products && (
                    <ScrollableProductCard
                      products={message.products}
                      addToCart={addToCart}
                    />
                  )}
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-left px-3 py-2 rounded-md bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                  {message.form && renderForm(message.form)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
