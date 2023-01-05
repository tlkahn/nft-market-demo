class AddDiscordChannelToCollections < ActiveRecord::Migration[7.0]
  def change
    add_column :collections, :discord_channel, :string
  end
end
