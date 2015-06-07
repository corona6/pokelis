json.array!(@lists) do |list|
  json.extract! list, :id, :key, :data
  json.url list_url(list, format: :json)
end
