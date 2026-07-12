# __DOMAIN__ Context rules

Owner: __OWNER__. Organize each layer by declared subdomain. Peer Context dependencies originate only from consumer
Infrastructure integrations and use this Context's `contracts/<subdomain>/public.ts`. `public-api.ts` and
`composition/index.ts` are reserved for app server composition. Ownership-free shared directories are forbidden.
