FROM node:16-alpine

# Install non-node dependencies
RUN apk add gzip

# Create app directory.
WORKDIR /usr/src/app
# Install app dependencies.
COPY package*.json ./
RUN npm ci --only=production

# Copy app sources.
# Copying package*.json and install dependencies first allows us to take
# advantage of docker layers cache.
# See https://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY . .
RUN ./node_modules/.bin/rollup --compact --silent -c

# TODO: Support --http2
ENTRYPOINT [ "./node_modules/.bin/sirv", "public", \
    "--no-clear", "--gzip", \
    "--port", "80", \
    "--host", "compta.louvainlinux.org" \
]