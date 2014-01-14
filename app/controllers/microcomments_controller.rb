class MicrocommentsController < ApplicationController
  before_filter :signed_in_user, only: [:index,:edit, :update]
  before_filter :correct_user,   only: [:edit, :update]
  # before_filter :admin_user,     only: :destroy
  # before_filter :build_comment, only: [:new, :create, :index]
  # before_filter :load_microcomment, only: [:edit, :show, :update, :destroy]
  def new
  end
  def show

  end
  def index

  end
  def create
    @comment = Comment.find(params[:microcomment][:comment_id])
    @post = @comment.post
    limit = 3
    if params[:page].to_i >= 1 && params[:page].to_i <= (@post.comments.count.to_f/3).ceil
      offset = params[:page] ? (params[:page].to_i - 1)*limit : 0
    end
    @microcomment =  Microcomment.new(params[:microcomment])
    if @microcomment.save
      @comments = @post.comments.order_by_created
      @microcomments = @comment.microcomments
      @comment = @comment
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
    Microcomment.find(params[:id]).destroy
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

    def load_microcomment
      @comment = Comment.find(params[:id])
    end
end
