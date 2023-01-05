# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require Rails.root.join("app/helpers", "application_helper.rb")

include ApplicationHelper

# 10.times do |i|
#     User.create({
#         "eth_address" => "eth_address",
#         "display_name" => "User #{i}",
#         "twitter_id" => "twitter_id",
#         "discord_id" => "discord_id",
#         "bio" => "bio",
#         "profile_img_url" => img_gen
#     })
# end

# 10.times do |i|
#   Collection.create(
#     {
#       "name" => "Collection #{i}",
#       "image_url" => img_gen,
#       "curator" => "Curator #{i}"
#     }
#   )
# end

# 5.times do |i|
#   Category.create({ "name" => "Category #{i}", "image_url" => img_gen })
# end

# 100.times do |i|
#   Item.create(
#     {
#       "name" => "Item #{i + 1}",
#       "image_url" => img_gen,
#       "price_eth" => rand(0.1..100.0),
#       "author" => "Author #{i}",
#       "category_id" => rand(1..Category.all.size),
#       "collection_id" => rand(1..Collection.all.size)
#     }
#   )
# end
