FROM node:alpine
LABEL maintainer=francois.romain@beta.gouv.fr

# NodeJS Docker Webapp - Official Doc
# @see https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# NodeJS / Docker - Best Practices
# @see https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

# ENV NODE_ENV production
ENV dir /api
WORKDIR $dir

# cache node_modules if no changes to package.json
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
ADD package.json /tmp/package.json
RUN cd /tmp && npm install && cp -a /tmp/node_modules $dir/

COPY package*.json $dir/
COPY app/ $dir/

CMD ["npm", "start"]

# build
# docker build --no-cache -t camino-api .

# run 
# docker run -p 3000:3000 -u node camino-api