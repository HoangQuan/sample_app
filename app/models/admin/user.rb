class Admin::User < ActiveRecord::Base
  require 'carrierwave/orm/activerecord'
  attr_accessible :email, :name, :password, :password_confirmation, :remember_token
  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  mount_uploader :avatar, AvatarUploader

  def large_image
    "http://graph.facebook.com/#{self.uid}/picture?type=large"
  end

  def small_image
    "http://graph.facebook.com/#{self.uid}/picture?type=small"
  end
end
