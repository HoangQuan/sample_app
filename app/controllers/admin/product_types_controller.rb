class Admin::ProductTypesController < Admin::AdminController
  before_filter :admin_user

  def index
    @product_types = Admin::ProductType.order(:updated_at).page(params[:page])
  end
  def new
    @product_type = Admin::ProductType.new
  end

  def show
    @product_type = Admin::ProductType.find(params[:id])
  end

  def create
    @product_type = Admin::ProductType.new(params[:admin_product_type])
    if @product_type.valid?
      @product_type.save
      redirect_to admin_product_type_path(@product_type), notice: :".created"
    else
      render :new
    end
  end

  def edit
    @product_type = Admin::ProductType.find(params[:id])
  end

  def update
    @product_type = Admin::ProductType.find(params[:id])
    product_type = params[:admin_product_type]
    if @product_type.update(product_type)
      redirect_to admin_product_type_path(@product_type), notice: :".updateted"
    else
      render :edit
    end
  end

  def destroy
    @product_type = Admin::ProductType.find(params[:id])
    @product_type.destroy
    redirect_to admin_product_types_path
  end
end
