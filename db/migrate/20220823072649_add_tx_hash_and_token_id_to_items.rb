class AddTxHashAndTokenIdToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :tx_hash, :string
    add_column :items, :token_id, :string
  end
end
