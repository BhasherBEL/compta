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

EXPOSE 14910

# TODO: Support --http2
ENTRYPOINT [ "./node_modules/sirv-cli/bin.js", "public", \
    "--no-clear", "--gzip", \
    "--port", "14910", \
    "--host", "compta.louvainlinux.org" \
]
