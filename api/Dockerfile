FROM ruby:3.2.0

# install nodejs(LTS)
# RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && apt install -y nodejs

WORKDIR /api

COPY . .

RUN bundle install
