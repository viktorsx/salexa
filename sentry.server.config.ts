// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://71fec8d416a23237ec35da979a815d26@o4508718890352640.ingest.de.sentry.io/4508718893957200",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
