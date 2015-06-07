class AddTitleToLists < ActiveRecord::Migration
  def change
    add_column :lists, :title, :string, after: :key
  end
end
