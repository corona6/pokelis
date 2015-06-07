class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :key
      t.text :data, limit: 4294967295

      t.timestamps null: false
    end
  end
end
