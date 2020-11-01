<p align="center">
  <img align="center" width="50%" src="/src/vectors/rxc-logo.svg">
</p>

# Openfund - Quadratic Funding App
> by **Nestor Bonilla**

The bounty scope is to build a Quadratic Funding app for RadicalxChange Foundation.

## Link
* [Live website](https://openfund.netlify.app)
* [Video pitch](https://youtu.be/2V3W_JxUmlY)

### Prerequisites

1. Have a text editor installed, i.e. [VSCode](https://code.visualstudio.com/)
2. Have the Gatsby CLI (gatsby-cli) installed globally by running:
   `npm install -g gatsby-cli`

## Technologies
- [Gatsby](https://www.gatsbyjs.com)
- [Hasura](https://hasura.io)
- [Netlify](https://www.netlify.com)
- [Mailgun](https://www.mailgun.com)
- [Stripe](https://stripe.com)

## Environment Variables

Save all of these in `.env`:

- `MAILGUN_API_KEY` - get this from https://www.mailgun.com/
- `MAILGUN_DOMAIN` - get this from https://www.mailgun.com/
- `HASURA_API_URL` - get this from https://hasura.io/
- `HASURA_ADMIN_SECRET` - get this from https://hasura.io/
- `GATSBY_STRIPE_PUBLISHABLE_KEY` - get this from https://stripe.com/
- `STRIPE_API_SECRET` - get this from https://stripe.com/
- `STRIPE_WEBHOOK_SECRET` - get this from https://stripe.com/