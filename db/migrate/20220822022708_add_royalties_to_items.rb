class AddRoyaltiesToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :royalties, :decimal
  end
end
