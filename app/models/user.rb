class User < ApplicationRecord
    has_secure_password
    # has_many :products
    validates :email, uniqueness:true;
end
