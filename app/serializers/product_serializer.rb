class ProductSerializer < ActiveModel::Serializer
  attributes :id,:name,:image,:user_id,:price,:description
end
