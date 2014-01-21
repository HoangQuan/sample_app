class PostsController < ApplicationController
  before_filter :load_post, only: [:edit, :show, :update, :destroy]
  before_filter :signed_in_user, only: [:index,:edit, :update]
  before_filter :correct_user,   only: [:edit, :update]
  before_filter :admin_user,     only: :destroy
  before_filter :build_post, only: [:new, :create, :index]
  def new
  end
  def show
    limit = 3
    if params[:page].to_i >= 1 && params[:page].to_i <= ( @post.comments.count.to_f/3).ceil
      offset = params[:page] ? (params[:page].to_i - 1)*limit : 0
    end
    @comments = @post.comments.offset(offset).limit(limit).order_by_created
    respond_to do |format|
      format.js
      format.html
    end
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
    if @post.update_attributes(params[:post])
      flash[:succss]="Post updated"
      redirect_to @post
    else 
      flash[:error]="Error!"
      render 'edit'
    end
  end
  def destroy
    Post.find(params[:id]).destroy
    flash[:success] = "Post destroyed."
    redirect_to posts_url
  end
  private

    def signed_in_user
      unless signed_in?
        store_location
        redirect_to signin_url, notice: "Please sign in."
      end
    end

    def correct_user
      @user = @post.user
      redirect_to(root_path) unless current_user?(@user)
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
