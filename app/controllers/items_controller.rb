class ItemsController < ApplicationController
  def show
    id = params[:id]
    if Integer(id, exception: false) && Item.exists?(id)
      @item = Item.find(params[:id])
    else
      redirect_to :root, notice: "Item not found"
    end
  end

  def new
  end

  def update
    field_name = params[:field_name]
    field_value = params[field_name.to_sym]
    item_id = params[:item_id]
    item = Item.find(item_id)
    if item[field_name] != field_value && item.update(field_name => field_value)
      render json: { status: "ok" }
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    item_id = params[:item_id]
    if item_id.present?
      item = Item.find(item_id)
      item.destroy
      render json: { status: "ok" }
    else
      render json: { status: "error", message: "item w/#{item_id} not found" }
    end
  end

  def create
    image_file = params[:image_file]
    name = params[:name]
    ActionCable.server.broadcast "progress_notification_channel",
                                 {
                                   text: "Uploading image to IPFS...",
                                   value: 20
                                 }
    ipfs_upload_status =
      helpers.upload_to_ipfs(image_file.tempfile.path, image_file.content_type)
    @img_ipfs_hash = ipfs_upload_status["IpfsHash"]
    @img_ipfs_url = (helpers.ipfs_url_from(@img_ipfs_hash))[:gateway]
    metadata = { name: name, image: @img_ipfs_url }
    tmpfile = "public/#{@img_ipfs_hash}@#{Time.now.to_i.to_s}.json"
    begin
      ActionCable.server.broadcast "progress_notification_channel",
                                   {
                                     text: "Uploading metadata to IPFS...",
                                     value: 50
                                   }
      File.open(tmpfile, "w") { |f| f.write(metadata.to_json) }
      ipfs_upload_status = helpers.upload_to_ipfs(tmpfile, "application/json")
      @metadata_ipfs_hash = ipfs_upload_status["IpfsHash"]
      @metadata_ipfs_url =
        (helpers.ipfs_url_from(@metadata_ipfs_hash))[:protocol]
      File.delete(tmpfile)
    rescue Errno::ENOENT
    end

    collection_id = Collection.find_by_name(params[:collection]).id

    @item =
      Item.new(
        name: name,
        image_url: @img_ipfs_url,
        price_eth: params[:price_eth],
        author: (current_user.eth_address unless current_user.nil?),
        collection_id: collection_id,
        royalties: params[:royalties],
        description: params[:description],
        metadata_ipfs_hash: @metadata_ipfs_hash,
        contract_address: params[:contract_address],
        network_id: params[:network_id],
        youtube_url: params[:youtube_url]
      )

    ActionCable.server.broadcast "progress_notification_channel",
                                 {
                                   text: "Saving the new item to database...",
                                   value: 80
                                 }

    if @item.save
      render json:
               ActiveSupport::JSON.encode(
                 {
                   metadata_ipfs_url: @metadata_ipfs_url,
                   item_id: @item.id,
                   metadata_ipfs_hash: @metadata_ipfs_hash
                 }
               )
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  private
end
