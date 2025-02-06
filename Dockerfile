FROM ruby:3.2

# 必要なパッケージをインストール
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# 作業ディレクトリを設定
WORKDIR /app

# Gemfile をコピーして bundle install
COPY ./Gemfile ./Gemfile.lock ./
RUN bundle install

# プロジェクトのソースコードをコピー
COPY . .

EXPOSE 3000