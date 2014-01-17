class Admin::User < ActiveRecord::Base

  attr_accessible :email, :name, :password, :password_confirmation, :remember_token
  has_secure_password #de khai bao kei password va co the su dung authenticate
  # dam bao rang dia chi email co chu HOA va chu Thuong cung nhu nhau
  before_save { |user| user.email = email.downcase }
  before_save :create_remember_token
  
  validates :name,  presence: true, :length => { :maximum => 50,:minimum =>6 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true

  has_many :posts

  # def large_image
  #   "http://graph.facebook.com/#{self.uid}/picture?type=large"
  # end

  # def small_image
  #   "http://graph.facebook.com/#{self.uid}/picture?type=small"
  # end
end
