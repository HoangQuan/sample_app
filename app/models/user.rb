class User < ActiveRecord::Base
  require 'carrierwave/orm/activerecord'
  attr_accessible :email, :name, :password, :password_confirmation, :remember_token, :avatar, :tel, 
   :uid
  has_secure_password #de khai bao kei password va co the su dung authenticate
  # dam bao rang dia chi email co chu HOA va chu Thuong cung nhu nhau
  before_save { |user| user.email = email.downcase }
  before_save :create_remember_token

  mount_uploader :avatar, AvatarUploader
  
  validates :name,  presence: true, :length => { :maximum => 50,:minimum =>6 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true

  has_many :posts
  
  private

    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end

end
