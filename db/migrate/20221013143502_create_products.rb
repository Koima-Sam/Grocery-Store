class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :user_id
      t.integer :price
      t.string :description
      t.string :image

      t.timestamps
    end
  end
end
