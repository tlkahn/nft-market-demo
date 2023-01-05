class AddMetadataToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :metadata, :jsonb, default: {}, null: false
    add_index :items, :metadata, using: :gin
  end
end
