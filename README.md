# Client for CICT - Cyber Information Collection Tool

Collect information from open sources and use it in report write-ups

![Feed-view](https://user-images.githubusercontent.com/22045387/114296498-5f624a80-9ab4-11eb-890e-b471f087b98a.png)
![Article-view](https://user-images.githubusercontent.com/22045387/114296527-83259080-9ab4-11eb-9258-4dce3b4fe27a.png)

## Installation

Install dependencies:
```
npm install
```

Start development server
```
npm run dev
```

Build the assets

```
npm run build
```

## Deployment

Ready for production Docker containers are available in Docker Hub.

Run Docker compose in project root

```
docker-compose up
```

### Build your own docker images

Clone server-side source

```
git clone https://github.com/ClevenL/cict-server-public.git
cd cict-server-public
```

Build cict-server image

```
docker build -t cict-server -f Dockerfile.server .
```

Clone client-side source

```
git clone https://github.com/ClevenL/cict-client-public.git
cd cict-client-public
```

Build cict-client image

```
docker build -t cict-client -f Dockerfile.client .
```

## Powered by

* Vue & Vuex
* Tailwind CSS
