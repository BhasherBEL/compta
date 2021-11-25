FROM busybox:stable

# Create app directory.
WORKDIR /usr/src/app
# Install app dependencies.
COPY public/ /www/

CMD ["busybox", "httpd", "-p", "0.0.0.0:8080", "-f", "-v", "-h", "/www"]