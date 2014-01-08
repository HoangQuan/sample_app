class UsersController < ApplicationController
  before_filter :signed_in_user, only: [:index,:edit, :update]
  before_filter :correct_user,   only: [:edit, :update]
  before_filter :admin_user,     only: :destroy
  def new
  	@user = User.new
  end
  def show
  	@user = User.find(params[:id])
  	#@user = User.find(params[:id])
  end
  def index
    #@users = User.paginate(page: params[:page])
    @users=User.paginate :page => params[:page], :per_page => 5, :order => 'name ASC'
  end
  def create
    @user = User.new(params[:user])
    if @user.save
      # Handle a successful save.
      sign_in @user
      flash[:result] = "Welcome to the Sample App!"
      redirect_to @user
    else
      #redirect_to root_path
      flash[:error] = "Invalid User!"
      render 'new'
    end
  end
  def edit
    @user=User.find(params[:id])
  end
  def update
    @user=User.find(params[:id])
    if @user.update_attributes(params[:user])
      flash[:succss]="Profiles updated"
      sign_in @user
      redirect_to @user
    else 
      flash[:error]="Invalid information"
      render 'edit'
    end
  end
  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User destroyed."
    redirect_to users_url
  end
  private

    def signed_in_user
      unless signed_in?
        store_location
        redirect_to signin_url, notice: "Please sign in."
      end
    end

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_path)  unless current_user?(@user)
    end
    def admin_user
      flash[:notice] = "You are not Admin"
      redirect_to(root_path)  unless current_user.admin?
    end
end
