class SessionsController < ApplicationController
	# def create # ham create cu
 #    user = User.find_by_email(params[:session][:email].downcase)
 #    if user && user.authenticate(params[:session][:password])
 #      # Sign the user in and redirect to the user's show page.
 #      flash[:success] = 'Sign in success'
 #      sign_in user
 #      redirect_to user
 #      #redirect_to  root_path
 #    else
 #      # Create an error message and re-render the signin form.
 #      flash[:error] = 'Invalid email/password combination' # Not quite right!
 #      render 'new'
 #    end
 #  end
#ham create moi
  def create
    user = User.find_by_email(params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      sign_in user
      redirect_back_or user
    else
      flash.now[:error] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
      sign_out # goi phuong thuc sign out dc viet o session_helper
      redirect_to root_url
  end

end
