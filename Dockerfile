FROM node:argon
MAINTAINER Nick Lombardi

# Add build utils (seems to be necessary for certain node-gyp commands)
RUN apt-get update && \
    apt-get install \
        -y \
        --no-install-recommends \
        build-essential \
    && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# DEV -- Add related development tools
RUN apt-get update && \
    apt-get install \
        -y \
        --no-install-recommends \
        mysql-client \
        redis-tools \
    && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set npm log levels
RUN npm config --global set progress false && \
    npm config --global set spin false && \
    npm config --global set loglevel http && \
    npm config --global set color true

# Exclude npm cache from the image
VOLUME /root/.npm

# Make sure we are running the latest version of npm
RUN npm install npm@3.9.5 -g \
    --loglevel=warn
RUN npm install -g bower

# Temporary fix for npm install until
# https://github.com/npm/npm/issues/9863 is resolved. Link to actual fix
# in this comment:
# https://github.com/npm/npm/issues/9863#issuecomment-195741238
WORKDIR /usr/local/lib/node_modules/npm
RUN npm install -g fs-extra --loglevel=warn && \
    sed -i s/graceful-fs/fs-extra/g /usr/local/lib/node_modules/npm/lib/utils/rename.js && \
    sed -i s/fs.rename/fs.move/g /usr/local/lib/node_modules/npm/lib/utils/rename.js

# Create the directory we are going to install our app into, and make all
# following RUN commands execute in that directory
RUN mkdir -p /var/www
RUN mkdir -p /var/www/victory
WORKDIR /var/www/victory

# Copy in the package.json and npm-shrinkwrap.json files and NPM install first
# to hopefully be able to reuse a prio cached image
COPY package.json bower.json /var/www/victory
RUN npm install \
    --loglevel=warn
RUN bower install --allow-root

# Copy in our source
COPY . /var/www/victory

# Build the app
RUN npm run build

EXPOSE 80 443

CMD [ "npm", "start" ]
