class CreateMicrocomments < ActiveRecord::Migration
  def change
    create_table :microcomments do |t|
      t.integer :comment_id
      t.text :content

      t.timestamps
    end
    add_index :microcomments, [:comment_id, :created_at]
  end
end
