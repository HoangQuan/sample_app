class PostsController < ApplicationController
  before_filter :signed_in_user, only: [:index,:edit, :update]
  before_filter :correct_user,   only: [:edit, :update]
  before_filter :admin_user,     only: :destroy
  before_filter :build_post, only: [:new, :create, :index]
  before_filter :load_post, only: [:edit, :show, :update, :destroy]
  def new
  end
  def show
  end
  def index
    limit = 3
    if params[:page].to_i >= 1 && params[:page].to_i <= (Post.count.to_f/3).ceil
      offset = params[:page] ? (params[:page].to_i - 1)*limit : 0
    end
    @posts=Post.offset(offset).limit(limit)
  end
  def create
    @post.attributes = params[:post]
    if @post.save
      # Handle a successful save.
      redirect_to posts_path()
    else
      #redirect_to root_path
      flash[:error] = "Invalid User!"
      render 'new'
    end
  end
  def edit
    @post=Post.find(params[:id])
  end
  def update
    @post=Post.find(params[:id])
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
    Post.find(params[:id]).destroy
    flash[:success] = "Post destroyed."
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
      @post = Post.find(params[:id])
      redirect_to(root_path)  unless current_user?(@user)
    end
    def admin_user
      flash[:notice] = "You are not Admin"
      redirect_to(root_path)  unless current_user.admin?
    end

    def build_post
      @post = current_user.posts.build
    end


    def load_post
      @post = Post.find(params[:id])
    end
end
