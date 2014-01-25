class ProductsController < ApplicationController
 layout "products_layouts"
  def index
    respond_to do |format|
      format.html do
        @q = Product.order_by_updated.search params[:q]
        @products = @q.result.page(params[:page])
      end
      format.csv {headers_for_downloading_csv}
    end
  end

  def show
    @q = Product.order_by_updated.search params[:q]
    @product = Admin::Product.find(params[:id])
  end
end
