import React from "react";
import { message } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ totalAmount }) => {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount, // Valor total de la compra, retornado desde bills
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      message.success("Transacción realizada con éxito por: " + details.payer.name.given_name);
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AXoXH_PItZDaL2A7EIEz4j7UlxOZEmIQQDJXtjN-J7dQvi8CRVqLA1J7FtSPewrsYXaX53NwJVe2SPfL" }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;