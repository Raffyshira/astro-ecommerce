import Stripe from "stripe";
import { renderers } from "../../renderers.mjs";
const stripe = new Stripe("sk_test_51QHPW500Ve0FplXnaHXJWxD4kDGm2l5YIFecG6N7h2PB3Nn6ercJzeLD8V65WyINRkGnfZ8bVywas9sR4V3N8rFw00z5OVyhLK", {
  apiVersion: "2022-11-15"
});
const POST = async ({ request }) => {
  try {
    const { items } = await request.json();
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.thumbnail]
        },
        unit_amount: Math.round(item.price * 100)
        // Pastikan harga dalam cents
      },
      quantity: item.quantity
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${"http://localhost:4321"}/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${"http://localhost:4321"}/cart`
    });
    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
