class CategoriesController < ApplicationController
  def show
    @category_id = params[:id]
    @pagy, @items = pagy(Item.where(category_id: @category_id))
  end
end
