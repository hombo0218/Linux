Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*"  # 必要なら '*' を特定のドメインに変更
    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
