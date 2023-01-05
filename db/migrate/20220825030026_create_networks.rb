class CreateNetworks < ActiveRecord::Migration[7.0]
  def change
    create_table :networks do |t|
      t.string :name
      t.integer :chain_id

      t.timestamps
    end
  end
end
