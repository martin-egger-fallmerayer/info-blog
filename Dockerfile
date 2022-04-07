FROM node:16
ENV PORT 3000
RUN mkdir -p /usr/src/bsuff-on-the-rocks
WORKDIR /usr/src/bsuff-on-the-rocks
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get update -qq && apt-get install -y yarn
# RUN yarn install
# COPY package.json /usr/src/bsuff-on-the-rocks/
# COPY yarn.lock /usr/src/bsuff-on-the-rocks/
# RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD "yarn" "start"