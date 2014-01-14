class CommentsController < ApplicationController
  before_filter :signed_in_user, only: [:index,:edit, :update]
  before_filter :correct_user,   only: [:edit, :update]
  # before_filter :admin_user,     only: :destroy
  # before_filter :build_comment, only: [:new, :create, :index]
  before_filter :load_post, only: :destroy
  before_filter :load_comment, only: [:edit, :show, :update, :destroy]
  def new
  end
  def show

  end
  def index

  end
  def create
    @post = Post.find(params[:comment][:post_id])
    limit = 3
    if params[:page].to_i >= 1 && params[:page].to_i <= (@post.comments.count.to_f/3).ceil
      offset = params[:page] ? (params[:page].to_i - 1)*limit : 0
    end
    @comment =  Comment.new(params[:comment])
    if @comment.save
      @comments = @post.comments.offset(offset).limit(limit).order_by_created
      respond_to do |format|
        format.js
      end
    end
  end
  def edit
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
    Comment.find(params[:id]).destroy
    flash[:success] = "Post destroyed."
    redirect_to post_path(@post)
  end
  private

    def signed_in_user
      unless signed_in?
        store_location
        redirect_to signin_url, notice: "Please sign in."
      end
    end

    def correct_user
      @comment = Comment.find(params[:id])
      redirect_to(root_path)  unless current_user?(@user)
    end
    def admin_user
      flash[:notice] = "You are not Admin"
      redirect_to(root_path)  unless current_user.admin?
    end

    def build_comment
      @post = current_user.posts.build
    end

    def load_post
      @post = Comment.find(params[:id]).post
    end


    def load_comment
      @comment = Comment.find(params[:id])
    end
end
