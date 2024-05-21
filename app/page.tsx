// "use client";
// import { useState } from "react";

// const POS = () => {
//   const redirectToURL = () => {
//     (window.location.href = "https://gocps.net/4ziaqja5xsqymrhgphlvhxzut/"),
//       "_blank";
//   };

//   // https://gocps.net/9pujg5d5ouexr89g7skw5jvcz/

//   return (
//     <div
//       style={{
//         padding: "20px",
//         maxWidth: "600px",
//         margin: "0 auto",
//         textAlign: "center",
//       }}
//     >
//       <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
//         Point of Sale Interface
//       </h1>
//       <button
//         style={{
//           backgroundColor: "#4CAF50",
//           border: "none",
//           color: "white",
//           padding: "15px 32px",
//           textAlign: "center",
//           textDecoration: "none",
//           display: "inline-block",
//           fontSize: "16px",
//           margin: "4px 2px",
//           cursor: "pointer",
//           borderRadius: "8px",
//           boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//         }}
//         onClick={redirectToURL}
//       >
//         Create Transaction
//       </button>
//     </div>
//   );
// };

// export default POS;



"use client";
import { useState } from "react";

const POS = () => {
  const [formData, setFormData] = useState({
    item_name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // https://gocps.net/2cpmb28vxrg1n8ll3orp1tek7/

  const redirectToURL = () => {
    const baseUrl = "https://www.coinpayments.net/index.php";
    const merchantId = process.env.NEXT_PUBLIC_MERCHENT_ID || "default_merchant_id";
    const params = new URLSearchParams({
      cmd: "_pos",
      reset: "1",
      merchant: merchantId,
      item_name: formData.item_name || "Order Payment",
      currency: "BTC",
      allow_currency: "1",
      email: formData.email,
    }).toString();
    const urlWithParams = `${baseUrl}?${params}`;
    window.open(urlWithParams, "_blank");
  };


  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Point of Sale Interface
      </h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleInputChange}
          placeholder="Item Name"
          style={{
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "80%",
            backgroundColor: "#fff",
            color: "#000",
          }}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          style={{
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "80%",
            backgroundColor: "#fff",
            color: "#000",
          }}
        />
      </div>
      <button
        style={{
          backgroundColor: "#4CAF50",
          border: "none",
          color: "white",
          padding: "15px 32px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          margin: "4px 2px",
          cursor: "pointer",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={redirectToURL}
      >
        Create Transaction
      </button>
    </div>
  );
};

export default POS;
