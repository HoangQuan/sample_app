class Post < ActiveRecord::Base
  attr_accessible :user_id, :content, :title

  belongs_to :user
  has_many :comments

  scope :order_by_created, -> {order("created_at DESC")}
  validates :title, presence: true
end
