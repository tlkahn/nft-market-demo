class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :eth_address
      t.string :display_name
      t.string :twitter_id
      t.string :discord_id
      t.text :bio
      t.string :profile_img_url

      t.timestamps
    end
  end
end
