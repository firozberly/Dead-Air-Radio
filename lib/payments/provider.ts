export interface SplitPaymentProvider { createCheckout(input:{orderId:string; artistAccountRef?:string; amountCents:number; platformFeeCents:number}): Promise<{checkoutUrl:string}> }
export class StripeConnectProvider implements SplitPaymentProvider { async createCheckout(){ return { checkoutUrl: 'https://checkout.stripe.com/pay/mock' }; } }
