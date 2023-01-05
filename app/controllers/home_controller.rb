class HomeController < ApplicationController
  def index
    @company_name = "Pirate Radio Club"
    @company_slogan = "A decentralized global muisc community"
    @company_description = "Where we create and play music together..."
    @jumbotron_cta_text = "Create a new masterpiece"
    @jumbotron_image_url =
      "https://cdn.vox-cdn.com/thumbor/PkMw5UXqjT7hMTBzkOBYBrbSO7s=/0x170:2040x1190/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/19400951/VRG_ILLO_3806_003.jpg"
    @collection_image_url = "https://picsum.photos/200/200"
    @top_collections = Collection.all.sample(5)
    @top_collection_title = "Top Collections"
    @most_viewed_title = "Most Viewed"
    @most_viewed_items = Item.all.sample(5)
    @latest_drop_title = "Latest Drops"
    @latest_drop_items = Item.last(5)
    @categories_title = "Categories"
    @categories = Category.all
    @hot_bids_title = "Hot Bids"
    @hot_bids = Item.all.sample(5)
  end

  def explore
    @global_search_text = params[:global_search_text]

    if @global_search_text.present?
      items = Item.where("name ILIKE ?", "%#{@global_search_text}%")
    else
      items = Item.all
    end
    items = items.order(created_at: :desc)
    @category = Category.find_by(name: params[:category])
    @category_id = @category.id if @category && params[:category]
    @collection = Collection.find_by(name: params[:collection]) if params[
      :collection
    ]
    @collection_id = @collection.id if @collection
    @ordering = params[:ordering]
    order_hash = {
      "Recently Added" => 1,
      "Price: high to low" => 2,
      "Price: low to hight" => 3
    }
    order_fields = ["created_at", "price_eth desc", "price_eth"]
    order_by =
      (order_fields[order_hash[@ordering] - 1] if params[:ordering]) ||
        "created_at"
    # if @collection_id
    #   @pagy, @items =
    #     pagy(
    #       items.where(category: @category_id, collection: @collection_id).order(
    #         order_by
    #       )
    #     )
    # elsif @category_id
    #   @pagy, @items = pagy(items.where(category: @category_id).order(order_by))
    if @collection_id
      @pagy, @items =
        pagy(items.where(collection: @collection_id).order(order_by))
    else
      @pagy, @items = pagy(items.order(order_by))
    end
  end

  def earn
  end

  def connect_wallet
  end

  def connect_wallet
    @footer_data = footer_data
  end

  private
end
