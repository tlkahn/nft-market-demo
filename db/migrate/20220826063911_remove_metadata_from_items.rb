class RemoveMetadataFromItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :items, :metadata, :jsonb
  end
end
