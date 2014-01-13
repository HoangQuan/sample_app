class Post < ActiveRecord::Base
  attr_accessible :user_id, :content

  belongs_to :user
  has_many :comments

  scope :order_by_created, -> {order("created_at DESC")}
end
