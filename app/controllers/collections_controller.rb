class CollectionsController < ApplicationController
  def create
    image_file = params[:image_file]
    name = params[:name]
    @current_user = current_user
    curator = @current_user.id if @current_user
    ActionCable.server.broadcast "progress_notification_channel",
                                 {
                                   text: "Uploading image to AWS...",
                                   value: "40"
                                 }
    img_url = helpers.upload_to_aws(image_file)
    ActionCable.server.broadcast "progress_notification_channel",
                                 {
                                   text: "Creating new Discord channel...",
                                   value: "80"
                                 }
    if channel = helpers.create_new_discord_channel("#{name}")
    else
      render json: {
               status: "fail",
               message: "Discord channel was not created"
             }
    end
    ActionCable.server.broadcast "progress_notification_channel",
                                 {
                                   text:
                                     "Saving to the collection to database...",
                                   value: "80"
                                 }
    if @collection =
         Collection.create(
           name: name,
           image_url: img_url,
           curator: curator,
           discord_channel: channel.id
         )
      render json: {
               status: "success",
               message: "Collection created",
               data: {
                 name: name,
                 image_url: img_url,
                 curator: curator
               }
             }
    else
      render json: { status: "fail" }
    end
  end

  def show
    @collection_id = params[:id]
    @pagy, @items =
      pagy(Item.where(collection_id: @collection_id).order(created_at: :desc))
  end

  def new
  end

  def index
    @pagy, @collections = pagy(Collection.all.order(created_at: :desc))
  end
end
