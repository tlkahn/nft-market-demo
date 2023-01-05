class CreateCollections < ActiveRecord::Migration[7.0]
  def change
    create_table :collections do |t|
      t.string :name
      t.string :image_url
      t.string :curator

      t.timestamps
    end
  end
end
