class Admin::Product < ActiveRecord::Base
  attr_accessible :name, :size, :price, :product_type_id, :status, :amount, :fb_url, :product_image1, 
  :product_image2, :product_image3

  VALID_URL_REGEX = /\A(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?\z/
  validates :name, presence: true

  belongs_to :product_type
  scope :order_by_created, ->{order "products.created_at DESC"}
  scope :order_by_updated, ->{order "products.created_at DESC"}

end
