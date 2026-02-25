# CreditScan

## How to use

Clone the repo. Requires [pnpm](https://pnpm.io/installation)

Install dependencies:

```sh
pnpm install
```

### Environment configuration

Network endpoints can be customized through environment variables. Copy the
example file and adjust values as needed:

```sh
cp .env.example .env.local
```

Supported variables:

| Variable                    | Default                              |
| --------------------------- | ------------------------------------ |
| `CREDITCHAIN_NODE_REST_URL` | `https://rpc.creditchain.org/v1`     |
| `CREDITCHAIN_INDEXER_URL`   | `https://indexer.creditchain.org`    |
| `CREDITCHAIN_TESTNET_URL`   | `https://testnet.creditchain.org/v1` |
| `CREDITCHAIN_DEVNET_URL`    | `https://devnet.creditchain.org/v1`  |
| `CREDITCHAIN_LOCAL_URL`     | `http://127.0.0.1:8080/v1`           |
| `CREDITCHAIN_LOCALNET_URL`  | `http://127.0.0.1:8080/v1`           |

Each `CREDITCHAIN_*_URL` variable overrides the default endpoint for the matching
network. Use `CREDITCHAIN_NODE_REST_URL` to override the mainnet RPC endpoint and
`CREDITCHAIN_INDEXER_URL` for rich explorer data (account resources and account
history). Variables are loaded from `.env.local` and can be tailored to point
to custom fullnodes or indexers.

### Running against different networks

CreditScan defaults to mainnet. To explore other CreditChain networks, start the app
and select a network either from the UI's network dropdown or by appending a
`?network=<name>` query parameter:

```sh
pnpm start
```

Then open one of the following URLs in your browser:

- `http://localhost:3000` (mainnet)
- `http://localhost:3000/?network=testnet`
- `http://localhost:3000/?network=devnet`
- `http://localhost:3000/?network=local`

If your local node runs on a non-default address, update `CREDITCHAIN_LOCAL_URL` in
`.env.local` accordingly before starting the app.

### GraphQL support

CreditScan uses the external indexer GraphQL endpoint for rich explorer data.
Ensure `INDEXER_URL` points at the indexer HTTP base (for example,
`https://indexer.creditchain.org`) so the app can reach `/v1/graphql`.

#### Indexer services required (for indexed account data)

If the UI shows "RPC does not expose indexed account data," the explorer cannot
reach the indexer API. The browser does **not** talk directly to the gRPC
manager/data service stack; it only needs the HTTP/GraphQL endpoint that fronts
Postgres (typically Hasura). A minimal deployment therefore needs:

- **Publicly accessible**: Hasura (or equivalent) indexer HTTP API that exposes
  `/v1/graphql`, with `INDEXER_URL` pointing at its base URL.
- **Internal-only**: gRPC Manager + gRPC Data Service (for transaction stream
  delivery to processors).
- **Internal-only**: Indexer processors that consume the gRPC stream and write
  into Postgres.
- **Internal-only**: Postgres database that stores indexed data.

If you only expose the node RPC and do not run the processor + Postgres + Hasura
stack, account tabs like Transactions/Coins/Tokens will show "No Data Found."
To confirm the data path, verify that processors are writing rows into Postgres
and that Hasura is attached to the same database.

Build dependencies:

```sh
pnpm build
```

Run below to start the app:

```sh
pnpm start
```
