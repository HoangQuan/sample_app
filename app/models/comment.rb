class Comment < ActiveRecord::Base
  attr_accessible :user_id, :post_id, :content

  belongs_to :post
  belongs_to :user
  has_many :microcomments

  scope :order_by_created, -> {order("created_at DESC")}
end