## Getting Started

Install dependencies. This project uses [bun](https://bun.sh/) as a package manager.

```bash
bun install
```

Copy `env.example` to `.env` and fill in the values. All values are required. The `PRIVATE_KEY` value is the private key string in base64 format. To generate the base64 string, you can use the following command:

```bash
echo -n "your-private-key" | base64
```

Then run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
