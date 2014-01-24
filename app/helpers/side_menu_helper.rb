module SideMenuHelper
  def side_menues
    [
      {
        group: :home,
        heading: ->{root_path},
      },
      {
        group: :product_managers,
        heading: ->{"#"},
        collapses: {
          products: -> {admin_products_path},
          products_type1: -> {admin_products_path(:"q[product_type_id_eq]" => 1)},
          products_type2: -> {admin_products_path},
          products_type3: -> {admin_products_path},
        }
      },
      {
        group: :post_managers,
        heading: ->{"#"},
        collapses: {
          posts: -> {posts_path},
          posts_type1: -> {admin_products_path(q: "product_type_id_eq=1")},
          posts_type2: -> {admin_products_path},
          posts_type3: -> {admin_products_path},
        }
      }
    ]
  end

  def side_menu_include? path_hash
    path_hash.values.map do |url_proc|
      Rails.application.routes.recognize_path(url_proc.call)[:controller]
    end.include? params[:controller]
  end
end
