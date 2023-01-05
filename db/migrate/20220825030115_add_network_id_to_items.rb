class AddNetworkIdToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :network_id, :integer
  end
end
