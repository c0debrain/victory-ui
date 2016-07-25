FROM node:argon
MAINTAINER Nick Lombardi <nlombardi@translations.com>

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

# Create the directory we are going to install our app into, and make all
# following RUN commands execute in that directory
RUN mkdir -p /var/www
RUN mkdir -p /var/www/noc-dashboard
WORKDIR /var/www/noc-dashboard

# Copy in the package.json and npm-shrinkwrap.json files and NPM install first
# to hopefully be able to reuse a prio cached image
COPY package.json bower.json /var/www/noc-dashboard/
RUN npm install \
    --loglevel=warn
RUN bower install --allow-root

# Copy in our source
COPY . /var/www/noc-dashboard

EXPOSE 80 443

RUN npm run build

CMD [ "npm", "start" ]
