class Microcomment < ActiveRecord::Base
  attr_accessible :comment_id, :content

  belongs_to :comment

  scope :order_by_created, -> {order("created_at DESC")}
end