# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.13.1

FROM node:${NODE_VERSION}-alpine
RUN apk --no-cache add curl

# Use production node environment by default.
ENV NODE_ENV=production


WORKDIR /usr/src/app

# This will be useful if there are any dependencies. In the current case there are no dependencies.
#
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci --omit=dev

# In order for the dirty_hack.js to work, you need to run the container from root.
#
# Run the application as a non-root user.
# USER node

# Copy the source files into the image.
COPY app.js dirty_hack.js ./

# Expose the port that the application listens on.
EXPOSE 8000

# Run the application.
CMD ["node", "app.js"]
