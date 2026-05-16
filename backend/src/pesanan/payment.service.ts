import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const midtransClient = require('midtrans-client');

@Injectable()
export class PaymentService {
  private snap: any;
  private serverKey: string;

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    this.snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
      serverKey: this.serverKey,
      clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
    });
  }

  async createSnapToken(params: {
    orderId: string;
    grossAmount: number;
    customerName: string;
    customerEmail: string;
    itemName: string;
    itemQty: number;
    itemPrice: number;
  }): Promise<string> {
    const transactionDetails = {
      order_id: params.orderId,
      gross_amount: params.grossAmount,
    };

    const itemDetails = [
      {
        id: params.orderId,
        price: params.itemPrice,
        quantity: params.itemQty,
        name: params.itemName.substring(0, 50), // Midtrans max 50 chars
      },
    ];

    const customerDetails = {
      first_name: params.customerName,
      email: params.customerEmail,
    };

    const parameter = {
      transaction_details: transactionDetails,
      item_details: itemDetails,
      customer_details: customerDetails,
    };

    const transaction = await this.snap.createTransaction(parameter);
    return transaction.token;
  }

  /**
   * Verify Midtrans webhook signature
   * Signature = SHA512(order_id + status_code + gross_amount + server_key)
   */
  verifySignature(payload: {
    order_id: string;
    status_code: string;
    gross_amount: string;
    signature_key: string;
  }): boolean {
    const input =
      payload.order_id +
      payload.status_code +
      payload.gross_amount +
      this.serverKey;

    const expectedSignature = crypto
      .createHash('sha512')
      .update(input)
      .digest('hex');

    return expectedSignature === payload.signature_key;
  }
}
