class Admin::ProductsController < Admin::AdminController
  before_filter :admin_user
  
  def index
    @products = Admin::Product.order(:updated_at).page(params[:page])
  end
  def new
    @product = Admin::Product.new
  end

  def show
    @product = Admin::Product.find(params[:id])
  end

  def create
    @product = Admin::Product.new(params[:admin_product])
    if @product.valid?
      @product.save
      redirect_to admin_product_path(@product), notice: :".created"
    else
      render :new
    end
  end

  def edit
    @product = Admin::Product.find(params[:id])
  end

  def update
    @product = Admin::Product.find(params[:id])
    product = params[:admin_product]
    if @product.update_attributes(product)
      redirect_to admin_product_path(@product), notice: :".updateted"
    else
      render :edit
    end
  end

  def destroy
    @product = Admin::Product.find(params[:id])
    @product.destroy
    redirect_to admin_products_path
  end
end
