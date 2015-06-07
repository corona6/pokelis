class AddKeyIndexToLists < ActiveRecord::Migration
  def change
    add_index :lists, :key
  end
end
