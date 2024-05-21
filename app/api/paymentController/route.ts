// import { NextRequest, NextResponse } from "next/server";
// import Coinpayments from "coinpayments";

// // Adjust the type for paymentData to match the expected input for createTransaction
// interface PaymentData {
//   amount: string; // Note: Coinpayments expects amount as a string
//   currency1: string;
//   currency2: string;
//   buyer_email?: string;
//   buyer_name: string;
//   item_name: string;
// }

// // Define and export the API route handler function
// export async function POST(req: NextRequest) {
//   try {
//     const clientCoinPayment = new Coinpayments({
//         //@ts-ignore
//       key: process.env.API_KEY,
//         //@ts-ignore
//       secret: process.env.SECRET_KEY,
//     });

//     const bodyData = await req?.json();
//     const { price, email, user, planName } = bodyData;

//     console.log(bodyData, )
//     const paymentData: PaymentData = {
//       amount: price,
//       currency1: "USD",
//       currency2: "LTCT",
//       buyer_email: email,
//       buyer_name: user,
//       item_name: planName ? planName : "Premium Plan"
//     };

//     console.log(paymentData, "111111")

//     // Create the transaction using the coinpayments package
//     //@ts-ignore
//     const transaction = await clientCoinPayment.createTransaction(paymentData);

//     console.log('transaction:',transaction)

//   return  NextResponse.json(
//       {
//         message: "Transaction done!",
//         transaction,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Transaction failed:", error);
//     return NextResponse.json(
//       {
//         message: "OOPs Failed",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import Coinpayments from "coinpayments";

// Adjust the type for POS transaction data
interface POSData {
  amount: string; // Coinpayments expects amount as a string
  currency1: string;
  currency2: string;
  buyer_email?: string;
  buyer_name: string;
  item_name: string;
  // ipn_url: string;
}

// Define the response type for createTransaction
interface POSTransactionResponse {
  error?: string; // Error message if any
  result: {
    amount: string;
    txn_id: string;
    address: string;
    confirms_needed: string;
    timeout: number;
    status_url: string;
    qrcode_url: string;
  };
}

// Define and export the API route handler function
export async function POST(req: NextRequest) {
  try {
    const clientCoinPayment = new Coinpayments({
      //@ts-ignore
      key: process.env.API_KEY,
      //@ts-ignore
      secret: process.env.SECRET_KEY,
    });

    const bodyData = await req.json();
    const { price, email, user, planName } = bodyData;

    console.log('bodyData:',bodyData)

    const paymentData: POSData = {
      amount: price,
      currency1: "USD",
      currency2: "LTCT",
      buyer_email: email,
      buyer_name: user,
      item_name: planName ? planName : "Premium Plan",
      // ipn_url: "https://your-domain.com/api/coinpayments-ipn",
    };

    // Create the transaction using the coinpayments package
    //@ts-ignore
    const transaction: POSTransactionResponse = await clientCoinPayment.createTransaction(paymentData);

    console.log('transaction:',transaction)

    if (transaction.error) {
      throw new Error(transaction.error);
    }

    return NextResponse.json(
      {
        message: "Transaction done!",
        transaction: transaction.result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transaction failed:", error);
    return NextResponse.json(
      {
        message: "OOPs Failed",
      },
      { status: 500 }
    );
  }
}
