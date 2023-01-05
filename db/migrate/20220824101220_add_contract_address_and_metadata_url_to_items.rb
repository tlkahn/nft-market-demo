class AddContractAddressAndMetadataUrlToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :contract_address, :string
    add_column :items, :metadata_ipfs_hash, :string
  end
end
