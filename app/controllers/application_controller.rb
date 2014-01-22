class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  def headers_for_downloading_csv(filename = params[:controller])
    response.headers["Content-Type"] = "text/csv"
    response.headers["Content-Disposition"] = "attachment;" +
      "filename=#{filename}.csv"
  end
  
end
