class Item < ApplicationRecord
  belongs_to :collection
  belongs_to :network
  validates :name, presence: true
  validates :metadata_ipfs_hash, presence: true, uniqueness: true
  # validates :description, presence: true
  validates :royalties,
            presence: true,
            numericality: {
              greater_than_or_equal_to: 0,
              less_than_or_equal_to: 100
            }
  validates :collection_id, presence: true
  validates :price_eth,
            presence: true,
            numericality: {
              greater_than_or_equal_to: 0
            }
  validates :image_url, presence: true

  def nft_uri
    "ipfs://#{self.metadata_ipfs_hash}"
  end
end
