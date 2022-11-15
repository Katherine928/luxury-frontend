import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  const session = getSession(req, res);
  const user = session?.user;
  if (user) {
    const stripeId =
      user[
        "https://https://luxury-frontend-chi.vercel.app//stripe_customer_id"
      ];
    if (req.method === "POST") {
      try {
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",
          mode: "payment",
          customer: stripeId,
          payment_method_types: ["card"],
          shipping_address_collection: {
            allowed_countries: ["US", "CA"],
          },
          allow_promotion_codes: true,
          shipping_options: [
            {
              shipping_rate: "shr_1M2M1gDKbRC0kgLGWgWMdYd9",
            },
            {
              shipping_rate: "shr_1M2M0bDKbRC0kgLGdDtQhtqm",
            },
            {
              shipping_rate: "shr_1M2LwEDKbRC0kgLGYQprENKE",
            },
          ],
          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "usd",
                tax_behavior: "exclusive",
                product_data: {
                  name: item.title,
                  images: [item.image.data.attributes.formats.thumbnail.url],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },

              quantity: item.quantity,
            };
          }),
          automatic_tax: {
            enabled: true,
          },
          tax_id_collection: {
            enabled: true,
          },
          customer_update: {
            name: "auto",
            shipping: "auto",
          },
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/canceled`,
        });
        res.status(200).json(session);
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  } else {
    if (req.method === "POST") {
      try {
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",
          mode: "payment",
          payment_method_types: ["card"],
          shipping_address_collection: {
            allowed_countries: ["US", "CA"],
          },
          allow_promotion_codes: true,
          shipping_options: [
            {
              shipping_rate: "shr_1M2M1gDKbRC0kgLGWgWMdYd9",
            },
            {
              shipping_rate: "shr_1M2M0bDKbRC0kgLGdDtQhtqm",
            },
            {
              shipping_rate: "shr_1M2LwEDKbRC0kgLGYQprENKE",
            },
          ],
          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "usd",
                tax_behavior: "exclusive",
                product_data: {
                  name: item.title,
                  images: [item.image.data.attributes.formats.thumbnail.url],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },

              quantity: item.quantity,
            };
          }),
          automatic_tax: {
            enabled: true,
          },
          tax_id_collection: {
            enabled: true,
          },

          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/canceled`,
        });
        res.status(200).json(session);
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }
}
