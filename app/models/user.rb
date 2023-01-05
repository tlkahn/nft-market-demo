class User < ApplicationRecord
    validates :eth_address, presence: true
end
