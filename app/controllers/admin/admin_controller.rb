class Admin::AdminController < ApplicationController
  before_filter :signed_in_user
  before_filter :admin_user
  layout "admin/admin_layout"

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
    flash[:notice] = "You are not Admin" unless current_user.admin
    redirect_to(root_path)  unless current_user.admin?
  end
end