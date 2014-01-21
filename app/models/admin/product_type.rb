class Admin::ProductType < ActiveRecord::Base
  attr_accessible :name
  validates :name, presence: true

  has_many :products
end
